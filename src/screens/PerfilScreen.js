import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

const PERFIL_KEY = '@perfil_usuario';

export default function PerfilScreen() {
    const insets = useSafeAreaInsets();
    const [cargando, setCargando] = useState(true);
    const [existePerfil, setExistePerfil] = useState(false);
    
    // Estados para el formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        cargarPerfil();
    }, []);

    // Lee AsyncStorage para ver si ya hay perfil guardado
    const cargarPerfil = async () => {
        try {
            const perfilGuardado = await AsyncStorage.getItem(PERFIL_KEY);
            if (perfilGuardado !== null) {
                const perfil = JSON.parse(perfilGuardado);
                setNombre(perfil.nombre || '');
                setApellido(perfil.apellido || '');
                setCorreo(perfil.correo || '');
                setTelefono(perfil.telefono || '');
                setExistePerfil(true);
            }
        } catch (error) {
            console.log('Error cargando perfil', error);
        } finally {
            setCargando(false);
        }
    };

    // Valida y guarda en AsyncStorage
    const guardarPerfil = async () => {
        if (!nombre || !apellido || !correo || !telefono) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        try {
            const nuevoPerfil = { nombre, apellido, correo, telefono };
            await AsyncStorage.setItem(PERFIL_KEY, JSON.stringify(nuevoPerfil));
            setExistePerfil(true);
            Alert.alert("Éxito", existePerfil ? "Datos actualizados correctamente." : "Perfil creado exitosamente.");
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la información.");
        }
    };

    if (cargando) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={colors.primario || '#2563EB'} />
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
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarPlaceholder}>
                        <Ionicons name="person" size={60} color="#9ca3af" />
                    </View>
                    <Text style={styles.tituloSecundario}>{existePerfil ? 'Tu Perfil' : 'Registro'}</Text>
                </View>
                
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={[styles.input, existePerfil && styles.inputDisabled]}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Juan"
                        editable={!existePerfil}
                    />

                    <Text style={styles.label}>Apellido</Text>
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
                            {existePerfil ? 'Actualizar Datos' : 'Registrarse'}
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
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e5e7eb',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    tituloSecundario: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.texto || '#111827',
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
    }
});
