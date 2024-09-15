import ApiError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.util.js";
import generateAccessAndRefereshTokens from "../utils/generateAccessTokenAndRefreshToken.js";
const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, refreshToken } = req.body;

  // Check for empty fields
  if ([fullName, email, password].some((field) => !field?.trim())) {
    return next(new ApiError("All fields are required", 400));
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }],
  });

  if (existedUser) {
    return next(new ApiError("User with email or fullName already exists", 409));
  }

  // Create new user
  const newUser = await User.create({
    fullName,
    email,
    password,
  });
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
)

  // Handle user creation failure
  if (!createdUser) {
    return next(new ApiError("User registration failed", 500));
  }

  //generate access and refresh token
  const {getaccessToken, getrefreshToken} = await generateAccessAndRefereshTokens(newUser._id)

 const options = {
    httpOnly: true,
    secure: true
 }

  // Send success response
  return res
  .status(201)
  .cookie("accessToken", getaccessToken, options)
  .cookie("refreshToken", getrefreshToken, options)
  .json(
    new ApiResponse(201, {
        user: newUser, getaccessToken, refreshToken
    }, "User registered successfully")
  );
});

export { registerUser };
