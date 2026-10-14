import React from "react";

import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { useReservas } from "../context/ReserveContext";

import ReservaCard from "../components/ReservaCard";

import { colors, spacing } from "../theme";

export default function ReservasScreen() {
  const { reservas, loadingReservas, cancelarReserva } = useReservas();

  const handleCancelar = (reserva) => {
    Alert.alert(
      "Cancelar reserva",

      `¿Estás seguro de que deseas cancelar "${reserva.titulo}"?`,

      [
        {
          text: "No",
          style: "cancel",
        },

        {
          text: "Sí, cancelar",
          style: "destructive",

          onPress: async () => {
            const resultado = await cancelarReserva(reserva.id);

            if (!resultado.ok) {
              Alert.alert("No se pudo cancelar", resultado.mensaje);

              return;
            }

            Alert.alert("Reserva cancelada", resultado.mensaje);
          },
        },
      ],
    );
  };

  if (loadingReservas) {
    return (
      <SafeAreaView style={styles.centered} edges={["bottom"]}>
        <ActivityIndicator size="large" color={colors.primario} />

        <Text style={styles.loadingText}>Cargando reservas...</Text>
      </SafeAreaView>
    );
  }

  if (reservas.length === 0) {
    return (
      <SafeAreaView style={styles.centered} edges={["bottom"]}>
        <Ionicons name="calendar-outline" size={52} color={colors.textoSuave} />

        <Text style={styles.emptyTitle}>No tienes reservas activas</Text>

        <Text style={styles.emptySubtitle}>
          Explora las clases disponibles en Inicio para agendar tu primera
          clase.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReservaCard reserva={item} onCancelar={handleCancelar} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },

  listContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.fondo,
  },

  loadingText: {
    marginTop: spacing.md,
    fontSize: 14,
    color: colors.textoSuave,
  },

  emptyTitle: {
    marginTop: spacing.md,
    fontSize: 19,
    fontWeight: "800",
    color: colors.texto,
  },

  emptySubtitle: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textoSuave,
    textAlign: "center",
    maxWidth: 320,
  },
});
