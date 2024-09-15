import express from "express";
import ErrorHandler from "./middlewares/errorHandler.js";
const app = express();

//inbuild middlewares 
app.use(express.json({limit:"18kb"}))
app.use(express.urlencoded({extended:true , limit:"18kb"}))


//routes


//error handling middleware
app.use(ErrorHandler)
export default app;