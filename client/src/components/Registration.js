import React, { useState } from "react";
import axios from "axios";
import "../registration.css";
import Login from "./Login";

const Register = (props) => {
  const [confirmReg, setConfirmReg] = useState("");
  const [errs, setErrs] = useState({});
  const {user, setUser} = props;


  // was used for tests. Enable and comment out "UserProfile.js" test
  // state w user info when ready to test full-stack linkage
  
  // const [user, setUser] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  // });



  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();

    console.log(user);
    axios.post("http://localhost:8080/register", user, {
        // withCredentials: true,
      })
      .then((res) => {
        console.log('user', user);
        setUser({
            firstName:"",
            lastName: "",
            userName: "",
            email: "",
            password: "",
        });

        setConfirmReg("Thank you for Registering, you can now log in!");
        setErrs({});
      })
      .catch((err) => {
        console.log(err);
        // setErrs(err.response.data.errors);
      });
  };




  return (
    <div style={{background: "linear-gradient(167deg, rgba(129,255,0,1) 0%, rgba(100,255,230,1) 60%)"}}>
      {confirmReg ? <h4>{confirmReg}</h4> : null}
      <div class="top-content">
        <div class="inner-bg">
          <div class="container">
            <div class="row">
              <div class="col-sm-5">
                <Login user={user} setUser={setUser} />
              </div>

              <div class="col-sm-1 middle-border"></div>
              <div class="col-sm-1"></div>

              <div class="col-sm-5">
                <div class="form-box">
                  <div class="form-top">
                    <div class="form-top-left">
                      <h3>Register now</h3>
                      <p>Fill in the form below to register:</p>
                    </div>
                    <div class="form-top-right">
                      <i class="fa fa-pencil"></i>
                    </div>
                  </div>
                  <div class="form-bottom">
                    <form
                      role="form"
                      action=""
                      method="post"
                      class="registration-form"
                      onSubmit={register}
                    >
                      <div class="form-group">
                        <label class="sr-only" for="form-first-name">
                          First name
                        </label>
                        {errs.firstName ? (
                          <span className="error-text">
                            {errs.firstName.message}
                          </span>
                        ) : null}

                        <input
                          type="text"
                          placeholder="First name..."
                          class="form-first-name form-control"
                          id="form-first-name"
                          name="firstName"
                          value={user.firstName}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>


                      <div class="form-group">
                        <label class="sr-only" for="form-last-name">
                          Last name
                        </label>
                        {errs.lastName ? (
                          <span className="error-text">
                            {errs.lastName.message}
                          </span>
                        ) : null}

                        <input
                          type="text"
                          placeholder="Last name..."
                          class="form-last-name form-control"
                          id="form-last-name"
                          name="lastName"
                          value={user.lastName}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>


                      <div class="form-group">
                        <label class="sr-only" for="form-email">
                          Email
                        </label>
                        {errs.email ? (
                          <span className="error-text">
                            _{errs.email.message}
                          </span>
                        ) : null}

                        <input
                          type="text"
                          placeholder="Email..."
                          class="form-email form-control"
                          id="form-email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                        />
                      </div>


                      {/* Needs Username Input */}
                      
                      <div class="form-group">
                        <label class="sr-only" for="form-userName">
                          username:
                        </label>
                        {errs.userName ? (
                          <span className="error-text">
                            _{errs.userName.message}
                          </span>
                        ) : null}

                        <input
                          type="text"
                          placeholder="Username..."
                          class="form-userName form-control"
                          id="form-userName"
                          name="userName"
                          value={user.userName}
                          onChange={handleChange}
                        />
                      </div>


                      <div class="form-group">
                        <label class="sr-only" for="form-email">
                          Password
                        </label>
                        {errs.password ? (
                          <span className="error-text">
                            _{errs.password.message}
                          </span>
                        ) : null}

                        <input
                          type="text"
                          placeholder="Password..."
                          class="form-email form-control"
                          id="form-email"
                            name="password"
                            value={user.password}
                            onChange={ handleChange }
                        />
                      </div>


                      <div class="form-group">
                        <label class="sr-only" for="form-email">
                          Confirm Password
                        </label>
                         {
                            errs.confirmPassword?
                              <span className="error-text">{ errs.confirmPassword.message }</span>
                              : null
                          }

                        <input
                          type="text"
                          placeholder="Confirm Password..."
                          class="form-email form-control"
                          id="form-email"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={ handleChange }
                        />
                      </div>
                     
                    
                      <button type="submit" class="btn">
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
