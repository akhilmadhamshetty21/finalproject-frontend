import React,{useEffect,useContext,useState} from 'react';
import {useHistory,Link} from "react-router-dom";
import UserContext from "../context/UserContext";
import SecondHeader from "../components/layout/SecondHeader"
import ErrorNotice from "./ErrorNotice";
import Axios from 'axios';
const SERVER_URL = require('../config/conf').SERVER_URL;
export default function Budget() {
    const [title,setTitle] =useState();
    const [cost,setBudget] = useState();
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
          const newBudget={title,cost};
          await Axios.post(SERVER_URL+"/budget",newBudget,{
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
            <h1>Add Budget</h1>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined) }/>}
            <form className="form" onSubmit={submit}>
            <label htmlFor="title">Title</label>
            <select id="title" onChange={(e) => setTitle(e.target.value)}>
                <option value="selectbudget">Select budget type</option>
                <option value="electricity">Electricity</option>
                <option value="rent">Rent</option>
                <option value="eatout">Eat out</option>
                <option value="groceries">Groceries</option>
                <option value="waterbill">Water bill</option>
                <option value="creditcard">Credit card</option>
                <option value="other">Others</option>
            </select>


            <label htmlFor="cost">Cost</label>
            <input
            id="cost"
            type="text"
            onChange={(e) => setBudget(e.target.value)}
            />

            <input type="submit" value="Add Budget" />
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
