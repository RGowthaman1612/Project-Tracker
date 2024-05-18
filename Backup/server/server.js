const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const UserModel=require('./models/User')


const app=express();
app.use(cors());
app.use(express.json);

mongoose.connect("mongodb+srv://gowthaman:gowtham@tracking.gdxxzig.mongodb.net/users");

app.post('/adminProjectAllotment',(req,res)=>{
    UserModel.create(req.body)
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
})

app.listen(3000,()=>{
    console.log("con");
});
