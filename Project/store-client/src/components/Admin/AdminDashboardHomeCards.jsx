import { DollarSign, ShoppingBasketIcon, ShoppingCart, Users } from "lucide-react"
import React from "react"
import { NavLink } from 'react-router-dom'
import Products from "../../pages/Products"
const AdminDasboardHomeCards=()=>{
    return(
        <>
        <div className='w-full flex felx-row justify-center items-center'>
            <div className= 'w-1/4 h-[10vh] flex flex-row justify-center items-center px-2 shadow-md rounded-md'>
            <div className= 'w-[70%] h-full felx flex-col justify-center items-start'>
                <p className='text-3xl font-semibold'> 100</p>
                <p className='text-sm font-semibold px-1'>
                    Users
                </p>
            </div>
            <div className='w-[30%] h-full justify-center items-center'>
                <Users className='w-9 h-9'/>
            </div>
            </div>
            <div className= 'w-1/4 h-[10vh] flex flex-row justify-center items-center px-2 shadow-md rounded-md'>
            <div className= 'w-[70%] h-full felx flex-col justify-center items-start'>
                <p className='text-3xl font-semibold'> 100</p>
                <p className="text-sm font-semibold px-1">
                    Products
                </p>
            </div>
            <div className="w-[30%] h-full justify-center items-center">
            <ShoppingBasketIcon className="w-10 h-10"/>
            </div>
            </div>
            <div className= 'w-1/4 h-[10vh] flex flex-row justify-center items-center px-2 shadow-md rounded-md'>
            <div className= 'w-[70%] h-full felx flex-col justify-center items-start'>
                <p className='text-3xl font-semibold'> 100</p>
                <p className="text-sm font-semibold px-1">
                    Orders
                </p>
            </div>
            <div className='w-[30%] h-full justify-center items-center'>
            
               
                <ShoppingCart className="w-10 h-10"/>
            </div>
            </div>
            </div>
            </>
             
    )}
    export default AdminDasboardHomeCards
