import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import {  MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import ROLE from '../common/ROLE.js';
function Allusers() {


  const [allUsers, setAllUsers] = useState([])
  const [openUpdateRole,setOpenUpdateRole]=useState(false)
  const [updateUserDetail,setUpdateUserDetail]=useState({
    email:'',
    name:'',
    role:'',
    _id:''
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(summaryApi.allUser.url, {
      method: summaryApi.allUser.method,
      credentials: 'include'
    })
    const dataResponse = await fetchData.json()
    
    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
      console.log(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  },[])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='pb-4 bg-white'>
          {
            allUsers.map((el, index) => {
              console.log(el);
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                   <td>{el?.email}</td>
                   <td>{el?.role}</td>
                   <td>{moment(el?.createdAt).format('LL')}</td>
                   <td><button  className='bg-green-100 p-2 rounded-full hover:bg-green-300 hover:text-white'><MdModeEdit onClick={()=>{
                    setOpenUpdateRole(true)
                    setUpdateUserDetail(el)
                   }} 

                    /></button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

     {
      openUpdateRole && (
         <ChangeUserRole 
         onClose={()=>setOpenUpdateRole(false)}
         name={updateUserDetail.name} 
         email={updateUserDetail.email}
         role={updateUserDetail.role}
         userId={updateUserDetail._id}
         callFunc={fetchAllUsers}
         />
      )
          
     }
    </div>
  )
}

export default Allusers
