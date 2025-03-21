const { userRegisterService } = require("../services/userService")

module.exports.userRegisterController = async(req,res)=>{
  const {firstname, lastname, email, password} = req.body;
  const newUser = await userRegisterService({firstname, lastname, email, password})

  res.status(201).json({
    success: true,
    message: "Registration is successfull."
  })
}