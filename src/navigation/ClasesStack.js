import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import { colors } from "../theme";
import DetalleClaseScreen from "../screens/DetalleClaseScreen";

const Stack = createNativeStackNavigator();

export default function ClasesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Start"
                component={MainScreen}
                options={{
                    headerShown: false, // Ocultamos el header porque MainScreen es a pantalla completa
                }}
            />
            <Stack.Screen
                name="DetalleClase"
                component={DetalleClaseScreen}
                options={{
                    title: 'Detalle',
                    headerBackTitle: 'Atrás',
                }}
            />
        </Stack.Navigator>
    );
}