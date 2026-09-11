import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import DetalleClaseScreen from "../screens/DetalleClaseScreen";

import { colors } from "../theme";

const Stack = createNativeStackNavigator();

export default function ClasesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Start"
                component={StartScreen}
                options={{
                    title: "Inicio",
                    headerStyle: {
                        backgroundColor: colors.fondo,
                    },
                    headerTintColor: colors.primario,
                }}
            />

            <Stack.Screen
                name="DetalleClaseScreen"
                component={DetalleClaseScreen}
                options={{
                    title: "Detalle de la clase",
                    headerStyle: {
                        backgroundColor: colors.fondo,
                    },
                    headerTintColor: colors.primario,
                }}
            />
        </Stack.Navigator>
    );
}