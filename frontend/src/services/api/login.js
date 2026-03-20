import apiClient, { publicApi } from './apiClient';

export const loginRequest = async (payload) => {
    const res = await apiClient.post('/auth/',payload); 
    return res.data;
}

export const validateOtp = async (payload) => {
    const res = await publicApi.post('/auth/validateOtp',payload) 
    console.log(res);
    return res.data;
}



export const emailLoginRequest = async (payload) => {
    const res = await publicApi.post('/auth/email',payload,{
        timeout: 25000
    });
    console.log(res);
    return res.data;
}

export const emailValidateOtp = async (payload) => {
    const res = await publicApi.post('/auth/email/validateOtp', payload);
    return res.data;
}

export const getAccessTokenUsingRefreshToken = async (payload) => {
    const res = await publicApi.post('/auth/email/refresh',payload);
    return res.data;
}