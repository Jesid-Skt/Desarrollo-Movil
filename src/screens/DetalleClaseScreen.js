import React from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  spacing,
  radius,
} from "../theme";

import ReservaClase from "../components/ReservaClase";
import EtiquetaNivel from "../components/EtiquetaNivel";

import useResponsive from "../hooks/useResponsive";

import {
  useReservas,
} from "../context/ReserveContext";

export default function DetalleClaseScreen({
  route,
  navigation,
}) {
  const { claseId } =
    route.params;

  const {
    clases,
    loadingReservas,
    reservarClase,
  } = useReservas();

  const {
    isTablet,
    horizontalPadding,
    maxContentWidth,
  } = useResponsive();

  const clase = clases.find(
    (item) =>
      item.id === claseId
  );

  const confirmarReserva =
    async (reserva) => {
      const horario =
        reserva?.horario;

      if (!horario) {
        Alert.alert(
          "Selecciona un horario",
          "Debes seleccionar un horario antes de reservar."
        );

        return;
      }

      const resultado =
        await reservarClase(
          claseId,
          horario
        );

      if (!resultado.ok) {
        /**
         * No tiene perfil.
         */
        if (
          resultado.codigo ===
          "PROFILE_REQUIRED"
        ) {
          Alert.alert(
            "Perfil requerido",
            "Primero crea tu perfil para poder reservar una clase.",
            [
              {
                text: "Ahora no",
                style: "cancel",
              },
              {
                text: "Crear perfil",
                onPress: () =>
                  navigation
                    .getParent()
                    ?.navigate(
                      "PerfilTab"
                    ),
              },
            ]
          );

          return;
        }

        Alert.alert(
          "No se pudo realizar la reserva",
          resultado.mensaje
        );

        return;
      }

      Alert.alert(
        "Reserva realizada 🎉",
        `Clase: ${resultado.reserva.titulo}\n` +
          `Profesor: ${resultado.reserva.profesor}\n` +
          `Horario: ${resultado.reserva.horario}\n\n` +
          "Tu reserva fue creada correctamente.",
        [
          {
            text: "Ver mis reservas",
            onPress: () =>
              navigation
                .getParent()
                ?.navigate(
                  "ReservasTab"
                ),
          },
          {
            text: "Seguir viendo",
            style: "cancel",
          },
        ]
      );
    };

  if (!clase) {
    return (
      <SafeAreaView
        style={styles.error}
      >
        <Text
          style={styles.errorTexto}
        >
          No encontramos esta clase.
        </Text>
      </SafeAreaView>
    );
  }

  if (loadingReservas) {
    return (
      <SafeAreaView
        style={styles.error}
      >
        <ActivityIndicator
          size="large"
          color={colors.primario}
        />

        <Text
          style={styles.errorTexto}
        >
          Cargando disponibilidad...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["bottom"]}
    >
      <ScrollView
        style={styles.pantalla}
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={[
            styles.contenedor,
            {
              paddingHorizontal:
                horizontalPadding,

              maxWidth:
                maxContentWidth,
            },

            isTablet &&
              styles.contenedorTablet,
          ]}
        >
          <Image
            source={{
              uri: clase.imagen,
            }}
            style={[
              styles.imagen,
              isTablet &&
                styles.imagenTablet,
            ]}
          />

          <View
            style={styles.contenido}
          >
            <View
              style={
                styles.filaSuperior
              }
            >
              <EtiquetaNivel
                nivel={clase.nivel}
              />

              <View
                style={
                  styles.modalidad
                }
              >
                <Ionicons
                  name={
                    clase.modalidad ===
                    "Virtual"
                      ? "videocam-outline"
                      : "location-outline"
                  }
                  size={16}
                  color={
                    colors.primario
                  }
                />

                <Text
                  style={
                    styles.modalidadTexto
                  }
                >
                  {clase.modalidad}
                </Text>
              </View>
            </View>

            <Text
              style={styles.titulo}
            >
              {clase.titulo}
            </Text>

            <View
              style={styles.profesor}
            >
              <Image
                source={{
                  uri: clase
                    .profesor.foto,
                }}
                style={
                  styles.fotoProfesor
                }
              />

              <View>
                <Text
                  style={
                    styles.profesorNombre
                  }
                >
                  {
                    clase.profesor
                      .nombre
                  }
                </Text>

                <Text
                  style={
                    styles.profesorPais
                  }
                >
                  Profesor ·{" "}
                  {
                    clase.profesor
                      .pais
                  }
                </Text>
              </View>
            </View>

            <Text
              style={
                styles.seccionTitulo
              }
            >
              Sobre esta clase
            </Text>

            <Text
              style={
                styles.descripcion
              }
            >
              {clase.descripcion}
            </Text>

            <View
              style={
                styles.estadisticas
              }
            >
              <View
                style={
                  styles.estadistica
                }
              >
                <Ionicons
                  name="star"
                  size={18}
                  color={
                    colors.acento
                  }
                />

                <Text
                  style={
                    styles.estadisticaValor
                  }
                >
                  {clase.rating}
                </Text>

                <Text
                  style={
                    styles.estadisticaTexto
                  }
                >
                  Rating
                </Text>
              </View>

              <View
                style={
                  styles.estadistica
                }
              >
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={
                    colors.primario
                  }
                />

                <Text
                  style={
                    styles.estadisticaValor
                  }
                >
                  {clase.duracion}
                </Text>

                <Text
                  style={
                    styles.estadisticaTexto
                  }
                >
                  Minutos
                </Text>
              </View>

              <View
                style={
                  styles.estadistica
                }
              >
                <Ionicons
                  name="people-outline"
                  size={18}
                  color={
                    colors.primario
                  }
                />

                <Text
                  style={
                    styles.estadisticaValor
                  }
                >
                  {
                    clase.cuposDisponibles
                  }
                </Text>

                <Text
                  style={
                    styles.estadisticaTexto
                  }
                >
                  Cupos
                </Text>
              </View>
            </View>

            <ReservaClase
              clase={clase}
              onConfirmar={
                confirmarReserva
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      colors.fondo,
  },

  pantalla: {
    flex: 1,
    backgroundColor:
      colors.fondo,
  },

  contenedor: {
    width: "100%",
    alignSelf: "center",
    paddingBottom: 40,
  },

  contenedorTablet: {
    paddingTop: spacing.lg,
  },

  imagen: {
    width: "100%",
    height: 240,
    borderRadius: radius.lg,
    marginTop: spacing.lg,
  },

  imagenTablet: {
    height: 360,
  },

  contenido: {
    paddingTop: spacing.lg,
  },

  filaSuperior: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  modalidad: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  modalidadTexto: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primario,
  },

  titulo: {
    color: colors.texto,
    fontSize: 28,
    fontWeight: "800",
    marginTop: spacing.md,
  },

  profesor: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.lg,
  },

  fotoProfesor: {
    width: 46,
    height: 46,
    borderRadius: radius.full,
    marginRight: spacing.md,
  },

  profesorNombre: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.texto,
  },

  profesorPais: {
    fontSize: 12,
    color: colors.textoSuave,
    marginTop: 3,
  },

  seccionTitulo: {
    color: colors.texto,
    fontSize: 18,
    fontWeight: "800",
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },

  descripcion: {
    color: colors.textoSuave,
    fontSize: 14,
    lineHeight: 22,
  },

  estadisticas: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginTop: spacing.xl,
    backgroundColor:
      colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    padding: spacing.md,
  },

  estadistica: {
    alignItems: "center",
    flex: 1,
  },

  estadisticaValor: {
    color: colors.texto,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 4,
  },

  estadisticaTexto: {
    color: colors.textoSuave,
    fontSize: 11,
    marginTop: 2,
  },

  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      colors.fondo,
    padding: spacing.xl,
  },

  errorTexto: {
    color: colors.texto,
    fontSize: 15,
    textAlign: "center",
    marginTop: spacing.md,
  },
});