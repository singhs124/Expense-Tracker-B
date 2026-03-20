import { createContext, useContext, useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { resolveAuthState } from '../services/auth/authService';
import { clearTokens, storeTokens } from '../services/auth/KeyChainStore';

const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const bootstrapAsync = async()=>{
            try{
                const status = await resolveAuthState();
                setIsLoggedIn(status);
            } catch(e){
                console.log("Auth BootStraping Failed", e);
                setIsLoading(false);
            } finally{
                setIsLoading(false);
            }
        };
        bootstrapAsync();
    },[])

    const login = async (tokens)=>{
        await storeTokens(tokens);
        setIsLoggedIn(true);
    }

    const logout = async ()=>{
        await clearTokens();
        setIsLoggedIn(false);
    }

    useEffect(()=>{
        const subscription = DeviceEventEmitter.addListener('AUTH_LOGOUT', logout);
        return ()=>subscription.remove();
    },[]);

    return(
        <AuthContext.Provider value={{isLoggedIn, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext);