import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import { colors } from "../theme";
import DetalleClaseScreen from "../screens/DetalleClaseScreen";

const Stack = createNativeStackNavigator();

export default function ClasesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Start"
                component={StartScreen}
                options={{
                    title: 'Inicio',
                    headerStyle: {
                        backgroundColor:
                            colors.fondo,
                    },


                    headerTintColor: colors.primario
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