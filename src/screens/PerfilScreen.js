import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getData, saveData } from '../services/storage';
import { colors, spacing } from '../theme';

const PERFIL_KEY = '@perfil_usuario';

// Validaciones de formato
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validarCorreo = (email) => regexCorreo.test(email.trim());

const validarTelefono = (tel) => {
    const digitos = tel.replace(/\D/g, '');
    return digitos.length >= 7 && digitos.length <= 15;
};

export default function PerfilScreen() {
    const insets = useSafeAreaInsets();
    const [cargando, setCargando] = useState(true);
    const [existePerfil, setExistePerfil] = useState(false);
    const [errorCarga, setErrorCarga] = useState(false);

    // Estados para el formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] = useState('');

    useEffect(() => {
        cargarPerfil();
    }, []);

    // 1. Valida si cuenta con perfil creado y carga los datos desde storage
    const cargarPerfil = async () => {
        setCargando(true);
        setErrorCarga(false);
        try {
            const perfil = await getData(PERFIL_KEY);
            if (perfil !== null) {
                setNombre(perfil.nombre || '');
                setApellido(perfil.apellido || '');
                setCorreo(perfil.correo || '');
                setTelefono(perfil.telefono || '');
                setFoto(perfil.foto || '');
                setExistePerfil(true);
            } else {
                setExistePerfil(false);
            }
        } catch (error) {
            console.log('Error cargando perfil', error);
            setErrorCarga(true); // Evita asumir que no hay perfil ante un fallo de disco
        } finally {
            setCargando(false);
        }
    };

    // 2. Valida y guarda en almacenamiento (Flujo de Registro / Actualización)
    const guardarPerfil = async () => {
        const correoLimpio = correo.trim();
        const telefonoLimpio = telefono.trim();

        // Validación de formato: correo
        if (!correoLimpio) {
            Alert.alert("Campo requerido", "El correo electrónico es obligatorio.");
            return;
        }
        if (!validarCorreo(correoLimpio)) {
            Alert.alert("Formato inválido", "Por favor ingresa un correo electrónico válido (ejemplo: usuario@correo.com).");
            return;
        }

        // Validación de formato: teléfono
        if (!telefonoLimpio) {
            Alert.alert("Campo requerido", "El número de teléfono es obligatorio.");
            return;
        }
        if (!validarTelefono(telefonoLimpio)) {
            Alert.alert("Formato inválido", "El teléfono debe contener entre 7 y 15 dígitos.");
            return;
        }

        // Volver a leer el perfil en almacenamiento para evitar inconsistencias de estado
        let perfilEnDisco = null;
        try {
            perfilEnDisco = await getData(PERFIL_KEY);
        } catch (error) {
            Alert.alert("Error de almacenamiento", "No se pudo comprobar el perfil en almacenamiento. Inténtalo nuevamente.");
            return;
        }

        const tienePerfilGuardado = perfilEnDisco !== null;

        if (!tienePerfilGuardado) {
            // Flujo de Registro: solicita obligatoriamente Nombre, Apellido y Foto
            const nombreLimpio = nombre.trim();
            const apellidoLimpio = apellido.trim();
            const fotoLimpia = foto.trim();

            if (!nombreLimpio || !apellidoLimpio || !fotoLimpia) {
                Alert.alert("Campos obligatorios", "Por favor completa Nombre, Apellido y Foto para registrarte.");
                return;
            }

            try {
                const nuevoPerfil = {
                    nombre: nombreLimpio,
                    apellido: apellidoLimpio,
                    correo: correoLimpio,
                    telefono: telefonoLimpio,
                    foto: fotoLimpia,
                };
                await saveData(PERFIL_KEY, nuevoPerfil);
                setExistePerfil(true);
                Alert.alert("Éxito", "Perfil registrado exitosamente.");
            } catch (error) {
                Alert.alert("Error", "No se pudo guardar la información.");
            }
        } else {
            // Flujo de Actualización: mantiene nombre, apellido y foto; actualiza correo y teléfono
            try {
                const perfilActualizado = {
                    ...perfilEnDisco,
                    correo: correoLimpio,
                    telefono: telefonoLimpio,
                };
                await saveData(PERFIL_KEY, perfilActualizado);
                // Sincronizar datos en el estado local
                setNombre(perfilEnDisco.nombre || nombre);
                setApellido(perfilEnDisco.apellido || apellido);
                setFoto(perfilEnDisco.foto || foto);
                setExistePerfil(true);
                Alert.alert("Éxito", "Tus datos (correo y teléfono) se han actualizado correctamente.");
            } catch (error) {
                Alert.alert("Error", "No se pudo actualizar la información.");
            }
        }
    };

    if (cargando) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={colors.primario || '#2563EB'} />
            </View>
        );
    }

    if (errorCarga) {
        return (
            <View style={[styles.container, styles.centerContainer, { paddingTop: insets.top, paddingHorizontal: spacing.lg }]}>
                <Ionicons name="alert-circle-outline" size={60} color="#ef4444" />
                <Text style={styles.tituloError}>Error de almacenamiento</Text>
                <Text style={styles.mensajeError}>
                    Ocurrió un problema al leer tu perfil en el dispositivo. No se puede proceder hasta verificar el almacenamiento.
                </Text>
                <TouchableOpacity style={styles.botonReintentar} onPress={cargarPerfil}>
                    <Ionicons name="refresh-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
                    <Text style={styles.textoBoton}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
            <ScrollView
                style={{ flex: 1, width: '100%' }}
                contentContainerStyle={{ flexGrow: 1, width: '100%' }}
                showsVerticalScrollIndicator={false}
            >
                {/* Cabecera con Avatar */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarWrapper}>
                        {foto ? (
                            <Image source={{ uri: foto }} style={styles.avatarImage} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Ionicons name="person" size={54} color="#9ca3af" />
                            </View>
                        )}
                    </View>
                    <Text style={styles.tituloSecundario}>
                        {existePerfil ? 'Tu Perfil' : 'Registro de Perfil'}
                    </Text>
                    <Text style={styles.subtituloSecundario}>
                        {existePerfil
                            ? 'Solo correo y teléfono son editables'
                            : 'Completa todos los campos para registrarte'}
                    </Text>
                </View>

                {/* Formulario */}
                <View style={styles.formContainer}>
                    {/* Campo Foto (solo en registro) */}
                    {!existePerfil && (
                        <>
                            <Text style={styles.label}>Foto de Perfil (URL)</Text>
                            <TextInput
                                style={styles.input}
                                value={foto}
                                onChangeText={setFoto}
                                placeholder="https://ejemplo.com/mifoto.jpg"
                                autoCapitalize="none"
                            />
                        </>
                    )}

                    {/* Nombre (bloqueado si existe perfil) */}
                    <Text style={styles.label}>
                        Nombre {existePerfil && <Text style={styles.tagBloqueado}>(No editable)</Text>}
                    </Text>
                    <TextInput
                        style={[styles.input, existePerfil && styles.inputDisabled]}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Juan"
                        editable={!existePerfil}
                    />

                    {/* Apellido (bloqueado si existe perfil) */}
                    <Text style={styles.label}>
                        Apellido {existePerfil && <Text style={styles.tagBloqueado}>(No editable)</Text>}
                    </Text>
                    <TextInput
                        style={[styles.input, existePerfil && styles.inputDisabled]}
                        value={apellido}
                        onChangeText={setApellido}
                        placeholder="Ej. Pérez"
                        editable={!existePerfil}
                    />

                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput
                        style={styles.input}
                        value={correo}
                        onChangeText={setCorreo}
                        placeholder="ejemplo@correo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput
                        style={styles.input}
                        value={telefono}
                        onChangeText={setTelefono}
                        placeholder="Ej. 1234567890"
                        keyboardType="phone-pad"
                    />

                    <TouchableOpacity style={styles.boton} onPress={guardarPerfil}>
                        <Text style={styles.textoBoton}>
                            {existePerfil ? 'Actualizar Datos' : 'Guardar Perfil'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.fondo || '#f3f4f6',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.primario || '#2563EB',
        marginBottom: spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5e7eb',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tituloSecundario: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.texto || '#111827',
    },
    subtituloSecundario: {
        fontSize: 13,
        color: colors.textoSuave || '#6b7280',
        marginTop: 4,
    },
    tagBloqueado: {
        fontSize: 12,
        color: '#9ca3af',
        fontWeight: 'normal',
    },
    formContainer: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
    },
    label: {
        fontSize: 16,
        color: colors.textoSuave || '#374151',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: colors.superficie || '#ffffff',
        borderWidth: 1,
        borderColor: colors.borde || '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        marginBottom: spacing.md,
        fontSize: 16,
        color: colors.texto || '#111827',
    },
    inputDisabled: {
        backgroundColor: '#e5e7eb',
        color: '#6b7280',
    },
    boton: {
        backgroundColor: colors.primario || '#2563EB',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: spacing.md,
        marginBottom: 40,
    },
    textoBoton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tituloError: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.texto || '#111827',
        marginTop: spacing.md,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    mensajeError: {
        fontSize: 14,
        color: colors.textoSuave || '#6b7280',
        textAlign: 'center',
        marginBottom: spacing.lg,
        lineHeight: 20,
        maxWidth: 300,
    },
    botonReintentar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primario || '#2563EB',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
});
