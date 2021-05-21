import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';



const Header = (props)=>{


    return(

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  
  <p className="navbar-brand">My Jams</p>
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> 

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
    <ul className="navbar-nav mr-auto">
    
      <Link to={"/landing"} className="nav-link">
        <li className="nav-item">
          {/* <a className="nav-link" href="/user">Profile</a> */}
          Home
        </li>
      </Link>

      <Link to={"/user"} className="nav-link">
        <li className="nav-item">
          {/* <a className="nav-link" href="/user">Profile</a> */}
          Profile
        </li>
      </Link>

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
{/* 
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}

  </div> 

</nav>



    )

}


export default Header;