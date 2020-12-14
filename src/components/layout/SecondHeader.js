import React,{useContext} from 'react';
import {useHistory,Link} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Home from '../pages/Home';

export default function SecondHeader() {
    const {userData,setUserData} = useContext(UserContext);
    const history=useHistory();
    const budget=()=>history.push("/budget");
    const expense=()=>history.push("/expense");
    const logout=()=>{
        setUserData({
            token:undefined,
            user:undefined
        });
        localStorage.setItem("auth-token","");
    };
    return (
        <div>
          <header id ="sheader">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to ="/dashboard">Dashboard</Link></li>
            <li><Link to="/budget">Budget</Link></li>
            <li><Link to="/expense">Expense</Link></li>
        </ul>
          </header>
        </div>
    )
}
