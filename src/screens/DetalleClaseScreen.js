import React from 'react';

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { CLASES } from '../data/clases';
import {
    colors,
    spacing,
    radius,
} from '../theme';

import ReservaClase from '../components/ReservaClase';
import EtiquetaNivel from '../components/EtiquetaNivel';
import useResponsive from '../hooks/useResponsive';

export default function DetalleClaseScreen({
    route,
    navigation,
}) {
    const { claseId } = route.params;

    const clase = CLASES.find(
        item => item.id === claseId
    );

    const {
        isTablet,
        horizontalPadding,
        maxContentWidth,
    } = useResponsive();

    if (!clase) {
        return (
            <View style={styles.error}>
                <Text style={styles.errorTexto}>
                    No encontramos esta clase.
                </Text>
            </View>
        );
    }

    const confirmarReserva = reserva => {
        Alert.alert(
            'Reserva realizada 🎉',
            `Clase: ${reserva.titulo}\n` +
            `Profesor: ${reserva.profesor}\n` +
            `Horario: ${reserva.horario}\n\n` +
            `Tu reserva fue creada correctamente.`,
            [
                {
                    text: 'Ver clases',
                    onPress: () => navigation.goBack(),
                },
            ]
        );
    };

    return (
        <ScrollView
            style={styles.pantalla}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[
                    styles.contenedor,
                    {
                        paddingHorizontal: horizontalPadding,
                        maxWidth: maxContentWidth,
                    },
                    isTablet && styles.contenedorTablet,
                ]}
            >
                <Image
                    source={{ uri: clase.imagen }}
                    style={[
                        styles.imagen,
                        isTablet && styles.imagenTablet,
                    ]}
                />

                <View style={styles.contenido}>
                    <View style={styles.filaSuperior}>
                        <EtiquetaNivel nivel={clase.nivel} />

                        <View style={styles.modalidad}>
                            <Ionicons
                                name={
                                    clase.modalidad === 'Virtual'
                                        ? 'videocam-outline'
                                        : 'location-outline'
                                }
                                size={16}
                                color={colors.primario}
                            />

                            <Text style={styles.modalidadTexto}>
                                {clase.modalidad}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.titulo}>
                        {clase.titulo}
                    </Text>

                    <View style={styles.profesor}>
                        <Image
                            source={{
                                uri: clase.profesor.foto,
                            }}
                            style={styles.fotoProfesor}
                        />

                        <View>
                            <Text style={styles.profesorNombre}>
                                {clase.profesor.nombre}
                            </Text>

                            <Text style={styles.profesorPais}>
                                Profesor · {clase.profesor.pais}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.seccionTitulo}>
                        Sobre esta clase
                    </Text>

                    <Text style={styles.descripcion}>
                        {clase.descripcion}
                    </Text>

                    <View style={styles.estadisticas}>
                        <View style={styles.estadistica}>
                            <Ionicons
                                name="star"
                                size={18}
                                color={colors.acento}
                            />

                            <Text style={styles.estadisticaValor}>
                                {clase.rating}
                            </Text>

                            <Text style={styles.estadisticaTexto}>
                                Rating
                            </Text>
                        </View>

                        <View style={styles.estadistica}>
                            <Ionicons
                                name="time-outline"
                                size={18}
                                color={colors.primario}
                            />

                            <Text style={styles.estadisticaValor}>
                                {clase.duracion}
                            </Text>

                            <Text style={styles.estadisticaTexto}>
                                Minutos
                            </Text>
                        </View>

                        <View style={styles.estadistica}>
                            <Ionicons
                                name="people-outline"
                                size={18}
                                color={colors.primario}
                            />

                            <Text style={styles.estadisticaValor}>
                                {clase.cupos}
                            </Text>

                            <Text style={styles.estadisticaTexto}>
                                Cupos
                            </Text>
                        </View>
                    </View>

                    <ReservaClase
                        clase={clase}
                        onConfirmar={confirmarReserva}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: colors.fondo,
    },

    contenedor: {
        width: '100%',
        alignSelf: 'center',
        paddingBottom: 40,
    },

    contenedorTablet: {
        paddingTop: spacing.lg,
    },

    imagen: {
        width: '100%',
        height: 240,
        borderRadius: radius.lg,
        marginTop: spacing.lg,
    },

    imagenTablet: {
        height: 360,
    },

    contenido: {
        paddingTop: spacing.lg,
    },

    filaSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    modalidad: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    modalidadTexto: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.primario,
    },

    titulo: {
        color: colors.texto,
        fontSize: 28,
        fontWeight: '800',
        marginTop: spacing.md,
    },

    profesor: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.lg,
    },

    fotoProfesor: {
        width: 46,
        height: 46,
        borderRadius: radius.full,
        marginRight: spacing.md,
    },

    profesorNombre: {
        fontSize: 15,
        fontWeight: '800',
        color: colors.texto,
    },

    profesorPais: {
        marginTop: 3,
        fontSize: 12,
        color: colors.textoSuave,
    },

    seccionTitulo: {
        marginTop: spacing.xl,
        marginBottom: spacing.sm,
        fontSize: 18,
        fontWeight: '800',
        color: colors.texto,
    },

    descripcion: {
        fontSize: 14,
        lineHeight: 22,
        color: colors.textoSuave,
    },

    estadisticas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.xl,
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.borde,
        padding: spacing.md,
    },

    estadistica: {
        flex: 1,
        alignItems: 'center',
    },

    estadisticaValor: {
        fontSize: 15,
        fontWeight: '800',
        color: colors.texto,
        marginTop: 4,
    },

    estadisticaTexto: {
        fontSize: 11,
        color: colors.textoSuave,
        marginTop: 2,
    },

    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.fondo,
    },

    errorTexto: {
        color: colors.textoSuave,
    },
});