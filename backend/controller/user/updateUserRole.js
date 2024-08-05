const  userModel = require("../../models/userModel")

async function updateUser(req,res){
   try{

  const sessionUser = req.userId

   const {userId,email,name,role} = req.body
   
   const payload = {
    ...(email && {email : email}),
    ...(name && {name : name}),
    ...(role && {role : role})
   }

   const user = await userModel.findById(sessionUser)

   console.log("role",user.role);

   const updateUser = await userModel.findByIdAndUpdate(userId,payload)
   
   res.json({
    data : updateUser,
    message : 'user updated',
    success : true,
    error : true
   })


   }catch{
     
    res.status(400).json({
      messgae: err.message || err,
      error : true ,
      success : false 

    })
   }
}

module.exports =  updateUser