import React, { useEffect, useState, useRef } from 'react'
import AdminPageHeader from '../../components/Admin/AdminPageHeader'
import { Key,Loader2, Pencil, Trash, TriangleAlert, User, User2Icon, X } from 'lucide-react'
import { getUsers, addUser, deleteUser,editUser ,resetPassword} from '../../api/api'
import { toast } from 'sonner';

const AdminUsers = () => {
  const [users, setUsers] = useState(null)
  const [currentUser,setCurrentUser]=useState(null)
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const[showEdit,setShowEdit]=useState(false)
  const [showReset, setShowReset] = useState(false)
  const nameRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef(0);
  const passwordRef=useRef('');
  const roleRef=useRef('');
  const  fetchData=async() =>{
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
      phone: phoneRef.current.value,
   password:passwordRef.current.value,
   role:roleRef.current.value,
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
      const response=await deleteUser(id)
      if (response.status == 200) {
        // console.log("User Deleted!")
        toast.success('User Deleted!')
        fetchData()
      }
    }
    catch (error) {
      console.log(error)
      toast.error("error while deleting")
    }
  }
  const editHelper=(user)=>{
    setCurrentUser(user)
    setShowEdit(true)
  }
const handleEdit=async(e)=>{
  e.preventDefault()
  const user={
    name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
  //  password:passwordRef.current.value,
   role:roleRef.current.value,
  }
  try{
    const response=await editUser(user,currentUser._id)
    if(response.status===200){
      console.log("User Updated!")
      toast.info('User Updated!')
      fetchData()
    }
  }
    catch(error){
      console.log(error)
      toast.error("error while updating")
    }
    }
    const resetHelper=(user)=>{
      setCurrentUser(user)
      setShowReset(true)

    }
    const handleReset = async (e) => {
      e.preventDefault()
      try {
        const response = await resetPassword({ password: passwordRef.current.value }, currentUser._id)
        if (response.status === 200) {
          setShowReset(!showReset)
          toast.warning("User Password Updated !")
        }
      } catch (error) {
        toast.error("Error while Updating")
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
                {/* <button type="submit" className="w-full h-[4rem] shadow-sm bg-purple-500 text-white rounded-sm outline-none">Select User</button> */}
                <input ref={passwordRef} type="password" placeholder='Password' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <input ref={roleRef} type="number" placeholder='Role' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                <div className='select h-[2rem] w-[80%]'>
          <select name="formate" id="format" defaultValue='ADMIN'ref={roleRef}>
            <option value='ADMIN'>Admin</option>
            <option value='USER'>User</option>
            </select>
            </div>
            <button className='w-1/2 text-left my-6 font-bold text-purple-500'>Add User</button>
{/*             
                <button className='h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md hover:bg-red-500 hover:text-white hover:shadow-red-500' onClick={() => handleDelete(user._id)}>
                  <Trash /> </button>
                  
                <button className='h-15 w-15 border-blue-500 border-2 p-1 rounded-md text--500 to-blue-500 shadow-md hover:bg-blue-500 hover:text-white hover:shadow-blue-500' onClick={() => {editHelper(user)}}>
                  <Pencil />
                  </button> */}
              </form>
            </div>
          </div>
        </div>
      )}
       {showEdit && (
        <>
          <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40 ">
            <div className='h-[85%] w-1/2 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md'>
              <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
                <div className="h-[20%] w-[80%] flex flex-row justify-center items-center">
                  <h1 className='w-1/3 text-left text-xl my-6 font-bold text-blue-500'>Edit User</h1>
                  <div className="w-1/3 flex justify-end items-center text-red-500 cursor-pointer" onClick={() => { setShowEdit(!showEdit) }}>
                    <X className="h-8 w-8 left-2 border-2 p-1  border-red-500 rounded-full  hover:bg-red-500 hover:text-white" />
                  </div>
                </div>
                <form className='h-[70%] w-[80%] flex flex-col justify-center items-center gap-8' onSubmit={handleEdit}>
                  <input ref={nameRef}  defaultValue={currentUser.name} type="text" name="" id="" placeholder='Name'  className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required autoFocus />
                  <input ref={emailRef} defaultValue={currentUser.email}  type="email" name="" id="" placeholder='EmailL'  className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required />
                  <input ref={phoneRef}  defaultValue={currentUser.phone} type="number" placeholder='Phone' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required />
                {/* <input ref={roleRef} type="number" placeholder='Role' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-purple-400 rounded-sm' required /> */}
                <div className='select my-2'>
                <select name="format" id="format" defaultValue={currentUser.role} ref={roleRef}>
          {/* <select name="formate" id="format" defaultValue='ADMIN'ref={roleRef}> */}
            <option value='ADMIN'>Admin</option>
            <option value='USER'>User</option>
            </select>
            </div>
                  {/* <input ref={phoneRef} type="number" name="" id="price" placeholder='Price' defaultValue={currentUser.phone} className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-blue-400 rounded-sm' required /> */}
                  <button type="submit" className="w-full h-[3rem]  shadow-lg shadow-gray-400 hover:shadow-blue-400 bg-blue-500 text-white rounded-sm outline-none">Save</button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
            {showReset && (
        <>
          <div className="absolute top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black/40 ">
            <div className='h-[35%] w-1/3 flex flex-col justify-center items-center bg-white shadow-2xl rounded-md'>
              <div className='h-full w-full flex flex-col justify-center items-center text-lg font-semibold'>
                <div className="h-[20%] w-[80%] flex flex-row justify-center items-center">
                  <h1 className='w-1/2 text-left text-xl my-6 font-bold text-orange-500'>Reset Password</h1>
                  <div className="w-1/2 flex justify-end items-center text-red-500 cursor-pointer" onClick={() => { setShowReset(!showReset) }}>
                    <X className="h-8 w-8 border-2 p-1  border-red-500 rounded-full  hover:bg-red-500 hover:text-white" />
                  </div>
                </div>
                <form className='h-[70%] w-[80%] flex flex-col justify-center items-center gap-8' onSubmit={handleReset}>
                  <input ref={passwordRef} type="text" name="" id="name" placeholder='New Password' className='w-full shadow-sm outline-none bg-[#f5f5f7] border-b-2 border-transparent p-4 focus:shadow-lg focus:border-b-2 focus:border-orange-400 rounded-sm' required autoFocus />
                  <button type="submit" className="w-full h-[3rem]  shadow-lg shadow-gray-400 hover:shadow-orange-400 bg-orange-500 text-white rounded-sm outline-none">Reset</button>
                  {/* <Key className="h-8 w-8 border-2 p-1  border-orange-500 rounded-full  hover:bg-orange-500 hover:text-white" /> */}
                
                </form>
              </div>
            </div>
          </div>
        </>
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
                  hover:bg-blue-500 hover:text-white hover:shadow-blue-500' onClick={() => { editHelper(user) }}>
                    <Pencil />
                  </button>
                  {/* <button className='h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md
                  hover:bg-red-500 hover:text-white hover:shadow-red-500' onClick={() =>{ handleDelete(user._id)}}>
                    <Trash /> */}
                    {/* </button> */}
                    <button className='h-15 w-15 border-orange-500 border-2 p-1 rounded-md text-red-500 shadow-md
                  hover:bg-orange-500 hover:text-white hover:shadow-orange-500' onClick={() => { resetHelper(user) }}>
                    <Key />
                    </button>
                    <button className='h-15 w-15 border-red-500 border-2 p-1 rounded-md text-red-500 shadow-md
                  hover:bg-red-500 hover:text-white hover:shadow-red-500' onClick={() =>{ handleDelete(user._id)}}>
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