import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch,Route} from "react-router-dom";
import Home from './components/pages/Home';
import login from './components/auth/Login';
import register from './components/auth/Register';
import Header from './components/layout/Header';
import UserContext from "./context/UserContext";
import Axios from "axios";
import "./style.css";
import Budget from './misc/Budget';
import Expense from './misc/Expense';
import Dashboard from './misc/Dashboard';
const SERVER_URL = require('./config/conf').SERVER_URL;
export default function App() {
    const [userData,setUserData] =useState({
        token:undefined,
        user:undefined,
    });

    useEffect(()=>{
        const checkLoggedIn=async ()=>{
            let token=localStorage.getItem("auth-token");
            if(token===null){
                localStorage.setItem("auth-token","");
                token="";
            }
            const tokenRes=await Axios.post(SERVER_URL+"/users/tokenIsValid",null,{headers:{"x-auth-token":token}});
            if(tokenRes.data){
                const userRes=await Axios.get(SERVER_URL+"/users/",{headers:{"x-auth-token":token},});
                setUserData({
                    token,
                    user:userRes.data,
                })
            }
        };
        checkLoggedIn();
    },[]);
    return (
    <>
        <BrowserRouter>
        <UserContext.Provider value={{userData,setUserData}}>
            <Header/>
            <div className="container">
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/login" component={login}></Route>
                <Route path="/register" component={register}></Route>
                <Route path="/budget" component={Budget}></Route>
                <Route path="/expense" component={Expense}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
            </Switch>
            </div>
            </UserContext.Provider>
        </BrowserRouter>
    
    </>
    );
}
