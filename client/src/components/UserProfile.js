import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
// import like from '../components/like.svg';
// import profilepic from '../components/profilepic.svg';
// import Upload from '../components/Upload';
import Edit from '../components/Edit';
// import TeamEditor from '../components/TeamEditor';


const Profile = (props) =>{

    const {user, setUser, userEmail} = props;
    const [userProfile, setUserProfile] = useState({});
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/getUser/" + user.email)
            .then((res)=>{
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }, [])


    let artistArr = [];

    //for testing
    let artistList = [
        112035,
        112034,
        112033,
        112032,
        112031,
        112030,
        112039,
    ];


    let albumArr = [];

    //for testing
    let albumList = [
        2115888,
        2115887,
        2115886,
        2115885,
        2115884,
        2115883,
        2115882,
    ];




    useEffect(()=>{
        for(let i = 0; i<artistList.length; i++){
            axios.get(`https://theaudiodb.com/api/v1/json/523532/artist.php?i=${artistList[i]}`)
            .then((res)=>{
                console.log(res.data.artists[0]);
                artistArr.push(res.data.artists[0]);
                setArtists([...artistArr,
                    res.data.artists[0]
                ]);
                console.log(artistArr);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[])


    useEffect(()=>{
        for(let i = 0; i<albumList.length; i++){
            axios.get(`https://theaudiodb.com/api/v1/json/1/album.php?m=${albumList[i]}`)
            .then((res)=>{
                console.log(res.data.album[0]);
                albumArr.push(res.data.album[0]);
                setAlbums([...albumArr,
                    res.data.album[0]
                ]);
                console.log(albumArr);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[])




    return(
        <div>
            <Header user={user} id={user.id} />
                <div>
                    <div className="bg-white shadow mx-auto">
                        <h2 className="text-2xl p-3 font-mono">
                        Welcome home, {user.userName}!
                        </h2>
                        {/* would be a prof pic */}
                        <div className="rounded h-full
                        mx-auto py-3 mx-2 mb-4 bg-white">
                        </div>
                            <p className="text-sm p-3">
                            {user.bio}
                            </p>
                            <button 
                            onClick={(e)=>navigate(`/edit/${props.currentId}`)}>
                            Edit
                            </button>
                    </div>
                    
                    <div className="md:w-1/2 md:mx-auto 
                    sm:w-4/5 sm:mx-auto bg-white w-5/6 
                    border mx-auto p-4 my-3 rounded shadow">
                        <h3 className="text-left text-2xl pb-3">Your Artists</h3>
                        <hr/>

                        {
                            artists.map((item, index)=>(
                                <img src={item.strArtistLogo} alt="" />
                            ))
                        }

                        


                        {/* <div>{user.artists}</div> */}
                        
                    
                        
                        <button onClick={()=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>

                    <div className="md:w-1/2 md:mx-auto 
                    sm:w-4/5 sm:mx-auto bg-white w-5/6 
                    border mx-auto p-4 my-3 rounded shadow">
                        <h3 className="text-left text-2xl pb-3">Your Albums</h3>
                        <hr/>
                            {
                                albums.map((item, index)=>(
                                <img src={item.strAlbumThumb} alt="" />
                                ))
                            }
                    
                        {/* <p>{userProfile.albums}</p> */}
                        <button onClick={()=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>


                    <div className="md:w-1/2 md:mx-auto 
                    sm:w-4/5 sm:mx-auto bg-white w-5/6 
                    border mx-auto p-4 my-3 rounded shadow">
                        <h3 className="text-left text-2xl pb-3">Your Tracks</h3>
                        <hr/>
                    
                        {/* <p>{userProfile.tracks}</p> */}
                        <button onClick={()=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>




                </div> 
                
            

            {/* COMMENT FORM */}
            <form>

                {
                props.profileId == props.currentId ?
                <label className="m-2 text-2xl">
                Share your latest with us!
                </label>
                :
                <label className="m-2 text-2xl">
                Write on {user.username}'s wall!
                </label>

                }

                <br/>
                <input className="mt-5" 
                type="text" name="content"/>
                <br/>
                <button className="mx-auto my-3 
                p-3 rounded shadow-md w-24">
                Post
                </button>

            </form>


        </div>
    )
}


export default Profile;










// const {profileId} = props;
// const [userProfile, setUserProfile] = useState({});
// const [webList, setWebList] = useState([]);
// const [comments, setComments] = useState([]);
// const [currentUser, setCurrentUser] = useState({});
// const [newComments, setNewComments] = useState({});













// <form onSubmit={submitHandler}>
// <label className="m-2">Share your latest with us!</label>
// <input onChange={handleChange} value={newComments.content} type="text" name="content"/>
// <br/>
// <button className="mx-auto my-3 p-3 rounded shadow-md w-24">Post</button>
// </form>




