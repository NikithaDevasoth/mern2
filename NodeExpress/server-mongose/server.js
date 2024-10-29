const express=require('express')
const app=express()
const Port=3000
app.use(express.json())
app.get('/',(req,res)=>res.status(200).json({message:"Welcome"}))
app.listen(Port,(()=>console.log('listining in:'+Port)))