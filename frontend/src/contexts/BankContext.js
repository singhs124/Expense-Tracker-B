import { createContext } from "react";
import { addBank, deleteBankCall, getBanks, updateBankCall } from '../services/api/banks';

export const BankContext = createContext();

export const BankProvider = ({children})=>{
    const getBanksList = async ()=>{
        const data =  await getBanks();
        console.log(data);
        return data;
    }

    const addNewBank = async (payload)=>{
        const data = await addBank(payload);
        console.log(data);
        return true;
    }

    const deleteBank = async(id)=>{
        const data = await deleteBankCall(id);
        console.log(data);
        return true;
    }

    const updateBank = async(id,payload)=>{
        const data = await updateBankCall(id,payload);
        console.log(data);
        return true;
    }

    return (
        <BankContext.Provider value={{addNewBank, getBanksList, deleteBank, updateBank}}>
            {children}
        </BankContext.Provider>
    )
}