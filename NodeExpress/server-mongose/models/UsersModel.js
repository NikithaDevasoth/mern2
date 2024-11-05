const mongoose=require('mongoose')
const { useRevalidator } = require('react-router-dom')
const UsersSchema=new mongoose.Schema({
    name:{
        type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:false,
},
Phone:{
   type:Number,
    required:true,
    unique:true

},
adress:{
    type:String,
    required:true
},



})
const Users=mongoose.model("Users",UsersSchema)
module.exports=Users;
//name:string:required
//email:string:required:unique
//phone:number:required:unique
//adress:string:optional