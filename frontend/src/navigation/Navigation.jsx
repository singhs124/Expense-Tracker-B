import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { navigationTheme } from '../constants/navigationThemes';
import { getTokens, storeTokens } from '../security/KeyChainStore.js';

import { MainTabs } from './BottomNavigation.jsx';

import { log } from '../logger/logging.js';
import LoginPhoneScreen from '../screens/LoginPhoneScreen';
import OTPScreen from '../screens/OTPScreen.jsx';

const RootStack = createNativeStackNavigator();


export default function AppNavigator() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // const isDev = __DEV__;
  const isDev = false;

  useEffect(() => {

    const checkAuth = async() => {
      if (isDev) {
        log.info("🚀DEV MODE ACTIVATED: Auto Logged In")
        setIsLoggedIn(true)
        return;
      }

      try {
        const tokens = await getTokens();
        if(tokens != null){
          //parse access and refresh token
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        log.error("Failed to load token from KeyChain: ", error);
        setIsLoggedIn(false);
      }
    }
    
    checkAuth();
  }, [isDev])

  const handleOTPVerified = async (token) => {
    // Store token securely (AsyncStorage/SecureStore)
    // Then mark as logged in
    await storeTokens(token);
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <RootStack.Screen name='Login'>
              {(props) => (
                <LoginPhoneScreen
                  {...props}
                  onContinue={(phone) => {
                    setPhoneNumber(phone);
                    props.navigation.navigate('OTPVerification', { phone })
                  }}
                />
              )}
            </RootStack.Screen>
            {/* <RootStack.Screen name="OTPVerification" component={Dummy}/> */}
            <RootStack.Screen name="OTPVerification">
              {(props) => (
                <OTPScreen
                  {...props}
                  phoneNumber={phoneNumber}
                  onVerificationSuccess={handleOTPVerified}
                  onCancel={() => props.navigation.goBack()}
                />
              )}
            </RootStack.Screen>
          </>
        ) : <RootStack.Screen name='MainApp' component={MainTabs} />
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
