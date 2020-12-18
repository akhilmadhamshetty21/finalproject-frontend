import React,{useEffect,useContext,useState} from 'react';
import { Line } from "react-chartjs-2";
import axios from 'axios';
const SERVER_URL = require('../config/conf').SERVER_URL;
var data = {
  labels: [],
  label: 'Budgets',
  datasets: [
    {
      label: 'Budgets',
      backgroundColor: 'Green',
      hoverBackgroundColor: 'rgba(255,29,132,0.4)',
      borderWidth: 1,
      data: [],
    },
  ]
};

export default function LineChart() {
  const [budgetNames, setBudgetNames] = useState();
  const [budgetData, setBudgetData] = useState();

    useEffect(() => {
        const token=localStorage.getItem("auth-token");
        axios.get(SERVER_URL+'/budget/all',{
            headers: {
              'x-auth-token': `${token}`
            }
          })
        .then(res => {
            console.log(res.data);
            let bNames = [];
            let bData = [];
            for (var i = 0; i < res.data.length; i++) {
                console.log(res.data[i]);
                bNames.push(res.data[i].title);
                bData.push(res.data[i].cost);
            }
           console.log(bData);
            setBudgetData(bData);
            setBudgetNames(bNames);
            })         

          }, [])

          
    return (
        <div className="line">
        <Line data= {{
  labels: budgetNames,
  datasets: [
    {
      data: budgetData
    },
  ]
}} 
            options={{
              responsive: true,
              scales: {
                yAxes: [{ticks: { beginAtZero: true}}]
              }
            }} 
            title="Personal Budget" redraw />
      </div>
    )
}
