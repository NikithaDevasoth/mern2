const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://NikithaDevasoth:1234nikitha@in-aws.ndccd.mongodb.net/")
const connection=mongoose.connection;
connection.on('connected',()=>(console.log("DB Connected")))
connection.on('error',()=>(console.log("DB error")))
module.exports=mongoose