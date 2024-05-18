import React, { Children } from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { Projectallotment } from "./Projectallotment";
import { Admindashboard } from "./admindashboard";
import { ProjectProgress } from "./ProjectProgress";
export const ProjectContext = createContext();

export const ProjectContextProvider = ({children}) => {
     const data="hiiiii";
     const [user, setUser] = useState(null); 
     const [allotedProject, setallotedProject] = useState([
      {
        no: 1,
        projectid: 1,
        projectname: "Assesment Portal",
        studentname: "Gokulnathan",
        projectdescription: "This project involves developing the Compiler Page.",
        task: "Compiler Page",
        action: "View",
        completion: 60,
        review: 1,
        time: "2.30PM-3.00Pm",
        venue: "ME201",
        faculty:"Mohan",

      },
      {
        no: 2,
        projectid: 2,
        projectname: "Project Tracking",
        studentname: "Gowthaman",
        projectdescription: "This project involves creating the Login Page.",
        task: "Login Page",
        action: "View",
        completion: 70,
        review: 0,
        time: "1.30PM-2.00Pm",
        venue: "ME201",
        faculty:"Prabha",
      },
      {
        no: 3,
        projectid: 3,
        projectname: "BIP Portal",
        studentname: "Abzar",
        projectdescription: "This project involves implementing the Activity Logger.",
        task: "Activity Logger",
        action: "View",
        completion: 80,
        review: 0,
        time: "1.30PM-2.00Pm",
        venue: "ME201",
        faculty:"Mahesh",

      },
      {
        no: 4,
        projectid: 4,
        projectname: "Course Register",
        studentname: "Poosvarasan",
        projectdescription: "This project involves managing the Course Register.",
        task: "Activity Logger",
        action: "View",
        completion: 80,
        review: 0,
        time: "1.30PM-2.00Pm",
        venue: "ME201",
        faculty:"Ranjith",

      },
      {
        no: 5,
        projectid: 5,
        projectname: "TAC Slot ",
        studentname: "Raj",
        projectdescription: "This project involves managing the Course Register.",
        task: "Activity Logger",
        action: "View",
        completion: 80,
        review: 0,
        time: "1.30PM-2.00Pm",
        venue: "ME201",
        faculty:"Vijay",

      },
    ]); 
    
  return (
    <ProjectContext.Provider value={{allotedProject,setallotedProject,user,setUser}}>
      {/* <Admindashboard />
      <ProjectProgress />
      <Projectallotment /> */}
      {children}
    </ProjectContext.Provider>
  );
};
