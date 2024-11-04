const express=require('express')
const Products=require('../models/ProductsModel')
const router=epress.Router()
router.get('/all',async(req,res)=>{
try{
    const products=await products.find()//find products from db
    res.status(200).json(products)
}catch(error){
    res.status(500).json({message:error})

}})//get method