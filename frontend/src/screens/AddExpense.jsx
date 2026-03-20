import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from 'react-native';

import { BankContext } from '../contexts/BankContext';
import { useError } from '../contexts/ErrorContext';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { useTheme } from '../contexts/ThemeContext';

import BankSelector from '../components/BankSelector';
import FloatingLabelInput from '../components/FloatingLabelInput';
import PageLayout from '../components/PageLayout';
import QuickAmountButtons from '../components/QuickAmountButtons';
import { SubmitButton } from '../components/SubmitButton';
import SuccessOverlay from '../components/SuccessOverlay';
import ToggleButton from '../components/ToogleButton';


import { Color } from '../constants/TWPalette';
import { addExpense } from '../services/api/add';
import { log } from '../utils/logging';



// Main AddExpense Component
const AddExpense = () => {
  const {originWiseExpense, totalExpenseUpdate} = useContext(ExpenseContext);
  const { isDark } = useTheme();
  const { getBanksList } = useContext(BankContext);
  const { showError } = useError();

  const [bankList, setBankList] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [bankName, setBankName] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [] = useState(0);

  const buttonScale = useRef(new Animated.Value(1)).current;
  const successAnimation = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(cardOpacity, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!amount || !amount.trim() || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!bankName) {
      newErrors.bank = 'Please select a bank';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const populateBanks = async () => {
    try {
      console.log("Populating Banks");
      setLoading(true);
      const data = await getBanksList();
      let nameList = data.map(d => d.name)
      setBankList(nameList);
    } catch (error) {
      setBankList([]);
      console.log("GOing...")
      showError("Please Add Bank!")
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Submit with animation
  const handleSubmit = async () => {
    if (!validateForm()) {
      Vibration.vibrate(200);
      return;
    }
    const data = {
      Bank: bankName,
      amount: amount,
      description: description,
      fixed: isFixed ? 1:0
    };

    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    setLoading(true);
    
    try {
      const success = await addExpense(data);
      log.info("Calling Add Expense API");
      if(success){
        Animated.timing(successAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        try{
          await originWiseExpense();
          await totalExpenseUpdate();
        } catch(error){
          Alert.alert("Notice", "Expense Added but Charts are not updated!");
          console.log("Chart Not updated during expense Addition: "+ error);
          log.error("Chart Not updated during expense Addition" + error);
        }
        // Reset form
        setTimeout(() => {
          setAmount('');
          setDescription('');
          setBankName('');
          setIsFixed(false);
          setErrors({});
          successAnimation.setValue(0);
        }, 1500);

        Vibration.vibrate([100, 100, 100]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit expense');
      console.error(error);
      log.warn("Error in Adding Expense: " + error);
      Vibration.vibrate(500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* Header with Progress */}
      <View style={styles.headerContainer}>
        <Text style={[styles.header, isDark && styles.headerDark]}>Add Expense 💰</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Track your spending effortlessly
        </Text>

        {/* Progress Bar */}
        {/* <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: `${formProgress}%`,
                  backgroundColor: formProgress === 100 ? Color.green[500] : Color.indigo[500],
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, isDark && styles.progressTextDark]}>
            {formProgress}% Complete
          </Text>
        </View> */}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Main Form Card */}
            <View style={styles.formCard}>

              {/* Quick Amount Section */}
              <QuickAmountButtons onAmountSelect={setAmount} />

              {/* Amount Input */}
              <FloatingLabelInput
                label="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                MaterialIcons="attach-money"
                placeholder=""
              />
              {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

              {/* Description Input */}
              <FloatingLabelInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                MaterialIcons="description"
                placeholder=""
              />
              {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

              {/* Bank Selector */}
              <BankSelector
                onOpen={populateBanks}
                selectedBank={bankName}
                onBankChange={setBankName}
                banks={bankList}
                disabled={loading}
              />
              {errors.bank && <Text style={styles.errorText}>{errors.bank}</Text>}

              {/* Fixed Expense Toggle */}
              <ToggleButton
                isFixed={isFixed}
                setIsFixed={setIsFixed}
                loading={loading}
                label="Fixed Expense"
                subText="Recurring monthly"
                icon="repeat"
              />
            </View>

            {/* Submit Button */}
            <SubmitButton onPress={handleSubmit} loading={loading} title="Add Expense"/>

            <SuccessOverlay animationValue={successAnimation} message="Expense Added!" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: Color.blue[900],
    marginBottom: 4,
  },
  headerDark: {
    color: '#F9FAFB',
  },
  subtitle: {
    fontSize: 16,
    color: Color.gray[600],
    marginBottom: 16,
  },
  subtitleDark: {
    color: Color.gray[400],
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBackground: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: 12,
    color: Color.gray[600],
    marginTop: 6,
    textAlign: 'right',
  },
  progressTextDark: {
    color: Color.gray[400],
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    padding: 12,
    paddingBottom: 32,
  },
  scrollContent: {
    padding: 5,
    paddingBottom: 10,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginTop: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },

  // Error Styles
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    marginTop: -16,
    marginBottom: 16,
    marginLeft: 4,
  },

  // Utility Styles
  disabled: {
    opacity: 0.6,
  },
});

export default AddExpense;
