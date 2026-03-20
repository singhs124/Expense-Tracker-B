import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../constants/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', 'system'
  
  const isDark = themeMode === 'system' 
    ? systemColorScheme === 'dark'
    : themeMode === 'dark';
    
  const theme = isDark ? darkTheme : lightTheme;

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme_preference');
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };

  const toggleTheme = async (newMode) => {
    try {
      setThemeMode(newMode);
      await AsyncStorage.setItem('theme_preference', newMode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const cycleTheme = () => {
    const modes = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    toggleTheme(modes[nextIndex]);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        isDark, 
        themeMode, 
        toggleTheme, 
        cycleTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
