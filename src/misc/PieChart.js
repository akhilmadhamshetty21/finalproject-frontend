import React, { useState, useContext } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
const SERVER_URL = require('../config/conf').SERVER_URL;
export default function PieChart() {
    const [month,setMonth] =useState();
    const [year, setYear] = useState();
    const [graph,setGraph] =useState();
    const [error, setError] = useState();
    var dataSource = {
        datasets: [
            {
                data: [],
                backgroundColor: [
                ]
            }],
        labels: []
    };
    var budgetdataSource = {
        datasets: [
            {
                data: [],
                backgroundColor: [],
            }],
        labels: []
    };
    const submit = async (e) => {
        e.preventDefault();
        try {
            const token=localStorage.getItem("auth-token");
            axios.get(SERVER_URL+'/expense/getexpense',{params:{
                'month':month,
                'year':year
              }, headers: {
                'x-auth-token': `${token}`
              }})
            .then(res=>{
                for (var i = 0; i < res.data.length; i++) {
                    dataSource.datasets[0].data[i] = res.data[i].cost;
                    dataSource.labels[i] = res.data[i].title;
                    dataSource.datasets[0].backgroundColor[i]='#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                }
                if(res){
                    setGraph(true);
                    createChart();
                }
            })
            axios.get(SERVER_URL+'/budget/all',{headers: {
                'x-auth-token': `${token}`
              }})
            .then(res=>{
                for (var i = 0; i < res.data.length; i++) {
                    budgetdataSource.datasets[0].data[i] = res.data[i].cost;
                    budgetdataSource.labels[i] = res.data[i].title;
                    budgetdataSource.datasets[0].backgroundColor[i]='#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                }
                if(res){
                    setGraph(true);
                    createBudgetChart();
                }
            })
            function createChart() {
                var ctx = document.getElementById("myExpenseChart").getContext("2d");
                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: dataSource
                });
            }
            function createBudgetChart() {
                var ctx = document.getElementById("myBudgetChart").getContext("2d");
                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: budgetdataSource
                });
            }
        } catch (err) {
            err.response.data.msg&&setError(err.response.data.msg);
        }
      };
    return (
        <div>
            <form className="form" onSubmit={submit}>
            <label htmlFor="expense-month">Month Of Expense</label>
            <input
            id="expense-month"
            type="text"
            onChange={(e) => setMonth(e.target.value)}
            />
            <label htmlFor="expense-year">Year of Expense</label>
            <input
            id="expense-year"
            type="text"
            onChange={(e) => setYear(e.target.value)}
            />
            <input type="submit" value="submit" />
        </form>
        {graph?(<>
            Expense Data
            <canvas id="myExpenseChart"></canvas>
            <canvas id="myBudgetChart"></canvas>
            </>):(<>
            No graph available following data</>)}
        </div>
    )
}
