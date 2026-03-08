import { DefaultTheme } from "@react-navigation/native";

// Custom Navigation Theme
export const navigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6366f1',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
    notification: '#ef4444',
  },
};

// Dark theme variant
export const darkNavigationTheme = {
  dark: true,
  colors: {
    primary: '#8b5cf6',
    background: '#111827',
    card: '#1f2937',
    text: '#f9fafb',
    border: '#374151',
    notification: '#f87171',
  },
};
