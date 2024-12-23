import axios from 'axios'
import { getToken } from '../services/auth'


const PRODUCT_API = 'http://localhost:3000/products/all'
const USER_API = 'http://localhost:3000/users/all'
const ORDER_API = 'http://localhost:3000/orders/all'
const API = 'http://localhost:3000'
//instead of above all three end points you can use const API='http://localhost:3000'
const axiosInstance=axios.create({
    baseURL:API,
})
axiosInstance.interceptors.request.use(
    (config)=>{
        const token=getToken()
        if(token){
            config.headers.Authorization=`${token}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)
// const getUsers = () => axios.get(`${API}/users/all`) for single API can use all calls like products,users,orders
const getProducts = () => axios.get(PRODUCT_API)
const getUsers = () => axiosInstance.get(USER_API)
const getOrders = () => axiosInstance.get(ORDER_API)
const Login = (data) => axios.post(`${API}/auth/login`, data)
const Register = (credentials) => axios.post(`${API}/auth/register`, credentials)
const addProduct = (product) => axiosInstance.post(`${API}/products/add`, product)
const deleteProduct = (id) => axios.delete(`${API}/products/delete/${id}`)
const addUser = (user) => axiosInstance.post(`${API}/users/add`, user)
const deleteUser = (id) => axios.delete(`${API}/users/delete/${id}`)
const addOrder = (order) => axiosInstance.post(`${API}/orders/add`, order)
const deleteOrder = (id) => axiosInstance.delete(`${API}/orders/delete/${id}`)
const editProduct = (product, id) => axios.put(`${API}/products/edit/${id}`, product)
const editUser = (user, id) => axiosInstance.put(API + '/users/edit/' + id, user)
// const editOrder = (order, id) => axios.put(`{API}/orders/edit/${id}`, order)
const getOrdersCount = () =>  axiosInstance.get(`/orders/count`)
const getProductsCount = () =>  axiosInstance.get(`/products/count`)
const getUsersCount = () =>  axiosInstance.get(`/users/count`)
const resetPassword = (password, id) => axios.put(`${API}/users/resetpassword/${id}`, password)


export { getProducts, getUsers, getOrders, Login, addProduct, Register, deleteProduct, addUser, deleteUser, addOrder, deleteOrder, editProduct, editUser, getUsersCount, getProductsCount, getOrdersCount, resetPassword }
