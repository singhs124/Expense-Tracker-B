import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useOtp } from '../contexts/OTPContext';

const { width } = Dimensions.get('window');
const DIGIT_SIZE = width / 8;

const OtpInput = ({ onComplete }) => {
    const { otp, setOtp, error, setError } = useOtp();
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRef = useRef(null);

  // Focus hidden input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChangeText = (text) => {
    const sanitized = text.replace(/[^0-9]/g, '').slice(0, 6);
    const newOtp = sanitized.split('');
    while (newOtp.length < 6) newOtp.push('');
    setOtp(newOtp);
    setError('');

    // Auto-verify when complete
    if (sanitized.length === 6) {
      onComplete(sanitized);
    }
  };

  const handlePressDigit = () => {
    inputRef.current?.focus();
    // inputRef.current?.setNativeProps({ selection: { start: otp.length, end: otp.length } });
  };

  return (
    <View style={styles.container}>

      {/* OTP Digit Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => {
          const isFilled = digit !== '';
          const isFocused = otp.join('').length === index;
          
          let borderColor = '#E0E0E0';
          if (error) borderColor = '#EF4444';
          else if (success) borderColor = '#10B981';
          else if (isFocused) borderColor = '#3B82F6';
          else if (isFilled) borderColor = '#3B82F6';

          return (
            <Pressable
              key={index}
              onPress={handlePressDigit}
              style={[
                styles.digitBox,
                { borderColor, width: DIGIT_SIZE, height: DIGIT_SIZE },
              ]}
            >
              <Text style={styles.digitText}>{digit}</Text>
            </Pressable>
          );
        })}

        {/* Hidden TextInput */}
      <TextInput
        ref={inputRef}
        value={otp.join('')}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        maxLength={6}
        style={[styles.hiddenInput , {height: DIGIT_SIZE, width:DIGIT_SIZE*7}]}
        autoFocus
        selectTextOnFocus={false}
        caretHidden={true}
        textContentType="oneTimeCode"
      />
      </View>

      {/* Error/Success Message */}
      {/* {error && (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
        </View>
      )}
      {success && (
        <View style={styles.messageContainer}>
          <Text style={styles.successText}>✓ OTP Verified Successfully!</Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        marginVertical: 24,
        paddingHorizontal: 8,
    },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 3,
        zIndex:1
    },
  digitBox: {
    flex:1,
    marginHorizontal: 3,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  digitText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 120,
    height: 100,
    zIndex:5,
  },
  messageContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
  },
  successText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default OtpInput;
