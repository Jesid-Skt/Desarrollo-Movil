import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
    colors,
    spacing,
    radius,
} from '../theme';

import { formatearPrecio } from '../data/clases';

export default function Card({ clase, onPress }) {
    const sinCupos = clase.cupos <= 0;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Image
                source={{ uri: clase.imagen }}
                style={styles.imagen}
            />

            <View style={styles.contenido}>

                <View style={styles.filaSuperior}>
                    <View style={styles.nivel}>
                        <Text style={styles.nivelTexto}>
                            {clase.nivel}
                        </Text>
                    </View>

                    <View style={styles.rating}>
                        <Ionicons
                            name="star"
                            size={14}
                            color="#F59E0B"
                        />

                        <Text style={styles.ratingTexto}>
                            {clase.rating}
                        </Text>
                    </View>
                </View>

                <Text
                    style={styles.titulo}
                    numberOfLines={2}
                >
                    {clase.titulo}
                </Text>

                <Text
                    style={styles.descripcion}
                    numberOfLines={3}
                >
                    {clase.descripcion}
                </Text>

                <View style={styles.profesor}>
                    <Image
                        source={{
                            uri: clase.profesor.foto,
                        }}
                        style={styles.fotoProfesor}
                    />

                    <View>
                        <Text style={styles.nombreProfesor}>
                            {clase.profesor.nombre}
                        </Text>

                        <Text style={styles.paisProfesor}>
                            {clase.profesor.pais}
                        </Text>
                    </View>
                </View>

                <View style={styles.divisor} />

                <View style={styles.infoInferior}>

                    <View>
                        <Text style={styles.precio}>
                            {formatearPrecio(clase.precio)}
                        </Text>

                        <Text style={styles.duracion}>
                            {clase.duracion} minutos
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.cupos,
                            sinCupos && styles.cuposAgotados,
                        ]}
                    >
                        <Ionicons
                            name="people-outline"
                            size={15}
                            color={
                                sinCupos
                                    ? '#DC2626'
                                    : colors.primario
                            }
                        />

                        <Text
                            style={[
                                styles.cuposTexto,
                                sinCupos &&
                                    styles.cuposTextoAgotados,
                            ]}
                        >
                            {sinCupos
                                ? 'Sin cupos'
                                : `${clase.cupos} cupos`}
                        </Text>
                    </View>

                </View>

                <View style={styles.verDetalle}>
                    <Text style={styles.verDetalleTexto}>
                        Ver detalles
                    </Text>

                    <Ionicons
                        name="arrow-forward"
                        size={16}
                        color={colors.primario}
                    />
                </View>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.borde,
        overflow: 'hidden',
    },

    imagen: {
        width: '100%',
        height: 170,
    },

    contenido: {
        padding: spacing.md,
    },

    filaSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    nivel: {
        backgroundColor: colors.primarioSuave,
        borderRadius: radius.full,
        paddingHorizontal: 9,
        paddingVertical: 5,
    },

    nivelTexto: {
        color: colors.primario,
        fontSize: 11,
        fontWeight: '800',
    },

    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    ratingTexto: {
        color: colors.texto,
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 4,
    },

    titulo: {
        color: colors.texto,
        fontSize: 19,
        fontWeight: '800',
        marginTop: spacing.sm,
    },

    descripcion: {
        color: colors.textoSuave,
        fontSize: 13,
        lineHeight: 19,
        marginTop: 6,
    },

    profesor: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.md,
    },

    fotoProfesor: {
        width: 34,
        height: 34,
        borderRadius: radius.full,
        marginRight: spacing.sm,
    },

    nombreProfesor: {
        color: colors.texto,
        fontSize: 13,
        fontWeight: '700',
    },

    paisProfesor: {
        color: colors.textoSuave,
        fontSize: 11,
        marginTop: 2,
    },

    divisor: {
        height: 1,
        backgroundColor: colors.borde,
        marginVertical: spacing.md,
    },

    infoInferior: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    precio: {
        color: colors.texto,
        fontSize: 15,
        fontWeight: '800',
    },

    duracion: {
        color: colors.textoSuave,
        fontSize: 11,
        marginTop: 2,
    },

    cupos: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primarioSuave,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: radius.sm,
    },

    cuposAgotados: {
        backgroundColor: '#FEF2F2',
    },

    cuposTexto: {
        color: colors.primario,
        fontSize: 11,
        fontWeight: '700',
        marginLeft: 4,
    },

    cuposTextoAgotados: {
        color: '#DC2626',
    },

    verDetalle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.md,
        paddingTop: spacing.sm,
    },

    verDetalleTexto: {
        color: colors.primario,
        fontSize: 13,
        fontWeight: '800',
        marginRight: 5,
    },
});