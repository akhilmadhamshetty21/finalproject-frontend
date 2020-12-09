import React,{useEffect,useContext} from 'react';
import {useHistory,Link} from "react-router-dom";
import {BrowserRouter, Switch,Route} from "react-router-dom";
import UserContext from "../../context/UserContext";
import BarChart from '../../misc/BarChart';
import SecondHeader from "../layout/SecondHeader";

export default function Home() {
    const {userData}=useContext(UserContext);
    const history=useHistory();

    useEffect(()=>{
        if(!userData.user) history.push("/login")
    });
    return (
        <>
        <div className="page">
            {userData.user?(
            <>
            <h1>Welcome {userData.user.displayName}</h1>
            <BarChart/>
            <SecondHeader/>
            </>
            ):
            (<>
                <h2>You are not logged in</h2>
                <Link to="/login">Log in</Link>
            </>
            )}
        </div>
    
        </>
    );
}