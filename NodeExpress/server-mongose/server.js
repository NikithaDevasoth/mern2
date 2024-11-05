const express=require('express')
const app=express()
const Port=3000
const db=require('./config/db')
app.use(express.json())
const Products=require('./routes/ProductRoute')

const Users=require('./routes/UserRoute')
app.get('/',(req,res)=>res.status(200).json({message:"Welcome"}))
app.use('/products',Products)
app.use('/users',Users)
//localhost:3000/products
app.listen(Port,(()=>console.log('listining in:'+Port)))