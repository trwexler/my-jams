import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import Header from './Header';




const Feed = (props)=>{
    const {user, setUser} = props;
    const [recommends, setRecommends] = useState([])

    const [newRecommends, setNewRecommends] = useState({
        userName: "",
        artistName: "",
        content: ""
    })

    useEffect(()=>{
        setNewRecommends({
            userName: user.userName,
            artistName: "",
            content: ""})

    },[user])
    


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

            axios.get(`https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${newRecommends.artistName}`)
            .then((res)=>{
                console.log(res);
    
                setRecommends([...recommends, {
                    userName: newRecommends.userName,
                    artistImg: res.data.artists[0].strArtistFanart,
                    artistName: res.data.artists[0].strArtist,
                    content: newRecommends.content
                }])
            })
            .catch((err)=>{
                console.log(err);
            })

        }



    return(

        <div>


            <Header user={user} id={user.id}/>


            <form onSubmit={submitHandler}>
                <label className="m-2">What are you listening to?</label>
                <input onChange={handleChange} type="text" value={newRecommends.artistName} name="artistName" className="border"/>

                <label className="m-2">Recommendation</label>
                <input onChange={handleChange} type="text" value={newRecommends.content} name="content" className="border"/>

                <br/>
                <button className="mx-auto my-3 p-3 rounded shadow-md w-24 hover:bg-blue-100">Post</button>
            </form>

            <div className="flex flex-col-reverse">

                {
                    recommends.map((recommend, index)=>(
                        <div key={index} className="border">
                            <p>{recommend.userName} recommends {recommend.artistName}</p>
                            
                            <img src={recommend.artistImg} alt="" />
                            <p>{recommend.userName}'s review:</p> 
                            <p>{recommend.content}</p>
                        </div>
                    ))
                }
            

            </div>
            
        </div>
    )

}


export default Feed;