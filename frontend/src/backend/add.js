import { fetchWithTimeOut } from '../api/timeout';
import { API_BASE_URL } from '../config';
import { getTokens } from '../security/KeyChainStore';

export const addExpense = async (payload) => {
    const token = await getTokens();
    const result = await fetchWithTimeOut(
        `${API_BASE_URL}/expense/`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token.accessToken}`
        },
        body: JSON.stringify(payload)
    }, 15000);
    console.log(result);
    if(!result.ok){        
        const data = await result.json();
        throw new Error(data.message);
    }
    return true;
}

export const expenseGroupedByOrigin = async()=>{
    const token = await getTokens();
    const result = await fetchWithTimeOut(
        `${API_BASE_URL}/expense/getByOrigin`,{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`
            }
        }, 5000
    );
    return result;
}