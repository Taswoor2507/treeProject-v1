import ApiError from "../utils/apiError.utils.js";

const ErrorHandler = (err, req, res, next) => {
  // Default to 500 if no specific status code is set
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle specific error types

  // Wrong Mongodb Id error (CastError)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ApiError(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ApiError(message, 400);
  }

  // JWT errors

  // Invalid JWT error (JsonWebTokenError)
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ApiError(message, 401); // 401 Unauthorized for invalid token
  }

  // Expired JWT error (TokenExpiredError)
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again `;
    err = new ApiError(message, 401); // 401 Unauthorized for expired token
  }

  if (typeof err.statusCode !== 'number') {
    err.statusCode = 500;
  }

  
  // Invalid JWT error (JsonWebTokenError)
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again`;
    err = new ApiError(message, 401); // 401 Unauthorized for invalid token
  }

  // Expired JWT error (TokenExpiredError)
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again`;
    err = new ApiError(message, 401); // 401 Unauthorized for expired token
  }

  // Ensure the status code is always a valid number
  if (typeof err.statusCode !== 'number') {
    err.statusCode = 500; // Default to 500 if an invalid status code is found
  }


  // Send the error response with the proper status code
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
