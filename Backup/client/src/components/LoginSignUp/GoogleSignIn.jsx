import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import React, { useState,useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode"; // Correct import statement
import { ProjectContext } from "../admin/Projectcontext";

 export const GoogleSignIn = () => {
  const navigate = useNavigate();
  const {user, setUser}= useContext(ProjectContext);
  useEffect(() => {
    if (user) {
      if(user.email.endsWith("cs21@bitsathy.ac.in")){
        navigate('/adminDashboard');
       
      }
      else{
        navigate('/adminDashboard');
      }
    }
  }, [user]);
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const decodedToken = jwtDecode(credentialResponse.credential); 
        const { name, picture, email } = decodedToken;
        const userObject = { name, picture, email };
        setUser(userObject); 
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleSignIn;
