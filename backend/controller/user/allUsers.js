const userModel = require("../../models/userModel");

async function allUsers(req,res){
  try{
    console.log("userId in all user ",req.userId);

    const allUsers = await userModel.find()
  
    res.json({
      message:"all user",
      data : allUsers,
      success : true,
      error : false
    })
  }catch(err){
    res.json({
      message: err.message,
      error: true,
      success: false
    })
  }
}

module.exports = allUsers