import React, { useContext, useState, useEffect } from "react";
import "./ProjectProgress.css";
import { Navbar } from "./Navbar";
import { AdminDashTop } from "./AdminDashTop";
import search from "../assets/search.png";
import close from '../assets/close.png';
import ReactSearchBox from "react-search-box";
import { ProjectContextProvider, ProjectContext } from "./Projectcontext";
export const ProjectProgress = () => {
  const [value, setValue] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const { allotedProject, setallotedProject } = useContext(ProjectContext);
  const searchfunc=(searchvalue)=>{
    const filteredProjects = allotedProject.filter((project) => {
      return (
        project.projectid.toString().toLowerCase().includes(searchvalue.toLowerCase()) ||
        project.projectname.toLowerCase().includes(searchvalue.toLowerCase()) ||
        project.studentname.toLowerCase().includes(searchvalue.toLowerCase())
      );
    });
    setValue(filteredProjects.length > 0 ? filteredProjects : allotedProject);
  }
  const openProjectDetailsModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetailsModal = () => {
    setSelectedProject(null);
  };
  useEffect(() => {
    const allotedProjectString = JSON.stringify(allotedProject);
    setValue([...allotedProject]);
    console.log(value);
  }, []);
  return (
    <div>
      <div className="main">
        <Navbar />
        <div className="dash">
          <AdminDashTop />
          <div className="main-inner">
            <div className="mainbar">
              <div className="searchbar">
                <img src={search} alt="search" />
                <input
                  type="text"
                  placeholder="Search data..."
                  onChange={(e) => {
                    searchfunc(e.target.value);
                  }}
                />
              </div>
              <div>
                <div className="projectview">
                  <h2>Projects Allotted</h2>
                  <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                      <th>S.No</th>
                      <th>Project Id</th>
                      <th>Project Name</th>
                      <th>Student Name</th>
                      <th>Project Description</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>

                      {value.map((task,index)=>{
                        return <tr key={index}>
                        <td>{task.no}</td>
                        <td>{task.projectid}</td>
                        <td>{task.projectname}</td>
                        <td>{task.studentname}</td>
                        <td>{task.projectdescription}</td>
                        <td>
                          <button onClick={() => openProjectDetailsModal(task)}>{task.action}</button>
                        </td>
                      </tr>
                      })}

                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedProject && (
  <div className="modal-bg">
    <div className="modal">
      
      <div><h2>Project Details</h2>
      <p>Project Id: {selectedProject.projectid}</p>
      <p>Project Name: {selectedProject.projectname}</p>
      <p>Student Name: {selectedProject.studentname}</p>
      <p>Project Description: {selectedProject.projectdescription}</p>
      <p>Project Task: {selectedProject.task}</p>
      <p>Project Completion: {selectedProject.completion}</p>
      <p>Project Reviews: {selectedProject.review}</p>
      </div>
      <div>
      <img src={close} alt="close"  onClick={closeProjectDetailsModal} />
      </div>
    </div>
  </div>
)}

    </div>
  );
};
