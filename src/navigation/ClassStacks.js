import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreen from "../screens/ClasesScreen";
 
const Stack = createNativeStackNavigator();
 
export default function CasesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="Clases"
            component={ClasesScreen}
            options={{ title: 'Clases' }}
            />
        </Stack.Navigator>
    );
}
 