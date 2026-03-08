import { createContext, useCallback, useContext, useState } from 'react';

export const OTPContext = createContext();

export const OTPProvider = ({ children }) => {
    const [otpState, setOtpState] = useState({
        phoneNumber: '',
        otp: Array(6).fill(''),
        isLoading: false,
        error: null,
        isVerified: false,
        timerSeconds: 60,
        canResend: false,
    })

    const setOtp = useCallback((otp) => {
        setOtpState((prev) => ({
            ...prev,
            otp: otp,
            error: null,
        }))
    }, [])

    const setPhoneNumber = useCallback((phone) => {
        setOtpState((prev) => ({
            ...prev,
            phoneNumber: phone,
        }));
    }, []);

    // Set loading state
    const setIsLoading = useCallback((loading) => {
        setOtpState((prev) => ({
            ...prev,
            isLoading: loading,
        }));
    }, []);

    // Set error
    const setError = useCallback((error) => {
        setOtpState((prev) => ({
            ...prev,
            error,
            isLoading: false,
        }));
    }, []);

    // Clear OTP
    const clearOtp = useCallback(() => {
        setOtpState((prev) => ({
            ...prev,
            otp: '',
            error: null,
            isVerified: false,
        }));
    }, []);

    // Set verified state
    const setIsVerified = useCallback((verified) => {
        setOtpState((prev) => ({
            ...prev,
            isVerified: verified,
        }));
    }, []);

    // Update timer
    const updateTimer = useCallback((seconds) => {
        setOtpState((prev) => ({
            ...prev,
            timerSeconds: seconds,
            canResend: seconds === 0,
        }));
    }, []);

    // Reset timer
    const resetTimer = useCallback(() => {
        setOtpState((prev) => ({
            ...prev,
            timerSeconds: 60,
            canResend: false,
            otp: '',
            error: null,
        }));
    }, []);

    const value = {
        ...otpState,
        setOtp, setPhoneNumber,setError,setIsLoading,setIsVerified,
        clearOtp,updateTimer,resetTimer
    }

    return <OTPContext.Provider value={value}>{children}</OTPContext.Provider>
}

export const useOtp = ()=>{
    const context = useContext(OTPContext);
    if(!context){
        throw new Error("useOtp must be within OTPContext");
    }
    return context;
}