import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import LogReg from './LogReg';
import Landing from '../components/Landing';
import ArtistPage from '../components/ArtistPage';
import UserProfile from '../components/UserProfile';
import Feed from '../components/Feed';
import Edit from '../components/Edit';




const Main = (props)=>{


    return(
        <div>
            <h1>Main</h1>

            <Router>
                <LogReg path="/" default/>
                <Landing path="/landing"/>
                <ArtistPage path="/artist/:id"/>
                {/* The way I handled different users was passing both the current
                User and User Profile as props in the path and rendering
                based on whether they matched or not.
                We can cross that road when we get there. */}
                <UserProfile path="user/:id"/>
                <Feed path="/feed"/>
                <Edit path="/edit/:id"/>
            </Router>
        </div>
    )

}


export default Main;