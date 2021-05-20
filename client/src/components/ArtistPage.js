import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import AddButton from './AddButton';
import Edit from './Edit';
import Header from './Header';
import DeleteButton from './DeleteButton';





const ArtistPage = (props)=>{


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


     //get artist
    //Will look like:
    // axios.get('https://theaudiodb.com/api/v1/json/{APIKEYHERE}/artist.php?i=' + 'artistId')

    useEffect(()=>{
        axios.get('https://theaudiodb.com/api/v1/json/1/artist.php?i=112024')
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
        axios.get('https://theaudiodb.com/api/v1/json/1/album.php?i=112024')
            .then((res)=>{
                console.log('albums', res.data.album);
                setAlbums(res.data.album);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])


    //gets all of that album's tracks

    //Will look like:
    // axios.get('https://theaudiodb.com/api/v1/json/1/track.php?m=' + 'albumID')

    const trackHandler = (id)=>{
        axios.get('https://theaudiodb.com/api/v1/json/1/track.php?m=' + id)
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

    const closeTrack = (e)=>{
        let tracksList = document.getElementById('tracksList');
        tracksList.classList.remove("d-block");
        tracksList.classList.add("d-none");
    }


    return(
        <div>
            <Header/>
            <h1>
                {
                    artist.name
                }
                <button className="button-small">+</button>
            </h1>


            {/* <button>track</button> */}

            <div id="tracksList" className="d-none">
            <button onClick={closeTrack}>x</button>
            
            {
                tracks.map((track,index)=>(
                    <div className=" mx-auto d-flex">
                        <div className="d-flex mx-auto w-25">
                            <button className="m-0">+</button>
                            <p className="p-0 mx-2 mt-1" key={index}>{track.strTrack}</p>
                        </div>
                    </div>
                ))
            }
            </div>


            <div className=".container-fluid border">
                <div className="row">
                    {
                        albums.map((album, index)=>(
                            <div key={index} className="border mx-auto w-25 .col-4 my-3">
                                <p>{album.strAlbum}</p>
                                <button>Add</button>
                                <img className="w-50" src={album.strAlbumThumb} alt="" />
                                <button onClick={(e)=>trackHandler(album.idAlbum)}>
                                tracks
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>

            

        </div>
    )

}


export default ArtistPage;