import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import EtiquetaNivel from '../components/EtiquetaNivel';
import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio, CLASES, NIVELES } from '../data/clases';
import { Ionicons } from '@expo/vector-icons';
import NivelChip from '../components/NivelChip';

export default function StartScreen({ navigation }) {
    const [nivel, setNivel] = useState();
    const [busqueda, setBusqueda] = useState('');

    return (
        <View>
            <Text style={{ color: colors.texto }}>Aplicación de Reserva de Clases de Inglés</Text>
            <View>
                <Ionicons name="search" size={18} color={colors.superficie} />
                <TextInput
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder="Ingrese el nombre o nivel para la busqueda"
                    autoCorrect={false}
                    autoComplete="off"
                />
                {
                    busqueda.length > 0 && (
                        <Ionicons
                            name="close-circle"
                            size={18} color={colors.fondo}
                            onPress={() => setBusqueda('')} />
                    )
                }

            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0, }}
            >
                {
                    NIVELES.map(item => (
                        <NivelChip
                            key={item}
                            etiqueta={item}
                            activo={nivel === item}
                            onPress={() => setNivel(item)}
                        />
                    ))
                }
            </ScrollView>

        </View>

    );
}