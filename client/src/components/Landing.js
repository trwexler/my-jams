import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import LandingCarousel from './LandingCarousel';
import AddButton from './AddButton';
import Header from './Header';



const Landing = (props)=>{


    return(
        <div>
            <Header/>
            <h1>Landing</h1>
            <LandingCarousel/>

        </div>
    )

}


export default Landing;