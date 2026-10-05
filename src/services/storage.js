import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error al guardar la informacion:', error);
        throw error;
    }
};

export const getData = async key => {
    try {
        const json = await AsyncStorage.getItem(key);
        return json !== null ? JSON.parse(json) : null;
    } catch (error) {
        console.error('Error al leer la informacion:', error);
        throw error;
    }
};

export const removeData = async key => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error al eliminar la informacion:', error);
        throw error;
    }
};

export const clearData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error al limpiar la informacion:', error);
        throw error;
    }
};