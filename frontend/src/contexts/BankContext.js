import { createContext } from "react";
import { addBank, deleteBankCall, getBanks, updateBankCall } from '../backend/banks';

export const BankContext = createContext();

export const BankProvider = ({children})=>{
    const getBanksList = async ()=>{
        const res =  await getBanks();
        const data = await res.json();
        console.log(res)
        if(!res.ok){
            console.log(data.message);
            throw new Error(data.message);
        }
        return data;
    }

    const addNewBank = async (payload)=>{
        const res = await addBank(payload);
        console.log(res);
        const data = await res.json();
        console.log(data);
        if(!res.ok) throw new Error(data.message);
        return true;
    }

    const deleteBank = async(id)=>{
        const res = await deleteBankCall(id);
        if(!res.ok){
            throw new Error("Unable to delete Bank");
        }
        return true;
    }

    const updateBank = async(id,payload)=>{
        const res = await updateBankCall(id,payload);
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.message);
        }
        return true;
    }

    return (
        <BankContext.Provider value={{addNewBank, getBanksList, deleteBank, updateBank}}>
            {children}
        </BankContext.Provider>
    )
}