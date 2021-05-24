import React from "react";
import Slider from "react-slick";

const LandingCarousel=(props)=> {

    return (
      <div>
        <h4>Slider</h4>
        <Slider
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div>
            <h3>1</h3>
          </div>
        </Slider>
      </div>
    );

}
export default LandingCarousel;