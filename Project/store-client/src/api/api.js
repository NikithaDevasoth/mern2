import axios from 'axios'

const PRODUCT_API = 'http://localhost:3000/products/all'
const USER_API = 'http://localhost:3000/users/all'
const ORDER_API = 'http://localhost:3000/orders/all'
//instead of above all three end points you can use const API='http://localhost:3000'

const getProducts = () => axios.get(PRODUCT_API)
const getUsers = () => axios.get(USER_API)
const getOrders = () => axios.get(ORDER_API)
const Login = (data) => axios.post(`${API}/auth/login`, data)
export { getProducts, getUsers, getOrders,Login }
