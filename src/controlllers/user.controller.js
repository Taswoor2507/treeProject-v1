import ErrorHandler from "../middlewares/errorHandler.js";
import asyncHandler from "../utils/asyncHandler.util.js";

const registerUser =  asyncHandler(async(req,res,next)=>{
  const {fullName , email ,  password ,} = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
) {
   return next("All fields are required" , 400 )
}

const existedUser = await User.findOne({
    $or: [{ username }, { email }]
})

if (existedUser) {
    return next(ErrorHandler("User with email or username already exists" , 409))
}
})

export {registerUser}