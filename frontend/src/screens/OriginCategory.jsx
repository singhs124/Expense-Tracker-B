import React, { useContext, useEffect, useState } from 'react'
import { PieChart as GiftedPieChart } from "react-native-gifted-charts";
import { ActivityIndicator } from 'react-native';
import {scaleOrdinal} from 'd3-scale';
import {schemeCategory10} from 'd3-scale-chromatic';
import chroma from 'chroma-js' ;

import { originColor } from '../constants/originPalette'
import { ExpenseContext } from '../contexts/ExpenseContext'
import CustomPieChart from '../components/PieChartComponet'
import Card from '../components/Card';


const OriginCategory = () => {
    const { originWiseExpense, originExpense } = useContext(ExpenseContext);
    const [chartData, setChartData] = useState([]);
    const [expenseData , setExpenseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noDataMessage,setNoDataMessage] = useState('');

    useEffect(() => {
        const updateData = async ()=>{
            try{
                const data = await originWiseExpense();
                setExpenseData(data);
            } catch(error){
                console.error(error);
                setNoDataMessage(error.message || String(error));
            }
        }
        updateData();
    }, []);

    useEffect(()=>{
        if(originExpense?.length) setExpenseData(originExpense);
    },[originExpense])

    useEffect(() => {
        if (expenseData.length) {
            const colorscale = scaleOrdinal(schemeCategory10);
            const tranformData = expenseData.map((item,idx) => ({
                value: item[1],
                label: item[0],
                color: chroma(colorscale(idx)).brighten(idx*0.5).hex()
            }))
            setChartData(tranformData)
            setLoading(false);
        } else{
            setLoading(false);
        }
    }, [expenseData]);


    return (
        <Card>
            <CustomPieChart
                title="Origin Wise Expenses"
                data={chartData}
                loading={loading}
                noDataMessage={noDataMessage}
            />
        </Card>
    )
}

export default OriginCategory