import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import Registration from '../components/Registration';




// 523532 API KEY

const LogReg = (props)=>{
    const {user, setUser} = props;


    return(
        <div>

            <Registration user={user} setUser={setUser}/>

        </div>
    )

}


export default LogReg;