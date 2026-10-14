import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { colors } from '../theme';

export default function PerfilScreen() {
  const { profile, hasProfile, loading, saveProfile } = useProfile();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    if (profile) {
      setNombre(profile.nombre || '');
      setApellido(profile.apellido || '');
      setCorreo(profile.correo || '');
      setTelefono(profile.telefono || '');
      setFoto(profile.foto || '');
    }
  }, [profile]);

  // Función para cambiar/seleccionar foto desde la interfaz del encabezado
  const handleSeleccionarFoto = () => {
    Alert.prompt(
      'Foto de Perfil',
      'Ingresa la URL de la nueva foto de perfil:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Guardar',
          onPress: (url) => {
            if (url && url.trim()) {
              setFoto(url.trim());
            }
          },
        },
      ],
      'plain-text',
      foto
    );
  };

  const handleGuardar = async () => {
    if (!hasProfile) {
      if (!nombre.trim() || !apellido.trim() || !correo.trim() || !telefono.trim()) {
        Alert.alert('Campos requeridos', 'Por favor completa todos los datos para crear tu perfil.');
        return;
      }
    } else {
      if (!correo.trim() || !telefono.trim()) {
        Alert.alert('Campos requeridos', 'El correo y el teléfono no pueden estar vacíos.');
        return;
      }
    }

    const datosPerfil = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      foto: foto.trim(),
    };

    const resultado = await saveProfile(datosPerfil);

    if (resultado.ok) {
      Alert.alert(
        'Éxito',
        hasProfile ? 'Información actualizada correctamente.' : 'Perfil creado con éxito.'
      );
    } else {
      Alert.alert('Error', resultado.mensaje);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primario || '#2563EB'} />
        <Text style={styles.loadingText}>Cargando información del perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Encabezado con Foto de Perfil Táctil (Presionable para Cambiar) */}
      <View style={styles.avatarSection}>
        <TouchableOpacity
          onPress={handleSeleccionarFoto}
          activeOpacity={0.8}
          style={styles.avatarContainer}
        >
          {foto ? (
            <Image source={{ uri: foto }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          )}
          <View style={styles.editBadgeIcon}>
            <Text style={styles.editBadgeIconText}>📷</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSeleccionarFoto} style={styles.changePhotoButton}>
          <Text style={styles.changePhotoButtonText}>✏️ Cambiar foto de perfil</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {hasProfile ? `${nombre} ${apellido}` : 'Registro de Perfil'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {hasProfile
            ? 'Puedes modificar tu correo, teléfono y foto de perfil'
            : 'Ingresa tus datos para habilitar el agendamiento de clases'}
        </Text>
      </View>

      {/* Formulario de Perfil */}
      <View style={styles.formCard}>
        {/* Nombre */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Nombre</Text>
            {hasProfile && <Text style={styles.lockBadge}>🔒 No editable</Text>}
          </View>
          <TextInput
            style={[styles.input, hasProfile && styles.inputDisabled]}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej. Juan"
            editable={!hasProfile}
          />
        </View>

        {/* Apellido */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Apellido</Text>
            {hasProfile && <Text style={styles.lockBadge}>🔒 No editable</Text>}
          </View>
          <TextInput
            style={[styles.input, hasProfile && styles.inputDisabled]}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Ej. Pérez"
            editable={!hasProfile}
          />
        </View>

        {/* Correo */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Correo Electrónico</Text>
            {hasProfile && <Text style={styles.editBadge}>✏️ Editable</Text>}
          </View>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            placeholder="ejemplo@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Teléfono */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Teléfono</Text>
            {hasProfile && <Text style={styles.editBadge}>✏️ Editable</Text>}
          </View>
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Ej. 3001234567"
            keyboardType="phone-pad"
          />
        </View>

        {/* Botón de Acción */}
        <TouchableOpacity style={styles.submitButton} onPress={handleGuardar} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>
            {hasProfile ? 'Guardar Cambios' : 'Registrarse y Crear Perfil'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo || '#F9FAFB',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fondo || '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 14,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editBadgeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primario || '#2563EB',
    borderRadius: 12,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editBadgeIconText: {
    fontSize: 12,
  },
  changePhotoButton: {
    marginBottom: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  changePhotoButtonText: {
    fontSize: 13,
    color: colors.primario || '#2563EB',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.texto || '#111827',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: colors.superficie || '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border || colors.borde || '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.texto || '#374151',
  },
  lockBadge: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  editBadge: {
    fontSize: 11,
    color: colors.primario || '#2563EB',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border || colors.borde || '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.texto || '#111827',
    backgroundColor: '#FFFFFF',
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
    color: '#6B7280',
  },
  submitButton: {
    backgroundColor: colors.primario || '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});