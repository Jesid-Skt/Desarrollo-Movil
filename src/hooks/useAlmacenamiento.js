import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAlmacenamiento(clave, valorInicial) {
    const [valor, setValor] = useState(valorInicial);
    const [activo, setActivo] = useState(false);

    useEffect(() => {
        let componenteActivo = true;

        const leer = async () => {
            setActivo(true);

            try {
                const guardado = await AsyncStorage.getItem(clave);

                if (guardado !== null && componenteActivo) {
                    setValor(JSON.parse(guardado));
                }
            } catch (error) {
                console.error('Error leyendo', clave, error);
            } finally {
                if (componenteActivo) {
                    setActivo(false);
                }
            }
        };

        leer();

        return () => {
            componenteActivo = false;
            setActivo(false);
        };
    }, [clave]);

    const actualizar = useCallback(async nuevoValor => {
        try {
            await AsyncStorage.setItem(clave, JSON.stringify(nuevoValor));
            setValor(nuevoValor);
        } catch (error) {
            console.error('Error guardando', clave, error);
        }
    }, [clave]);

    return { valor, actualizar, activo };
}