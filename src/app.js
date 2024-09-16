import express from "express";
import ErrorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
const app = express();

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

//error handling middleware
app.use(ErrorHandler)
export default app;