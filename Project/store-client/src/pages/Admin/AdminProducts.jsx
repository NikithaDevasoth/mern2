import React, { useEffect, useState } from 'react'
import AdminPageHeader from '../../components/Admin/AdminPageHeader'
import { Loader2, Pencil, Trash, TriangleAlert } from 'lucide-react'
import { getProducts } from '../../api/api'

const AdminProducts = () => {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAddProductForm, setShowAddProductForm] = useState(false) // Control Add Product form visibility
  const [newProduct, setNewProduct] = useState({ name: '', img: '', price: '' }) // Store new product details

  async function fetchData() {
    try {
      const res = await getProducts()
      if (res.status === 200) {
        setProducts(res.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct({ ...newProduct, [name]: value })
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.img && newProduct.price) {
      // Add the new product to the list
      setProducts([...products, newProduct])
      setNewProduct({ name: '', img: '', price: '' }) // Clear the form
      setShowAddProductForm(false) // Hide the form
    } else {
      alert('Please fill all fields')
    }
  }

  if (loading) {
    return (
      <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
        <Loader2 className='text-purple-500 h-14 w-14 animate-spin' />
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
        <TriangleAlert className='text-orange-400 h-12 w-12' />
        <p>No Products Available!</p>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
      <AdminPageHeader title='Products' />

      {/* Popup for Add Product Form */}
      {showAddProductForm && (
        <div className='w-full bg-blue-100 p-4 mb-4 flex flex-col items-start'>
          <h2 className='text-blue-800 font-bold mb-2'>Add New Product</h2>
          <div className='flex flex-col gap-2'>
            <input
              type='text'
              name='name'
              placeholder='Product Name'
              value={newProduct.name}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              name='img'
              placeholder='Product Image URL'
              value={newProduct.img}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded'
            />
            <input
              type='number'
              name='price'
              placeholder='Product Price'
              value={newProduct.price}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded'
            />
            <button onClick={handleAddProduct} className='bg-blue-500 text-white p-2 rounded mt-2'>
              Add Product
            </button>
          </div>
          <button onClick={() => setShowAddProductForm(false)} className='text-blue-800 font-bold mt-4'>
            Close
          </button>
        </div>
      )}

      {!showAddProductForm && (
        <button
          onClick={() => setShowAddProductForm(true)}
          className='bg-green-500 text-white p-2 rounded mb-4'>
          Add Product
        </button>
      )}

      <table className='w-full h-full border-collapse border shadow-lg rounded-md'>
        <thead className='shadow-sm font-bold text-purple-500 text-left'>
          <tr>
            <th className='p-6'>Title</th>
            <th className='p-6'>Image</th>
            <th className='p-6'>Price</th>
            <th className='p-6'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className='p-4'>{product.name}</td>
              <td className='p-4'>
                <img src={product.img} alt={product.name} className='h-12 w-12 object-cover rounded' />
              </td>
              <td className='p-4'>{product.price}</td>
              <td className='p-4 flex h-full w-full flex-row justify-start items-center gap-4'>
                <button className='h-15 w-15 border-blue-500 border-2 p-1 rounded-md text-blue-500 shadow-md hover:bg-blue-500 hover:text-white hover:shadow-blue-500'>
                  <Pencil />
                </button>
                <button className='h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md hover:bg-red-500 hover:text-white hover:shadow-red-500'>
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminProducts
