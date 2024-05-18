import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import progress from "../assets/progress.png";
import logout from "../assets/logout.png";
import dailytask from "../assets/dailytask.png";
import projectallotment from "../assets/projectallotment.png";
import { googleLogout } from "@react-oauth/google";
import "./Navbar.css";
import { ProjectContext } from "./Projectcontext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const handleLogout = () => {
    setUser(null);
    googleLogout();
    navigate("/");
  };
  const [userDetails, setUserDetails] = useState(null);
  const {user,setUser}=useContext(ProjectContext);
  const {allotedProject, setallotedProject } = useContext(ProjectContext);
  useEffect(  () => {
     fetchUserDetails();
  },[]);
  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:5555/userDetails");
      const data = await response.json();
      const mappedUserData = data.find((users) => users.email === user.email);
      setUserDetails(mappedUserData);
      // setUser(mappedData);
      // console.log("MAPPED");
      // console.log(mappedUserData);
      // console.log("USER DETAILS");
      // console.log(userDetails);
      // console.log("USER ");
      // console.log(user);
      try {
        const response = await fetch(
          "http://localhost:5555/adminProjectProgress"
        );
        const data = await response.json();
        console.log("proje");
        if(mappedUserData.role==="ADMIN"){
        const mappedProjectData = data.map((project) => ({
          projectId:project.projectId,
          studentRollNo:project.studentRollNo,
          facultyName:project.facultyName,
          studentName:project.studentName,
          projectName: project.projectName,
          projectTask:project.projectTask,
          projectReport:project.projectReport,
          projectDescription: project.projectDescription,
          projectCompletion:project.projectCompletion,
          reviews:project.reviews,
          projectDeadline:project.projectDeadline,
          time:project.time,
          slotdate:project.slotdate,
          venue:project.venue,
        }));
        setallotedProject(mappedProjectData);
        console.log("Admin");
        }
        else if(mappedUserData.role==="STUDENT" || mappedUserData.role==="FACULTY"){
          const mappedProjectData = data.find((projects)=> projects.studentRollNo===mappedUserData.rollNo || projects.facultyName===mappedUserData.userName);
          setallotedProject(mappedProjectData);
        }
        // setValue(mappedProjectData);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="navbar">
        <div className="navbarproject">Project Tracking</div>
        {userDetails && (userDetails.role === "ADMIN"  || userDetails.role==="FACULTY") && (
          <Link to="/adminDashboard" className="navbaritems">
            <img src={dashboard} alt="dashboard" />
            Dashboard
          </Link>
        )}
        {userDetails && (userDetails.role === "ADMIN" || userDetails.role==="FACULTY") && (
          <Link to="/adminProjectAllotment" className="navbaritems">
            <img src={projectallotment} alt="projectallotment" />
            Project Allotment
          </Link>
        )}
        {userDetails && (userDetails.role === "ADMIN" || userDetails.role==="FACULTY" )&& (
          <Link to="/adminProjectProgress" className="navbaritems">
            <img src={progress} alt="progress" />
            Project Progress
          </Link>
        )}
        {/* {userDetails && (userDetails.role === "ADMIN" || userDetails.role==="STUDENT") && (
          <Link to="/UserDashboard" className="navbaritems">
            <img src={dashboard} alt="dashboard" />
            Dashboard
          </Link>
        )} */}
        {userDetails &&( userDetails.role === "ADMIN" || userDetails.role==="STUDENT") && (
          <Link to="/UserDailyTask" className="navbaritems">
            <img src={dailytask} alt="dailytask" />
            Daily Task Report
          </Link>
        )}
        {userDetails && (
          <Link to="/" className="navbaritems" onClick={handleLogout}>
            <img src={logout} alt="logout" />
            Logout
          </Link>
        )}
      </div>
    </>
  );
};
