import React, { useContext } from "react";
import "./UserDashTop.css";
import notification from "../assets/notification.png";
import calendar from "../assets/calendar.png";
import { useState, useEffect } from "react";
import { ProjectContext } from "../admin/Projectcontext";
const CurrentDateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const optionsDate = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
  };
  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <p>
        {currentTime.toLocaleDateString("en-US", optionsDate)} &nbsp;&nbsp;
        {currentTime.toLocaleTimeString("en-US", optionsTime)}
      </p>
    </div>
  );
};

export const UserDashTop = () => {
  const { user, setUser } = useContext(ProjectContext);
  const {namedis,setnamedis}=useState(false);
  function display(){
    console.log(user.name);
  }
  return (
    <div className="dashtop">
      <div className="timezone">
        <img src={calendar} alt="time" />
        <CurrentDateTime />
      </div>
      <img src={notification} alt="notify" />
      <div className="user">
        <img src={user.picture} alt="user" />
        {/* <div className="username">{user.name}</div> */}

      </div>
    </div>
  );
};
