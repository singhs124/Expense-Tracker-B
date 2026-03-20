import { createContext, useState } from 'react';

import { expenseGroupedByOrigin, totalExpenseApi } from '../services/api/add';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({children})=>{
    const [originExpense,setOriginExpense] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);

    const originWiseExpense = async()=>{
        const data = await expenseGroupedByOrigin();
        console.log(data);
        setOriginExpense(data);
        return data;
    }

    const totalExpenseUpdate = async()=>{
        const data = await totalExpenseApi();
        console.log(data);
        setTotalExpense(data);
        return data;
    }

    return(
        <ExpenseContext.Provider value={{originExpense, originWiseExpense, totalExpense, totalExpenseUpdate}}>
            {children}
        </ExpenseContext.Provider>
    )

}