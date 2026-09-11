import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
    colors,
    spacing,
    radius,
} from '../theme';

import { formatearPrecio } from '../data/clases';
import useResponsive from '../hooks/useResponsive';

export default function ReservaClase({
    clase,
    onConfirmar,
}) {
    const [horarioSeleccionado, setHorarioSeleccionado] =
        useState(null);

    const { isTablet } = useResponsive();

    const reservarClase = () => {
        if (!horarioSeleccionado) {
            Alert.alert(
                'Selecciona un horario',
                'Debes elegir el horario de tu clase antes de continuar.'
            );

            return;
        }

        const reserva = {
            claseId: clase.id,
            titulo: clase.titulo,
            profesor: clase.profesor.nombre,
            horario: horarioSeleccionado,
            precio: clase.precio,
            modalidad: clase.modalidad,
        };

        if (onConfirmar) {
            onConfirmar(reserva);
            return;
        }

        Alert.alert(
            'Reserva confirmada 🎉',
            `Has reservado "${clase.titulo}" para ${horarioSeleccionado}.`
        );
    };

    return (
        <View
            style={[
                styles.contenedor,
                isTablet && styles.contenedorTablet,
            ]}
        >
            <View style={styles.encabezado}>
                <View style={styles.icono}>
                    <Ionicons
                        name="calendar-outline"
                        size={22}
                        color={colors.primario}
                    />
                </View>

                <View style={styles.encabezadoTexto}>
                    <Text style={styles.titulo}>
                        Reserva tu clase
                    </Text>

                    <Text style={styles.subtitulo}>
                        Selecciona el horario que más te convenga.
                    </Text>
                </View>
            </View>

            <Text style={styles.etiqueta}>
                Horarios disponibles
            </Text>

            <View style={styles.horarios}>
                {clase.horarios.map(horario => {
                    const seleccionado =
                        horarioSeleccionado === horario;

                    return (
                        <Pressable
                            key={horario}
                            onPress={() =>
                                setHorarioSeleccionado(horario)
                            }
                            style={[
                                styles.horario,
                                seleccionado &&
                                    styles.horarioSeleccionado,
                            ]}
                        >
                            <Ionicons
                                name={
                                    seleccionado
                                        ? 'checkmark-circle'
                                        : 'time-outline'
                                }
                                size={18}
                                color={
                                    seleccionado
                                        ? colors.superficie
                                        : colors.primario
                                }
                            />

                            <Text
                                style={[
                                    styles.horarioTexto,
                                    seleccionado &&
                                        styles.horarioTextoSeleccionado,
                                ]}
                            >
                                {horario}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <View style={styles.resumen}>
                <View style={styles.resumenFila}>
                    <Text style={styles.resumenEtiqueta}>
                        Duración
                    </Text>

                    <Text style={styles.resumenValor}>
                        {clase.duracion} minutos
                    </Text>
                </View>

                <View style={styles.resumenFila}>
                    <Text style={styles.resumenEtiqueta}>
                        Modalidad
                    </Text>

                    <Text style={styles.resumenValor}>
                        {clase.modalidad}
                    </Text>
                </View>

                <View style={styles.resumenFila}>
                    <Text style={styles.resumenEtiqueta}>
                        Cupos disponibles
                    </Text>

                    <Text style={styles.resumenValor}>
                        {clase.cupos}
                    </Text>
                </View>

                <View style={styles.divisor} />

                <View style={styles.resumenFila}>
                    <Text style={styles.totalTexto}>
                        Total
                    </Text>

                    <Text style={styles.totalPrecio}>
                        {formatearPrecio(clase.precio)}
                    </Text>
                </View>
            </View>

            <Pressable
                onPress={reservarClase}
                style={({ pressed }) => [
                    styles.boton,
                    pressed && styles.botonPresionado,
                ]}
            >
                <Text style={styles.botonTexto}>
                    Realizar reserva
                </Text>

                <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={colors.superficie}
                />
            </Pressable>

            <Text style={styles.nota}>
                Podrás revisar los detalles de tu reserva antes de realizar cualquier pago.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.borde,
        padding: spacing.lg,
        marginTop: spacing.xl,
    },

    contenedorTablet: {
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
    },

    encabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },

    icono: {
        width: 46,
        height: 46,
        borderRadius: radius.md,
        backgroundColor: colors.primarioSuave,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },

    encabezadoTexto: {
        flex: 1,
    },

    titulo: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.texto,
    },

    subtitulo: {
        marginTop: 3,
        fontSize: 13,
        color: colors.textoSuave,
        lineHeight: 19,
    },

    etiqueta: {
        fontSize: 14,
        fontWeight: '800',
        color: colors.texto,
        marginBottom: spacing.md,
    },

    horarios: {
        gap: spacing.sm,
    },

    horario: {
        minHeight: 52,
        borderWidth: 1,
        borderColor: colors.borde,
        borderRadius: radius.sm,
        paddingHorizontal: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },

    horarioSeleccionado: {
        backgroundColor: colors.primario,
        borderColor: colors.primario,
    },

    horarioTexto: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.texto,
    },

    horarioTextoSeleccionado: {
        color: colors.superficie,
    },

    resumen: {
        marginTop: spacing.xl,
        backgroundColor: colors.fondo,
        borderRadius: radius.md,
        padding: spacing.md,
    },

    resumenFila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },

    resumenEtiqueta: {
        fontSize: 13,
        color: colors.textoSuave,
    },

    resumenValor: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.texto,
    },

    divisor: {
        height: 1,
        backgroundColor: colors.borde,
        marginVertical: spacing.sm,
    },

    totalTexto: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.texto,
    },

    totalPrecio: {
        fontSize: 17,
        fontWeight: '800',
        color: colors.primario,
    },

    boton: {
        height: 56,
        backgroundColor: colors.primario,
        borderRadius: radius.md,
        marginTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },

    botonPresionado: {
        opacity: 0.85,
    },

    botonTexto: {
        color: colors.superficie,
        fontSize: 15,
        fontWeight: '800',
    },

    nota: {
        textAlign: 'center',
        fontSize: 11,
        color: colors.textoSuave,
        lineHeight: 16,
        marginTop: spacing.md,
    },
});