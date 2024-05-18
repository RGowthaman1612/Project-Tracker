const mongoose=require("mongoose");

const projectSchema=new mongoose.Schema({
    projectId: {
        type: Number,
        required: false,
      },
    studentRollNo: {
        type: String,
        required: false,
      },
    facultyName: {
        type: String,
        required: false,
      },
    studentName: {
        type: String,
        required: false,
      },
    projectName: {
        type: String,
        required: false,
      },
    projectTask: {
        type: String,
        required: false,
      },
    projectDescription: {
        type: String,
        required: false,
      },
    projectCompletion: {
        type: Number,
        required: false,
      },
    reviews:{
        type: Number,
        required: false,
      },
    projectDeadline: {
        type: String,
        required: false,
      },
    time: {
        type: String,
        required: false,
      },
    slotdate: {
        type: String,
        required: false,
      },
    venue: {
        type: String,
        required: false,
      },
    projectReport:{
      type:String,
      required:false,
    },
})

const ProjectSchema=mongoose.model("projects",projectSchema);

module.exports=ProjectSchema;