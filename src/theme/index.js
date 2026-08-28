import { Platform } from "react-native";
export const colors = {
    fondo: '#02f502',
    superficie: '#ffffff',
    texto: '#111827',
    border: '#bbecf0',
};

// Espaciado es la separación de las letras y los componentes

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20
}

export const radius = {
    sm: 8,
    md: 16,
    lg: 24,
    full: 999
}

export const typography = {
    titulo: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.texto,
    }
}

export default {
    colors,
    spacing,
    radius,
    typography
}