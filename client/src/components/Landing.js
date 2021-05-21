import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import LandingCarousel from './LandingCarousel';
import AddButton from './AddButton';
import Header from './Header';



// 523532 API KEY
const Landing = (props)=>{

    const [artistList, setArtistList] = useState([]);
    const {user, setUser} = props;

//for user method tests
useEffect(()=>{
    setUser({
        firstName: "joe",
        lastName: "walker",
        userName: "joejoe",
        id: "22222",
        albums:[],
        tracks:[],
        artists: [],
        email: "joe@aol.com",
        password: "123456789",
    })
},[])



    useEffect(()=>{
        axios.get('https://theaudiodb.com/api/v1/json/523532/mostloved.php?format=track')
            .then((res)=>{
                console.log('mostloved', res.data);
                console.log(res.data.loved);
                setArtistList(res.data.loved);

            })
            .catch((err)=>{
                console.log(err);
            })
    },[])

    return(
        <div>
            <Header user={user}/>
            <h1>Landing</h1>
            {/* <LandingCarousel/> */}

            {
                artistList?
                <div>
                {
                artistList.map((artist,index)=>(
                    <Link key={index} to={`/artist/${artist.idArtist}/${user.id}`}><p >{artist.strArtist}</p></Link>
                ))
                }
                </div>
                : <h1>Loading...</h1>
            }

            {/* {
                artistList.map((artist,index)=>(
                    <Link to={`/artist/${artist.idArtist}/${user.id}`}><p key={index}>{artist.strArtist}</p></Link>
                ))
            } */}

        </div>
    )

}


export default Landing;