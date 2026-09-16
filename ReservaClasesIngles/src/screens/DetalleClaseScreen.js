import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EtiquetaNivel from '../components/EtiquetaNivel';
import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function DetalleClaseScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { clase } = route.params;
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

    const confirmarReserva = () => {
        if (!horarioSeleccionado) {
            Alert.alert('Selecciona un horario', 'Elige uno de los horarios disponibles para continuar.');
            return;
        }

        Alert.alert(
            'Confirmar reserva',
            `${clase.titulo}\n${horarioSeleccionado}`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    onPress: () => Alert.alert('Reserva confirmada', 'Tu clase ha sido reservada correctamente.'),
                },
            ],
        );
    };

    return (
        <View style={styles.pantalla}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140 }}>
                <Image source={{ uri: clase.imagen }} resizeMode="cover" style={styles.portada} />
                <View style={styles.contenido}>
                    <View style={styles.encabezado}>
                        <View style={styles.tituloBloque}>
                            <EtiquetaNivel nivel={clase.nivel} />
                            <Text style={styles.titulo}>{clase.titulo}</Text>
                            <Text style={styles.modalidad}>{clase.modalidad}</Text>
                        </View>
                        <View style={styles.rating}>
                            <Ionicons name="star" size={16} color={colors.acento} />
                            <Text style={styles.ratingTexto}>{clase.rating}</Text>
                        </View>
                    </View>

                    <View style={styles.datos}>
                        <View style={styles.dato}>
                            <Ionicons name="time-outline" size={20} color={colors.primario} />
                            <Text style={styles.datoEtiqueta}>Duración</Text>
                            <Text style={styles.datoValor}>{clase.duracion} min</Text>
                        </View>
                        <View style={styles.dato}>
                            <Ionicons name="people-outline" size={20} color={colors.primario} />
                            <Text style={styles.datoEtiqueta}>Cupos</Text>
                            <Text style={styles.datoValor}>{clase.cupos} disponibles</Text>
                        </View>
                    </View>

                    <View style={styles.seccion}>
                        <Text style={styles.seccionTitulo}>Tu profesor</Text>
                        <View style={styles.profesor}>
                            <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
                            <View>
                                <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
                                <Text style={styles.profesorPais}>{clase.profesor.pais}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.seccion}>
                        <Text style={styles.seccionTitulo}>Sobre esta clase</Text>
                        <Text style={styles.descripcion}>{clase.descripcion}</Text>
                    </View>

                    <View style={styles.seccion}>
                        <Text style={styles.seccionTitulo}>Horarios disponibles</Text>
                        <View style={styles.horarios}>
                            {clase.horarios.map(horario => {
                                const seleccionado = horario === horarioSeleccionado;

                                return (
                                <Pressable
                                    key={horario}
                                    accessibilityRole="button"
                                    accessibilityState={{ selected: seleccionado }}
                                    onPress={() => setHorarioSeleccionado(horario)}
                                    style={({ pressed }) => [
                                        styles.horario,
                                        seleccionado && styles.horarioSeleccionado,
                                        pressed && styles.horarioPresionado,
                                    ]}
                                >
                                    <Ionicons
                                        name={seleccionado ? 'checkmark-circle' : 'calendar-outline'}
                                        size={19}
                                        color={seleccionado ? colors.superficie : colors.primario}
                                    />
                                    <Text style={styles.horarioTexto}>{horario}</Text>
                                </Pressable>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.barra, { paddingBottom: insets.bottom + spacing.md }]}>
                <View>
                    <Text style={styles.precioEtiqueta}>Precio por clase</Text>
                    <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
                </View>
                <Pressable
                    style={({ pressed }) => [
                        styles.boton,
                        !horarioSeleccionado && styles.botonDeshabilitado,
                        pressed && horarioSeleccionado && styles.botonPresionado,
                    ]}
                    onPress={confirmarReserva}
                >
                    <Text style={styles.botonTexto}>
                        {horarioSeleccionado ? 'Reservar clase' : 'Escoge un horario'}
                    </Text>
                    <Ionicons name="arrow-forward" size={18} color={colors.superficie} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    portada: { width: '100%', height: 230, backgroundColor: colors.primarioSuave },
    contenido: { padding: spacing.lg },
    encabezado: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.md },
    tituloBloque: { flex: 1, gap: spacing.sm },
    titulo: { ...typography.titulo, fontSize: 25, lineHeight: 31 },
    modalidad: { color: colors.textoSuave, fontSize: 14 },
    rating: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingTop: spacing.xs },
    ratingTexto: { color: colors.texto, fontWeight: '700' },
    datos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        padding: spacing.lg,
        marginTop: spacing.xl,
    },
    dato: { flex: 1, alignItems: 'center', gap: 4 },
    datoEtiqueta: { color: colors.textoSuave, fontSize: 12 },
    datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
    seccion: { marginTop: spacing.xl },
    seccionTitulo: { color: colors.texto, fontSize: 18, fontWeight: '800', marginBottom: spacing.md },
    profesor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.superficie,
        borderRadius: radius.md,
        padding: spacing.lg,
    },
    avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.borde },
    profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
    profesorPais: { color: colors.textoSuave, fontSize: 13, marginTop: 4 },
    descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
    horarios: { gap: spacing.sm },
    horario: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.superficie, borderRadius: radius.sm, padding: spacing.md, borderWidth: 1, borderColor: colors.borde },
    horarioSeleccionado: { backgroundColor: colors.primario, borderColor: colors.primario },
    horarioPresionado: { opacity: 0.75 },
    horarioTexto: { color: colors.texto, fontSize: 14 },
    barra: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.superficie,
        borderTopWidth: 1,
        borderTopColor: colors.borde,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    precioEtiqueta: { color: colors.textoSuave, fontSize: 12, marginBottom: 3 },
    precio: { fontSize: 17, fontWeight: '800', color: colors.primario },
    boton: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.primario, borderRadius: radius.sm, paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    botonDeshabilitado: { backgroundColor: colors.borde },
    botonPresionado: { opacity: 0.8 },
    botonTexto: { color: colors.superficie, fontSize: 15, fontWeight: '800' },
});
