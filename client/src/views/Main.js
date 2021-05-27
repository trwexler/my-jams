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

  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect (() => {
    const getItems =  async () =>{
      const result = await axios (
        `https://theaudiodb.com/api/v1/json/523532/mostloved.php?format=track` //Endpoint and parameter or base Url
        )
      console.log(result.data.loved)

      setItems(result.data.loved)//sets the data to appear 
      setLoading(false) //stop loading when data is fetched
    }
    getItems()

  }, [])//when we use useEffect we put dependency as a second paramers


    return(
        <div>
            <Router>
                <LogReg user={user} setUser={setUser} path="/" default/>
                <Landing user={user} setUser={setUser} isLoading={isLoading} items={items} path="/landing"/>
                <ArtistPage user={user} setUser={setUser} path="/artist/:artistId/:id"/> 
                <UserProfile user={user} setUser={setUser} path="/user/:id"/>
                <Feed user={user} setUser={setUser} path="/feed/:id"/>
                <Edit user={user} setUser={setUser} path="/edit/:id"/>
            </Router>
        </div>
    )

}


export default Main;