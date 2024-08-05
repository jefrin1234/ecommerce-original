import React, { useState } from 'react'
import ROLE from '../common/ROLE.js'
import { IoMdClose } from "react-icons/io";
import summaryApi from '../common/index.js';
import { toast } from 'react-toastify';

function ChangeUserRole({
  name, email, role, onClose, userId,callFunc
}) {

  const [userRole, setUserRole] = useState(role)

  const handleOnchangeSelect = (e) => {
    setUserRole(e.target.value)
    console.log(e.target.value);
  }

  const updateUserRole = async () => {
    const fetchResponse = await fetch(summaryApi.updateUser.url, {
      method: summaryApi.updateUser.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      }, body: JSON.stringify({
        userId: userId,  // updated to use userId
        role: userRole
      })
    })

    const responseData = await fetchResponse.json()
    if (responseData.success) {
      toast.success(responseData.message)
      onClose()
      callFunc()
    }
  else {
      toast.error(responseData.message)
    }
  }

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex items-center justify-center bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
        <button className='block ml-auto' onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

        <p>name: {name}</p>
        <p>email: {email}</p>
        <div className='flex items-center justify-between my-4'>
          <p>Role:</p>
          <select className='border px-4 py-1' value={userRole} onChange={handleOnchangeSelect}>
            {
              Object.values(ROLE).map(el => {
                return (
                  <option value={el} key={el}>{el}</option>
                )
              })
            }
          </select>
        </div>
        <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
      </div>
    </div>
  )
}

export default ChangeUserRole
