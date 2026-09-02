import {react} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, spacing, radius, typography} from '../App';

export default function EtiquetaNilve({level}) {
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={styles.text}> {level} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'auto',
        paddingvertical: spacing.sm,
        paddinghorizontal: spacing.md,
        borderRadius: radius.md,

    },
    text: {fontsize: 11, fontweight: '600', letterspacing: 0.5}, 
})