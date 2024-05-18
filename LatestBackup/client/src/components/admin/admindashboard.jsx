import React, { useState, useEffect, createContext, Children, useContext } from "react";
import "./admindashboard.css";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import close from "../assets/close.png";
import { Navbar } from "./Navbar";
import { AdminDashTop } from "./AdminDashTop";
import { ProjectContext } from "./Projectcontext";


const remainder = [
  "Assign Tasks",
  "View Student Progress",
  "Review each Project",
  "Check your review slot",
];

export const Admindashboard = () => {
  const [value, setValue] = useState([]);
  const { allotedProject, setallotedProject } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);
const getReportPdf = (location) => {
  window.open(
    `http://localhost:5555/taskReport/${location}`,
    "_blank",
    "noreferrer"
  );
};
const openProjectDetailsModal = (project) => {
  setSelectedProject(project);
};

const closeProjectDetailsModal = () => {
  setSelectedProject(null);
};
  useEffect(() => {
    const allotedProjectString = JSON.stringify(allotedProject);
    setValue([...allotedProject]);
  }, []);
  return (
    <div>
      {/* FullScreen */}
      <div className="main">
        {/* Navigation Bar Start*/}
        <Navbar></Navbar>
        {/* Navigation Bar End*/}
        {/* Dashboard Bar Start*/}
        <div className="dash">
          <AdminDashTop />
          {/* Start Greetings and timeZone */}
          <div className="salutation">
            <div className="greeting"> Hi! It's good to see you </div>
          </div>
          {/* End Greetings and timeZone */}
          {/* Start of statusbar1 */}
          <div className="statusbar1">
            {/* Start Project Completion */}
            <div className="projectprogress">
              <div>
                <div className="project">
                  <h2>Projects Completion</h2>
                </div>
                <div className="circular">
                  {value.slice( -3).map((task, index) => {
                    return (
                      <div key={index}>
                        <CircularProgressbar
                          value={task.projectCompletion}
                          size="sm"
                          text={`${task.projectCompletion}%`}
                          strokeWidth={10}
                          pathTransitionDuration={0.5}
                          trailWidth={10}
                          strokeLinecap={"butt"}
                          styles={buildStyles({
                            textColor: "#28262a",
                            pathColor: "turquoise",
                            trailColor: "gold",
                            textSize: "20px",
                          })}
                        ></CircularProgressbar>
                        <div className="circularname">{task.projectName}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* End Project Completion */}
            <div className="remainder">
              <h2>Remainder !</h2>
              <div>
                <ul>
                  {remainder.map((msg, index) => {
                    return <li key={index}>{msg}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="addremainder">
              <textarea
                name="addremainder"
                id="addremainder"
                placeholder="Add Your Remainder!"
              />
            </div>
          </div>
          {/* End of statusbar1 */}
          <div className="statusbar2">
            <div className="taskview">
              <h2>Project Alloted</h2>
              <div className="table-container">
                <table className="task-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Project Id</th>
                      <th>Project Name</th>
                      <th>Student Name</th>
                      {/* <th>Task</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.map((task, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{task.projectId}</td>
                        <td>{task.projectName}</td>
                        <td>{task.studentName}</td>
                        {/* <td>{task.projectTask}</td> */}
                        <td>
  <button onClick={() => openProjectDetailsModal(task)}>View</button>
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <p>Project Report: <h2 onClick={()=>getReportPdf(selectedProject.projectReport)} style={{"cursor":"pointer","color":"green"}}>{selectedProject.projectReport===undefined?" No Report":"Click Here!" }</h2></p>
              <p>Project Completion: {selectedProject.projectCompletion}</p>
              <p>Project Reviews: {selectedProject.reviews}</p>
            </div>
            <div>
              <img src={close} alt="close" onClick={closeProjectDetailsModal} />
            </div>
          </div>
        </div>
      )}
              </div>
            </div>
            <div className="slotview">
              <div className="slotbooked-container">
                <h2>Slot Alloted</h2>
                <div className="slotbooked-table">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Project Id</th>
                        <th>No Of Reviews</th>
                        <th>Time</th>
                        <th>Venue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {value.map((task, index) => (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{task.projectId}</td>
                          <td>{task.reviews}</td>
                          <td>{task.time || "-"}</td>
                          <td>{task.venue || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
