import react from 'react';
import {StatusBar} from 'expo-status-bar';
import { NavegationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClassStack } from './src/navigation/ClassStacks';

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
      <NavegationContainer theme={temaNavegacion}>
        <StatusBar style="dark" />
        <ClassStack />
      </NavegationContainer>
    </SafeAreaProvider>
  );

}

