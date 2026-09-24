import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function EstadoVacio({ mensaje = "No hay informacion disponible." }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.fondo,
  },
  texto: {
    fontSize: 15,
    textAlign: "center",
    color: colors.texto,
    opacity: 0.7,
  },
});
