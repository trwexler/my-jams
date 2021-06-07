import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import Header from './Header';


const Feed = (props)=>{

    const {user, setUser} = props;
    const [recommends, setRecommends] = useState([])

    const [newRecommends, setNewRecommends] = useState({
        // userName: "",
        artistName: "",
        content: ""
    })

    useEffect(()=>{
        setNewRecommends({
            // userName: user.userName,
            artistName: "",
            content: ""})
    },[user])
    


    //addpost userid/artistid   post call needed



    useEffect(()=>{
        const json = localStorage.getItem("email");
        const storageRetreiver = JSON.parse(json);
        console.log(user.userName);
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


        const handleChange = (e) => {
            console.log(newRecommends);
            setNewRecommends({
                ...newRecommends,
                [e.target.name]: e.target.value,
            })
        }


        const submitHandler = (e)=>{
            e.preventDefault();
            axios.post(`http://localhost:8080/addPost/${user.id}/${artistId}`,{
                userid: user.id,
                artistId
            })
            .then((res)=>{
                console.log(res);
                setRecommends([...recommends, {
                    // userName: newRecommends.userName,
                    // artistImg: res.data.artists[0].strArtistFanart,
                    artistName: newRecommends.artistName,
                    content: newRecommends.content
                }])
            })
            .catch((err)=>{
                console.log(err);
            })

            // axios.get(`https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${newRecommends.artistName}`)
            // axios.get(`https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${newRecommends.artistName}`)
            // .then((res)=>{
            //     console.log(res);
            //     setRecommends([...recommends, {
            //         userName: newRecommends.userName,
            //         artistImg: res.data.artists[0].strArtistFanart,
            //         artistName: res.data.artists[0].strArtist,
            //         content: newRecommends.content
            //     }])
            // })
            // .catch((err)=>{
            //     console.log(err);
            // })
        }



    return(

        <div>


            <Header user={user} id={user.id}/>
            <h1 style={{fontFamily:"Bangers, cursive", fontSize:"50px", color:"black", marginBottom:"0", background: "linear-gradient(90deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)"}}>My Feed</h1>


            <form onSubmit={submitHandler} style={{background: "linear-gradient(90deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)"}}>
                <label className="m-2" style={{color:"black", fontSize:"20px"}}>What are you listening to?</label>
                <input onChange={handleChange} type="text" value={newRecommends.artistName} name="artistName" className="border"/>

                <label className="m-2" style={{color:"black", fontSize:"20px"}}>Recommendation</label>
                <input onChange={handleChange} type="text" value={newRecommends.content} name="content" className="border"/>

                <br/>
                <button className="btn" style={{opacity:"0.9", marginTop:"10px", marginBottom:"15px"}}>Post</button>
            </form>

            <div className="flex flex-col-reverse">

                {
                    
                    recommends.map((recommend, index)=>(
                        <div key={index} className="border" style={{background: "linear-gradient(90deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)"}}>
                            <h2 style={{color:"black"}}>{recommend.userName} recommends {recommend.artistName}</h2>
                            <img src={recommend.artistImg} alt="" />
                            <h2 style={{color:"black"}}>{recommend.userName}'s review:</h2> 
                            <p style={{color:"black", fontSize:"22px", width:"50%"}} className="mx-auto">{recommend.content}</p>
                        </div>
                    ))
                    
                }


            </div>
            
        </div>
    )

}


export default Feed;