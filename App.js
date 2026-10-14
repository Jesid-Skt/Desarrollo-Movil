import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importación de los Contextos
import { ProfileProvider } from './src/context/ProfileContext';
import { ReserveProvider } from './src/context/ReserveContext';

// Importación de la Navegación (Bottom Tabs)
import TabNavigator from './src/navigation/TabNavigator';

import { colors } from './src/theme';

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
            {/* Ambos Proveedores envuelven a la Navegación */}
            <ProfileProvider>
                <ReserveProvider>
                    <NavigationContainer theme={temaNavegacion}>
                        <StatusBar style="dark" />
                        <TabNavigator />
                    </NavigationContainer>
                </ReserveProvider>
            </ProfileProvider>
        </SafeAreaProvider>
    );
}