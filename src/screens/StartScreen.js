import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  Image, // 1. Se agrega Image
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, radius, typography } from "../theme";

import { NIVELES } from "../data/clases";

import NivelChip from "../components/NivelChip";
import Card from "../components/Card";

import useResponsive from "../hooks/useResponsive";

import { useReservas } from "../context/ReserveContext";
import { useProfile } from "../context/ProfileContext"; // 2. Se importa useProfile

export default function StartScreen({ navigation }) {
  const [nivel, setNivel] = useState("Todos");

  const [busqueda, setBusqueda] = useState("");

  const { isTablet, horizontalPadding, titleSize, maxContentWidth } =
    useResponsive();

  const { clases } = useReservas();
  const { profile } = useProfile(); // 3. Se obtiene el objeto profile

  /**
   * Filtro:
   *
   * nivel + búsqueda
   */
  const clasesFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return (clases || []).filter((clase) => {
      const coincideNivel = nivel === "Todos" || clase.nivel === nivel;

      const texto = [clase.titulo, clase.nivel, clase.profesor?.nombre]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return coincideNivel && texto.includes(termino);
    });
  }, [clases, nivel, busqueda]);

  const renderClase = ({ item }) => (
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
          navigation.navigate("DetalleClaseScreen", {
            claseId: item.id,
          })
        }
      />
    </View>
  );

  const header = (
    <View>
      <View style={styles.encabezado}>
        <View style={styles.encabezadoTexto}>
          <Text style={styles.saludo}>APRENDE A TU RITMO</Text>

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

        <Pressable
          style={styles.iconoPerfil}
          onPress={() => navigation.getParent()?.navigate("PerfilTab")}
        >
          {profile?.foto ? (
            <Image
              source={{ uri: profile.foto }}
              style={styles.imagenPerfilBarra}
            />
          ) : (
            <Ionicons name="person-outline" size={20} color={colors.primario} />
          )}
        </Pressable>
      </View>

      <Text style={styles.descripcion}>
        Practica inglés con profesores que se adaptan a tus objetivos.
      </Text>

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
          returnKeyType="search"
        />

        {busqueda.length > 0 && (
          <Pressable onPress={() => setBusqueda("")}>
            <Ionicons name="close-circle" size={19} color={colors.textoSuave} />
          </Pressable>
        )}
      </View>

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

      <View style={styles.seccionEncabezado}>
        <Text style={styles.seccionTitulo}>Clases disponibles</Text>

        <Text style={styles.contador}>{clasesFiltradas.length} resultados</Text>
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
          <Ionicons name="search-outline" size={28} color={colors.textoSuave} />

          <Text style={styles.textoVacio}>
            No encontramos clases con esos filtros.
          </Text>
        </View>
      )}

      <View style={styles.ayudaReservas}>
        <Ionicons name="calendar-outline" size={22} color={colors.primario} />

        <View style={styles.ayudaTexto}>
          <Text style={styles.ayudaTitulo}>¿Ya tienes una reserva?</Text>

          <Text style={styles.ayudaDescripcion}>
            Puedes consultarla y gestionarla desde la pestaña Reservas.
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <FlatList
        data={[]}
        renderItem={null}
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
        ListFooterComponent={<View style={styles.footer} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.fondo,
  },

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
    overflow: "hidden", // Recorta la imagen circularmente
  },

  imagenPerfilBarra: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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

  carrusel: {
    paddingBottom: spacing.lg,
  },

  itemCarrusel: {
    marginRight: spacing.md,
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

  ayudaReservas: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primarioSuave,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  ayudaTexto: {
    flex: 1,
    marginLeft: spacing.sm,
  },

  ayudaTitulo: {
    color: colors.texto,
    fontSize: 14,
    fontWeight: "800",
  },

  ayudaDescripcion: {
    color: colors.textoSuave,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
  },

  footer: {
    height: spacing.xl,
  },
});
