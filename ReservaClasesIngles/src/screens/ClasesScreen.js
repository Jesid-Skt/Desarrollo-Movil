import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons} from '@expo/vector-icons'
import {UseSafeAreaInsets} from 'react-native-safe-area-context';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, radius, typography } from '../theme';
import { CLASES, NIVELES } from '../data/clases';

export default funtion ClasesScreen({navigation}) {
    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState();

    return (
        <View>  
            <Text>Aplicacion de reserva para clases de ingles</Text>
            <View> 
                <Ionicons name="search" size={20} color={colors.primario} />
                <TextInput 
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder="Ingrese el nombre o nivel para la busqueda"
                    autoCorrect={false}
                    autoComplete={false}
                />
                {
                    busqueda.length > 0 && (
                    <Ionicons 
                        name="close-circule" 
                        size={20} 
                        olor={colors.primario} 
                        onPress={() => setBusqueda('')}
                    />
                )}
            </View>
        </View>
    )
}