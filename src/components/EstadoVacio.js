import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

export default function EstadoVacio({ icono = 'calendar-outline', titulo, mensaje, OnAction }) {
    return (
        <View style={style.contenedor}>
            <View style={style.circulo}>
                <Ionicons name={icono} size={34} color={colors.primario} />
            </View>
            <Text style={style.titulo}>{titulo}</Text>
            <Text style={style.mensaje}>{mensaje}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    contenedor: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xl,
        gap: spacing.sm,
    },
    circulo: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.superficie,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xs,
    },
    titulo: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.texto,
    },
    mensaje: {
        fontSize: 14,
        color: colors.textoSuave,
        textAlign: 'center',
    },
});