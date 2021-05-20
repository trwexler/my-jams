import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import AddButton from './AddButton';
import Edit from './Edit';
import Header from './Header';
import DeleteButton from './DeleteButton';





const ArtistPage = (props)=>{

    //will be added from landing page
    // const{artist, artistId} = props;


    const[artist, setArtist] = useState({
        name: "",
        artistId: "",
        bio:"",
        albums: [],
        artistId: "", //will be props.artistId
        users: []   
    });

    const[albums, setAlbums] = useState([{
        artist: "",
        title: "",
        tracks: [],
        albumId: "",
        users: []
    }]);

    const[tracks,setTracks] = useState([{
        artist: "",
        album: "",
        title: "",
        trackId: "",
        users: []
    }]);

    const[user,setUser] = useState({
        firstName: "joe",
        lastName: "walker",
        userName: "joejoe",
        email: "joe@aol.com",
        password: "123456789",
    })

    useEffect(()=>{
        axios.post('http://localhost:8080/register', user)
        .then((user)=>{
                console.log('user', user);
                setUser({
                    firstName:"",
                    lastName: "",
                    userName: "",
                    email: "",
                    password: "",
                });
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])




     //get artist
    //Will look like:
    // axios.get('https://theaudiodb.com/api/v1/json/{APIKEYHERE}/artist.php?i=' + 'artistId')

    useEffect(()=>{
        axios.get('https://theaudiodb.com/api/v1/json/523532/artist.php?i=112024')
            .then((res)=>{
                console.log('artist', res.data.artists[0]);
                setArtist({
                    name: res.data.artists[0].strArtist,
                    artistId: res.data.artists[0].idArtist,
                    bio:res.data.artists[0].strBiographyEN,
                    // albums: res.data.artists[0],
                    // will keep track of which users like them
                    // users: res.data.artists[0]
                })
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])




    //gets all of that artist's albums

    //Will look like:
    // axios.get('https://theaudiodb.com/api/v1/json/1/album.php?i=' + 'artistId')

    useEffect(()=>{
        axios.get(`https://theaudiodb.com/api/v1/json/523532/album.php?i=${artist.artistId}`)
            .then((res)=>{
                console.log('albums', res.data.album);
                setAlbums(res.data.album);
                console.log(artist);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])





    //gets all of that album's tracks

    //Will look like:
    // axios.get('https://theaudiodb.com/api/v1/json/1/track.php?m=' + 'albumID')

    const trackHandler = (id)=>{
        axios.get('https://theaudiodb.com/api/v1/json/523532/track.php?m=' + id)
        .then((res)=>{
            console.log('tracks', res.data.track);
            setTracks(res.data.track);
            let tracksList = document.getElementById('tracksList');
            tracksList.classList.remove("d-none");
            tracksList.classList.add("d-block");
        })
        .catch((err)=>{
            console.log(err);
        })

    }



    // when trackList "x" is clicked, the tracklist closes.
    const closeTrack = (e)=>{
        let tracksList = document.getElementById('tracksList');
        tracksList.classList.remove("d-block");
        tracksList.classList.add("d-none");
    }



    // useEffect(()=>{
    //     axios.get('https://theaudiodb.com/api/v1/json/523532/album.php?i=112024')
    //         .then((res)=>{
    //             console.log('albums', res.data.album);
    //             setAlbums(res.data.album);
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         })
    // },[])







    return(
        <div>
            <Header/>
        
                <h1>
                    {
                        artist.name
                    }
                    <button className="btn btn-primary btn-sm m-1">+</button>
                </h1>
                


{/* 
            <div id="tracksList" className="d-none">
            <button className="btn btn-primary btn-sm" onClick={closeTrack}>x</button>
            
            {
                tracks.map((track,index)=>(
                    <div className=" mx-auto d-flex">
                        <div className="d-flex mx-auto w-25">
                            <button className="btn btn-primary btn-sm m-2">+</button>
                            <p className="p-0 mx-2" key={index}>{track.strTrack}</p>
                        </div>
                    </div>
                ))
            }
            </div> */}


            <div className=".container-fluid border">
                <div className="row">
                    {
                        albums?
                        
                        albums.map((album, index)=>(
                            <div key={index} className="border mx-auto w-25 .col-4 my-3">
                                <p>{album.strAlbum}</p>
                                <button className="btn btn-primary btn-sm">Add</button>
                                <img className="w-50" src={album.strAlbumThumb} alt="" />
                                <button className="btn btn-primary btn-sm" onClick={(e)=>trackHandler(album.idAlbum)}>
                                tracks
                                </button>
                            </div>
                        ))
                    
                    :<h1 className="mx-auto">Loading...</h1>

                    }

                </div>
            </div>

            <div id="tracksList" className="d-none">
            <button className="btn btn-primary btn-sm" onClick={closeTrack}>x</button>
            
            {
                tracks.map((track,index)=>(
                    <div className=" mx-auto d-flex">
                        <div className="d-flex mx-auto w-25">
                            <button className="btn btn-primary btn-sm m-2">+</button>
                            <p className="p-0 mx-2" key={index}>{track.strTrack}</p>
                        </div>
                    </div>
                ))
            }
            </div>

            

        </div>
    )

}


export default ArtistPage;