const userModel = require("../../models/userModel")

async function userDetailsController(req,res){
  try{
    
     const user = await userModel.findById(req.userId)

     res.status(200).json({
      data:user,
      error:false,
      success:true,
      message:'user details'
     })
   
  }catch(err){
    res.status(400).json({
      messgae: err.message || err,
      error : true ,
      success : false 

    })
  }
}

module.exports =  userDetailsController