import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReservasContext } from '../context/ReservasContext';
import EstadoVacio from '../components/EstadoVacio';
import EtiquetaNivel from '../components/EtiquetaNivel';
import { colors, spacing, typography, radius } from '../theme';
 
export default function ReservasScreen() {
    const insets = useSafeAreaInsets();
    const { reservas, cancelarReserva } = useContext(ReservasContext);
 
    const confirmarCancelacion = (id) => {
        Alert.alert(
            "Cancelar Reserva",
            "¿Estás seguro de que deseas cancelar esta reserva?",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Sí, cancelar",
                    style: "destructive",
                    onPress: () => cancelarReserva(id)
                }
            ]
        );
    };
 
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <EtiquetaNivel nivel={item.nivel} />
            </View>
            <Text style={styles.texto}>Profesor: {item.profesor}</Text>
            <Text style={styles.texto}>Horario: {item.horario}</Text>
            <Text style={styles.precio}>Precio: ${item.precio}</Text>
           
            <TouchableOpacity
                style={styles.botonCancelar}
                onPress={() => confirmarCancelacion(item.id)}
            >
                <Text style={styles.textoBoton}>Cancelar Reserva</Text>
            </TouchableOpacity>
        </View>
    );
 
    return (
        <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <Text style={[typography.titulo, { paddingHorizontal: spacing.md }]}>
                Mis Reservas
            </Text>
           
            {reservas.length === 0 ? (
                <EstadoVacio
                    titulo="No tienes reservas activas"
                    mensaje="Las clases que reserves aparecerán aquí"
                    icono="calendar-outline"
                />
            ) : (
                <FlatList
                    data={reservas}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.lista}
                />
            )}
        </View>
    );
}
 
const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: colors.fondo || '#f3f4f6',
    },
    lista: {
        padding: spacing.md,
    },
    card: {
        backgroundColor: colors.superficie || '#ffffff',
        borderRadius: radius.md || 12,
        borderWidth: 1,
        borderColor: colors.borde || '#E5E7EB',
        marginBottom: spacing.md,
        padding: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.texto || '#111827',
        flex: 1,
        marginRight: 8,
    },
    texto: {
        fontSize: 14,
        color: colors.textoSuave || '#374151',
        marginBottom: 4,
    },
    precio: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.primario || '#2563EB',
        marginBottom: 12,
        marginTop: 4,
    },
    botonCancelar: {
        backgroundColor: '#ef4444', // Rojo para la acción de cancelar
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    }
});