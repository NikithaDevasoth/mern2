const express=require('express')
const Users=require('../models/UsersModel')
const router=epress.Router()
router.get('/all',async(req,res)=>{
try{
    const users=await users.find()//find users from db
    res.status(200).json(users)
}catch(error){
    res.status(500).json({message:error})

}})//get method