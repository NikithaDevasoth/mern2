import React from 'react'
import AdminDasboardHomeCards from '../../components/Admin/AdminDashboardHomeCards'
import AdminPageHeader from '../../components/Admin/AdminPageHeader'


const AdminDashboard= () => {
  return (
    <div className='w-full h-full flex flex-col min-h-[80] justify-center items-center'>
        <AdminDasboardHomeCards title='Dashboard'/>
        </div>
  )
}

export default AdminDashboard