const express=require('express')
const cors=require('cors')
const app=express()
const Port=3000
app.use(cors())
const db=require('./config/db')
app.use(express.json())
const Products=require('./routes/ProductRoute')

const Users=require('./routes/UserRoute')
const Orders=require('./routes/OrderRoute')
const Auth=require('./routes/AuthRoute')
app.get('/',(req,res)=>res.status(200).json({message:"Welcome"}))
app.use('/products',Products)
app.use('/users',Users)
app.use('/orders',Orders)
app.use('/auth',Auth)
//localhost:3000/products
app.listen(Port,(()=>console.log('listining in:'+Port)))