const express = require('express')
const Users = require('../models/UsersModel')
const router = express.Router()
router.get('/all', async (req, res) => {
    try {
        const users = await users.find()//find users from db
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error })

    }
})//get method
router.post('/add', async (req, res) => {
    try {
        const UserData = new Users(req.body)
        const { name, email, password, Phone, adress } = UserData
        if (!name || !email || !email || !password || !Phone || !adress) {
            res.status(401).json({ message: "All fields are required" })
            const storedata = await UserData.save()

        }
        const storedata = await UserData.save()
        res.status(201).json(storedata)


    } catch (error) {
        res.status(500).json({ message: error.message })

    }

 })
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const existinguser = await Users.findOne({ _id: id })
        if (!existinguser) {
            res.status(403).json({ message: "user not found" })
        }   
        const updateuser = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({message:"the data updated successfully"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }})
    router.delete('/delete/:id',async(req,res)=>{
        try{
            const id=req.params.id
            const existinguser=await Users.findOne({_id:id})
            if(!existinguser){
                res.status(403).json("the user data deleted successfully")
            }
            await Users.findByIdAndDelete(id)
            res.status(200).json({message:"User deleted"})
        }
        catch(error){
            res.status(500).json({message:error.message})
        }
    })
    
module.exports = router
