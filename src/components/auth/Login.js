import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../../misc/ErrorNotice";
export default function Login() {
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const { setUserData } = useContext(UserContext);
const history = useHistory();
const SERVER_URL = require('../../config/conf').SERVER_URL;
const [error, setError] = useState();
const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      console.log(SERVER_URL);
      const loginRes = await Axios.post(SERVER_URL+"/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
      alert("token expires in 60 seconds");
    } catch (err) {
        err.response.data.msg&&setError(err.response.data.msg);
    }
  };
    return (
      <div className="page">
      <h2>Login</h2>
      {error && <ErrorNotice message={error} clearError={() => setError(undefined) }/>}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
            <input
            id="login-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="login-password">Password</label>
            <input
            id="login-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Login" />
        </form>
        </div>
    )
}
