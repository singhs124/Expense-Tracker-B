import { apiClient } from './apiClient';

export const getBanks = async () => {
    const result = await apiClient.get('/bank/');
    return result.data;
}

export const addBank = async (payload) => {
    const result = await apiClient.post('/bank/',payload);
    return result.data;
}

export const deleteBankCall = async (id) => {
    const result = await apiClient.delete(`/bank/${id}`);
    return result.data;
}

export const updateBankCall = async (id, payload) => {
    const result = await apiClient.patch(`/bank/${id}`,payload);
    return result.data;
}