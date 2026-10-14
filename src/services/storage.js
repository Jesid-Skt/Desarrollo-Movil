import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

// --- SERVICIOS DE PERFIL ---
export const getStoredProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error al obtener el perfil desde AsyncStorage:', error);
    return null;
  }
};

export const saveStoredProfile = async (profileData) => {
  try {
    const jsonValue = JSON.stringify(profileData);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, jsonValue);
    return true;
  } catch (error) {
    console.error('Error al guardar el perfil en AsyncStorage:', error);
    return false;
  }
};

// --- SERVICIOS DE RESERVAS ---
export const getStoredReservas = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.RESERVAS);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error al obtener las reservas desde AsyncStorage:', error);
    return [];
  }
};

export const saveStoredReservas = async (reservas) => {
  try {
    const jsonValue = JSON.stringify(reservas);
    await AsyncStorage.setItem(STORAGE_KEYS.RESERVAS, jsonValue);
    return true;
  } catch (error) {
    console.error('Error al guardar las reservas en AsyncStorage:', error);
    return false;
  }
};