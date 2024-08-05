const userModel = require("../../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function userSignUpController(req,res){

  try{

    const {email,password,name} = req.body
 

    const existingUser = await userModel.findOne({email}).exec();
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
        success: false
      });
    }

    if(!email){
      throw new Error("Please provide email")
    }
    if(!password){
      throw new Error("Please provide password")
    }
    if(!name){
      throw new Error("Please provide name")
    }

   
   const  hashPassword =  bcrypt.hashSync(password,saltRounds)

   if(!hashPassword){
     throw new Error("Something is wrong")

   }

   const payload = {
    ...req.body,
    role : 'GENERAL',
    password : hashPassword
   }


    const userData = new userModel(payload)

    const saveUser = await userData.save()

    res.status(201).json({
      data : saveUser,
      success : true,
      error : false,
      message : "User created succesfully"
    })

  }
  catch(err){
   res.json({
    message : err,
    error   : true,
    success : false
   })
  }
}

module.exports = userSignUpController



