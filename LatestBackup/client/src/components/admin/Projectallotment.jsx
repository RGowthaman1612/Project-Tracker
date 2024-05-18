import React, { useState, useContext } from "react";
import "./Projectallotment.css";
import { Navbar } from "./Navbar";
import { AdminDashTop } from "./AdminDashTop";
import { ProjectContext } from "./Projectcontext";

export const Projectallotment = () => {
  const {user}=useContext(ProjectContext);
  const [formData, setformData] = useState({
    projectId: "",
    studentRollNo: "",
    facultyName: "",
    studentName:"",
    projectName: "",
    projectTask: "",
    projectDescription: "",
    projectCompletion: 0,
    projectDeadline: "",
    reviews: 0,
    time: "",
    venue: "",
    slotdate: "",
  });
  const [slotdata, setslotdata] = useState({
    projectId: "",
    studentRollNo: "",
    studentName:"",
    projectName: "",
    time: "",
    venue: "",
    slotdate: "",
  });
  const addproject = (e) => {
    const { name, value } = e.target;
    console.log("faculty name");
    console.log(user.name);
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
      facultyName:user.name,
    }));
  };
  const updateproject = (e) => {
    const { name, value } = e.target;
    setslotdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleaddproject = async () => {
    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:5555/adminProjectAllotment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([formData]),
        }
      );
      if (response.ok) {
        console.log("Form Data sent");
        setformData({
          projectId: "",
          studentRollNo: "",
          facultyName: "",
          studentName:"",
          projectName: "",
          projectTask: "",
          projectDescription: "",
          projectCompletion: 0,
          projectDeadline: "",
          reviews: 0,
          time: "",
          venue: "",
          slotdate: "",
        });
      } else {
        console.error("Form data sent failed");
      }
    } catch (err) {
      console.error("Error sending form data", err);
    }
  };
  
  const handleslotdata = async () => {
    console.log("Slot Data:", slotdata);
  
    try {
      const response = await fetch(
        `http://localhost:5555/slotbooking/${slotdata.projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(slotdata),
        }
      );
  
      if (response.ok) {
        console.log("Slot booked successfully");
        const responseData = await response.json();
        console.log("Response Data:", responseData);
        
        // Reset the form data
        setslotdata({
          projectId: "",
          studentRollNo: "",
          studentName: "",
          projectName: "",
          time: "",
          venue: "",
          slotdate: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Slot booking failed", errorData);
      }
    } catch (error) {
      console.error("Error in slot booking", error);
    }
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
                <label htmlFor="projectId">Project Id</label>
                <input
                  type="number"
                  name="projectId"
                  id="projectId"
                  placeholder="Project Id"
                  value={formData.projectId}
                  onChange={addproject}
                  required
                />
              </div>
              <div>
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  id="projectName"
                  placeholder="Project Name"
                  value={formData.projectName}
                  onChange={addproject}
                  required
                />
              </div>
              <div>
                <label htmlFor="studentRollNo">Student Roll No</label>
                <input
                  type="text"
                  name="studentRollNo"
                  id="studentRollNo"
                  placeholder="Student Roll No"
                  value={formData.studentRollNo}
                  onChange={addproject}
                  required
                />
                <label htmlFor="studentName">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  id="studentName"
                  placeholder="Student Name"
                  value={formData.studentName}
                  onChange={addproject}
                  required
                />
              </div>
              <div>
                <label htmlFor="projectDescription">Project Description</label>
                <textarea
                  name="projectDescription"
                  id="projectDescription"
                  placeholder="Project Description"
                  value={formData.projectDescription}
                  onChange={addproject}
                  required
                />
              </div>
              <div>
                <label htmlFor="projectDeadline">Project Deadline</label>
                <input
                  type="date"
                  name="projectDeadline"
                  id="projectDeadline"
                  placeholder="Deadline"
                  value={formData.projectDeadline}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={addproject}
                  required
                />
              </div>
              <button onClick={handleaddproject}>Submit</button>
            </div>
            <div className="slotbooking">
              <div>
                <h2>Slot Booking</h2>
              </div>
              <div>
                <label htmlFor="projectId">Project Id</label>
                <input
                  type="number"
                  name="projectId"
                  id="projectId"
                  placeholder="Project Id"
                  value={slotdata.projectId}
                  onChange={updateproject}
                  required
                />
              </div>
              <div>
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  id="projectName"
                  placeholder="Project Name"
                  value={slotdata.projectName}
                  onChange={updateproject}
                  required
                />
              </div>
              <div>
                <label htmlFor="studentRollNo">Student Roll No</label>
                <input
                  type="text"
                  name="studentRollNo"
                  id="studentRollNo"
                  placeholder="Student Roll No"
                  value={slotdata.studentRollNo}
                  onChange={updateproject}
                  required
                />
                 <label htmlFor="studentName">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  id="studentName"
                  placeholder="Student Name"
                  value={slotdata.studentName}
                  onChange={updateproject}
                  required
                />
              </div>
              <div>
                <label htmlFor="slotdate">Slot Date </label>
                <input
                  type="date"
                  name="slotdate"
                  id="slotdate"
                  placeholder="date"
                  value={slotdata.slotdate}
                  onChange={updateproject}
                  min={new Date().toISOString().slice(0, 10)}
                  required
                />
              </div>
              <div>
                <label htmlFor="time">Slot Timing </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  placeholder="slottiming"
                  value={slotdata.time}
                  onChange={updateproject}
                  required
                />
              </div>
              <div>
                <label htmlFor="venue">Venue </label>
                <input
                  type="text"
                  name="venue"
                  id="venue"
                  placeholder="Venue"
                  value={slotdata.venue}
                  onChange={updateproject}
                  required
                />
              </div>
              <button onClick={handleslotdata}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
