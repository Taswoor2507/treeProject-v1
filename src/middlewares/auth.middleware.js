import ApiError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ACCESS_TOKEN_SECRET } from "../constant.js";

// Middleware to verify JWT
const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Extract token from header or cookie
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            return next(new ApiError("Unauthorized request", 401));
        }
        
        // Verify token
        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        
        // Find user based on token payload
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        
        if (!user) {
            return next(new ApiError("Invalid Access Token", 401));
        }
        
        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        // Handle specific JWT errors
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
