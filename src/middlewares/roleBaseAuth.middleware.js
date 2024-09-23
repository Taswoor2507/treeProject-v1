import ApiError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.util.js";

// Middleware to check if user has one of the allowed roles
const authRole = (...roles) => {
  return asyncHandler((req, res, next) => {
    console.log("fu", req.user)
    if (!req.user) {
      return next(new ApiError("Unauthorized request", 401));
    }

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
       
      return next(
        new ApiError(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    // User's role is authorized, proceed to next middleware or route handler
   return  next();
  });
};

export default authRole;
