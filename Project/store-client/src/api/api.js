import axios from 'axios'

const PRODUCT_API = 'http://localhost:3000/products/all'
const USER_API = 'http://localhost:3000/users/all'
const ORDER_API = 'http://localhost:3000/orders/all'
const API ='http://localhost:3000'
//instead of above all three end points you can use const API='http://localhost:3000'

const getProducts = () => axios.get(PRODUCT_API)
const getUsers = () => axios.get(USER_API)
const getOrders = () => axios.get(ORDER_API)
const Login = (data) => axios.post(`${API}/auth/login`, data)
const Register = (credentials) => axios.post(`${API}/auth/register`, credentials)
const addProduct = (product) => axios.post(`${API}/products/add`, product)
const deleteProduct=(id)=>axios.delete(`${API}/products/delete/${id}`)
const addUser=(user)=>axios.post(`${API}/users/add`,user)
const deleteUser=(id)=>axios.delete(`${API}/users/delete/${id}`)
const addOrder=(order)=>axios.post(`${API}/orders/add`,order)
const deleteOrder=(id)=>axios.delete(`${API}/orders/delete/${id}`)
const editProduct=(id)=>axios.edit(`{API}/products/edit/${id}`)
const editUser=(id)=>axios.edit(`{API}/users/edit/${id}`)
const editOrder=(id)=>axios.edit(`{API}/orders/edit/${id}`)
const getOrdersCount = () => axios.get(`${API}/orders/count`)
const getProductsCount = () => axios.get(`${API}/products/count`)
const getUsersCount = () => axios.get(`${API}/users/count`)



export { getProducts, getUsers, getOrders,Login,addProduct,Register,deleteProduct,addUser,deleteUser,addOrder,deleteOrder,editProduct,editOrder,editUser,getUsersCount,getProductsCount,getOrdersCount }
