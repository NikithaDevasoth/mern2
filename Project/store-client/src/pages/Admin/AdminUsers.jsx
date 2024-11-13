import React, { useEffect, useState, useRef } from 'react'
import AdminPageHeader from '../../components/Admin/AdminPageHeader'
import { Loader2, Pencil, Trash, TriangleAlert, User, User2Icon, X } from 'lucide-react'
import { getUsers, addUser, deleteUser } from '../../api/api'
import { toast } from 'sonner';

const AdminUsers = () => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const nameRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef(0);




  async function fetchData() {
    try {
      const res = await getUsers()
      if (res.status === 200) {
        setUsers(res.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const handleAdd = async (e) => {
    e.preventDefault()
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value
    }
    try {
      const response = await addUser(user)
      if (response.status === 200) {
        console.log(" User Added")
        setShowAdd(false)
        fetchData()
      }

    }
    catch (error) {
      console.error(error)
    }
  }
  const handleDelete = async (id) => {
    try {
      if (response.status == 200) {
        console.log("User Deleted!")
        toast.success('User Deleted!')
        fetchData()
      }
    }
    catch (error) {
      console.log(error)
      toast.error("error while deleting")
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
        <Loader2 className='text-purple-500 h-14 w-14 animate-spin' />
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
        <TriangleAlert className='text-orange-400 h-12 w-12' />
        <p>No Users Available!</p>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
      <AdminPageHeader title='Users' />
      {/* Button to Show Add Product Popup */}
      <button
        className="h-9 w-9 flex justify-center items-center border-2 border-black rounded-full hover:border-purple-500 hover:text-purple-500 ml-4 shadow-md"
        onClick={() => setShowAdd(!showAdd)}
      >
        <User2Icon className="h-6 w-6" />
      </button>
      {/* Add Product Popup */}
      {showAdd && (
        <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40">
          <div className='h-1/1 w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md'>
            <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
              <div className="w-[80%] flex flex-row justify-center items-center">
                <h1 className='w-1/2 text-left my-6 font-bold text-purple-500'>Add User</h1>
                <div className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer" onClick={() => setShowAdd(false)}>
                  <X className="h-8 w-8 border-2 p-1 border-red-500 rounded-full hover:bg-red-500 hover:text-white" />
                </div>
              </div>
              <form className='h-[100%] w-[100%] flex flex-col justify-center items-center gap-6' onSubmit={handleAdd}>
                <input ref={nameRef} type="text" placeholder='Name ' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <input ref={emailRef} type="email" placeholder='Email' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <input ref={phoneRef} type="number" placeholder='Phone Number' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <button type="submit" className="w-full h-[4rem] shadow-sm bg-purple-500 text-white rounded-sm outline-none">Add User</button>
                <button className='h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md hover:bg-red-500 hover:text-white hover:shadow-red-500' onClick={() => handleDelete(user._id)}>
                  <Trash />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <table className='w-full h-full border-collapse border shadow-lg rounded-md'>
        <thead className='shadow-sm font-bold text-purple-500 text-left'>
          <tr>
            <th className='p-6'>Name</th>
            <th className='p-6'>Email</th>
            <th className='p-6'>Phone</th>
            <th className='p-6'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => (
              <tr key={index}>
                <td className='p-4'>{user.name}</td>
                <td className='p-4'>{user.email}</td>
                <td className='p-4'>{user.phone}</td>
                <td className='p-4 flex h-full w-full flex-row justify-start items-center gap-4'>
                  <button className='h-15 w-15 border-blue-500 border-2 p-1 rounded-md text-blue-500 shadow-md
                  hover:bg-blue-500 hover:text-white hover:shadow-blue-500'>
                    <Pencil />
                  </button>
                  <button className='h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md
                  hover:bg-red-500 hover:text-white hover:shadow-red-500'>
                    <Trash />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers
