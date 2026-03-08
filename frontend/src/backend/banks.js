import { fetchWithTimeOut } from '../api/timeout';
import { API_BASE_URL } from '../config';
import { getTokens } from '../security/KeyChainStore';

export const getBanks = async()=>{
    const token = await getTokens();
    const result = await fetchWithTimeOut(
        `${API_BASE_URL}/bank/`, {
            method: 'GET',
            headers: { 
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token.accessToken}`
            },
        } , 10000
    );
    return result;
}

export const addBank = async (data) =>{
    const token = await getTokens();
    const result = await fetchWithTimeOut(
        `${API_BASE_URL}/bank/`,{
            method:'POST',
            headers: { 
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token.accessToken}`
            },
            body: JSON.stringify(data)
        }, 1000000
    );
    return result;
}

export const deleteBankCall = async(id)=>{
    const token = await getTokens();
    const result = await fetchWithTimeOut(
        `${API_BASE_URL}/bank/${id}`,{
            method: 'DELETE',
            headers: { 
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token.accessToken}`
            },
        },
        10000
    )
    return result;
}

export const updateBankCall = async(id,data)=>{
    const token = await getTokens();
    const result = await fetchWithTimeOut(
        `${API_BASE_URL}/bank/${id}`,{
            method: 'PATCH',
            headers: { 
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token.accessToken}`
            },
            body: JSON.stringify(data)
        },
        10000
    )
    return result;
}