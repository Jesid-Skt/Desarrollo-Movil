import React, { createContext, useContext, useState } from 'react';
import { CLASES } from '../data/clases';

const ReservaContext = createContext(null);

export function ReservaProvider({ children }) {
    const [clases, setClases] = useState(CLASES);
    const [reservas, setReservas] = useState([]);

    const reservarClase = (claseId, horario) => {
        const clase = clases.find(item => item.id === claseId);

        if (!clase) {
            return {
                ok: false,
                mensaje: 'La clase no existe.',
            };
        }

        if (clase.cupos <= 0) {
            return {
                ok: false,
                mensaje: 'No quedan cupos disponibles para esta clase.',
            };
        }

        const yaReservada = reservas.some(
            reserva =>
                reserva.claseId === claseId &&
                reserva.horario === horario
        );

        if (yaReservada) {
            return {
                ok: false,
                mensaje: 'Ya tienes reservada esta clase en ese horario.',
            };
        }

        const nuevaReserva = {
            id: `${claseId}-${Date.now()}`,
            claseId,
            horario,
            titulo: clase.titulo,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            modalidad: clase.modalidad,
        };

        setClases(prev =>
            prev.map(item =>
                item.id === claseId
                    ? {
                          ...item,
                          cupos: item.cupos - 1,
                      }
                    : item
            )
        );

        setReservas(prev => [...prev, nuevaReserva]);

        return {
            ok: true,
            reserva: nuevaReserva,
        };
    };

    const cancelarReserva = reservaId => {
        const reserva = reservas.find(
            item => item.id === reservaId
        );

        if (!reserva) {
            return {
                ok: false,
                mensaje: 'No se encontró la reserva.',
            };
        }

        setReservas(prev =>
            prev.filter(item => item.id !== reservaId)
        );

        setClases(prev =>
            prev.map(item =>
                item.id === reserva.claseId
                    ? {
                          ...item,
                          cupos: item.cupos + 1,
                      }
                    : item
            )
        );

        return {
            ok: true,
        };
    };

    return (
        <ReservaContext.Provider
            value={{
                clases,
                reservas,
                reservarClase,
                cancelarReserva,
            }}
        >
            {children}
        </ReservaContext.Provider>
    );
}

export function useReservas() {
    const context = useContext(ReservaContext);

    if (!context) {
        throw new Error(
            'useReservas debe utilizarse dentro de ReservaProvider'
        );
    }

    return context;
}