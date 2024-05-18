const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
  rollNo: {
      type: String,
      required: true,
    },
  userName: {
      type: String,
      required: true,
    },
  role: {
      type: String,
      required: true,
    },
  email: {
      type: String,
      required: true,
    },
})
const UserSchema=mongoose.model("usermaster",userSchema);

module.exports=UserSchema;