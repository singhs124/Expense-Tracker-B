import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

// Custom light theme
export const lightTheme = {
  ...MD3LightTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#1976d2',
    primaryContainer: '#e3f2fd',
    secondary: '#03a9f4',
    secondaryContainer: '#b3e5fc',
    background: '#f5f5f5',
    surface: '#ffffff',
    surfaceVariant: '#f0f0f0',
    error: '#d32f2f',
    errorContainer: '#ffebee',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onBackground: '#212121',
    onSurface: '#212121',
    onError: '#ffffff',
    outline: '#79747e',
    shadow: '#000000',
    inverseSurface: '#2c2c2c',
    inverseOnSurface: '#f5f5f5',
    elevation: {
      level0: 'transparent',
      level1: '#ffffff',
      level2: '#f7f7f7',
      level3: '#eeeeee',
      level4: '#e8e8e8',
      level5: '#e0e0e0',
    },
  },
};

// Custom dark theme
export const darkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#bb86fc',
    primaryContainer: '#3700b3',
    secondary: '#03dac6',
    secondaryContainer: '#00574b',
    background: '#121212',
    surface: '#1e1e1e',
    surfaceVariant: '#2c2c2c',
    error: '#cf6679',
    errorContainer: '#93000a',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
    onError: '#ffffff',
    outline: '#938f99',
    shadow: '#000000',
    inverseSurface: '#e6e1e5',
    inverseOnSurface: '#313033',
    elevation: {
      level0: 'transparent',
      level1: '#1e1e1e',
      level2: '#232323',
      level3: '#282828',
      level4: '#2c2c2c',
      level5: '#2f2f2f',
    },
  },
};
