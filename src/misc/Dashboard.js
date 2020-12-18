import React,{useEffect,useContext,useState} from 'react';
import {useHistory,Link} from "react-router-dom";
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import UserContext from "../context/UserContext";

export default function Dashboard() {
    const {userData,setUserData} = useContext(UserContext);
    const history=useHistory();
    useEffect(()=>{
        if(!userData.user) history.push("/login")
    });
    return (
        <div>
            <PieChart/>
            <BarChart/>
            <LineChart/>
        </div>
    )
}
