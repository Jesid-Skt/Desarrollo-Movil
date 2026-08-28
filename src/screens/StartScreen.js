import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, textInput } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio, CLASES, NIVELES } from '../data/clases';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native/types_generated/index';
import NivelChip from '../components/NivelChip';

export default function StartScreen({ navigation }) {
    cosnt[nivel, setNivel] = useState();
    const [busqueda, setBusqueda] = useState();

    return (
        <View>
            <Text>Aplicación de Reserva de Clases de Inglés</Text>
            <view>
                <Ionicons name="search" size={18} color={colors.fondo} />
                <textInput
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder="Ingrese el nombre o nivel para la busqueda"
                    autocorrect={false}
                    autocomplete={false}
                />
                {
                    busqueda.length > 0 && (
                        <Ionicons
                            name="close-circle"
                            size={18} color={colors.fondo}
                            onPress={() => setBusqueda('')} />
                    )
                }

            </view>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexgrow: 0, }}
            >
                {
                    NIVELES.map(item => (
                        <NivelChip
                            etiqueta={item}
                            activo={item}
                            onPress={() => setNivel(item)}
                        />
                    ))
                }
            </ScrollView>

        </View>
        
    );
}