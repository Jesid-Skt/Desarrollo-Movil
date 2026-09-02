import {platform} from 'react-native';

export const colors = {
  primary: '#6200EE',
  primaryVariant: '#3700B3',
  secondary: '#03DAC6',
  secondaryVariant: '#018786',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  error: '#B00020',
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#000000',
  onSurface: '#000000',
  onError: '#FFFFFF',
  text : '#111827'
};


export const spacing = {

  xs: 4,
  sm: 8,
  md: 12, 
  lg: 16,
  xl: 18,
};

export const radius = {

  sm: 4,
  md: 14,
  lg: 20,
  full: 999,

};

export const typography = {

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },

};

export default { colors, spacing, radius, typography };index.js