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

    const trackHandler = ()=>{
        axios.get('https://theaudiodb.com/api/v1/json/1/track.php?m=2115888')
        .then((res)=>{
            console.log('tracks', res.data.track);
            setAlbums(res.data.track);
        })
        .catch((err)=>{
            console.log(err);
        })

    }








    return(
        <div>
            <Header/>
            <h1>ArtistPage</h1>
            {
                artist.name
            }
            <div className=".container-fluid border">

            <div className="row">
            {
                albums.map((album, index)=>(
                    <div className="border mx-auto w-25 .col-4 my-3">
                        <p>{album.strAlbum}</p>
                        <img className="w-50" src={album.strAlbumThumb} alt="" />
                    </div>
                ))
            }
            </div>

            </div>

            

        </div>
    )

}


export default ArtistPage;