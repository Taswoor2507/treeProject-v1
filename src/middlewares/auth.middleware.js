import ApiError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ACCESS_TOKEN_SECRET } from "../constant.js";

// Middleware to verify JWT
import mongoose from 'mongoose';

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            return next(new ApiError("Unauthorized request", 401));
        }

        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        // console.log("Decoded Token: ", decodedToken); // Debugging

        // Check if decoded _id is a valid MongoDB ObjectId
        if (!decodedToken?._id || !mongoose.Types.ObjectId.isValid(decodedToken._id)) {
            return next(new ApiError("Invalid Access Token: Invalid _id", 401));
        }

        const user = await User.findById(decodedToken?._id.toString()).select("-password -refreshToken");
     console.log("usre" , user)
        if (!user) {
            return next(new ApiError("Invalid Access Token: User not found", 401));
        }

        req.user = {user, token};
       return next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new ApiError("Access Token expired", 401));
        } else if (error.name === "JsonWebTokenError") {
            return next(new ApiError("Invalid Access Token", 401));
        } else {
            return next(new ApiError(error?.message || "Authentication error", 401));
        }
    }
});


export default verifyJWT;
