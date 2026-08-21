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
        </View>
        </Pressable>
    )
}