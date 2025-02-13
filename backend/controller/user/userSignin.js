const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const userModel = require('../../models/userModel')
  
async function userSignInController(req, res) {


  try {
    
    const { email, password } = req.body
    if (!email) {
      throw new Error("Please provide email")
    }
    if (!password) {
      throw new Error("Please provide password")
    }

    const user = await userModel.findOne({email})
    if (!user) {
       throw new Error("user not found")
      };
   
   const checkPassword =   bcrypt.compareSync(password,user.password)

   if(checkPassword){

  const tokenData = {
    _ID : user._id,
    email : user.email
  }

   const token =  jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
    
   const tokenOption = {
    httpOnly : true,
    secure : true
   }

    res.cookie('token',token,tokenOption).json({
      message:"login success",
      data : token,
      success : true,
      error : false
    })  

   }else{
    throw new Error("check the password")
   }

    
    

  } catch (err) {
    res.json({
      message: err.message,
      error: true,
      success: false
    })
  }

}


module.exports = userSignInController