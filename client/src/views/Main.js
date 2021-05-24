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
    const {user, setUser} = props;

    return(
        <div>
            {/* <h1>Main</h1> */}
            

            <Router>
                <LogReg user={user} setUser={setUser} path="/" default/>
                <Landing user={user} setUser={setUser} path="/landing"/>
                <ArtistPage user={user} setUser={setUser} path="/artist/:artistId/:id"/> 
                {/* The way I handled different users was passing both the current
                User and User Profile as props in the path and rendering
                based on whether they matched or not.
                We can cross that road when we get there. */}
                <UserProfile user={user} setUser={setUser} path="/user/:id"/>
                <Feed user={user} setUser={setUser} path="/feed"/>
                <Edit user={user} setUser={setUser} path="/edit/:id"/>
            </Router>
        </div>
    )

}


export default Main;