import React, { createContext, useCallback, useEffect, useState, useMemo } from 'react';
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
        const nueva = {
            id: clase.id + '_' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        }

        let resultados = { ok: true };
        setReservas((prev) => {
            if (prev.some((r) => r.id === nueva.id)) {
                resultados = { ok: false }
                return prev;
            }
            return [nueva, ...prev]
        })
    }, []);

    return (
        <ReservasContext.Provider value={{ reservas, setReservas, cargando, agregarReserva }}>
            {children}
        </ReservasContext.Provider>
    );
} // esta llave es la que cierra la funcion de provider