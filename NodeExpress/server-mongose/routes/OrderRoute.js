const express=require('express')
const Orders=require('../models/OrdersModel')
const router=express.Router()
router.get('/all',async(req,res)=>{
try{
    const orders=await Orders.find()//find orders from db
   return  res.status(200).json(orders)
}catch(error){
   return  res.status(500).json({message:error})

}})//get method
router.post('/add', async (req, res) => {
    try {
        const OrderData = new Orders(req.body)
        const { UserId, ProductsId, OrderDate } = OrderData
        if (!UserId || !ProductsId || !OrderDate) {
            res.status(400).json({ message: "All fields are required" })
            const storedata = await OrderData.save()

        }
        const storedata = await OrderData.save()
       return  res.status(201).json(storedata)


    } catch (error) {
      return   res.status(500).json({ message: error.message })

    }})
    router.put('/edit/:id',async(req,res)=>{
        try{
            const id=req.params.id
            const existingorder=await Orders.findOne({_id:id})
            if(!existingorder){
                return res.status(403).json("the order not found")
            }
            const updateorder=await Orders.findByIdAndUpdate(req.body,id)
            return  res.status(200).json(updateorder)
            }
            catch(error){
              return  res.status(500).json({message:error.message})
            }})
            router.delete('/delete/:id',async(req,res)=>{
                try{
                    const id=req.params.id
                    const existingorder=await Orders.findOne({_id:id})
                    if(!existingorder){
                       return  res.status(403).json({message:"the order not found"})
                    }
                    await Orders.findByIdAndDelete(id)
                  return   res.status(200).json({message:"the order deleted successfully"})

                }
                catch(error){
                   return res.status(500).json({message:error.message})

                }
            })
        
    module.exports = router