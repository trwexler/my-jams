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
    const {user, setUser, userEmail} = props;


    useEffect(()=>{
        axios.get("http://localhost:8080/getUser/" + userEmail)
            .then((res)=>{
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }, [])



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
    }, [])

    // Size = number of artists displayed on landing page.
    let size=10;

    return(
        <div>
            <Header user={user}  userEmail={userEmail}/>
            <h1>Landing</h1>
            {/* <LandingCarousel/> */}
            {user.email}


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
                                src={artist.strTrackThumb}
                                />
                            <Carousel.Caption>
                            <Link to={`/artist/${artist.idArtist}/${user.email}`}><h3>{artist.strArtist}</h3></Link>
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