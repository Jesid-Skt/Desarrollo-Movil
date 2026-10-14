import React, { createContext, useState, useEffect, useContext } from 'react';
import { getStoredProfile, saveStoredProfile } from '../services/storage';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      const data = await getStoredProfile();
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    };
    loadProfileData();
  }, []);

  const saveProfile = async (newProfileData) => {
    let updatedProfile;

    if (profile) {
      // SI YA EXISTE UN PERFIL: Mantiene Nombre, Apellido y Foto inmutables. Solo modifica Correo y Teléfono
      updatedProfile = {
        ...profile,
        correo: newProfileData.correo,
        telefono: newProfileData.telefono,
      };
    } else {
      // SI ES LA PRIMERA VEZ: Crea el perfil con todos los campos
      updatedProfile = {
        nombre: newProfileData.nombre,
        apellido: newProfileData.apellido,
        correo: newProfileData.correo,
        telefono: newProfileData.telefono,
        foto: newProfileData.foto || null,
      };
    }

    const success = await saveStoredProfile(updatedProfile);
    if (success) {
      setProfile(updatedProfile);
      return { ok: true };
    }
    return { ok: false, mensaje: 'No se pudo guardar la información en el dispositivo.' };
  };

  const hasProfile = Boolean(profile);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        hasProfile,
        loading,
        saveProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile debe ser usado dentro de un ProfileProvider');
  }
  return context;
};