import React, { useEffect, useState, useRef } from 'react';
import AdminPageHeader from '../../components/Admin/AdminPageHeader';
import { Loader2, Pencil, ShoppingBagIcon, ShoppingBasketIcon, Trash, TriangleAlert, X } from 'lucide-react';
import { getProducts, addProduct, deleteProduct, editProduct } from '../../api/api';
import { toast } from 'sonner';

const AdminProducts = () => {
  const [products, setProducts] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null)
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const nameRef = useRef('');
  const imgRef = useRef('');
  const priceRef = useRef(0);


  // const handleLogin = async (e) => {
  //   e.preventDefault(); 
  //   const product = {
  //     name: nameRef.current.value,
  //     img:imgRef.current.value,
  //     price: priceRef.current.value
  //   };

  // };

  const fetchData = async () => {
    try {
      const res = await getProducts();
      if (res.status === 200) {
        console.log(res.data);
        setProducts(res.data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }
  const handleAdd = async (e) => {
    e.preventDefault()
    const product = {
      name: nameRef.current.value,
      img: imgRef.current.value,
      price: priceRef.current.value
    }
    try {
      const response = await addProduct(product)
      if (response.status === 200) {
        // console.log("Product Added")
        toast.success("Product Added!")
        setShowAdd(false)
        fetchData()
      }

    }
    catch (error) {
      console.error(error)
    }

  }
  const editHelper = (product) => {
    setCurrentProduct(product)
    setShowEdit(true)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const product = {
      name: nameRef.current.value,
      img: imgRef.current.value,
      price: priceRef.current.value
    }
    try {
      const response = await editProduct(id)
      if (response.status === 200) {
        setShowEdit(!showEdit)
        // console.log("Product edited!")
        // toast.info('Product edited!')
        fetchData()
        toast.info('Product Updated!')

      }
    } catch (errror) {

      toast.error("error while updating")

    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id)
      if (response.status === 200) {
        console.log("Product Deleted!")
        toast.success('Product Delete')
        fetchData()

      }
    } catch (errror) {
      console.log(error)
      toast.error("error while deleting")

    }
  }






  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
        <Loader2 className='text-purple-500 h-14 w-14 animate-spin' />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
        <TriangleAlert className='text-orange-400 h-12 w-12' />
        <p>No Products Available!</p>
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
      <AdminPageHeader title='Products' />

      {/* Button to Show Add Product Popup */}
      <button
        className="h-9 w-9 flex justify-center items-center border-2 border-black rounded-full hover:border-purple-500 hover:text-purple-500 ml-4 shadow-md"
        onClick={() => setShowAdd(!showAdd)}
      >
        <ShoppingBasketIcon className="h-6 w-6" />
      </button>

      {/* Add Product Popup */}
      {showAdd && (
        <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40">
          <div className='h-1/2 w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md'>
            <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
              <div className="w-[80%] flex flex-row justify-center items-center">
                <h1 className='w-1/2 text-left my-6 font-bold text-purple-500'>Add Product</h1>
                <div className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer" onClick={() => setShowAdd(false)}>
                  <X className="h-8 w-8 border-2 p-1 border-red-500 rounded-full hover:bg-red-500 hover:text-white" />
                </div>
              </div>
              <form className='h-[100%] w-[100%] flex flex-col justify-center items-center gap-6' onSubmit={handleAdd}>
                <input ref={nameRef} type="text" placeholder='Name of Product' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <input ref={priceRef} type="number" placeholder='Price of Product' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <input ref={imgRef} type="text" placeholder='Img URL' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <button type="submit" className="w-full h-[4rem] shadow-sm bg-purple-500 text-white rounded-sm outline-none">Add Product</button>
              </form>
            </div>
          </div>
        </div>
      )}
       {showEdit && (
        <>
          <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40 ">
            <div className='h-[55%] w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md'>
              <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
                <div className="h-[20%] w-[80%] flex flex-row justify-center items-center">
                  <h1 className='w-1/2 text-left text-xl my-6 font-bold text-blue-500'>Edit Product</h1>
                  <div className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer" onClick={() => { setShowEdit(!showEdit) }}>
                    <X className="h-8 w-8 border-2 p-1  border-red-500 rounded-full  hover:bg-red-500 hover:text-white" />
                  </div>
                </div>
                <form className='h-[70%] w-[80%] flex flex-col justify-center items-center gap-8' onSubmit={handleEdit}>
                  <input ref={nameRef} type="text" name="" id="title" placeholder='Title' defaultValue={currentProduct.title} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required autoFocus />
                  <input ref={imgRef} type="text" name="" id="img" placeholder='Image URL' defaultValue={currentProduct.img} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required />
                  <input ref={priceRef} type="number" name="" id="price" placeholder='Price' defaultValue={currentProduct.price} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required />
                  <button type="submit" className="w-full h-[3rem]  shadow-lg shadow-gray-400 hover:shadow-blue-400 bg-blue-500 text-white rounded-sm outline-none">Save</button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
  

      <table className='w-full h-full border-collapse border shadow-lg rounded-md'>
        <thead className='shadow-sm font-bold text-purple-500 text-left'>
          <tr>
            <th className='p-6'>PID</th>
            <th className='p-6'>Image</th>


            <th className='p-6'>Title</th>


            <th className='p-6'>Price</th>

            <th className='p-6'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className='p-4'>{product._id}</td>
              <td><img src={product.img} alt={product.name} className='h-9 w-9' /></td>
              <td className='p-4'>{product.name}</td>
              <td className='p-4'>{product.price}</td>
              {/* <td className='p-4'>{product._id}</td> */}
              <td className='p-4 flex h-full w-full flex-row justify-start items-center gap-4'>
                <button className='h-15 w-15 border-blue-500 border-2 p-1 rounded-md text-blue-500 shadow-md hover:bg-blue-500 hover:text-white hover:shadow-blue-500' onClick={() => { editHelper(product) }}>
                  <Pencil />
                </button>
                <button className='h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md hover:bg-red-500 hover:text-white hover:shadow-red-500' onClick={() => handleDelete(product._id)}>
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default AdminProducts;
