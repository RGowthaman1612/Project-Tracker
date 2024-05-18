import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectContextProvider } from "./components/admin/Projectcontext";
import { Admindashboard } from "./components/admin/admindashboard";
import { LoginSignUp } from "./components/LoginSignUp/LoginSignUp";
import { Projectallotment } from "./components/admin/Projectallotment";
import { ProjectProgress } from "./components/admin/ProjectProgress";
import { Userdashboard } from "./components/users/Userdashboard";
import { UserDailyTask } from "./components/users/UserDailyTask";
import {GoogleSignIn} from "./components/LoginSignUp/GoogleSignIn";

function App() {
  return (
    <ProjectContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignUp/>} />
          <Route path='/GoogleLogin' element={<GoogleSignIn/>}/>
          <Route path="/adminDashboard" element={<Admindashboard />} />
          <Route path="/adminProjectAllotment" element={<Projectallotment />} />
          <Route path="/adminProjectProgress" element={<ProjectProgress />} />
          <Route path="/UserDashboard" element={<Userdashboard />} />
          <Route path="/UserDailyTask" element={<UserDailyTask />} />
        </Routes>
      </BrowserRouter>
    </ProjectContextProvider>
  );
}

export default App;