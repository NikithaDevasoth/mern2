const mongoose = require('mongoose')
const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true
    },
})
const Products = mongoose.model("Products", ProductsSchema)//Products is a collection name and roductsSchema is structure of product 
module.exports = Products;
//name:string:required
//email:string:required:unique
//phone:number:required:unique
//adress:string:optional