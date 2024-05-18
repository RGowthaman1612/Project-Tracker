import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import progress from "../assets/progress.png";
import logout from "../assets/logout.png";
import projectallotment  from '../assets/projectallotment.png'
import { googleLogout } from "@react-oauth/google";
import "./Navbar.css";

export const Navbar = () => {
  const handleLogout = () => {
    googleLogout();
    navigate('/');
  };
  return (
    <>
      <div className="navbar">
        <div className="navbarproject">Project Tracking</div>
        <Link to="/adminDashboard" className="navbaritems">
          <img src={dashboard} alt="dashboard" />
          Dashboard
        </Link>
        <Link to="/adminProjectAllotment" className="navbaritems">
          <img src={projectallotment} alt="projectallotment" />
          Project Allotment 
        </Link>
        <Link to="/adminProjectProgress" className="navbaritems">
          <img src={progress} alt="progress" />
          Project Progress
        </Link>
        <Link to="/" className="navbaritems" onClick={handleLogout}>
          <img src={logout} alt="logout" />
          Logout
        </Link>
      </div>
    </>
  );
};
