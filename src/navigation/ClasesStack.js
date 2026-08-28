import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";

const Stack = createNativeStackNavigator();

export default function CasesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Start" 
            component={StartScreen} 
            options={{ title: 'Inicio' }}
            />
        </Stack.Navigator>
    );
}