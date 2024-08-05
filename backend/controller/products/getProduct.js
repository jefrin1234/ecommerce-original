const productModel = require("../../models/productModel")

const getProductController = async (req,res)=>{
  try{

   const allProduct = await productModel.find().sort({createdAt : -1})

   res.json({
    message : 'All product',
    success : true,
    error : false,
    data : allProduct
   })

  }catch(err){
    res.status(400).json({
      messgae: err.message || err,
      error : true ,
      success : false 

    })
  }
}

module.exports = getProductController