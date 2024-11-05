const mongoose=require('mongoose')
const { useRevalidator } = require('react-router-dom')
const OrdersSchema=new mongoose.Schema({
Orders:{
    UserId:{
        type:String,
        required:true,

    },
    ProductId:{
        type:String,
        required:true
    },
    OrderDate:{
        type:String,
        required:true
    }
}
})
const Orders=mongoose.model("Orders",OrdersSchema)
module.exports=Orders;