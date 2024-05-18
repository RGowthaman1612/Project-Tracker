import React, { useState } from "react";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";
import { GoogleSignIn } from "./GoogleSignIn";
export const LoginSignUp = () => {
  const [action, setAction] = useState("Login");
  const [user, SetUser] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    console.log(user);
    console.log(password);
    if (user == "admin" && password == "admin") navigate("/adminDashboard");
    if (user == "user" && password == "user") navigate("/userDashboard");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form>
        <div className="inputs">
          <div className="input">
            <img src="../src/components/assets/user.png" alt="" />
            <input
              type="text"
              placeholder="Name"
              value={user}
              onChange={(e) => SetUser(e.target.value)}
            />
          </div>
          <div className="input">
            <img src="../src/components/assets/password.png" alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
          </div>
        </div>
        {action === "Sign Up" ? (
          <div />
        ) : (
          <div className="forgot-password">
            Forgot Password?<span>Click Here!</span>
          </div>
        )}
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={(e) => {
              setAction("Sign Up");
              handlesubmit(e);
            }}
          >
            <input type="submit" value="Sign Up" />
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={(e) => {
              setAction("Login");
              handlesubmit(e);
            }}
          >
            <input type="submit" value="LogIn" />
          </div>
        </div>
        <div className="GoogleSignIn">
          <GoogleSignIn />
        </div>
      </form>
    </div>
  );
};
