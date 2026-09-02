import {useState, useE} from 'react';
import {View, Text, StyleSheet, Image, Pressable, } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EtiquetaNilvel from './LevelTags';
import {colors, spacing, radius, typography} from '../src/theme/index';
import {formatearPrecio, CLASES} from '../data/Clases';
import {CLASES, NIVELES} from '../data/Clases';

export default function ClasesScreen({ navigation}) {  

    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState();

    retiurn (
        <View>
            <Text> Aplicacion de reservas de clases de inglés</Text>
            <View>
                <Ionicons name="search" size={24} color={colors.primary} />
                <TextInput
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder="Buscar clase..."
                />
                {
                    busqueda.length > 0 && (
                        <Pressable onPress={() => setBusqueda('')}>
                            <Ionicons name="close-circle" size={24} color={colors.error} />
                        </Pressable>
                    )
                }
            </View>
        </View>

    )
}
