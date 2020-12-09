import React from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

export default function Header() {
    return (
        <header id ="header">   
          <h1>  <Link className="title" to="/">Personal Budget</Link></h1>
          <AuthOptions/>
        </header>
    )
}
