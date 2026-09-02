import React from 'react';
import { Image, View, Text, StyleSheet, Pressable } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, radius } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function Card({ clase, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}
        >
            <Image source={{ uri: clase.imagen }} style={styles.imagen} />
            <View style={styles.contenido}>
                <View style={styles.filaSuperior}>
                    <EtiquetaNivel nivel={clase.nivel} />
                    <Text style={styles.modalidad}>{clase.modalidad}</Text>
                </View>
                <Text style={styles.titulo}>{clase.titulo}</Text>
                <Text style={styles.profesor}>{clase.profesor.nombre}</Text>
                <View style={styles.filaInferior}>
                    <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
                    <Text style={styles.duracion}>{clase.duracion} min</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tarjeta: {
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        overflow: 'hidden',
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.borde,
    },
    presionada: { opacity: 0.86 },
    imagen: { width: '100%', height: 148 },
    contenido: { padding: spacing.md },
    filaSuperior: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalidad: { color: colors.textoSuave, fontSize: 12, fontWeight: '600' },
    titulo: { fontSize: 18, fontWeight: '800', color: colors.texto, marginTop: spacing.sm },
    profesor: { fontSize: 13, color: colors.textoSuave, marginTop: 5 },
    filaInferior: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.md,
    },
    precio: { fontSize: 14, fontWeight: '800', color: colors.primario },
    duracion: { fontSize: 12, color: colors.textoSuave },
    
    tituloLegacy: {
        fontSize: 16,
        color: colors.texto
    },
});