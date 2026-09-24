import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAlmacenamiento(clave, valorInicial) {
    const [valor, setValor] = useState(valorInicial);
    const [listo, setListo] = useState(false);

    useEffect(() => {
        let activo = true; // bandera para saber si estoy montando el componente

        const cargar = async () => {
            try {
                const guardando = await AsyncStorage.getItem(clave);
                if (activo && guardando !== null) {
                    setValor(JSON.parse(guardando));
                }
            } catch (error) {
                console.log('error leyendo', clave, error);
            } finally {
                if (activo) {
                    setListo(true);
                }
            }
        };

        cargar();

        return () => {
            activo = false;
        };
    }, [clave]);

    const actualizar = useCallback(async (nuevoValor) => {
        try {
            setValor(nuevoValor);
            await AsyncStorage.setItem(clave, JSON.stringify(nuevoValor));
        } catch (error) {
            console.log('error guardar', clave, error);
        }
    }, [clave]);

    return [valor, actualizar, listo];
}