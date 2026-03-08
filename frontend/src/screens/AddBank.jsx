import React, { useContext, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Vibration,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { SubmitButton } from '../components/SubmitButton';
import SuccessOverlay from '../components/SuccessOverlay';
import { Color } from '../constants/TWPalette';

import { BankContext } from '../contexts/BankContext';

const AddBank = () => {
  const {addNewBank} = useContext(BankContext);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Enhanced gradient with more modern colors
  const bgColors = [Color.blue[50], "rgba(248, 250, 252, 1)", Color.blue[100]];
  
  // Animation refs
  const buttonScale = useRef(new Animated.Value(1)).current;
  const successAnimation = useRef(new Animated.Value(0)).current;
  const cardAnimation = useRef(new Animated.Value(0)).current;
  const headerAnimation = useRef(new Animated.Value(0)).current;

  // Animate card entrance on mount
  React.useEffect(() => {
    Animated.stagger(150, [
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!description || description.trim().length === 0) {
      newErrors.description = 'Please Enter Valid Bank Name';
      console.log("Error............");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if(!validateForm()){
      Vibration.vibrate(200);
      return;
    }
    // Enhanced button feedback animation
    Animated.sequence([
      Animated.timing(buttonScale, { 
        toValue: 0.95, 
        duration: 100, 
        useNativeDriver: true 
      }),
      Animated.timing(buttonScale, { 
        toValue: 1, 
        duration: 100, 
        useNativeDriver: true 
      }),
    ]).start();

    setLoading(true);
    const data = { bankName: description.trim() };

    try {
      const success = await addNewBank(data);      
      // Success animation
      if(success){
        Animated.timing(successAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        // Reset form after success
        setTimeout(() => {
          setDescription('');
          successAnimation.setValue(0);
        }, 1500);

        Vibration.vibrate([100, 100, 100]);
      }
    } catch (error) {
      console.error(error)
      Vibration.vibrate(100);
    } finally {
      setLoading(false);
    }
  }

  const headerTransform = {
    opacity: headerAnimation,
    transform: [
      {
        translateY: headerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-30, 0]
        })
      }
    ]
  };

  const cardTransform = {
    opacity: cardAnimation,
    transform: [
      {
        translateY: cardAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0]
        })
      },
      {
        scale: cardAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1]
        })
      }
    ]
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={bgColors}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentInsetAdjustmentBehavior="automatic" 
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                
                {/* Enhanced Header Section */}
                <Animated.View style={[styles.headerSection, headerTransform]}>
                  <View style={styles.iconContainer}>
                    <LinearGradient
                      colors={[Color.blue[500], Color.blue[600]]}
                      style={styles.iconGradient}
                    >
                      <Icon name="account-balance" size={32} color="white" />
                    </LinearGradient>
                  </View>
                  <Text style={styles.headerTitle}>Add New Bank</Text>
                  <Text style={styles.headerSubtitle}>
                    Add a bank to organize your financial transactions
                  </Text>
                </Animated.View>

                {/* Enhanced Form Card */}
                <Animated.View style={[styles.formCard, cardTransform]}>
                  <View style={styles.formHeader}>
                    <Text style={styles.formTitle}>Bank Information</Text>
                    <View style={styles.divider} />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <FloatingLabelInput
                      label="Bank Name"
                      value={description}
                      onChangeText={setDescription}
                      MaterialIcons="account-balance"
                      placeholder="Enter bank name"
                    />
                    {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                  </View>

                  {/* Info Section */}
                  <View style={styles.infoSection}>
                    <Icon name="info-outline" size={16} color={Color.blue[500]} />
                    <Text style={styles.infoText}>
                      This will help categorize your expenses by bank
                    </Text>
                  </View>
                </Animated.View>

                {/* Enhanced Submit Button */}
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <SubmitButton 
                    title="Add Bank" 
                    onPress={handleSubmit} 
                    loading={loading}
                    style={styles.submitButton}
                  />
                </Animated.View>

              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
        
        <SuccessOverlay animationValue={successAnimation} message="Bank Added!"/>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  
  // Header Section Styles
  headerSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Color.blue[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Color.gray[800],
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: Color.gray[600],
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },

  // Form Card Styles
  formCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 28,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  formHeader: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Color.gray[800],
    marginBottom: 12,
  },
  divider: {
    height: 3,
    backgroundColor: Color.blue[500],
    borderRadius: 2,
    width: 60,
  },
  inputContainer: {
    marginBottom: 20,
  },
  
  // Info Section Styles
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.blue[50],
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: Color.blue[500],
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    color: Color.blue[700],
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },

  // Submit Button Styles
  submitButton: {
    marginTop: 8,
    shadowColor: Color.blue[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },

  errorText: {
    fontSize: 14,
    color: '#ef4444',
    marginTop: -16,
    marginBottom: 16,
    marginLeft: 4,
  },
});

export default AddBank;