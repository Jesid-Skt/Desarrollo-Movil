import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons"; 

// Stack existente con el listado y detalle de clases
import ClasesStack from './ClasesStacks';

// Pantallas principales
import ReservasScreen from '../screens/ReservasScreen';
import PerfilScreen from '../screens/PerfilScreen';

import { colors } from '../theme';

const Tab = createBottomTabNavigator();

/**
 * Helper para renderizar los iconos de Ionicons dinámicamente.
 */
const renderTabIcon = (tabName, focused, color, size) => {
  let iconName;

  switch (tabName) {
    case 'casa':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'reservas':
      iconName = focused ? 'calendar' : 'calendar-outline';
      break;
    case 'perfil':
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = 'help-circle-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primario || '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: colors.superficie || '#FFFFFF',
          borderTopColor: colors.border || colors.borde || '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      {/* Tab 1: Inicio */}
      <Tab.Screen
        name="InicioTab"
        component={ClasesStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon('casa', focused, color, size),
        }}
      />

      {/* Tab 2: Reservas */}
      <Tab.Screen
        name="ReservasTab"
        component={ReservasScreen}
        options={{
          headerShown: true,
          headerTitle: 'Mis Reservas',
          tabBarLabel: 'Reservas',
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon('reservas', focused, color, size),
        }}
      />

      {/* Tab 3: Perfil */}
      <Tab.Screen
        name="PerfilTab"
        component={PerfilScreen}
        options={{
          headerShown: true,
          headerTitle: 'Mi Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon('perfil', focused, color, size),
        }}
      />
    </Tab.Navigator>
  );
}