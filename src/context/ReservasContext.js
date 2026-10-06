import React, { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAlmacenamiento from '../hooks/useAlmacenamiento';

const CLAVE = '@reservas_ingles';

export const ReservasContext = createContext(null);

export function ReservasProvider({ children }) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);


    // Cargar las reservas que tengo guardadas
    useEffect(() => {
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE);
                if (guardado !== null) {
                    setReservas(JSON.parse(guardado));
                }
            } catch (error) {
                console.log('error leyendo las reservas', error);
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []);

    // Guardar cada vez que cambie el arreglo
    useEffect(() => {
        if (cargando) return;
        AsyncStorage.setItem(CLAVE, JSON.stringify(reservas)).catch((error) =>
            console.log('Error guardando reservas', error)
        );
    }, [reservas, cargando]);

    const agregarReserva = useCallback((clase, horario) => {
        const nuevaId = clase.id + '_' + horario;

        // Validar si ya tiene esa misma clase en ese horario
        if (reservas.some((r) => r.id === nuevaId)) {
            return { ok: false, mensaje: 'Ya tienes reservada esta clase en este horario.' };
        }
        // Validar cruce de horarios (cualquier clase en el mismo horario)
        if (reservas.some((r) => r.horario === horario)) {
            return { ok: false, mensaje: 'Ya tienes otra reserva en este horario.' };
        }

        const nueva = {
            id: nuevaId,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        };

        setReservas((prev) => [nueva, ...prev]);
        return { ok: true, mensaje: 'Reserva realizada con éxito.' };
    }, [reservas]);

    const cancelarReserva = useCallback((id) => {
        setReservas((prev) => prev.filter(r => r.id !== id));
    }, []);

    return (
        <ReservasContext.Provider value={{ reservas, setReservas, cargando, agregarReserva, cancelarReserva }}>
            {children}
        </ReservasContext.Provider>
    );
} // esta llave es la que cierra la funcion de provider