import React, { useEffect, useState, useRef } from 'react';
import AdminPageHeader from '../../components/Admin/AdminPageHeader';
import { Loader2, Pencil, ShoppingCart, Trash, TriangleAlert, X } from 'lucide-react';
import { getOrders, addOrder, deleteOrder, editOrder } from '../../api/api';
import { toast } from 'sonner';

const AdminOrders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // References for form inputs
  const uidRef = useRef('');
  const pidRef = useRef('');
  const phoneRef = useRef('');
  const totalRef = useRef(0);

  const fetchData = async () => {
    try {
      const res = await getOrders();
      if (res.status === 200) {
        setOrders(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    const order = {
      uid: uidRef.current.value,
      pid: pidRef.current.value,
      phone: phoneRef.current.value,
      total: totalRef.current.value
    }
    try {
      const response = await addOrder(order);
      if (response.status === 200) {
        console.log("Order Added");
        totalRef.success("order adedd!")
        setShowAdd(false)
        fetchData()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const editHelper = (order) => {
    console.log(order); // Fixed typo from `user` to `order`
    setCurrentOrder(order);
    setShowEdit(true); // Set showEdit to true when clicking edit
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const order = {
      uid: uidRef.current.value,
      pid: pidRef.current.value,
      phone: phoneRef.current.value,
      total: totalRef.current.value,
    };
    try {
      const response = await editOrder(order, currentOrder._id); // Fixed typo from `editProduct` to `editOrder`
      if (response.status === 200) {
        setShowEdit(false);
        fetchData();
        toast.info("Order Updated!");
      }
    } catch (error) {
      toast.error("Error while updating");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteOrder(id);
      if (response.status === 200) {
        console.log("Order Deleted!");
        toast.success('Order Deleted');
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting");
    }
  };

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

  if (!orders || orders.length === 0) {
    return (
      <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
        <TriangleAlert className='text-orange-400 h-12 w-12' />
        <p>No Orders Available!</p>
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
      <AdminPageHeader title='Orders' />

      {/* Button to Show Add Order Popup */}
      <button
        className="h-9 w-9 flex justify-center items-center border-2 border-black rounded-full hover:border-purple-500 hover:text-purple-500 ml-4 shadow-md"
        onClick={() => setShowAdd(!showAdd)}
      >
        <ShoppingCart className="h-6 w-6" />
      </button>

      {/* Add Order Popup */}
      {showAdd && (
        <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40">
          <div className='h-1/1 w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md'>
            <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
              <div className="w-[80%] flex flex-row justify-center items-center">
                <h1 className='w-1/2 text-left my-6 font-bold text-purple-500'>Add Order</h1>
                <div className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer" onClick={() => setShowAdd(false)}>
                  <X className="h-8 w-8 border-2 p-1 border-red-500 rounded-full hover:bg-red-500 hover:text-white" />
                </div>
              </div>
              <form className='h-[100%] w-[100%] flex flex-col justify-center items-center gap-6' onSubmit={handleAdd}>
                <input ref={uidRef} type="text" placeholder='User Id' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <input ref={pidRef} type="text" placeholder='Product Id' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <input ref={phoneRef} type="number" placeholder='Phone' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <input ref={totalRef} type="number" placeholder='Total Amount' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <button type="submit" className="w-full h-[4rem] shadow-sm bg-purple-500 text-white rounded-sm outline-none">Add Order</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Popup */}
      {showEdit && (
        <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40">
          <div className='h-[55%] w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md'>
            <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
              <div className="h-[20%] w-[80%] flex flex-row justify-center items-center">
                <h1 className='w-1/2 text-left text-xl my-6 font-bold text-blue-500'>Edit Order</h1>
                <div className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer" onClick={() => { setShowEdit(!showEdit) }}>
                  <X className="h-8 w-8 border-2 p-1  border-red-500 rounded-full  hover:bg-red-500 hover:text-white" />
                </div>
              </div>
              <form className='h-[70%] w-[80%] flex flex-col justify-center items-center gap-8' onSubmit={handleEdit}>
                <input ref={uidRef} type="text" name="" id="title" placeholder='UID' defaultValue={currentOrder?.uid} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required autoFocus />
                <input ref={pidRef} type="text" name="" id="id" placeholder='PID' defaultValue={currentOrder?.pid} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required />
                <input ref={phoneRef} type="number" name="" id="" placeholder='Phone' defaultValue={currentOrder?.phone} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required />
                <input ref={totalRef} type="number" name="" id="" placeholder='Total' defaultValue={currentOrder?.total} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required />
                <button type="submit" className="w-full h-[3rem]  shadow-lg shadow-gray-400 hover:shadow-blue-400 bg-blue-500 text-white rounded-sm outline-none">Save</button>
              </form>
            </div>
          </div>
        </div>
      )}

      <table className='w-full h-full border-collapse border shadow-lg rounded-md'>
        <thead className='shadow-sm font-bold text-purple-500 text-left'>
          <tr>
            <th className='p-6'>UID</th>
            <th className='p-6'>PID</th>
            <th className='p-6'>Phone</th>
            <th className='p-6'>Total</th>
            <th className='p-6'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className='p-4'>{order.uid}</td>
              <td className='p-4'>{order.pid}</td>
              <td className='p-4'>{order.phone}</td>
              <td className='p-4'>{order.total}</td>
              <td className='p-4 flex h-full w-full flex-row justify-start items-center gap-4'>
                <button className='h-15 w-15 border-blue-500 border-2 p-1 rounded-md text-blue-500 shadow-md hover:bg-blue-500 hover:text-white hover:shadow-blue-500' onClick={() => editHelper(order)}>
                  <Pencil />
                </button>
                <button className='h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md hover:bg-red-500 hover:text-white hover:shadow-red-500' onClick={() => handleDelete(order._id)}>
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
