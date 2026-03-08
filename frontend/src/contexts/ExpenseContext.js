import {createContext, useState} from 'react'

import {expenseGroupedByOrigin} from '../backend/add';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({children})=>{
    const [originExpense,setOriginExpense] = useState([]);

    const originWiseExpense = async()=>{
        const res = await expenseGroupedByOrigin();
        const data = await res.json();
        console.log(data);
        setOriginExpense(data);
        if(!res.ok) throw new Error(data.message);
        return data;
    }

    return(
        <ExpenseContext.Provider value={{originExpense, originWiseExpense}}>
            {children}
        </ExpenseContext.Provider>
    )

}