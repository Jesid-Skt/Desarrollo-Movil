import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';
import { CLASES, NIVELES } from '../data/clases';
import { Ionicons } from '@expo/vector-icons';
import NivelChip from '../components/NivelChip';
import Card from '../components/Card';

export default function StartScreen({ navigation }) {
    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');
    const clasesFiltradas = CLASES.filter(clase => {
        const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
        const texto = `${clase.titulo} ${clase.nivel} ${clase.profesor.nombre}`.toLowerCase();
        return coincideNivel && texto.includes(busqueda.toLowerCase());
    });

    return (
        <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenedor} showsVerticalScrollIndicator={false}>
            <View style={styles.encabezado}>
                <View>
                    <Text style={styles.saludo}>APRENDE A TU RITMO</Text>
                    <Text style={styles.titulo}>Encuentra tu próxima clase</Text>
                </View>
                <View style={styles.iconoPerfil}>
                    <Ionicons name="person-outline" size={20} color={colors.primario} />
                </View>
            </View>
            <Text style={styles.descripcion}>Practica inglés con profesores que se adaptan a tus objetivos.</Text>

            <View style={styles.buscador}>
                <Ionicons name="search-outline" size={20} color={colors.textoSuave} />
                <TextInput
                    style={styles.input}
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder="Busca una clase o profesor"
                    placeholderTextColor={colors.textoSuave}
                    autoCorrect={false}
                    autoComplete="off"
                />
                {busqueda.length > 0 && <Ionicons name="close-circle" size={19} color={colors.textoSuave} onPress={() => setBusqueda('')} />}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtros}>
                {NIVELES.map(item => <NivelChip key={item} etiqueta={item} activo={nivel === item} onPress={() => setNivel(item)} />)}
            </ScrollView>

            <View style={styles.seccionEncabezado}>
                <Text style={styles.seccionTitulo}>Clases disponibles</Text>
                <Text style={styles.contador}>{clasesFiltradas.length} resultados</Text>
            </View>
            {clasesFiltradas.map(clase => <Card key={clase.id} clase={clase} />)}
            {clasesFiltradas.length === 0 && <Text style={styles.vacio}>No encontramos clases con esos filtros.</Text>}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    contenedor: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
    encabezado: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    saludo: { color: colors.primario, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
    titulo: { ...typography.titulo, color: colors.texto, fontSize: 28, lineHeight: 34, maxWidth: 280, marginTop: 5 },
    descripcion: { color: colors.textoSuave, fontSize: 14, lineHeight: 21, marginTop: spacing.sm, marginBottom: spacing.lg },
    iconoPerfil: { width: 42, height: 42, borderRadius: radius.full, backgroundColor: colors.primarioSuave, alignItems: 'center', justifyContent: 'center' },
    buscador: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.superficie, borderRadius: radius.sm, paddingHorizontal: spacing.md, height: 52, borderWidth: 1, borderColor: colors.borde },
    input: { flex: 1, color: colors.texto, fontSize: 14, marginHorizontal: spacing.sm },
    filtros: { paddingVertical: spacing.lg },
    seccionEncabezado: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: spacing.md },
    seccionTitulo: { color: colors.texto, fontSize: 20, fontWeight: '800' },
    contador: { color: colors.textoSuave, fontSize: 12 },
    vacio: { color: colors.textoSuave, textAlign: 'center', paddingVertical: spacing.xl },
});