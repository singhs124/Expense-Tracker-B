import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { emailLoginRequest, loginRequest } from '../services/api/login';
import { log } from '../utils/logging';

const LoginPhoneScreen = ({ onContinue }) => {
  // State management
  const [activeTab, setActiveTab] = useState('email');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countryCode] = useState('+91'); // Default to India

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Phone number validation
  const validatePhoneNumber = (number) => {
    // Indian phone number validation (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const limited = cleaned.slice(0, 10);
    if (limited.length <= 5) {
      return limited;
    }
    return limited.slice(0, 5) + ' ' + limited.slice(5);
  };

  const handlePhoneChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
    if (error) setError('');
  };

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const handleEmailContinue = async () => {
    log.info("User's Email: ", email);

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const data = {
        mobileNumber: email,
        reqObject: ''
      }
      await emailLoginRequest(data);
      setIsLoading(false);
      onContinue(email);
    } catch (err) {
      setIsLoading(false);
      log.error("Error Occured During Login: ", err);
      setError(err.message === 'Network Error' ? 'Network Error: Please check your connection or server status' : err.message);
    }
  };

  const handlePhoneContinue = async () => {
    const cleanedNumber = phoneNumber.replace(/\s/g, '');
    log.info("User's Number: ", cleanedNumber);
    log.info("Country Code: " + countryCode);

    if (!validatePhoneNumber(cleanedNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const data = {
        mobileNumber: cleanedNumber,
        reqObject: countryCode
      }
      const response = await loginRequest(data);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onContinue(countryCode + cleanedNumber);
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      log.error("Error Occured During Login: ", err);
      setError(err.message);
    }
  };

  const handleContinue = () => {
    if (activeTab == 'email') handleEmailContinue();
    else handlePhoneContinue();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>💰</Text>
            </View>

            <Text style={styles.title}>Welcome Hustler!</Text>
            <Text style={styles.subtitle}>
              Enter details to continue with ExpenseTracker
            </Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'email' && styles.activeTab]}
              onPress={() => setActiveTab('email')}
            >
              <Text style={[styles.tabText, activeTab === 'email' && styles.activeTabText]}>
                Email
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'mobile' && styles.activeTab]}
              onPress={() => setActiveTab('mobile')}
            >
              <Text style={[styles.tabText, activeTab === 'mobile' && styles.activeTabText]}>
                Mobile
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'email' && (
            <View style={styles.inputSection}>

              <View
                style={[
                  styles.inputContainer,
                  isFocused && styles.inputContainerFocused,
                  error && styles.inputContainerError,
                ]}
              >
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError('');
                  }}
                  placeholder="you@email.com"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="email-address"
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  editable={!isLoading}
                  accessible={true}
                  accessibilityLabel="Email input"
                  accessibilityHint="Enter your email address"
                  textContentType="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Error Message */}
              {error ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}

              {/* Helper Text */}
              <Text style={styles.helperText}>
                We'll send you a verification code
              </Text>
            </View>
          )}

          {/* Phone Input Section */}
          {activeTab === 'mobile' && (
            <View style={styles.inputSection}>

              <View
                style={[
                  styles.inputContainer,
                  isFocused && styles.inputContainerFocused,
                  error && styles.inputContainerError,
                ]}
              >
                {/* Country Code Selector */}
                <TouchableOpacity
                  style={styles.countryCodeContainer}
                  accessible={true}
                  accessibilityLabel="Country code selector"
                  accessibilityRole="button"
                // onPress={() => navigation.navigate('CountryCodePicker')}
                >
                  <Text style={styles.flag}>🇮🇳</Text>
                  <Text style={styles.countryCode}>{countryCode}</Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Phone Number Input */}
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  placeholder="XXXXX XXXXX"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="phone-pad"
                  maxLength={11} // 10 digits + 1 space
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  editable={!isLoading}
                  accessible={true}
                  accessibilityLabel="Phone number input"
                  accessibilityHint="Enter your 10 digit mobile number"
                  textContentType="telephoneNumber"
                  autoComplete="tel"
                />
              </View>

              {/* Error Message */}
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}

              {/* Helper Text */}
              <Text style={styles.helperText}>
                We'll send you a verification code
              </Text>
            </View>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              ((!phoneNumber && !email) || isLoading) && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={(!phoneNumber && !email) || isLoading}
            accessible={true}
            accessibilityLabel="Continue button"
            accessibilityRole="button"
            accessibilityState={{ disabled: !phoneNumber || isLoading }}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
            </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Terms & Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },

  // Header Styles
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f8fc',
    borderRadius: 8,
    padding: 6,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#338cf2',
    shadowColor: '#338cf2',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.13,
    shadowRadius: 5,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
  },
  activeTabText: {
    color: '#fff',
  },
  // Input Section Styles
  inputSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 8,
  },
  inputContainerFocused: {
    borderColor: '#4A90E2',
    backgroundColor: '#FFFFFF',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainerError: {
    borderColor: '#FF6B6B',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  flag: {
    fontSize: 24,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#666666',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#E0E0E0',
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    letterSpacing: 1,
  },
  errorText: {
    fontSize: 13,
    color: '#FF6B6B',
    marginTop: 8,
    marginLeft: 4,
  },
  helperText: {
    fontSize: 13,
    color: '#999999',
    marginTop: 8,
    marginLeft: 4,
  },

  // Button Styles
  continueButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 24,
  },
  continueButtonDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Footer Styles
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#999999',
  },
  footerLink: {
    fontSize: 13,
    color: '#4A90E2',
    fontWeight: '600',
  },
});

export default LoginPhoneScreen;
