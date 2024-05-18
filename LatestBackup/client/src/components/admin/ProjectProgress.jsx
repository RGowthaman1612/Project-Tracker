import React, { useState, useEffect, useContext } from "react";
import "./ProjectProgress.css";
import { Navbar } from "./Navbar";
import { AdminDashTop } from "./AdminDashTop";
import search from "../assets/search.png";
import close from "../assets/close.png";
import ReactSearchBox from "react-search-box";
import { ProjectContext } from "./Projectcontext";
import axios from "axios";
export const ProjectProgress = () => {
  const [value, setValue] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const { allotedProject, setallotedProject } = useContext(ProjectContext);
  const searchfunc = (searchvalue) => {
    const filteredProjects = allotedProject.filter((project) => {
      return (
        project.projectId
          .toString()
          .toLowerCase()
          .includes(searchvalue.toLowerCase()) ||
        project.projectName.toLowerCase().includes(searchvalue.toLowerCase()) ||
        project.studentName.toLowerCase().includes(searchvalue.toLowerCase())
      );
    });
    setValue(
      filteredProjects.length > 0 ? filteredProjects : [...allotedProject]
    );
  };
  const openProjectDetailsModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetailsModal = () => {
    setSelectedProject(null);
  };

  const getReportPdf = (location) => {
    window.open(
      `http://localhost:5555/taskReport/${location}`,
      "_blank",
      "noreferrer"
    );
  };

  const updateReview = async (project) => {
    const reviews = project.reviews + 1;
    try {
      const result = await fetch(
        `http://localhost:5555/updateReview/${project.projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({reviews}),
        }
      );
      if (result.ok) {
        console.log(result);
      } else {
        console.log("Error in updateReview");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskCompleted = async (project) => {
    const projectCompletion = project.projectCompletion + 10;
      try {
        const result = await fetch(
          `http://localhost:5555/updateTaskCompleted/${project.projectId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({projectCompletion}),
          }
        );
        if (result.ok) {
          console.log(result);
        } else {
          console.log("Error in updateProjectCompletion");
        }
      } catch (err) {
        console.log(err);
      }
  };

  useEffect(() => {
    setValue([...allotedProject]);
    console.log(allotedProject);
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
                        {value.map((task, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{task.projectId}</td>
                              <td>{task.projectName}</td>
                              <td>{task.studentName}</td>
                              <td>{task.projectDescription}</td>
                              <td>
                                <button
                                  onClick={() => openProjectDetailsModal(task)}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          );
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
            <div>
              <h2>Project Details</h2>
              <p>Project Id: {selectedProject.projectId}</p>
              <p>Project Name: {selectedProject.projectName}</p>
              <p>Student Name: {selectedProject.studentName}</p>
              <p>Project Description: {selectedProject.projectDescription}</p>
              <p>Project Task: {selectedProject.projectTask}</p>
              <p>
                Project Report:{" "}
                <h2
                  onClick={() => getReportPdf(selectedProject.projectReport)}
                  style={{ cursor: "pointer", color: "green" }}
                >
                  {selectedProject.projectReport === undefined
                    ? " No Report"
                    : "Click Here!"}
                </h2>
              </p>
              <p>Project Completion: {selectedProject.projectCompletion}</p>
              <p>Project Reviews: {selectedProject.reviews}</p>
              <p>
                <button onClick={() => updateReview(selectedProject)}>
                  Review Completed
                </button>
              </p>
              <p>
                <button onClick={() => updateTaskCompleted(selectedProject)}>
                  Task Completed
                </button>
              </p>
            </div>
            <div>
              <img src={close} alt="close" onClick={closeProjectDetailsModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
