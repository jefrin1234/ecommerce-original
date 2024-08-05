const productModel = require("../../models/productModel")

const getCategoryProducts = async(req,res)=>{
   
     try{
    //get only categories  the category from each document 
    const productCategory = await productModel.distinct("category")

    console.log("category",productCategory);
   //array to store one product from each category
    const productByCategory = []

    for(const category of productCategory){
      const product = await productModel.findOne({category : category})

      if(product){
        productByCategory.push(product)
      }
    }

    res.json({
      message : "category product",
      data : productByCategory,
      success : true,
      error : false
    })



     }catch(err){
      res.status(400).json({
        messgae: err.message || err,
        error : true ,
        success : false 
  
      })
     }

}
module.exports =   getCategoryProducts