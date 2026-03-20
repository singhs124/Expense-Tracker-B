import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { navigationTheme } from '../constants/navigationThemes';
import { useAuth } from '../contexts/AuthContext.js';

import LoginPhoneScreen from '../screens/LoginPhoneScreen';
import OTPScreen from '../screens/OTPScreen.jsx';
import { MainTabs } from './MainScreenTabs.jsx';

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isLoggedIn, isLoading, login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderAuthScreens = () => (
    <>
      <RootStack.Screen name="Login">
        {(props) => (
          <LoginPhoneScreen
            {...props}
            onContinue={(phone) => {
              setPhoneNumber(phone);
              props.navigation.navigate('OTPVerification', { phone });
            }}
          />
        )}
      </RootStack.Screen>

      <RootStack.Screen name="OTPVerification">
        {(props) => (
          <OTPScreen
            {...props}
            phoneNumber={phoneNumber}
            onVerificationSuccess={(token) => login(token)}
            onCancel={() => props.navigation.goBack()}
          />
        )}
      </RootStack.Screen>
    </>
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          renderAuthScreens()
        ) : (
          <RootStack.Screen name="MainApp" component={MainTabs} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
