import axios from "axios";

import { DeviceEventEmitter } from "react-native";
import { API_BASE_URL } from "../../config/config";
import { clearTokens, getTokens, storeTokens } from '../auth/KeyChainStore';
import { getAccessTokenUsingRefreshToken } from "./login";

export const publicApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
})

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
})

apiClient.interceptors.request.use(async(config)=>{
    const token = await getTokens();
    if(token?.accessToken){
        config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
})

// apiClient.interceptors.response.use(
//     (response) => response ,
//     async(error) =>{
//         const originalRequest = error.config;
//         if(error.response?.status === 401 && !originalRequest._retry){
//             if(isRefreshing){
//                 return new Promise((resolve,reject)=>{
//                     failedQueue.push({resolve,reject});
//                 }).then((token)=> {
//                     originalRequest.headers.Authorization = `Bearer ${token}` ;
//                     return apiClient(originalRequest);
//                 })
//             }
//             originalRequest._retry = true;
//             isRefreshing = true;
//             try{
//                 const tokens = await getTokens();
//                 const payload = {
//                     refresh_token: tokens.refreshToken
//                 }
//                 const {accessToken, refreshToken} = getAccessToken(payload);
//                 await storeTokens({accessToken, refreshToken});
                
//                 apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//                 processQueue(null, accessToken);
//                 originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//                 return apiClient(originalRequest);
//             } catch(refreshError){
//                 processQueue(refreshError,null);
//                 await clearTokens();
//                 //go to Login Screen
//                 return Promise.reject(refreshError);
//             } finally{
//                 isRefreshing = false;
//             }
//         }
//         return Promise.reject(error);
//     }
// )

apiClient.interceptors.response.use(
    response=>response,
    async error=>{
        const originalRequest = error.config;
        const status = error.response.status;
        if(status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                const tokens = await getTokens();
                const newTokens = await getAccessTokenUsingRefreshToken(tokens.refreshToken);
                await storeTokens(newTokens);
                originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`
                return axios(originalRequest);
            } catch(refreshError){
                console.log('Refresh token expired. User Must Log in again.')
                await clearTokens();
                DeviceEventEmitter.emit('AUTH_LOGOUT'); //listening in AuthContext
                return Promise.reject(refreshError);
            }
        } else if (status === 403){
            console.log("Forbidden");
        } else if(status === 500){
            console.log("Server Error");
        } else if(!error.response){
            console.log('Network error - check connection');
        }
        return Promise.reject(error);
    }
)