const express = require('express')
const Products = require('../models/ProductsModel')
// const validate=require('../config/Auth')
const router = express.Router()
//Method:GET|API URL:localhost:3000/products/all
const {validateTokenAdmin}=require('../config/Auth')
router.get('/count',validateTokenAdmin, async (req, res) => {
    try {
        const count = await Products.countDocuments()
        return res.status(200).json({ count: count })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
router.get('/all', async (req, res) => {
    try {
        const products = await Products.find()//find products from db
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})//get method
//Method:POST|API URL:localhost:3000/products/add
router.post('/add',validateTokenAdmin, async (req, res) => {
    try {
        const ProductData = new Products(req.body)
        const { name, img, price } = ProductData
        if (!name || !img || !price) {//if existing product is not available
            res.status(401).json({ message: "All fields are required" })
            const storedata = await ProductData.save()

        }
        const storedata = await ProductData.save()
        res.status(200).json(storedata)


    } catch (error) {
        res.status(500).json({ message: error.message })

    }

})
router.put('/edit/:id',validateTokenAdmin,async(req,res)=>{
    try{
        const id=req.params.id
        const existingproduct=await Products.findOne({_id:id})
        if(!existingproduct){
            res.status(404).json({message:"Product Not Found!"})

        }
        const updateproduct=await Products.findByIdAndUpdate(id,req.body)
        res.status(200).json(updateproduct)

    }
    catch(error){
        res.status(500).json({message:error.message})

    }
})
router.delete('/delete/:id',validateTokenAdmin,async(req,res)=>{
    try{
        const id=req.params.id
        const existingproduct=await Products.findOne({_id:id})
        if(!existingproduct){
            res.status(404).json({message:"product not found"})
        }
        await Products.findByIdAndDelete(id)
        res.status(200).json({message:"Product deleted"})

    }
    catch(error){
        res.status(500).json({message:error.message})

    }
})
module.exports = router