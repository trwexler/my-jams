import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate, Router } from "@reach/router";
import AddButton from "./AddButton";
import Edit from "./Edit";
import DeleteButton from "./DeleteButton";
import { Carousel } from "react-bootstrap";

const LandingCarousel = (props) => {
  return (
    <div>
      <div class="container-fluid">
        <div className="row title" style={{ marginBottom: "20px" }}>
          <div class="col-sm-12">
            Most Loved Artists
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Carousel>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={"assets/img/img2.jpg"}
            />
            <Carousel.Caption>
              <h3>First Demo </h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={"assets/img/img1.jpg"}
            />
            <Carousel.Caption>
              <h3>Second Demo</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={"assets/img/img3.jpg"}
            />
            <Carousel.Caption>
              <h3>Third Demo</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default LandingCarousel;
