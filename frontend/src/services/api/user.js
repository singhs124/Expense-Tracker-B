import { apiClient } from '../api/apiClient';

export const getUserDetails = async ()=> {
    const result = await apiClient.get("/user/");
    console.log(result.data);
    return result.data;
}