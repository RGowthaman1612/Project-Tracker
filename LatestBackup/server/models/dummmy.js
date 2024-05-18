{
  selectedProject && (
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
        </div>
        <div>
          <img src={close} alt="close" onClick={closeProjectDetailsModal} />
        </div>
      </div>
    </div>
  );
}

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

<td>
  <button onClick={() => openProjectDetailsModal(task)}>View</button>
</td>;



// .modal-bg {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
  
//   .modal {
//     background-color: white;
//     padding: 20px;
//     border-radius: 10px;
//     max-width: 80%;
//     display: flex;
//   }
  
//   .modal img {
//     width: 40px;
//     height: 40px;
//   }