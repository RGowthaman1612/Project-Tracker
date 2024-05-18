const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    _id:Number,
    projectId:Number,
    studentRollNo:String,
    facultyName:String,
    projectName:String,
    projectTask:String,
    projectDescription:String,
    projectCompletion:String,
    reviews:Number,
    time:String,
    venue:String
})

const userModel=mongoose.model("projects",UserSchema);

module.exports=userModel;