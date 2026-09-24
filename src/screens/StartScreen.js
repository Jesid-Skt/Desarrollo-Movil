import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput, ScrollView, FlatList } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import EtiquetaNivel from '../components/EtiquetaNivel';
import NivelChip from '../components/NivelChip';
import Card from '../components/Card';
import EstadoVacio from '../components/EstadoVacio';
import useResponsive from '../hooks/useResponsive';
import { useMemo } from 'react';

import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio, CLASES, NIVELES } from '../data/clases';

export default function StartScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { columnas, paddingHorizontal } = useResponsive();

    const [nivel, setNivel] = useState();
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter(clase => {
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincideTexto = textoBusqueda ||
                clase.titulo.toLowerCase().includes(textoBusqueda)
            return coincideNivel && coincideTexto;
        });
    }, [nivel, busqueda]);

    return (
        <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <View>
                <Text style={typography.titulo}>Aplicación de Reserva de Clases de Inglés</Text>
                <Ionicons name="search" size={18} color={colors.textoSuave} />
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
                            onPress={() => setBusqueda('')}
                        />
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
            <FlatList
                data={resultados}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card
                        clase={item}
                        onPress={() => navigation.navigate('DetalleClase', { clase: item })}
                    />
                )}
                contentContainerStyle={{
                    paddingHorizontal,
                    flexGrow: 1,
                }}
                numColumns={columnas}
                ListEmptyComponent={
                    < EstadoVacio
                        icono="search-outline"
                        titulo="No se encontraron resultados"
                        mensaje="Prueba con otra combinacion de palabras para la busqueda"
                        onAction={() => {
                            setNivel('Todos');
                            setBusqueda('');
                        }}
                    />
                }
            />

        </View>

    );
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: colors.fondo,
    },
});