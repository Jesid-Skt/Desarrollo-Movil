import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
    colors,
    spacing,
    radius,
} from '../theme';

import { formatearPrecio } from '../data/clases';

export default function ReservaCard({
    reserva,
    onCancelar,
}) {
    return (
        <View style={styles.card}>

            <View style={styles.iconoContainer}>
                <Ionicons
                    name="calendar-outline"
                    size={22}
                    color={colors.primario}
                />
            </View>

            <View style={styles.contenido}>

                <Text
                    style={styles.titulo}
                    numberOfLines={2}
                >
                    {reserva.titulo}
                </Text>

                <View style={styles.dato}>
                    <Ionicons
                        name="person-outline"
                        size={15}
                        color={colors.textoSuave}
                    />

                    <Text style={styles.textoDato}>
                        {reserva.profesor}
                    </Text>
                </View>

                <View style={styles.dato}>
                    <Ionicons
                        name="time-outline"
                        size={15}
                        color={colors.textoSuave}
                    />

                    <Text style={styles.textoDato}>
                        {reserva.horario}
                    </Text>
                </View>

                <View style={styles.dato}>
                    <Ionicons
                        name="location-outline"
                        size={15}
                        color={colors.textoSuave}
                    />

                    <Text style={styles.textoDato}>
                        {reserva.modalidad}
                    </Text>
                </View>

                <Text style={styles.precio}>
                    {formatearPrecio(reserva.precio)}
                </Text>

                <TouchableOpacity
                    style={styles.botonCancelar}
                    onPress={() => onCancelar(reserva)}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="close-circle-outline"
                        size={17}
                        color="#DC2626"
                    />

                    <Text style={styles.textoCancelar}>
                        Cancelar reserva
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.superficie,
        borderWidth: 1,
        borderColor: colors.borde,
        borderRadius: radius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
    },

    iconoContainer: {
        width: 42,
        height: 42,
        borderRadius: radius.sm,
        backgroundColor: colors.primarioSuave,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },

    contenido: {
        flex: 1,
    },

    titulo: {
        color: colors.texto,
        fontSize: 16,
        fontWeight: '800',
        marginBottom: spacing.sm,
    },

    dato: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },

    textoDato: {
        color: colors.textoSuave,
        fontSize: 13,
        marginLeft: 6,
    },

    precio: {
        color: colors.primario,
        fontSize: 14,
        fontWeight: '800',
        marginTop: 5,
        marginBottom: spacing.sm,
    },

    botonCancelar: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: radius.sm,
        backgroundColor: '#FEF2F2',
    },

    textoCancelar: {
        color: '#DC2626',
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 5,
    },
});