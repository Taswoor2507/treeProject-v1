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
    return next(
      new ApiError("User with email or fullName already exists", 409)
    );
  }

  // Create new user
  const newUser = await User.create({
    fullName,
    email,
    password,
  });
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  // Handle user creation failure
  if (!createdUser) {
    return next(new ApiError("User registration failed", 500));
  }

  //generate access and refresh token
  const { getaccessToken, getrefreshToken } =
    await generateAccessAndRefereshTokens(newUser._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  // Send success response
  return res
    .status(201)
    .cookie("accessToken", getaccessToken, options)
    .cookie("refreshToken", getrefreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: newUser,
          getaccessToken,
          refreshToken,
        },
        "User registered successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if ( !password && !email) {
    return next( new ApiError(" both email and password is required" , 400))
  }

  const user = await User.findOne({
   email:email
  });

  if (!user) {
    return next(new ApiError("User does not exist", 404)()) ;
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return next(new ApiError("Invalid user credentials", 401));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params; // Assuming user ID is passed as a URL parameter

  // Check if user exists
  const user = await User.findByIdAndDelete(userId)

  if (!user) {
    return next(new ApiError("User not found", 404));
  }


  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});



// Get all users (admin only)
const getAllUsers = asyncHandler(async (req, res, next) => {
  // Fetch all users, excluding password and refreshToken
  const users = await User.find({}).select("-password -refreshToken");

  if (!users || users.length === 0) {
    return next(new ApiError("No users found", 404));
  }

  // Count the total number of users
  const totalUsers = await User.countDocuments();
  return res.status(200).json(
    new ApiResponse(200, { totalUsers,users }, "All users fetched successfully")
  );
});

// Get user by ID
const getUserById = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  // Find user by ID
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  return res.status(200).json(
    new ApiResponse(200, { user }, "User fetched successfully")
  );
});

export { registerUser, loginUser,logoutUser, deleteUser , getAllUsers , getUserById};
