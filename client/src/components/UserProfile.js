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

    const {profileId, currentUser, setCurrentUser, currentId} = props;
    const [userProfile, setUserProfile] = useState({});






    return(
        <div>
            <Header id={props.currentId}/>
            


                <div>


                    <div className="bg-white shadow mx-auto">

                        <h2 className="text-2xl p-3 font-mono">
                        Welcome home, {userProfile.username}!
                        </h2>

                        <div className="rounded h-full
                        mx-auto py-3 mx-2 mb-4 bg-white">



                            </div>
                            <p className="text-sm p-3">
                            {userProfile.bio}
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
                    
                        {/* <p>{userProfile.artists}</p> */}
                        <button onClick={()=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>

                    <div className="md:w-1/2 md:mx-auto 
                    sm:w-4/5 sm:mx-auto bg-white w-5/6 
                    border mx-auto p-4 my-3 rounded shadow">
                        <h3 className="text-left text-2xl pb-3">Your Albums</h3>
                        <hr/>
                    
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
                Write on {userProfile.username}'s wall!
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




