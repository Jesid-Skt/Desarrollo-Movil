import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getStoredReservas, saveStoredReservas } from "../services/storage";

import { CLASES } from "../data/clases";
import { useProfile } from "./ProfileContext";

const ReserveContext = createContext(null);

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const normalizarDia = (dia) => {
  const mapa = {
    mie: "Mié",
    mié: "Mié",
    sab: "Sáb",
    sáb: "Sáb",
  };

  return mapa[dia.toLowerCase()] || dia;
};

const horarioAMinutos = (hora, minuto, periodo) => {
  let horas = Number(hora);
  const minutos = Number(minuto);

  const esPm = periodo.toLowerCase().startsWith("p");

  if (horas === 12) {
    horas = 0;
  }

  if (esPm) {
    horas += 12;
  }

  return horas * 60 + minutos;
};

/**
 * Convierte:
 *
 * "Lun 7:00 a.m."
 *
 * en:
 *
 * {
 *   dia: "Lun",
 *   inicioMinutos: 420,
 *   finMinutos: 470
 * }
 */
const parsearHorario = (horario, duracion = 60) => {
  if (!horario || typeof horario !== "string") {
    return null;
  }

  const match = horario
    .trim()
    .match(
      /^(Lun|Mar|Mié|Mie|Jue|Vie|Sáb|Sab|Dom)\s+(\d{1,2}):(\d{2})\s*(a\.m\.|p\.m\.|am|pm)$/i,
    );

  if (!match) {
    return null;
  }

  const [, diaTexto, hora, minuto, periodo] = match;

  const inicioMinutos = horarioAMinutos(hora, minuto, periodo);

  return {
    dia: normalizarDia(diaTexto),
    inicioMinutos,
    finMinutos: inicioMinutos + Number(duracion || 60),
  };
};

const hayCruce = (a, b) => {
  if (!a || !b || a.dia !== b.dia) {
    return false;
  }

  return a.inicioMinutos < b.finMinutos && b.inicioMinutos < a.finMinutos;
};

/**
 * También permite cargar reservas
 * creadas con la versión anterior.
 */
const prepararReserva = (reserva, clases) => {
  const clase = clases.find((item) => item.id === reserva.claseId);

  const horarioInfo = parsearHorario(reserva.horario, clase?.duracion || 60);

  return {
    ...reserva,

    profesor:
      typeof reserva.profesor === "string"
        ? reserva.profesor
        : reserva.profesor?.nombre || clase?.profesor?.nombre || "",

    dia: reserva.dia || horarioInfo?.dia || null,

    inicioMinutos: Number.isFinite(reserva.inicioMinutos)
      ? reserva.inicioMinutos
      : (horarioInfo?.inicioMinutos ?? null),

    finMinutos: Number.isFinite(reserva.finMinutos)
      ? reserva.finMinutos
      : (horarioInfo?.finMinutos ?? null),
  };
};

