import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link,  useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

function Login() {
  const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)
 
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({

    email: '',
    password: '',

  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value

      }

    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const dataResponse = await fetch(summaryApi.signin.url,{
      method : summaryApi.signin.method,
      credentials : 'include',
      headers : {
         'content-type': 'application/json',
      },
      body : JSON.stringify(data)
    } )

   const dataApi = await dataResponse.json()
   if(dataApi.success){
    toast.success(dataApi.message)
   
    navigate('/')
    fetchUserDetails()
    fetchUserAddToCart()

   }
   if(dataApi.error){
    toast.error(dataApi.message)
    console.log(dataApi.error)
   }

  }

  console.log(data)

  return (
    <section id='login'>
      <div className=' container mx-auto p-4 '>
        <div className='bg-white  p-4  w-full max-w-md mx-auto rounded'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt="login icons" />
          </div>
          <form  className='pt-5 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type="email"
                  name='email'
                  value={data.email}
                  placeholder='enter email' className='w-full h-full outline-none bg-transparent'
                  onChange={handleOnChange} />
              </div>
            </div>
            <div>
              <label>Password :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='enter enter password' className='w-full h-full outline-none bg-transparent'
                  name='password'
                  value={data.password} 
                  onChange={handleOnChange}/>
                <div onClick={() => setShowPassword((preve)=>!preve)} className='cursor-pointer'>
                  <span >

                    {
                      showPassword
                        ? (<FaEyeSlash />)
                        : (<FaEye />)

                    }

                  </span>
                </div>
              </div>
              <Link to={'/forgot-password'} className='block  w-fit ml-auto hover:underline hover:text-red-600'
              >forgot password ?</Link>
            </div>
            <button type='submit' className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Login</button>
          </form>
          <p className='my-6'>Don't have an account ? <Link to={'/sign-up'} className='hover:text-red-700 text-red-600 hover:underline'>Sign Up</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login
