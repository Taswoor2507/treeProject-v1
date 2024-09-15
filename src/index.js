import app from "./app.js";
import connectDB from "./config/db.config.js";
import { PORT } from "./constant.js";
connectDB().then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((error)=>{
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
})




