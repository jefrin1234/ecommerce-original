import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import summaryApi from '../common';
import { toast } from 'react-toastify'

function SignUp() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({

    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    profilePic: ''

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

  const handleUploadPic = async(e) =>{
    e.preventDefault()
    const file = e.target.files[0]
    
    const imagePic = await imageToBase64(file)
    
    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })

  }


 const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("password do not match")
        // Optionally display an error message to the user
        return;
    }

    try {
        const dataResponse = await fetch(summaryApi.signUP.url, {
            method: summaryApi.signUP.method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if(dataApi.success){
          toast.success(dataApi.message)
          navigate('/login')
        }
        if(dataApi.error){
          toast.error("password do not match")
        }

        
        console.log("data", dataApi);
       
    } catch (error) {
      toast.error("password do not match")
        
    }
}


  // console.log(data)

  return (
    <section id='signup'>
      <div className=' container mx-auto p-4 '>
        <div className='bg-white  p-4  w-full max-w-md mx-auto rounded'>

          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div >
            <img src={data.profilePic || loginIcons} alt='login icons'/>
            </div>
            <form>
              <label>
              <div className='text-xs bg-slate-200  text-center py-4 absolute bottom-0 w-full bg-opacity-80 pb-4 pt-2 cursor-pointer'>
                upload photo
              </div>
                <input type="file" className='hidden' onChange={handleUploadPic}/>
              </label>
             
            </form>
          </div>
          <form className='pt-5 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type="text"
                  name='name'
                  value={data.name}
                  required
                  placeholder='enter your name' className='w-full h-full outline-none bg-transparent'
                  onChange={handleOnChange} />
              </div>
            </div>
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type="email"
                  name='email'
                  value={data.email}
                  required
                  placeholder='enter email' 
                  className='w-full h-full outline-none bg-transparent'
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
                  required
                  onChange={handleOnChange} />
                <div onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer'>
                  <span >

                    {
                      showPassword
                        ? (<FaEyeSlash />)
                        : (<FaEye />)

                    }

                  </span>
                </div>
              </div>

            </div>
            <div>
              <label>Confirm password :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='confirm password' className='w-full h-full outline-none bg-transparent'
                  name='confirmPassword'
                  value={data.confirmPassword}
                  required
                  onChange={handleOnChange} />
                <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='cursor-pointer'>
                  <span >

                    {
                      showConfirmPassword
                        ? (<FaEyeSlash />)
                        : (<FaEye />)

                    }

                  </span>
                </div>
              </div>

            </div>
            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Sign In</button>
          </form>
          <p className='my-6'>already have an account ? <Link to={'/login'} className='hover:text-red-700 text-red-600 hover:underline'>Log In</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
