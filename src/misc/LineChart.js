import React,{useEffect,useContext,useState} from 'react';
import { Line } from "react-chartjs-2";
import axios from 'axios';

var data = {
  labels: [],
  datasets: [
    {
      data: [],
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
            }
            console.log(data);
            })
          })
    return (
        <div className="line">
        <Line data={data} />
      </div>
    )
}
