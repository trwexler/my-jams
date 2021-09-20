import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import Header from './Header';




const Feed = (props)=>{
    const {user, setUser} = props;
    const [artistId, setArtistId] = useState(0);
    const [recommends, setRecommends] = useState([])
    const [artistPic, setArtistPic] = useState([]);

    // const [artist, setArtist] = useState({

    // })

    const [newRecommends, setNewRecommends] = useState({
        artistName: "",
        content: "",
        userName:user.userName,
        creatorId: user.id,
        artistPic:""
    })

    useEffect(()=>{
        setNewRecommends({
            artistName: "",
            content: "",
            userName:user.userName,
            creatorId: user.id,
            artistPic:""
        })

    },[recommends])
    
    //addpost userid/artistid   post call needed



    useEffect(()=>{
        const json = localStorage.getItem("email");
        const storageRetreiver = JSON.parse(json);
        console.log(user);
        axios.get("http://localhost:8080/getUser/" + storageRetreiver)
            .then((res)=>{
                console.log(res.data);
                setUser(res.data);
                console.log("http://localhost:8080/getUser/" + storageRetreiver);
                console.log(newRecommends);
            })
            .catch((err)=>{
                console.log(err);
            })
        }, [])

        useEffect(()=>{
            axios.get('http://localhost:8080/getAllPosts')
                .then((res)=>{
                    console.log(res.data);
                    setRecommends(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
        },[])

        const handleChange = (e) => {
            // axios.get(`https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${e.target.value}`)
            //     .then((res)=>{
            //         console.log(res);
            //     })
            
            console.log(e.target.name, e.target.value);
            console.log(newRecommends);
            setNewRecommends({
                ...newRecommends,
                [e.target.name]: e.target.value,
            })
        }


        const submitHandler = (e)=>{
            e.preventDefault();

            axios.get(`https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${newRecommends.artistName}`)
            .then((res)=>{
                setArtistPic(res.data.artists[0].strArtistThumb);
            })
            .catch((err)=>{
                console.log(err);
            })

            axios.post(`http://localhost:8080/addPost/${user.id}/${artistId}`, 
            newRecommends)
                .then((res)=>{
                    console.log(res);
                    let fullRecommendList = [...recommends, {
                        content: newRecommends.content, 
                        artistName: newRecommends.artistName,
                        userName:newRecommends.userName,
                        creatorId: newRecommends.creatorId,
                        artistPic: artistPic
                    }];
                        setRecommends(fullRecommendList); 
                })
                .catch((err)=>{
                    console.log(err);
                })

        }

    return(

        <div>

            <Header user={user} id={user.id}/>
            <h1 style={{fontFamily:"Bangers, cursive", fontSize:"50px", color:"black", marginBottom:"0", background: "linear-gradient(90deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)"}}>Jams Community Reviews</h1>


            <form onSubmit={submitHandler} style={{background: "linear-gradient(90deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)"}}>

                <label className="m-2" style={{color:"black", fontSize:"20px"}}>Leave a review for one of your artists!</label>


                <select name="artistName" onChange={handleChange} >
                    <option value="" default>Your Artists</option>
                    {
                        user.artists.map((artist, index)=>(
                            <option onClick={((e)=>setArtistId(artist.id))} key={index} value={artist.artistName}>
                                {artist.artistName}
                            </option>
                        ))
                    }
                </select>
                <br/>

                <label className="m-2" style={{color:"black", fontSize:"20px"}}>Review</label>
                <input onChange={handleChange} type="text" value={newRecommends.content} name="content" className="border"/>


                <br/>
                <button className="btn" style={{opacity:"0.9", marginTop:"10px", marginBottom:"15px"}}>Post</button>

            </form>

            <div className="flex flex-col-reverse" style={{display:"flex", flexDirection:"column-reverse"}}>

                {
                    recommends.map((recommend, index)=>(
                        <div key={index} className="border" style={{background: "linear-gradient(90deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)", display:"flex", flexDirection:"column"}}>
                        <Link to={`/user/${recommend.creatorId}`}> 
                        <p style={{color:"black", fontSize:"20px"}}>{recommend.userName}'s review of {recommend.artistName}</p>
                        </Link>
                            {
                                recommend.postArtists?
                                <img className="mx-auto" style={{width:"32%", height:"400px"}} src={recommend.postArtists[0].urlArt} alt="" />
                                :
                                <img className="mx-auto" style={{width:"32%", height:"400px"}} src={artistPic} alt="" />
                            }
                            
                            <p style={{color:"black", fontSize:"20px"}}>What {recommend.userName} thought:</p> 
                            <p style={{color:"black", fontSize:"16px"}}>{recommend.content}</p>
                        </div>
                    ))
                }
            

            </div>
            
        </div>
    )

}


export default Feed;