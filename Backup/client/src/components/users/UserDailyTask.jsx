import React, { useContext, useEffect, useState } from "react";
import { UserNavbar } from "./UserNavbar";
import { UserDashTop } from "./UserDashTop";
import { ProjectContext } from "../admin/Projectcontext";
import './UserDailyTask.css'

export const UserDailyTask = () => {
  const { allotedProject } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchValue, setSearchValue] = useState(""); 

  const searchfunc = (searchValue) => {
    const filteredProjects = allotedProject.filter((project) => {
      return (
        project.projectid.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        project.projectname.toLowerCase().includes(searchValue.toLowerCase()) ||
        project.studentname.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredProjects(filteredProjects);
  };

  const handleSelectProject = (e) => {
    const projectId = e.target.value;
    const project = filteredProjects.find((project) => project.projectid == projectId);
    setSelectedProject(project);
  };

  return (
    <>
      <div className="main">
        <UserNavbar />
        <div className="dash">
          <UserDashTop />
          <div className="user-main-inner">
            <div className="dailytask">
                <h2>Daily Task Report</h2>
                <div>
              <label htmlFor="projectid"> Project Id </label>
              <input
                type="text"
                name="projectdetails"
                id="projectdetails"
                placeholder="Project Details"
                value={selectedProject?[selectedProject.projectid,selectedProject.projectname,selectedProject.studentname]:searchValue} 
                onChange={(e) => {
                  setSearchValue(e.target.value); 
                  searchfunc(e.target.value); 
                }}
                required
              />
              {!selectedProject&&searchValue&&filteredProjects.length>0 && (
                <div className="filterprojects">
                  <select onChange={handleSelectProject}>
                    {filteredProjects.map((project, index) => {
                      return <option key={index} value={project.projectid}>{project.projectname}</option>;
                    })}
                  </select>
                </div>
              )}
              </div>
              <label  htmlFor="task">Task Description</label>
              <textarea id='task' name="task" placeholder="Task Description"></textarea>
              <label htmlFor="taskreport">Task Report</label>
              <input type="file" id="taskreport" name="taskreport" ></input>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
