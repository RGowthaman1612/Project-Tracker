import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import logout from "../assets/logout.png";
import dailytask from '../assets/dailytask.png'
import "./UserNavbar.css";
import { googleLogout } from "@react-oauth/google";


export const UserNavbar = () => {
  const handleLogout = () => {
    googleLogout();
    navigate('/');
  };
  return (
    <>
      <div className="navbar">
        <div className="navbarproject">Project Tracking</div>
        <Link to="/UserDashboard" className="navbaritems">
          <img src={dashboard} alt="dashboard" />
          Dashboard
        </Link>
        <Link to="/UserDailyTask" className="navbaritems">
          <img src={dailytask} alt="dailytask" />
          Daily Task Report
        </Link>
        <Link to="/" className="navbaritems" onClick={handleLogout}>
          <img src={logout} alt="logout" />
          Logout
        </Link>
      </div>
    </>
  );
};
