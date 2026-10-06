import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StartScreen from './StartScreen';
import ReservasScreen from './ReservasScreen';
import PerfilScreen from './PerfilScreen';
import { colors } from '../theme';

export default function MainScreen({ navigation }) {
    // Estado para controlar qué pestaña está activa
    const [pestanaActiva, setPestanaActiva] = useState('Inicio');

    // Función para renderizar el contenido dependiendo de la pestaña
    const renderContenido = () => {
        if (pestanaActiva === 'Inicio') {
            // Pasamos navigation para que los clics en tarjetas sigan yendo al detalle
            return <StartScreen navigation={navigation} />;
        }
        if (pestanaActiva === 'Reservas') {
            return <ReservasScreen />;
        }
        if (pestanaActiva === 'Perfil') {
            return <PerfilScreen />;
        }
    };

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenido}>
                {renderContenido()}
            </View>
            
            <View style={styles.barraInferior}>
                <TouchableOpacity 
                    style={styles.botonPestana} 
                    onPress={() => setPestanaActiva('Inicio')}
                >
                    <Ionicons 
                        name={pestanaActiva === 'Inicio' ? 'home' : 'home-outline'} 
                        size={24} 
                        color={pestanaActiva === 'Inicio' ? (colors.primario || '#2563EB') : 'gray'} 
                    />
                    <Text style={[styles.textoPestana, pestanaActiva === 'Inicio' && styles.textoActivo]}>
                        Inicio
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.botonPestana} 
                    onPress={() => setPestanaActiva('Reservas')}
                >
                    <Ionicons 
                        name={pestanaActiva === 'Reservas' ? 'calendar' : 'calendar-outline'} 
                        size={24} 
                        color={pestanaActiva === 'Reservas' ? (colors.primario || '#2563EB') : 'gray'} 
                    />
                    <Text style={[styles.textoPestana, pestanaActiva === 'Reservas' && styles.textoActivo]}>
                        Reservas
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.botonPestana} 
                    onPress={() => setPestanaActiva('Perfil')}
                >
                    <Ionicons 
                        name={pestanaActiva === 'Perfil' ? 'person' : 'person-outline'} 
                        size={24} 
                        color={pestanaActiva === 'Perfil' ? (colors.primario || '#2563EB') : 'gray'} 
                    />
                    <Text style={[styles.textoPestana, pestanaActiva === 'Perfil' && styles.textoActivo]}>
                        Perfil
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: colors.fondo || '#ffffff',
    },
    contenido: {
        flex: 1,
    },
    barraInferior: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: colors.superficie || '#ffffff',
        borderTopWidth: 1,
        borderTopColor: colors.borde || '#E5E7EB',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 5,
    },
    botonPestana: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textoPestana: {
        fontSize: 12,
        color: 'gray',
        marginTop: 2,
    },
    textoActivo: {
        color: colors.primario || '#2563EB',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
