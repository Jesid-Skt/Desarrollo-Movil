import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  spacing,
  radius,
  typography,
} from "../theme";

import { NIVELES } from "../data/clases";

import NivelChip from "../components/NivelChip";
import Card from "../components/Card";
import ReservaCard from "../components/ReservaCard";

import useResponsive from "../hooks/useResponsive";
import { useReservas } from "../context/ReserveContext";

export default function StartScreen({ navigation }) {
  const [nivel, setNivel] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const {
    isTablet,
    horizontalPadding,
    titleSize,
    maxContentWidth,
  } = useResponsive();

  /*
   * Las clases y reservas vienen del contexto.
   *
   * Esto es importante porque:
   *
   * reservar -> cupos - 1
   * cancelar -> cupos + 1
   *
   * y StartScreen se actualiza automáticamente.
   */
  const {
    clases,
    reservas,
    cancelarReserva,
  } = useReservas();

  /*
   * Filtrado por nivel + búsqueda.
   */
  const clasesFiltradas = useMemo(() => {
    return clases.filter((clase) => {
      const coincideNivel =
        nivel === "Todos" ||
        clase.nivel === nivel;

      const texto = `
        ${clase.titulo}
        ${clase.nivel}
        ${clase.profesor.nombre}
      `.toLowerCase();

      const coincideBusqueda =
        texto.includes(busqueda.toLowerCase());

      return coincideNivel && coincideBusqueda;
    });
  }, [clases, nivel, busqueda]);

  /*
   * Confirmación antes de cancelar.
   */
  const confirmarCancelacion = (reserva) => {
    Alert.alert(
      "Cancelar reserva",
      `¿Seguro que deseas cancelar "${reserva.titulo}"?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: () => {
            const resultado =
              cancelarReserva(reserva.id);

            if (!resultado?.ok) {
              Alert.alert(
                "No se pudo cancelar",
                resultado?.mensaje ||
                  "No fue posible cancelar la reserva."
              );
            }
          },
        },
      ]
    );
  };

  /*
   * Card de cada clase del carrusel.
   */
  const renderClase = ({ item }) => {
    return (
      <View
        style={[
          styles.itemCarrusel,
          {
            width: isTablet ? 380 : 310,
          },
        ]}
      >
        <Card
          clase={item}
          onPress={() =>
            navigation.navigate(
              "DetalleClaseScreen",
              {
                claseId: item.id,
              }
            )
          }
        />
      </View>
    );
  };

  /*
   * Card de cada reserva.
   */
  const renderReserva = ({ item }) => {
    return (
      <ReservaCard
        reserva={item}
        onCancelar={confirmarCancelacion}
      />
    );
  };

  /*
   * Toda esta parte queda como encabezado
   * de la FlatList principal.
   */
  const header = (
    <View>
      {/* =========================
          ENCABEZADO
      ========================== */}

      <View style={styles.encabezado}>
        <View style={styles.encabezadoTexto}>
          <Text style={styles.saludo}>
            APRENDE A TU RITMO
          </Text>

          <Text
            style={[
              styles.titulo,
              {
                fontSize: titleSize,
                maxWidth: isTablet ? 500 : 280,
              },
            ]}
          >
            Encuentra tu próxima clase
          </Text>
        </View>

        <View style={styles.iconoPerfil}>
          <Ionicons
            name="person-outline"
            size={20}
            color={colors.primario}
          />
        </View>
      </View>

      {/* =========================
          DESCRIPCIÓN
      ========================== */}

      <Text style={styles.descripcion}>
        Practica inglés con profesores que se adaptan
        a tus objetivos.
      </Text>

      {/* =========================
          BUSCADOR
      ========================== */}

      <View style={styles.buscador}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textoSuave}
        />

        <TextInput
          style={styles.input}
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Busca una clase o profesor"
          placeholderTextColor={colors.textoSuave}
          autoCorrect={false}
          autoComplete="off"
        />

        {busqueda.length > 0 && (
          <Ionicons
            name="close-circle"
            size={19}
            color={colors.textoSuave}
            onPress={() => setBusqueda("")}
          />
        )}
      </View>

      {/* =========================
          FILTROS
      ========================== */}

      <FlatList
        data={NIVELES}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtros}
        renderItem={({ item }) => (
          <NivelChip
            etiqueta={item}
            activo={nivel === item}
            onPress={() => setNivel(item)}
          />
        )}
      />

      {/* =========================
          CLASES DISPONIBLES
      ========================== */}

      <View style={styles.seccionEncabezado}>
        <Text style={styles.seccionTitulo}>
          Clases disponibles
        </Text>

        <Text style={styles.contador}>
          {clasesFiltradas.length} resultados
        </Text>
      </View>

      {clasesFiltradas.length > 0 ? (
        <FlatList
          data={clasesFiltradas}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderClase}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carrusel}
        />
      ) : (
        <View style={styles.vacio}>
          <Ionicons
            name="search-outline"
            size={28}
            color={colors.textoSuave}
          />

          <Text style={styles.textoVacio}>
            No encontramos clases con esos filtros.
          </Text>
        </View>
      )}

      {/* =========================
          MIS RESERVAS
      ========================== */}

      <View style={styles.reservasEncabezado}>
        <View>
          <Text style={styles.seccionTitulo}>
            Mis reservas
          </Text>

          <Text style={styles.reservasDescripcion}>
            Tus clases agendadas
          </Text>
        </View>

        <View style={styles.contadorReservas}>
          <Text style={styles.contadorReservasTexto}>
            {reservas.length}
          </Text>
        </View>
      </View>

      {reservas.length === 0 && (
        <View style={styles.reservasVacias}>
          <Ionicons
            name="calendar-outline"
            size={30}
            color={colors.textoSuave}
          />

          <Text style={styles.reservasVaciasTitulo}>
            No tienes reservas
          </Text>

          <Text style={styles.reservasVaciasTexto}>
            Reserva una clase y aparecerá aquí.
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={reservas}
      keyExtractor={(item) => item.id}
      renderItem={renderReserva}
      ListHeaderComponent={header}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.contenedor,
        {
          paddingHorizontal: horizontalPadding,
          maxWidth: maxContentWidth,
          alignSelf: "center",
          width: "100%",
        },
      ]}
      ListFooterComponent={
        <View style={styles.footer} />
      }
    />
  );
}

const styles = StyleSheet.create({
  contenedor: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl * 2,
    backgroundColor: colors.fondo,
  },

  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  encabezadoTexto: {
    flex: 1,
    paddingRight: spacing.md,
  },

  saludo: {
    color: colors.primario,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  titulo: {
    ...typography.titulo,
    color: colors.texto,
    lineHeight: 34,
    marginTop: 5,
  },

  descripcion: {
    color: colors.textoSuave,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },

  iconoPerfil: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.primarioSuave,
    alignItems: "center",
    justifyContent: "center",
  },

  buscador: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.superficie,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    height: 52,
    borderWidth: 1,
    borderColor: colors.borde,
  },

  input: {
    flex: 1,
    color: colors.texto,
    fontSize: 14,
    marginHorizontal: spacing.sm,
  },

  filtros: {
    paddingVertical: spacing.lg,
  },

  seccionEncabezado: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },

  seccionTitulo: {
    color: colors.texto,
    fontSize: 20,
    fontWeight: "800",
  },

  contador: {
    color: colors.textoSuave,
    fontSize: 12,
  },

  /*
   * =========================
   * CARRUSEL
   * =========================
   */

  carrusel: {
    paddingBottom: spacing.lg,
  },

  itemCarrusel: {
    marginRight: spacing.md,
  },

  /*
   * =========================
   * RESERVAS
   * =========================
   */

  reservasEncabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },

  reservasDescripcion: {
    color: colors.textoSuave,
    fontSize: 12,
    marginTop: 3,
  },

  contadorReservas: {
    minWidth: 32,
    height: 32,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    backgroundColor: colors.primarioSuave,
    alignItems: "center",
    justifyContent: "center",
  },

  contadorReservasTexto: {
    color: colors.primario,
    fontSize: 13,
    fontWeight: "800",
  },

  reservasVacias: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    padding: spacing.xl,
  },

  reservasVaciasTitulo: {
    color: colors.texto,
    fontSize: 16,
    fontWeight: "800",
    marginTop: spacing.sm,
  },

  reservasVaciasTexto: {
    color: colors.textoSuave,
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },

  vacio: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },

  textoVacio: {
    color: colors.textoSuave,
    textAlign: "center",
    marginTop: spacing.sm,
    fontSize: 14,
  },

  footer: {
    height: spacing.xl,
  },
});

