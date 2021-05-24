import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate, Router } from "@reach/router";
import LandingCarousel from "./LandingCarousel";
import AddButton from "./AddButton";
import Header from "./Header";
import { Carousel } from "react-bootstrap";
import Slider from "react-slick";

// 523532 API KEY
const Landing = (props) => {
  const [artistList, setArtistList] = useState([]);
  const { user, setUser } = props;

      useEffect(()=>{
        axios.get(`http://localhost:8080/getUser/${user.email}`)
            .then((res)=>{
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }, [])


  useEffect(() => {
    axios.get('https://theaudiodb.com/api/v1/json/523532/mostloved.php?format=track')
      .then((res) => {
        console.log('mostloved', res.data);
        console.log(res.data.loved);
        setArtistList(res.data.loved);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    <div>
      <Header id={user.id} user={user} />
      <h1>Explore</h1>
      {user.email}

      {
      artistList ?
        <div >
          <div >
            <div class="container-fluid" >
              <div className="row title" style={{ marginBottom: "20px" }}>
                <div class="col-sm-12">Most Loved Artists</div>
              </div>
            </div>
            <div>
              <Slider {...settings}>
                {artistList.slice(0, size).map((artist, index) => (
                  <div>
                    <Link to={`/artist/${artist.idArtist}/${user.id}`}>
                      <img src={artist.strTrackThumb} />
                    </Link>
                    <Link to={`/artist/${artist.idArtist}/${user.id}`}>
                      <h3>{artist.strArtist}</h3>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
       : <h1>Loading...</h1>
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
