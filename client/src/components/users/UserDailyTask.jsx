// import React, { useContext, useEffect, useState } from "react";
// import { Navbar } from "../admin/Navbar";
// import { UserDashTop } from "./UserDashTop";
// import { ProjectContext } from "../admin/Projectcontext";
// import './UserDailyTask.css'

// export const UserDailyTask = () => {
//   const [task,setTask]=useState({
//     projectId:"",
//     projectTask:"",
//   });
//   const updateTask=(e)=>{
//     const { name, value } = e.target;
//     setTask((prevData)=>({
//       ...prevData,
//       [name]:value,
//     }));
//   }

//   const [file, setFile] = useState()

//   function handleChange(event) {
//     setFile(event.target.files[0])
//   }
  
//   function handleSubmit(event) {
//     event.preventDefault()
//     const url = `http://localhost:5555/uploadFile/${task.projectId}`;
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fileName', file.name);
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     };
//     axios.post(url, formData, config).then((response) => {
//       console.log(response.data);
//     });

//   return (
//     <>
//       <div className="main">
//         <Navbar />
//         <div className="dash">
//           <UserDashTop />
//           <div className="user-main-inner">
//             <div className="dailytask">
//                 <h2>Daily Task Report</h2>
//                 <div>
//               <label htmlFor="projectid"> Project Id </label>
//               <input
//                 type="text"
//                 name="projectId"
//                 id="projectId"
//                 placeholder="Project Id"
//                 value={task.projectId}
//                 onChange={updateTask}
//                 required
//               />
//               </div>
//               <label  htmlFor="task">Task Description</label>
//               <textarea id='projectTask' name="projectTask" placeholder="Task Description" value={task.projectTaskrojectTask} onChange={updateTask}></textarea>
//               <label htmlFor="taskreport">Task Report</label>
//               <input type="file" id="taskreport" name="taskreport" onChange={handleChange}></input>
//               <button onClick={handleSubmit}>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// };


import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../admin/Navbar";
import { UserDashTop } from "./UserDashTop";
import { ProjectContext } from "../admin/Projectcontext";
import './UserDailyTask.css';
import axios from 'axios';

export const UserDailyTask = () => {
  const [task, setTask] = useState({
    projectId: "",
    projectTask: "",
  });
  const [file, setFile] = useState(null);

  const updateTask = (e) => {
    const { name, value } = e.target;
    setTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData=new FormData();
    formData.append('file',file)
    formData.append('projectId',task.projectId)
    formData.append('projectTask',task.projectTask)
    axios.post("http://localhost:5555/uploadFile",formData)
    .then(res=>console.log(res))
    .catch(err=> console.log(err))
  };


  return (
    <>
      <div className="main">
        <Navbar />
        <div className="dash">
          <UserDashTop />
          <div className="user-main-inner">
            <div className="dailytask">
              <h2>Daily Task Report</h2>
              <div>
                <label htmlFor="projectId"> Project Id </label>
                <input
                  type="text"
                  name="projectId"
                  id="projectId"
                  placeholder="Project Id"
                  value={task.projectId}
                  onChange={updateTask}
                  required
                />
              </div>
              <label htmlFor="projectTask">Task Description</label>
              <textarea
                id="projectTask"
                name="projectTask"
                placeholder="Task Description"
                value={task.projectTask}
                onChange={updateTask}

                required
              />
              <label htmlFor="projectReport">Task Report</label>
              <input
                type="file"
                id="projectReport"
                name="projectReport"
                onChange={(e)=>setFile(e.target.files[0])}
                accept=".pdf"
                required
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
