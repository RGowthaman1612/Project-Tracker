import React,{useState,useContext,useEffect} from 'react'
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Navbar } from '../admin/Navbar'
import { UserDashTop } from './UserDashTop'
import { ProjectContext } from "../admin/Projectcontext";
import './Userdashboard.css'

const remainder = [
    "Assign Tasks",
    "View Student Progress",
    "Review each Project",
    "Check your review slot",
  ];
  

export const Userdashboard = () => {
    const [value, setValue] = useState([]);
    const { allotedProject, setallotedProject } = useContext(ProjectContext);
    useEffect(() => {
      // const allotedProjectString = JSON.stringify(allotedProject);
      setValue([...allotedProject]);
    }, []);
  return (
    <>
    <div className="main">
        <Navbar/>
        <div className="dash">
           <UserDashTop/>
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
                  {value.slice( -4).map((task, index) => {
                    return (
                      <div key={index}>
                        <CircularProgressbar
                          value={task.completion}
                          size="sm"
                          text={`${task.completion}%`}
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
                        <div className="circularname">{task.projectname}</div>
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
                      <th>Task</th>
                      <th>Faculty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.map((task, index) => (
                      <tr key={index}>
                        <td>{task.no}</td>
                        <td>{task.projectid}</td>
                        <td>{task.projectname}</td>
                        <td>{task.studentname}</td>
                        <td>{task.task}</td>
                        <td>{task.faculty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                        <th>Reviewer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {value.map((task, index) => (
                        <tr key={index}>
                          <td>{task.no}</td>
                          <td>{task.projectid}</td>
                          <td>{task.review}</td>
                          <td>{task.time}</td>
                          <td>{task.venue}</td>
                          <td>{task.faculty}</td>
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
    </>
  )
}
