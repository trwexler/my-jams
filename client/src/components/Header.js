import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';




const Header = (props)=>{

  const {user, id} = props;

  const [searchedArtist, setSearchedArtist] = useState("");

  const searchHandler = ((e)=>{
    e.preventDefault();
    axios.get('https://www.theaudiodb.com/api/v1/json/1/search.php?s=' + searchedArtist)
      .then((res)=>{
        console.log(res.data);
        console.log(res.data.artists[0].idArtist);
        navigate(`/artist/${res.data.artists[0].idArtist}/${user.id}`);
      })
      .catch((err)=>{
        console.log(err);
      })
  })




    return(

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to={`/landing`}>
  <p className="navbar-brand"style={{fontFamily:"Bangers, cursive", fontSize:"30px", marginBottom:"0"}}>My Jams</p>
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> 

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
    <ul className="navbar-nav mr-auto">
    
      <Link to={`/landing`} className="nav-link">
        <li className="nav-item">
          {/* <a className="nav-link" href="/user">Profile</a> */}
          Home
        </li>
      </Link>

      <Link to={`/user/${id}`} className="nav-link">
        <li className="nav-item">
          {/* <a className="nav-link" href="/user">Profile</a> */}
          Profile
        </li>
      </Link>

      <Link to={`/feed/${id}`} className="nav-link">
        <li className="nav-item">
          Feed
        </li>
      </Link>
      
      <Link to={`/`} className="nav-link">
        <li className="nav-item">
          Logout
        </li>
      </Link>
      
    </ul>

      <form onSubmit={searchHandler} className="form-inline my-2 my-lg-0">

          <input onChange={(e)=>setSearchedArtist(e.target.value)} 
          className="form-control mr-sm-2" 
          type="search" placeholder="Search by Artist" 
          aria-label="Search"/>

          <button
          className="btn btn-outline-success 
          my-2 my-sm-0"
          type="submit"
          style={{opacity:"0.8"}}>
          Search
          </button>
          
        </form>

      </div> 

    </nav>

  )
}


export default Header;