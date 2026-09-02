import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio } from '../data/clases';
 
export default function Card({clase, onPress}) {
    return (
        <Pressable
        onPress={onPress}
        >
        <Image source={{uri: clase.image}}/>
        <View>
        <EtiquetaNivel nivel={clase.nivel}/>
        <text style={styles.titulo}>{clase.titulo}</text>
        <text> {clase.nivel}</text>
        <text> {clase.profesor.nombre}</text>
        <text> {formatearPrecio(clase.precio)}</text>
        </View>
        </Pressable>
    )
}
 
const styles = StyleSheet.create({
    titulo: {
        fontSize: 16,
        color: colors.text
    },
});