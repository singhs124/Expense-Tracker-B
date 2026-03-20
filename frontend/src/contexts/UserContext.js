import AsyncStorage from "@react-native-async-storage/async-storage";

import { getUserDetails } from '../services/api/user';
import { log } from '../utils/logging';

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const loadLocalData = async ()=>{
            const savedUser = await AsyncStorage.getItem('user_data');
            if(savedUser){
                log.debug("Got User Data from Storage");
                console.log(savedUser);
                setUser(JSON.parse(savedUser));
            }
            setLoading(false);
        };
        loadLocalData();
    },[]);

    const fetchUserData = async(forceUpdate = false)=>{
        if(user && !forceUpdate) return ;
        try{
            const data = await getUserDetails();
            setUser(data);
            await AsyncStorage.setItem('user_data', JSON.stringify(data));
        } catch(error){
            console.log("Failed to fetch user", error);
        } finally{
            setLoading(true);
        }
    };

    return (
        <UserContext.Provider value={{user, fetchUserData, loading}}>
            {children}
        </UserContext.Provider>
    )
}