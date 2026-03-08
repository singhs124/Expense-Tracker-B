import { fetchWithTimeOut } from '../api/timeout';
import { API_BASE_URL } from '../config';

export const loginRequest = async (payload)=>{
    const res = await fetchWithTimeOut(
        `${API_BASE_URL}/auth/`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(payload)
        }, 10000
    )
    
    if(!res.ok){
        const data = await res.json();
        throw new Error(data.message);
    }
    return res;
}

export const validateOtp = async (payload)=>{
    const res = await fetchWithTimeOut(
        `${API_BASE_URL}/auth/validateOtp`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(payload)
        }, 10000
    )
    return res;
}



export const emailLoginRequest = async (payload)=>{
    const res = await fetchWithTimeOut(
        `${API_BASE_URL}/auth/email`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(payload)
        }, 30000
    )
    
    if(!res.ok){
        const data = await res.json();
        throw new Error(data.message);
    }
    return res;
}

export const emailValidateOtp = async (payload)=>{
    const res = await fetchWithTimeOut(
        `${API_BASE_URL}/auth/email/validateOtp`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(payload)
        }, 10000
    )
    return res;
}