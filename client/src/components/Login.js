import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import "../registration.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const {user, setUser} = props;
  // const {userEmail, setUserEmail} = props;
  // const {userPassword, setUserPassword} = props;


  const login = (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    axios
    .post(
      "http://localhost:8080/login",
      {
        email: email,
        password: password,
      },
        )
        .then((res) => {
          console.log(res.data);
          console.log(email, "Res data");
          setUser({
            email: email,
            password: password,
        });
        console.log(user);
        const json = JSON.stringify(email);
        localStorage.setItem("email", json);
        
        if(res.data == true){
          navigate(`/landing`);
        }
        else{
          navigate("/");
        }
        

      })
      .catch((err) => {
        console.log(email);
        console.log(err.response);
        setErrorMessage(err.response.data.message);
      });
  };



  return (
    <div>
    
      <div class="form-box">
        <div class="form-top">
          <div class="form-top-left">
            <h3>Login to our site</h3>
            <p>Enter email and password to log on:</p>
          </div>
          <div class="form-top-right">
            <i class="fa fa-lock"></i>
          </div>
        </div>
        <div class="form-bottom">
          <p className="error-text">{errorMessage ? errorMessage : ""}</p>
          <form
            role="form"
            action=""
            method="post"
            class="login-form"
            onSubmit={login}
          >
            <div class="form-group">
              <label class="sr-only" for="form-username">
                Email
              </label>
              <input
                type="text"
                placeholder="Email..."
                class="form-username form-control"
                id="form-username"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label class="sr-only" for="form-password">
                Password
              </label>
              <input
                type="password"
                placeholder="Password..."
                class="form-password form-control"
                id="form-password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" class="btn">
              Sign in
            </button>
          </form>
        </div>
      </div>

      <div class="social-login">
        <h3>...or login with:</h3>
        <div class="social-login-buttons">
          <a class="btn btn-link-2" href="#">
            <i class="fa fa-facebook"></i> Facebook
          </a>
          <a class="btn btn-link-2" href="#">
            <i class="fa fa-twitter"></i> Twitter
          </a>
          <a class="btn btn-link-2" href="#">
            <i class="fa fa-google-plus"></i> Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
