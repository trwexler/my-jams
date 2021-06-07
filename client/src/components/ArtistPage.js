import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import AddButton from './AddButton';
import Edit from './Edit';
import Header from './Header';
import DeleteButton from './DeleteButton';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';




const ArtistPage = (props)=>{

    const {artistId} = props;

    const [albumId, setAlbumId] = useState("");
    const {user, setUser, userEmail, id, setId } = props;


    //will be added from landing page
    // const{artist, artistId} = props;

    const[artist, setArtist] = useState({
        name: "",
        bio:"",
        artistId: "", //will be props.artistId 
    });

    const[albums, setAlbums] = useState([{
        artist: "",
        albumId: "",
        title: "",
        tracks: [],
        albumId: "",
    }]);

    const[tracks,setTracks] = useState([{
        artist: "",
        album: "",
        trackId: "",
        title: "",
        trackId: "",
    }]);

     //gets artist
    useEffect(()=>{
        // console.log(user)
        axios.get(`https://theaudiodb.com/api/v1/json/523532/artist.php?i=${artistId}`)
            .then((res)=>{
                console.log('artist', res.data.artists[0]);
                setArtist({
                    name: res.data.artists[0].strArtist,
                    artistId: res.data.artists[0].idArtist,
                    bio:res.data.artists[0].strBiographyEN,
                    artistPicture: res.data.artists[0].strArtistThumb
                    // albums: res.data.artists[0],
                    // will keep track of which users like them
                    // users: res.data.artists[0]
                })
            })
            .catch((err)=>{
                console.log(err);
            })
    },[artistId])

    useEffect(()=>{
        let storageRetreiver = localStorage.getItem('email');
        setUser({...user, email:storageRetreiver})
    }, [])


    useEffect(()=>{
        const json = localStorage.getItem("email");
        const storageRetreiver = JSON.parse(json);
        axios.get("http://localhost:8080/getUser/" + storageRetreiver)
            .then((res)=>{
                console.log(res.data);
                setUser(res.data);
                console.log("http://localhost:8080/getUser/" + storageRetreiver);
            })
            .catch((err)=>{
                console.log(err);
            })
        }, [])


    //gets all of that artist's albums
    useEffect(()=>{
        axios.get(`https://theaudiodb.com/api/v1/json/523532/album.php?i=${artistId}`)
            .then((res)=>{
                console.log('albums', res.data.album);
                setAlbums(res.data.album);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [artistId])



    //gets all of that album's tracks
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


    const addHandler = ((e)=>{
        axios.post(`http://localhost:8080/likeArtist/${user.id}/${artistId}`,{
            artistName: artist.name,
            urlArt: artist.artistPicture
        })
        .then((res)=>{
            console.log(res);
            // setUser({...user,
            //     [e.target.name]: e.target.value
            // })
        })
        .catch((err)=>{
            console.log(err);
        })
    })



    const addAlbumHandler = ((e)=>{
        axios.post(`http://localhost:8080/likeAlbum/${user.id}/${e.target.value}`, {
            userid: user.id,
            albumId: e.target.value
        })
        .then((res)=>{
            console.log(res);
            // setUser({...user,
            //     [e.target.name]: e.target.value
            // })
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    

    const addTrackHandler = ((e)=>{
        axios.post(`http://localhost:8080/likeTrack/${user.id}/${e.target.value}`, {
            userid: user.id,
            trackName: e.target.value
        })
        .then((res)=>{
            console.log(res);
            // setUser({...user,
            //     [e.target.name]: e.target.value
            // })
        })
        .catch((err)=>{
            console.log(err);
        })
    })

    return(
        <div style={{overflow:"hidden"}}>
            <Header id={user.id} user={user} userEmail={userEmail}/>
                <div className="" style={{background: "linear-gradient(167deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)", paddingBottom:"30px"}}>

                    <div d-flex>
                        <h1 className="d-inline mx-2" style={{verticalAlign:"middle"}}>
                        {artist.name}
                        </h1>

                        <button 
                        style={{borderRadius:"50%", fontSize:"20px", opacity:"0.8"}}
                        name="artists" 
                        className="btn"
                        value={artist.name}
                        onClick={addHandler}>
                        +
                        </button>
                    </div>

                    <SimpleBar style={{ maxHeight: "200px" }}>
                    <p className="w-75 w-sm-50 mx-auto my-4" style={{color:"black"}}>
                    {artist.bio}
                    </p>
                    </SimpleBar>

                </div>
                





            <div className=".container-fluid border mx-auto">
            
                <SimpleBar id="tracksList" className="d-none mx-auto .bg-dark position-fixed" 
                style={{width:"90vw", backgroundColor:"black", opacity:".9", zIndex:"100", top:"0px", bottom:"0px", right:"0px", left:"0px", textAlign:"left"}}>
                <div>

                    <button className="btn btn-primary position-fixed btn-sm" onClick={closeTrack}>close</button>
                    
                    {
                        tracks.map((track,index)=>(
                            <div key={index} className="mx-auto w-100">
                                <div className="d-flex mx-auto justify-content-center">
                                    <button onClick={addTrackHandler} name="tracks" value={track.strTrack} className="btn btn-primary btn-sm m-2">add</button>
                                    <p className="p-0 mx-2 mt-3 h1 w-50" key={index}>{track.strTrack}</p>
                                </div>
                                <hr/>
                            </div>
                        ))
                    }

                </div>
                </SimpleBar>


                <div className="row" style={{background:"black"}}>
                    {
                        albums?
                        
                        albums.map((album, index)=>(
                            <div key={index} className="mx-auto col-md-4 my-3 position-relative">
                                <p style={{height:"30px", fontSize:"20px"}} className="overflow-hidden">{album.strAlbum}</p>

                                {/* Renders based on availability of album art */}

                                {
                                    album.strAlbumThumb?

                                    <div>

                                        <img style={{width:"90%"}} className="" src={album.strAlbumThumb} alt="" />
                                        
                                        <button style={{position:"absolute", left:"45px", bottom:"0px", opacity:"0.9"}} className="btn" onClick={(e)=>trackHandler(album.idAlbum)}>
                                        view tracks
                                        </button>

                                        <button  style={{position:"absolute", transform:"translate(-50%, -3%)", top:"50%", left:"50%", borderRadius:"50%", fontSize:"20px", opacity:"0.8"}}
                                        name="albums" 
                                        value={album.idAlbum} className="btn"
                                        onClick={addAlbumHandler}>
                                        +
                                        </button>

                                    </div>

                                    :
                                    <div>
                                        <img src={"https://images.8tracks.com/cover/i/000/471/318/record-7500.jpg?rect=0,0,1385,1385&q=98&fm=jpg&fit=max&w=1024&h=1024"} />

                                        <button style={{position:"absolute", left:"45px", bottom:"0px", opacity:"0.9"}} className="btn" onClick={(e)=>trackHandler(album.idAlbum)}>
                                        view tracks
                                        </button>

                                        <button  style={{position:"absolute", transform:"translate(-50%, -3%)", top:"50%", left:"50%", borderRadius:"50%", fontSize:"20px", opacity:"0.8"}}
                                        name="albums" 
                                        value={album.idAlbum} className="btn"
                                        onClick={addAlbumHandler}>
                                        +
                                        </button>

                                    </div>

                                }

                            </div>
                        ))
                    
                    :<h1 className="mx-auto">Loading...</h1>

                    }

                </div>
            </div>



            

        </div>
    )

}


export default ArtistPage;