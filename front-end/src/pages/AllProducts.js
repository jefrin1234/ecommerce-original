import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

function AllProducts() {

   const [openUploadProduct,setOpenUploadProduct]=useState(false)
   const [allProducts,setAllProducts]=useState([])


  const fetchAllProducts = async ()=>{
    const response = await fetch(summaryApi.allProduct.url)
    const dataResponse = await response.json()
    setAllProducts(dataResponse?.data || [])
    console.log(dataResponse?.data)
  }
  

  useEffect(()=>{
    fetchAllProducts()
  },[])


  return (
    <div>
       <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg '>All Products</h2>
        <button className='border-2 border-red-600 text-red-600 py-1 px-3 rounded-full hover:bg-red-600 hover:text-white transition-all' onClick={()=>setOpenUploadProduct(true)}>Upload product</button>
       </div>
{/* all products */}
      <div className='flex items-center gap-4 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProducts.map((product,index)=>{
            return (
              <AdminProductCard fetchData={fetchAllProducts} data={product} key={index+"allProducts"}/>
             
            )
          })
        }
      </div>


       {/* upload product component */}

      {
        openUploadProduct && (
          <UploadProduct   fetchData={fetchAllProducts} onClose={()=>{setOpenUploadProduct(false)}}/>
        )
      }


      
    </div>
  )
}

export default AllProducts
