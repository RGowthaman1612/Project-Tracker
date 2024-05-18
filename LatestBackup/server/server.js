const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectRegister = require("./models/ProjectSchema");
const userRegister = require("./models/UserSchema");
const path=require("path");
const multer=require("multer");
const ProjectSchema = require("./models/ProjectSchema");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/adminProjectAllotment", (req, res) => {
  projectRegister
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.post("/userRegister", (req, res) => {
  userRegister
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/taskReport')
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"__"+Date.now()+"__"+file.originalname)
  }
})

const upload=multer({
  storage:storage
})
app.post("/uploadFile", upload.single('file'),async (req, res) => {
    console.log(req.file);
    console.log(req.body.projectTask);
    const updateprojectId = req.body.projectId;
    projectRegister.findOneAndUpdate(
      { projectId: updateprojectId },
      {projectTask:req.body.projectTask,
        projectReport:req.file.filename
      },
      { new: true }
    )
    .then(result=> res.json(result))
    .catch(err=> console.log(err));
});

app.get("/getTaskReport",(req,res)=>{
  projectRegister.find()
  .then(projects=>res.status(200).json(projects))
  .catch(err=>res.json(err))
});

app.put("/updateTaskCompleted/:id", async (req,res)=>{
  const { projectCompletion } = req.body;
  try {
    const updatedProject = await projectRegister.findOneAndUpdate(
      { projectId: req.params.id },
      { projectCompletion },
      { new: true }
    );
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/updateReview/:id",async (req,res)=>{
  const { reviews } = req.body;
  try {
    const updatedProject = await projectRegister.findOneAndUpdate(
      { projectId: req.params.id },
      { reviews },
      { new: true }
    );
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/userDetails", async (request, response) => {
  try {
    const studentMaster = await userRegister.find({});
    return response.status(200).json(studentMaster);
  } catch (error) {
    console.error("Error getting data:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/slotbooking/:id", async (req, res) => {
  try {
    const updateProjectId = req.params.id;

    if (!updateProjectId) {
      console.error("Project ID is required but not provided.");
      return res.status(404).send({ message: "Project ID is required" });
    }

    console.log(`Updating project with ID: ${updateProjectId}`);
    console.log("Request body:", req.body);

    const result = await projectRegister.findOneAndUpdate(
      { projectId: updateProjectId },
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      console.error(`Project not found for ID: ${updateProjectId}`);
      return res.status(404).send({ message: "Project not found" });
    }

    console.log("Project updated successfully:", result);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating slot booking:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});


app.get("/adminProjectProgress", async (request, response) => {
  try {
    const studentMaster = await projectRegister.find({});
    return response.status(200).json(studentMaster);
  } catch (error) {
    console.error("Error getting data:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

mongoose
  .connect("mongodb+srv://gowthaman:gowtham@tracking.gdxxzig.mongodb.net/users")
  .then(() => {
    console.log("App connected");
    app.listen(5555, () => {
      console.log("Server started on port 5555");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
