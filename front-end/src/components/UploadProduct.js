import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadimage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import summaryApi from '../common';
import { toast } from 'react-toastify';
function UploadProduct({
  onClose,
  fetchData
}) {

  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: ''
  })

  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)

  const [fullScreenImage,setFullScreenImage]=useState('')

  const handleOnChange = (e) => {
     const {name,value} = e.target
     
    setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })


  }

  const handleUploadProduct = async (e)=>{
    const file = e.target.files[0]
   
    const uploadImageCloudinary = await uploadImage(file)
   
    setData((prev)=>{
      return{
        ...prev,
        productImage:[...prev.productImage, uploadImageCloudinary.url ]
      }
    })


    
  }

  const handleDeleteProductImage = async (index)=>{

    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)
    setData((prev)=>{
      return{
        ...prev,
        productImage:[...newProductImage]
      }
    })
    
  }

  // upload product 
  const handleSubmit = async (e)=>{
     e.preventDefault()
     const response = await fetch(summaryApi.uploadProduct.url,{
      method : summaryApi.uploadProduct.method,
      credentials : 'include',
      headers: {
        "content-type":"application/json"
      },
      body : JSON.stringify(data)

     })
      const responseData = await response.json()
      if(responseData.success){
        toast.success(responseData.message)
        onClose()
        fetchData()
      }if(responseData.error){
        toast.error(responseData.message)
      }

     console.log(responseData);


  }

  return (
    <div className='fixed  bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>upload product</h2>
          <div className='w-fit  mi-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}><CgClose />
          </div>
        </div>
        <form onSubmit={handleSubmit} className='grid p-4 gap-3 overflow-y-scroll h-full pb-20'>
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text" id='productName' placeholder='enter product-name'
            name='productName'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
            required
          />

          <label className='mt-3' htmlFor=" brandName">Brand Name :</label>
          <input
            type="text" id='brandName' placeholder='enter Brand-name'
            value={data.brandName}
            onChange={handleOnChange}
            name='brandName'
            className='p-2 bg-slate-100 border rounded '
            required
          />

          <label className='mt-3' htmlFor=" category">  Category :</label>
          <select name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded ' value={data.category}
          required
          >

          <option  value={''}>Select Category</option>
            {
              productCategory.map((el, index) => {
                return (
                  <option key={el.value + index} value={el.value}>{el.label}</option>
                )
              })
            }
          </select>

          <label className='mt-3' htmlFor="   productImage">  Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex items-center justify-center cursor-pointer'>

              <div className='text-slate-500 flex items-center justify-center flex-col gap-2'>

                <span className='text-4xl'> <FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload product image</p>
                <input type="file" id="uploadImageInput" 
                className='hidden'
                onChange={handleUploadProduct}
                required
                />
                
              </div>

            </div>
          </label>

          <div>
            {
              data?.productImage[0] ? (
              

               <div className='flex items-center gap-2'>

                 {
                     data.productImage.map((el,index)=>(
                      <div className='relative group'>
                          <img className='bg-slate-100 border cursor-pointer'
                       src={el} 
                       width={80} 
                       height={80} 
                       onClick={()=>{setOpenFullScreenImage(true)
                        setFullScreenImage(el)
                       }}
                       required
                       />

                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(Image)}>
                        <MdDelete />

                        </div>

                      </div>
                     
                     ))
                 }

               </div>


              ) :(
                <p className='text-red-600 text-xs'> *Please Upload Image</p>
              )
            }
           
          </div>



          <label  htmlFor="price">  Price :</label>
          <input
            type="number" id='price' placeholder='enter price'
            value={data.price}
            onChange={handleOnChange}
            name='price'
            className='p-2 bg-slate-100 border rounded '
            required
          />

          <label  htmlFor="sellingPrice">Selling Price :</label>
          <input
            type="number" id='sellingPrice' placeholder='enter selling price'
            value={data.sellingPrice}
            onChange={handleOnChange}
            name='sellingPrice'
            className='p-2 bg-slate-100 border rounded '
            required
          />

          <label  htmlFor="description">  Description :</label>
          <textarea type='text'
            value={data.description}
            onChange={handleOnChange} className='h-28 bg-slate-100 border resize-none p-1'name="description" placeholder='enter product description' id="description"
            required
            ></textarea>







          <button className='px-2 py-2 bg-red-600 mb-10 hover:bg-red-700'>Upload Product</button>
         
        </form>
         
         
        

      </div>

      {
        openFullScreenImage && (
          <DisplayImage onClose={()=>{setOpenFullScreenImage(false)}} imgUrl={fullScreenImage}/>

        )
      }
 
    
 {/* display image full screen */}

    </div>
  )
}

export default UploadProduct

