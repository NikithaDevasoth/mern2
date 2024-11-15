import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminLeftBar = () => {
  const Navigate = useNavigate()
  const Linksdata = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard'
    },
    {
      title: 'Products',
      path: '/admin/products'
    },
   
    {
      title:'Settings',
      path:'admin/settings'
    },
    {
      title:'Users',
      path:'admin/users'
    },
    {
      title:'Orders',
      path:'admin/orders'
    },
    {
      title: 'Settings',
      path: '/admin/settings'
    }

  ]
  const handleLogout = () => {
    localStorage.removeItem('token')
    Navigate('/')
  }
  return (
    <div className='w-full h-screen shadow-purple-400 shadow-md flex justify-center items-center'>
      <div className='h-full w-full flex flex-col'>
        <div className='h-[10%] w-full text-purple-500 flex justify-center font-bold text-2xl items-center'>
          MaX Store
        </div>
        <div className='h-[80%] w-full flex flex-col items-center '>
          {Linksdata.map((link, index) => (
            <NavLink to={link.path} key={index} className='h-[10%] w-full px-8 hover:bg-purple-500/90 hover:text-white flex justify-start items-center rounded-sm shadow-md'>
              {link.title}
            </NavLink>
          ))
          }
        </div>
        <div className='h-[10%] w-full flex items-end'>
          <div className=' px-8 bg-red-500 w-[60%] h-2/3 text-white flex justify-center  font-bold items-center'>
            Logout
          </div>
          </div>
          </div>
          </div>
   
  )
}

export default AdminLeftBar