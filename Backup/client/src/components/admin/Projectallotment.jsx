import React, { useState, useContext, createContext, useEffect } from "react";
import "./Projectallotment.css";
import { Navbar } from "./Navbar";
import { AdminDashTop } from "./AdminDashTop";
import { ProjectContextProvider, ProjectContext } from "./Projectcontext";

export const Projectallotment = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  
  const { allotedProject, setallotedProject } = useContext(ProjectContext);
  // console.log(allotedProject);
  const addproject = () => {
    const newProject = {
      projectid: document.getElementById("projectid").value,
      projectname: document.getElementById("projectname").value,
      studentname: document.getElementById("studentrollno").value,
      projectdescription: document.getElementById("projectdescription").value,
      projectdeadline: selectedDate,
    };
    setallotedProject((prev) => [...prev, newProject]);
    console.log(newProject);
    document.getElementById("projectid").value = "";
    document.getElementById("projectname").value = "";
    document.getElementById("studentrollno").value = "";
    document.getElementById("projectdescription").value = "";
    setSelectedDate(new Date().toISOString().slice(0, 10));
    console.log(newProject);
  };
  const updateproject = () => {
    const updatedProjectId = document.getElementById("projectid").value;
    const updatedProjectName = document.getElementById("projectname").value;
    const updatedStudentRollNo = document.getElementById("studentrollno").value;
    const updatedProjectData = {
      updatedSlotdate: document.getElementById("slotdate").value,
      updatedSlottiming: document.getElementById("slottiming").value,
      updatedVenue: document.getElementById("venue").value,
    };
    setallotedProject((prevProjects) =>
      prevProjects.map((project) => {
        if (
          project.projectid === updatedProjectId &&
          project.projectname === updatedProjectName &&
          project.studentrollno === updatedStudentRollNo
        ) {
          return { ...project, ...updatedProjectData };
        }
        console.log("hi");
        console.log(project);
        return project;
      })
    );
  };

  return (
    <>
      <div className="main">
        <Navbar></Navbar>
        <div className="dash">
          <AdminDashTop />
          <div className="main-inner">
            <div className="allotproject">
              <div>
                <h2>Project Allocation</h2>
              </div>
              <div>
                <label htmlFor="projectid">Project Id</label>
                <input
                  type="number"
                  name="projectid"
                  id="projectid"
                  placeholder="Project Id"
                  value={allotedProject.length + 1}
                  disabled
                  required
                />
              </div>
              <div>
                <label htmlFor="projectname">Project Name</label>
                <input
                  type="text"
                  name="projectname"
                  id="projectname"
                  placeholder="Project Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="studentrollno">Student Roll No</label>
                <input
                  type="text"
                  name="studentrollno"
                  id="studentrollno"
                  placeholder="Student Roll No"
                  required
                />
              </div>
              <div>
                <label htmlFor="projectdescription">Project Description</label>
                <textarea
                  name="projectdescription"
                  id="projectdescription"
                  placeholder="Project Description"
                  required
                />
              </div>
              <div>
                <label htmlFor="projectdescription">Project Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  placeholder="Deadline"
                  value={selectedDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                  required
                />
              </div>
              <button onClick={addproject}>Submit</button>
            </div>
            <div className="slotbooking">
              <div>
                <h2>Slot Booking</h2>
              </div>
              <div>
                <label htmlFor="projectid">Project Id</label>
                <input
                  type="number"
                  name="projectid"
                  id="projectid"
                  placeholder="Project Id"
                  required
                />
              </div>
              <div>
                <label htmlFor="projectname">Project Name</label>
                <input
                  type="text"
                  name="projectname"
                  id="projectname"
                  placeholder="Project Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="studentrollno">Student Roll No</label>
                <input
                  type="text"
                  name="studentrollno"
                  id="studentrollno"
                  placeholder="Student Roll No"
                  required
                />
              </div>
              <div>
                <label htmlFor="slotdate">Slot Date </label>
                <input
                  type="date"
                  name="slotdate"
                  id="slotdate"
                  placeholder="slotdate"
                  value={selectedDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="slottiming">Slot Timing </label>
                <input
                  type="time"
                  name="slottiming"
                  id="slottiming"
                  placeholder="slottiming"
                  required
                />
              </div>
              <div>
                <label htmlFor="venue">Venue </label>
                <input
                  type="text"
                  name="venue"
                  id="venue"
                  placeholder="venue"
                  required
                />
              </div>
              <button onClick={updateproject}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
