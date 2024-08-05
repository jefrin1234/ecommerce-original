import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/ROLE';
function AdmPanel() {

  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()


  useEffect(()=>{

    if(user?.role !== ROLE.ADMIN ){
      navigate('/')
    } 

  },[user])

 

  return (
    <div className='min-h-[calc(100vh-130px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='h-32 bg-white-100 flex flex-col justify-center items-center'>
          <div className='text-4xl cursor-pointer relative flex justify-center'>
            {
              user ? (
                <div className='w-12 h-12 bg-red-100  flex flex-col items-center justify-center aspect-square rounded-full '>
                  <span className='text-xl'>{user.name.charAt(0).toUpperCase()}</span>
                </div>
              )
                : <FaRegCircleUser />
            }

          </div>
          <p className='capitalize text-lg semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>
        <div>

          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
            <Link to={"all-products"} className='px-2 py-1  hover:bg-slate-100'>All Product</Link>
            
          </nav>

        </div>
      </aside>
      <main className='w-full h-full p-2'>
      <Outlet/>
      </main>
    </div>
  )
}

export default AdmPanel
