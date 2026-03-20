import { apiClient } from '../api/apiClient';

export const addExpense = async (payload) => {
    await apiClient.post('/expense/', payload, {
        timeout: 15000
    });
    return true;
}

export const expenseGroupedByOrigin = async () => {
    const result = await apiClient.get('/expense/getByOrigin');
    return result.data;
}

export const totalExpenseApi = async()=>{
    const result = await apiClient.get('/expense/totalExpense');
    return result.data;
}