<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function App() {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.6)).current;
  const translate = useRef(new Animated.Value(80)).current;
  const floating = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.spring(translate, {
        toValue: 0,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floating, {
          toValue: -15,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floating, {
          toValue: 15,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={["#0F172A", "#1E3A8A", "#2563EB"]}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Círculos decorativos */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <Animated.View
        style={[
          styles.card,
          {
            opacity: fade,
            transform: [
              { scale },
              { translateY: translate },
              { translateY: floating },
            ],
          },
        ]}
      >
        <Text style={styles.logo}>🚀</Text>

        <Text style={styles.title}>Bienvenido</Text>

        <Text style={styles.subtitle}>
          Comienza una experiencia increíble con nuestra aplicación.
        </Text>

        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={["#38BDF8", "#3B82F6"]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Comenzar</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.logo}>🤯 </Text>

        <Text style={styles.title}>Bienvenido</Text>

        <Text style={styles.subtitle}>
          Comienza una experiencia increíble con nuestra aplicación.
        </Text>

        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={["#f72d2d", "#c23d26"]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Comenzar</Text>
          </LinearGradient>
        </TouchableOpacity>

      

      </Animated.View>
    </LinearGradient>

  );

=======
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { safeAreaProvider } from 'react-native-safe-area-context';
import ClasesStack from './src/navigation/ClasesStack';

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={temaNavegacion}>
        <StatusBar style="dark" />
        <ClasesStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
>>>>>>> 309e35f (Creacion de components)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: "center",
    alignItems: "center",
  },

  circle1: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(255,255,255,0.08)",
    top: -80,
    left: -80,
  },

  circle2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.05)",
    bottom: -60,
    right: -60,
  },

  card: {
    width: width * 0.88,
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 30,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  logo: {
    fontSize: 70,
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
  },

  subtitle: {
    color: "#E5E7EB",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 35,
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 55,
    borderRadius: 18,
    elevation: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
=======
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
>>>>>>> 309e35f (Creacion de components)
  },
});
