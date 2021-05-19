import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import Login from '../components/Login';
import Registration from '../components/Registration';





const LogReg = (props)=>{


    return(
        <div>
            <h1>LogReg</h1>
            <Login/>
            <Registration/>

        </div>
    )

}


export default LogReg;