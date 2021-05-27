import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate, Router } from "@reach/router";
import LandingCarousel from "./LandingCarousel";
import AddButton from "./AddButton";
import Header from "./Header";
import { Carousel } from "react-bootstrap";
import Slider from "react-slick";
import Loader from './loading.gif';

// 523532 API KEY
const Landing = (props) => {
  // const [artistList, setArtistList] = useState([]);
  const [id, setId] = useState("");
  const { user, setUser, items, isLoading} = props;
      
      useEffect(()=>{
        // console.log(id)
        axios.get(`http://localhost:8080/getUser/${user.email}`)
            .then((res)=>{
                console.log(res.data);
                setId(res.data.id);
                setUser(res.data);
                console.log(user.email);
                const json = JSON.stringify(res.data.email);
                localStorage.setItem("res.data.email", json);
            })
            .catch((err)=>{
                console.log(err);
            })
        }, [])

      useEffect(()=>{
        const json = JSON.stringify(user.email);
        localStorage.setItem("user.email", json);
        }, [user])




  // Size = number of artists displayed on landing page.
  let size = 15;

  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{background: "linear-gradient(167deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)"}}>
      <Header id={user.id} user={user} />

 
        <h1 style={{fontFamily:"Bangers, cursive", fontSize:"50px"}}>My Jams</h1>
   

      <h1>Explore</h1>
      {user.email}

      {
      isLoading ?
        <img src={Loader} alt="" />

        :

        <div>

          <div>

            <div className="container-fluid" >
              <div className="row title" style={{ marginBottom: "20px" }}>
                <div class="col-sm-12">Most Loved Artists</div>
              </div>
            </div>

            <div>
              <Slider {...settings}>

                {
                items.slice(0, size).map((item, index) => (

                  <div key={index}>
                  {
                    item.strTrackThumb ?

                  <div>
                      <img src={item.strTrackThumb} />

                    <Link to={`/artist/${item.idArtist}/${user.id}`} style={{color:"blue", fontSize:"20px"}}>{item.strArtist}</Link>
                  </div>

                  :

                  <div>
                    <img src={"https://images.8tracks.com/cover/i/000/471/318/record-7500.jpg?rect=0,0,1385,1385&q=98&fm=jpg&fit=max&w=1024&h=1024"} />

                      <Link to={`/artist/${item.idArtist}/${user.id}`} style={{color:"blue", fontSize:"20px"}}>{item.strArtist}</Link>
                  </div>

                  }
                  </div>
                ))}

              </Slider>
            </div>

          </div>
        </div> 

        }

        {/* {
                artistList.map((artist,index)=>(
                    <Link to={`/artist/${artist.idArtist}/${user.id}`}><p key={index}>{artist.strArtist}</p></Link>
                ))
            } */}
    </div>
  );
};

export default Landing;
