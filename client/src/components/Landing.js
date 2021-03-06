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
      
    // useEffect(()=>{
    //   // console.log(id)
    //   axios.get(`http://localhost:8080/getUser/${user.email}`)
    //       .then((res)=>{
    //           console.log(res.data);
    //           setId(res.data.id);
    //           setUser(res.data);
    //           console.log(user.email);
    //           const json = JSON.stringify(res.data.email);
    //           localStorage.setItem("res.data.email", json);
    //       })
    //       .catch((err)=>{
    //           console.log(err);
    //       })
    //   }, [])

    // useEffect(()=>{
    //   const json = JSON.stringify(user.email);
    //   localStorage.setItem("user.email", json);
    //   }, [user])


    useEffect(()=>{
      const json = localStorage.getItem("email");
      const storageRetreiver = JSON.parse(json);
      axios.get("http://localhost:8080/getUser/" + storageRetreiver)
          .then((res)=>{
              console.log(res.data);
              setId(res.data.id);
              setUser(res.data);
              console.log("http://localhost:8080/getUser/" + storageRetreiver);
          })
          .catch((err)=>{
              console.log(err);
          })
      }, [])



  // Size = number of artists displayed on landing page.
  let size = 30;

  let settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 1,
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
  let settings2 = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 8,
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
    <div style={{background: "linear-gradient(90deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)"}}>
      <Header id={user.id} user={user} />


      <h1 style={{fontFamily:"Bangers, cursive", fontSize:"50px",color:"black", marginTop:"30px"}}>Explore</h1>

      {
      isLoading ?
        <img src={Loader} alt="" style={{width:"200px"}} />

        :

        <div>

          <div>



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

        <div>
      <div style={{
        background: "linear-gradient(338deg, rgba(255,0,164,1) 0%, rgba(50,247,255,1) 88%)", paddingTop:"20px"
    }}>

      <h2 style={{fontFamily:"Bangers, cursive", fontSize:"50px", color:"black", marginTop:"40px", padding:"20px, 0px"}}>
        Recently Added</h2>
      

     <Slider {...settings2}>

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

      {/* <div style={{
        background: "linear-gradient(338deg, rgba(255,0,164,1) 0%, rgba(50,247,255,1) 88%)",

    }}>
      <h2 style={{fontFamily:"Bangers, cursive", fontSize:"50px", color:"black", marginTop:"20px"}}>Your Feed</h2>

      </div> */}
      </div>


    </div>
  );
};

export default Landing;