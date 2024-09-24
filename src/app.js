import express from "express";
import ErrorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";
const app = express();
// Configure the rate limiter

// Define the CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from port 5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
};

// Use the CORS middleware with the options
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
  message: {message:'Too many requests from this IP, please try again later.'},
});

// Apply rate limiter to all requests
app.use(limiter);



//inbuild middlewares 
app.use(express.json({limit:"18kb"}))
app.use(express.urlencoded({extended:true , limit:"18kb"}))
app.use(cookieParser())
//routes
import userRoutes from "./routes/user.route.js"
app.use("/api/users", userRoutes)
// tree routes
import treeRoutes from "./routes/tree.route.js"
app.use("/api/trees", treeRoutes)

//comment route 
import commentRoutes from "./routes/comment.route.js"
app.use("/api/comments", commentRoutes)

//error handling middleware
app.use(ErrorHandler)
export default app;