import React, { Children } from "react";
import { useState, useEffect, createContext, useContext } from "react";
export const ProjectContext = createContext();

export const ProjectContextProvider = ({children}) => {
     const [user, setUser] = useState(null); 
     const [allotedProject, setallotedProject] = useState([]); 
    
  return (
    <ProjectContext.Provider value={{allotedProject,setallotedProject,user,setUser}}>
      {children}
    </ProjectContext.Provider>
  );
};
