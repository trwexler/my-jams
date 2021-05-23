import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import LandingCarousel from './LandingCarousel';
import AddButton from './AddButton';
import Header from './Header';
import { Carousel } from 'react-bootstrap';



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

    // Size = number of artists displayed on landing page.
    let size=5;

    return(
        <div>
            <Header user={user}/>
            <h1>Landing</h1>
            {/* <LandingCarousel/> */}


            {
                artistList?
                <div>
                
                    <div>
                    <div class="container-fluid">
                        <div className="row title" style={{ marginBottom: "20px" }}>
                            <div class="col-sm-12">
                                Most Loved Artists
                            </div>
                        </div>
                </div>
                <div className="container-fluid">
                    <Carousel>
                    {
                artistList.slice(0, size).map((artist,index)=>(
                        <Carousel.Item style={{ height: "300px" }}>
                                <img
                                style={{ height: "300px" }}
                                className="d-block w-100"
                                src={"assets/img/img2.jpg"}
                                />
                            <Carousel.Caption>
                            <Link to={`/artist/${artist.idArtist}/${user.id}`}><h3>{artist.strArtist}</h3></Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                         ))
                        }
                </Carousel>
            </div>
            </div>
               
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