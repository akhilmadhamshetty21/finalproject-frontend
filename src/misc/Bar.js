import React,{useEffect,useContext,useState} from 'react';
import { Bar } from "react-chartjs-2";
import axios from 'axios';

var data = {
  labels: [],
  datasets: [
    {
      label: 'Budgets',
      backgroundColor: 'orange',
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      borderWidth: 1,
      data: [],
    },
  ]
};

export default function BarChart() {
  const [budgetNames, setBudgetNames] = useState();
  const [budgetData, setBudgetData] = useState();

    useEffect(() => {
        const token=localStorage.getItem("auth-token");
        axios.get('http://localhost:5000/budget/all',{
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
        <div className="App">
        <Bar data= {{
  labels: budgetNames,
  datasets: [
    {
      label: 'Budgets',
      backgroundColor: 'orange',
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      borderWidth: 1,
      data: budgetData,
    },
  ]
}} 
            width={null}
            height={null}
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
