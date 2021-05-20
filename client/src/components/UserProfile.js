import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import AddButton from './AddButton';
import Edit from './Edit';
import Header from './Header';
import DeleteButton from './DeleteButton';



const UserProfile = (props)=>{


    return(
        <div>
            <Header/>
            <h1>UserProfile</h1>

        </div>
    )

}


export default UserProfile;