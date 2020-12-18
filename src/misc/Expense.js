import React,{useEffect,useContext,useState} from 'react';
import {useHistory,Link} from "react-router-dom";
import UserContext from "../context/UserContext";
import SecondHeader from "../components/layout/SecondHeader"
import ErrorNotice from "./ErrorNotice";
import Axios from 'axios';
const SERVER_URL = require('../config/conf').SERVER_URL;
export default function Expense() {
    const [title,setTitle] = useState();
    const [month, setMonth] = useState();
    const [year,setYear] =useState();
    const [cost,setCost] = useState();
    const [error, setError] = useState();
    const {userData,setUserData} = useContext(UserContext);
    const history=useHistory();
    useEffect(()=>{
        if(!userData.user) history.push("/login")
    });
    const submit = async (e) => {
        e.preventDefault();
        
        try {
          const token=localStorage.getItem("auth-token");
          const newExpense={title,month,year,cost};
          console.log(newExpense)
          await Axios.post(SERVER_URL+"/expense",newExpense,{
            headers: {
              'x-auth-token': `${token}`
            }
          });
          history.push("/");
        } catch (err) {
            err.response.data.msg&&setError(err.response.data.msg);
        }
      };
    return (
        <>
        <div className="page">
            {userData.user?(
            <>
            <SecondHeader/>
            <h1>Add Expense</h1>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined) }/>}
            <form className="form" onSubmit={submit}>
            <label htmlFor="title">Title</label>
            <select id="title" onChange={(e) => setTitle(e.target.value)}>
            <option value="selectexpense">Select expense type</option>
                <option value="electricity">Electricity</option>
                <option value="rent">Rent</option>
                <option value="eatout">Eat out</option>
                <option value="groceries">Groceries</option>
                <option value="waterbill">Water bill</option>
                <option value="creditcard">Credit card</option>
                <option value="other">Others</option>
            </select>

            <label htmlFor="month">Month</label>
            <input
            id="month"
            type="text"
            onChange={(e) => setMonth(e.target.value)}
            />
            <label htmlFor="year">Year</label>
            <input id="year" type="text"
            onChange={(e) => setYear(e.target.value)}
            />
            <label htmlFor="cost">Cost</label>
            <input id="cost" type="text"
            onChange={(e) => setCost(e.target.value)}
            />

            <input type="submit" value="Add Expense" />
      </form>

            </>
            ):
            (<>
                <h2>You are not logged in</h2>
                <Link to="/login">Log in</Link>
            </>
            )}
        </div>
    
        </>
    )
}
