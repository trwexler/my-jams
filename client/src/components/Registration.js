import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';




const Registration = (props)=>{

    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});

    const [newUser, setNewUser] = useState({
        email:"",
        username:"",
        password:"",
        confirmPassword:""
    });

    
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/user/register', newUser,{
            withCredentials: true,
        })
            .then((res)=>{
                console.log(res);
                console.log(res.data)

                setNewUser({
                    email:"",
                    username:"",
                    password:"",
                    confirmPassword:""
                })
                setConfirmReg("Thank you for Registering, you can now log in!");
                setErrs({});  // remember to reset errors state if it was successful
                
            })

            .catch((err)=>{
                console.log(err);
                setErrs(err.response.data.errors);
            })
    }

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
    }



    return(
        <>
            <h1 className="">new here?</h1>
            <p className="">Register and start creating and collaborating today!</p>
            {
                confirmReg ? 
                <h4 className="">{confirmReg}</h4>
                : null
            }

            <form className="" onSubmit={submitHandler}>

                <input className="" placeholder="Email" type="text" name="email" value={newUser.email}
                    onChange={handleChange}
                />

                <input className="" placeholder="Username" type="text" name="username" value={newUser.username}
                    onChange={handleChange}
                />

                <input className="" placeholder="Password" type="password" name="password" value={newUser.password}
                    onChange={handleChange}
                />

                <input className="" placeholder="Confirm Password" type="password" name="confirmPassword" value={newUser.confirmPassword}
                    onChange={handleChange}
                />
                <br/>

                <input className="" type="submit" value="Register"/>

            </form>


        </>
    )
}

export default Registration; 

