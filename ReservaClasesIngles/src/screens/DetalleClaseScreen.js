import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import Card from "../components/Card";
import EtiquetaNivel from "../components/EtiquetaNivel";
import { colors } from "../theme";

export default function DetalleClaseScreen({ route }) {
  const clase = route?.params?.clase;

  if (!clase) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.mensaje}>
          No se encontro informacion de la clase.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
      <Card>
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>{clase.nombre || clase.titulo}</Text>
          <EtiquetaNivel nivel={clase.nivel} />
        </View>

        <View style={styles.separador} />

        <Text style={styles.etiqueta}>Horario</Text>
        <Text style={styles.valor}>{clase.horario}</Text>

        <Text style={styles.etiqueta}>Duracion</Text>
        <Text style={styles.valor}>{clase.duracion}</Text>

        <Text style={styles.etiqueta}>Cupos disponibles</Text>
        <Text style={styles.valor}>{clase.cupos}</Text>

        <Text style={styles.etiqueta}>Descripcion</Text>
        <Text style={styles.valor}>{clase.descripcion}</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  contenido: {
    padding: 16,
  },
  centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.fondo,
  },
  mensaje: {
    color: colors.texto,
    fontSize: 16,
    textAlign: "center",
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titulo: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: colors.texto,
    marginRight: 8,
  },
  separador: {
    height: 1,
    backgroundColor: colors.borde,
    marginVertical: 16,
  },
  etiqueta: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primario,
    textTransform: "uppercase",
    marginTop: 12,
  },
  valor: {
    fontSize: 16,
    color: colors.texto,
    marginTop: 2,
  },
});
