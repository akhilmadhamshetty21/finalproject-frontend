import React,{useEffect,useContext,useState} from 'react';
import { Bar } from "react-chartjs-2";
import axios from 'axios';

var data = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor:[],
      label:[],
    },
  ]
};

export default function BarChart() {
    
    useEffect(() => {
        const token=localStorage.getItem("auth-token");
        axios.get('http://localhost:5000/budget/all',{
            headers: {
              'x-auth-token': `${token}`
            }
          })
        .then(res => {
            for (var i = 0; i < res.data.length; i++) {
                data.labels[i]=res.data[i].title;
                data.datasets[0].data[i]=res.data[i].cost;
                data.datasets[0].label[i]=res.data[i].title;
                data.datasets[0].backgroundColor[i]='#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
            }
            console.log(data);
            })
          })
    return (
        <div className="bar">
        <Bar data={data} />
      </div>
    )
}
