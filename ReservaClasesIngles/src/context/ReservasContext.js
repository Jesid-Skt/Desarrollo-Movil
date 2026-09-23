import React, { createContext, useCallback, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAlmacenamiento from '../hooks/useAlmacenamiento';

const CLAVE_RESERVAS = '@reservas_mj20';

export const ReservasContext = createContext();

export function ReservasProvider({ children }) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    //Crear la funcion cargar

    useEffect(() => {
        const cargar = async () => {
            try {
                const guardando = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if (guardando !== null) {
                    setReservas(JSON.parse(guardando));
                }
            } catch (error) {
                console.log('Ocurrió un error al cargar la información', error)
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, [])
    // Guardar cada vez que cambie el arreglo
    useEffect(() => {
        if (cargando) return;
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error) =>
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

}; // esta llave es la que cierra la funcion de provider