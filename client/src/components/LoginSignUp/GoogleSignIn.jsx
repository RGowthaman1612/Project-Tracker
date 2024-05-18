import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import React, { useState,useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode";
import { ProjectContext } from "../admin/Projectcontext";

 export const GoogleSignIn = () => {
  const navigate = useNavigate();
  const {user, setUser}= useContext(ProjectContext);
  useEffect(() => {
    // console.log(user);
    if (user) {
      navigate('/adminDashboard');
    }
    else{ 
      navigate('/');
    }
  }, [user]);
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const decodedToken = jwtDecode(credentialResponse.credential); 
        const { name, picture, email } = decodedToken;
        const userObject = { name, picture, email };
        setUser(userObject); 
        // console.log(user);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleSignIn;
