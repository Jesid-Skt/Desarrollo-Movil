import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ClasesStack from './src/navigation/ClasesStack';
import { colors } from './src/theme';
import { ReservasProvider } from './src/context/ReservasContext';
 
const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo || '#ffffff',
    card: colors.superficie || '#ffffff',
    primary: colors.primario || '#2563EB',
    text: colors.texto || '#111827',
    border: colors.border || colors.borde || '#E5E7EB',
  },
};
 
export default function App() {
  return (
    <SafeAreaProvider>
      <ReservasProvider>
        <NavigationContainer theme={temaNavegacion}>
          <StatusBar style="dark" />
          <ClasesStack />
        </NavigationContainer>
      </ReservasProvider>
    </SafeAreaProvider>
  );
}