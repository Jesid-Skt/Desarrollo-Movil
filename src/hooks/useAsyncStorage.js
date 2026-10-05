import { useCallback, useEffect, useState } from 'react';
import { getData, saveData } from '../services/storage';

export default function useAsyncStorage(key, initialValue) {
    const [value, setValue] = useState(initialValue);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                const stored = await getData(key);

                if (mounted && stored !== null) {
                    setValue(stored);
                }
            } catch (error) {
                console.error('Error cargando el valor:', error);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            mounted = false;
        };
    }, [key]);

    const updateValue = useCallback(async newValue => {
        setValue(newValue);
        await saveData(key, newValue);
    }, [key]);

    return [value, updateValue, loading];
}