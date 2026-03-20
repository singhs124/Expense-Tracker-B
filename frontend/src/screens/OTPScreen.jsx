import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Vibration } from 'react-native';
import OTPInput2 from '../components/OtpInput2';
import { useOtp } from '../contexts/OTPContext';
import { emailLoginRequest, validateOtp } from '../services/api/login';
import { log } from '../utils/logging';


const OTPScreen = ({ phoneNumber, onVerificationSuccess, onCancel }) => {
    const [showSuccess, setShowSuccess] = useState('');
    const [timerInterval, setTimerInterval] = useState(null);
    const { otp, isLoading, setOtp, error, timerSeconds, canResend, setPhoneNumber, setIsLoading, setError, updateTimer, resetTimer, setIsVerified } = useOtp();

    useFocusEffect(
        React.useCallback(()=>{
            setOtp(Array(6).fill(''));
        },[])
    )

    useEffect(() => {
        if (phoneNumber) {
            setPhoneNumber(phoneNumber);
        }
    }, [phoneNumber]);

    useEffect(() => {
        if (timerSeconds > 0 && !canResend) {
            const interval = setInterval(() => {
                updateTimer(timerSeconds - 1);
            }, 1000);
            setTimerInterval(interval);
            return () => clearInterval(interval);
        } else if (timerSeconds == 0) {
            clearInterval(timerInterval);
        }
    }, [timerSeconds, canResend, updateTimer])

    const maskPhoneNumber = (phone) => {
        if (!phone) return '';
        const str = phone.toString();
        return `${str.slice(0, 2)} ****${str.slice(-4)}`;
    };

    const handleOTPVerify = async (otpCode) => {
        if (otpCode.length != 6) {
            setError("Please Enter valid 6-digit code.");
            return;
        }
        setIsLoading(true);

        try {
            const payload = {
                mobileNumber: phoneNumber,
                reqObject: otpCode
            }
            const data = await validateOtp(payload);
            setIsVerified(true);
            setShowSuccess(true);
            onVerificationSuccess(data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Invalid OTP. Try Again!';
            log.error("OTP Verification Error: ", error);
            setError(errorMessage);
            Vibration.vibrate(400);
        } finally {
            setIsLoading(false);
        }
    }

    const handleResendOTP = async () => {
        if (!canResend) return;
        setIsLoading(true);
        try {
            const payload = {
                mobileNumber: phoneNumber,
                reqObj:''
            }
            const data = await emailLoginRequest(payload);

            if (data.success) {
                resetTimer();
                Alert.alert('Success', 'OTP sent to your phone number');
            } else {
                setError(data.message || 'Failed to resend OTP. Try again.');
            }
        } catch (err) {
            log.error('Resend OTP Error:', err);
            if (error.code === 'ECONNABORTED') {
                setError('Request timed out. Try again.');
            } else {
                setError(error.response?.data?.message || 'Failed to resend OTP. Try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
        >
            {(
                <View
                    style={styles.content}
                    accessible={true}
                    accessibilityLabel="OTP Verification Form"
                >
                    {/* Header Section */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Enter Verification Code</Text>
                        <Text style={styles.subtitle}>
                            We've sent a code to {maskPhoneNumber(phoneNumber) || '+91 XXXX XXX XXX'}
                        </Text>
                    </View>

                    {/* OTP Input */}
                    <OTPInput2 onComplete={handleOTPVerify} />

                    {/* Error Message */}
                    {error && (
                        <View
                            style={styles.errorContainer}
                            accessible={true}
                            accessibilityRole="alert"
                            accessibilityLabel={`Error: ${error}`}
                        >
                            <Text style={styles.errorText}>✕ {error}</Text>
                        </View>
                    )}

                    {/* Resend Section */}
                    <View style={styles.resendContainer}>
                        <Text style={styles.resendText}>Didn't receive the code?</Text>

                        {!canResend ? (
                            <Text style={styles.timerText}>
                                Resend in{' '}
                                <Text
                                    style={styles.timerNumber}
                                    accessible={true}
                                    accessibilityLabel={`Resend available in ${timerSeconds} seconds`}
                                >
                                    {timerSeconds}s
                                </Text>
                            </Text>
                        ) : (
                            <TouchableOpacity
                                onPress={handleResendOTP}
                                disabled={isLoading}
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityLabel="Resend OTP"
                            >
                                <Text style={styles.resendButton}>Resend Code</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Verify Button */}
                    <TouchableOpacity
                        style={[
                            styles.verifyButton,
                            (isLoading || otp.length !== 6) && styles.verifyButtonDisabled,
                        ]}
                        onPress={() => handleOTPVerify(otp.join(''))}
                        disabled={isLoading || otp.length !== 6}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Verify OTP"
                        accessibilityState={{ disabled: isLoading || otp.length !== 6 }}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.verifyButtonText}>Verify Code</Text>
                        )}
                    </TouchableOpacity>

                    {/* Cancel Button */}
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={onCancel}
                        disabled={isLoading}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Cancel"
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    {/* Security Info */}
                    <View style={styles.securityInfo}>
                        <Text style={styles.securityText}>
                            🔒 Your data is secure and encrypted
                        </Text>
                    </View>
                </View>
            // ) : (
            //     // Success Screen
            //     <View style={styles.successContainer}>
            //         <View style={styles.successIcon}>
            //             <Text style={styles.successCheckmark}>✓</Text>
            //         </View>
            //         <Text style={styles.successTitle}>Verification Successful!</Text>
            //         <Text style={styles.successMessage}>
            //             Your account has been securely verified.
            //         </Text>
            //     </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 32,
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
        marginBottom: 20,
        textAlign: 'center',
    },
    phoneNumber: {
        fontWeight: '600',
        color: '#374151',
    },

    // Error Message
    errorContainer: {
        backgroundColor: '#FEE2E2',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#EF4444',
    },
    errorText: {
        color: '#DC2626',
        fontSize: 13,
        fontWeight: '500',
    },

    // Resend Section
    resendContainer: {
        marginTop: 24,
        marginBottom: 24,
        alignItems: 'center',
    },
    resendText: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 4,
    },
    timerText: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    timerNumber: {
        fontWeight: '700',
        color: '#3B82F6',
    },
    resendButton: {
        fontSize: 13,
        fontWeight: '600',
        color: '#3B82F6',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    // Verify Button
    verifyButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 12,
    },
    verifyButtonDisabled: {
        opacity: 0.5,
    },
    verifyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    // Cancel Button
    cancelButton: {
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    cancelButtonText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '600',
    },

    // Security Info
    securityInfo: {
        backgroundColor: '#F0FDF4',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'center',
    },
    securityText: {
        fontSize: 12,
        color: '#16A34A',
    },

    // Success Screen
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    successCheckmark: {
        fontSize: 48,
        color: '#16A34A',
        fontWeight: '700',
    },
    successTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    successMessage: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
});

export default OTPScreen