export const ReserveProvider = ({ children }) => {
  const { hasProfile, loading: loadingProfile } = useProfile();

  const [reservas, setReservas] = useState([]);

  const [loadingReservas, setLoadingReservas] = useState(true);

  const reservandoRef = useRef(false);

  const cancelandoRef = useRef(new Set());

  /**
   * Cargar reservas desde AsyncStorage.
   */
  useEffect(() => {
    let mounted = true;

    const loadReservasData = async () => {
      const data = await getStoredReservas();

      const reservasPreparadas = (Array.isArray(data) ? data : []).map(
        (reserva) => prepararReserva(reserva, CLASES),
      );

      if (mounted) {
        setReservas(reservasPreparadas);

        setLoadingReservas(false);
      }
    };

    loadReservasData();

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Los cupos NO se guardan aparte.
   *
   * Se calculan:
   *
   * cupos originales - reservas activas
   *
   * Esto evita que los cupos vuelvan
   * a su valor inicial al reiniciar
   * la aplicación.
   */
  const clases = useMemo(() => {
    const reservasPorClase = reservas.reduce((contador, reserva) => {
      contador[reserva.claseId] = (contador[reserva.claseId] || 0) + 1;

      return contador;
    }, {});

    return CLASES.map((clase) => {
      const cuposIniciales = Number(clase.cupos || 0);

      const reservasActivas = reservasPorClase[clase.id] || 0;

      const cuposDisponibles = Math.max(0, cuposIniciales - reservasActivas);

      return {
        ...clase,

        cuposDisponibles,

        // Mantiene compatibilidad
        // con tus componentes actuales.
        cupos: cuposDisponibles,
      };
    });
  }, [reservas]);

  /**
   * RESERVAR CLASE
   */
  const reservarClase = useCallback(
    async (claseId, horarioSeleccionado) => {
      if (reservandoRef.current) {
        return {
          ok: false,
          codigo: "BUSY",
          mensaje: "La reserva está siendo procesada. Espera un momento.",
        };
      }

      if (loadingReservas || loadingProfile) {
        return {
          ok: false,
          codigo: "LOADING",
          mensaje:
            "Estamos cargando tus datos. Intenta nuevamente en un momento.",
        };
      }

      /**
       * El usuario debe tener perfil.
       */
      if (!hasProfile) {
        return {
          ok: false,
          codigo: "PROFILE_REQUIRED",
          mensaje: "Primero debes crear tu perfil para reservar una clase.",
        };
      }

      const clase = clases.find((item) => item.id === claseId);

      if (!clase) {
        return {
          ok: false,
          codigo: "CLASS_NOT_FOUND",
          mensaje: "No encontramos la clase seleccionada.",
        };
      }

      if (!horarioSeleccionado) {
        return {
          ok: false,
          codigo: "SCHEDULE_REQUIRED",
          mensaje: "Debes seleccionar un horario.",
        };
      }

      /**
       * No hay cupos.
       */
      if (clase.cuposDisponibles <= 0) {
        return {
          ok: false,
          codigo: "NO_SLOTS",
          mensaje: "Esta clase ya no tiene cupos disponibles.",
        };
      }

      /**
       * Convertimos el horario
       * para poder detectar cruces.
       */
      const horarioInfo = parsearHorario(horarioSeleccionado, clase.duracion);

      if (!horarioInfo || !DIAS.includes(horarioInfo.dia)) {
        return {
          ok: false,
          codigo: "INVALID_SCHEDULE",
          mensaje: "El horario de esta clase no tiene un formato válido.",
        };
      }

      /**
       * Verificar cruces reales.
       *
       * Ejemplo:
       *
       * Lunes 7:00 - 7:50
       *
       * contra
       *
       * Lunes 7:30 - 8:20
       *
       * => conflicto.
       */
      const horarioCruzado = reservas.some((reserva) => {
        const reservaInfo = {
          dia: reserva.dia,
          inicioMinutos: reserva.inicioMinutos,
          finMinutos: reserva.finMinutos,
        };

        return hayCruce(reservaInfo, horarioInfo);
      });

      if (horarioCruzado) {
        return {
          ok: false,
          codigo: "SCHEDULE_CONFLICT",
          mensaje: `El horario ${horarioSeleccionado} se cruza con una de tus reservas actuales. Selecciona otro horario.`,
        };
      }

      reservandoRef.current = true;

      try {
        const nuevaReserva = {
          id: `reserva-${Date.now()}`,

          claseId: clase.id,

          titulo: clase.titulo || clase.nombre,

          profesor: clase.profesor?.nombre || "",

          horario: horarioSeleccionado,

          modalidad: clase.modalidad || "Virtual",

          precio: clase.precio || 0,

          duracion: clase.duracion || 60,

          /**
           * Datos utilizados
           * para detectar cruces
           * posteriormente.
           */
          dia: horarioInfo.dia,

          inicioMinutos: horarioInfo.inicioMinutos,

          finMinutos: horarioInfo.finMinutos,

          fechaCreacion: new Date().toISOString(),
        };

        const listaActualizada = [...reservas, nuevaReserva];

        const success = await saveStoredReservas(listaActualizada);

        if (!success) {
          return {
            ok: false,
            codigo: "STORAGE_ERROR",
            mensaje: "No se pudo guardar la reserva en el dispositivo.",
          };
        }

        setReservas(listaActualizada);

        return {
          ok: true,
          codigo: "RESERVED",
          mensaje: "Reserva realizada con éxito.",
          reserva: nuevaReserva,
        };
      } finally {
        reservandoRef.current = false;
      }
    },
    [clases, hasProfile, loadingProfile, loadingReservas, reservas],
  );

  /**
   * CANCELAR RESERVA
   */
  const cancelarReserva = useCallback(
    async (reservaId) => {
      if (!reservaId) {
        return {
          ok: false,
          codigo: "INVALID_RESERVATION",
          mensaje: "La reserva no es válida.",
        };
      }

      if (cancelandoRef.current.has(reservaId)) {
        return {
          ok: false,
          codigo: "BUSY",
          mensaje: "La cancelación ya está siendo procesada.",
        };
      }

      const existe = reservas.some((reserva) => reserva.id === reservaId);

      if (!existe) {
        return {
          ok: false,
          codigo: "NOT_FOUND",
          mensaje: "No encontramos esa reserva.",
        };
      }

      cancelandoRef.current.add(reservaId);

      try {
        const listaActualizada = reservas.filter(
          (item) => item.id !== reservaId,
        );

        const success = await saveStoredReservas(listaActualizada);

        if (!success) {
          return {
            ok: false,
            codigo: "STORAGE_ERROR",
            mensaje: "No se pudo guardar la cancelación.",
          };
        }

        setReservas(listaActualizada);

        return {
          ok: true,
          codigo: "CANCELLED",
          mensaje: "Reserva cancelada correctamente.",
        };
      } finally {
        cancelandoRef.current.delete(reservaId);
      }
    },
    [reservas],
  );

  const value = useMemo(
    () => ({
      clases,
      reservas,
      loadingReservas,
      reservarClase,
      cancelarReserva,
    }),
    [clases, reservas, loadingReservas, reservarClase, cancelarReserva],
  );

  return (
    <ReserveContext.Provider value={value}>{children}</ReserveContext.Provider>
  );
};

export const useReservas = () => {
  const context = useContext(ReserveContext);

  if (!context) {
    throw new Error("useReservas debe usarse dentro de un ReserveProvider");
  }

  return context;
};
