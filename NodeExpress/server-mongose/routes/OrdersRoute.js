const express=require('express')
const Orders=require('../models/ProductsModel')
const router=epress.Router()
router.get('/all',async(req,res)=>{
try{
    const products=await orders.find()//find orders from db
    res.status(200).json(orders)
}catch(error){
    res.status(500).json({message:error})

}})//get method