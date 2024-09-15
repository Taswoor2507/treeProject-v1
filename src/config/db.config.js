import mongoose from "mongoose"
import { DBNAME, MONGODB_URL} from "../constant.js"

const connectDB = async function(){
    try {
       await mongoose.connect(`${MONGODB_URL}/${DBNAME}`);
    
   } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1);
   }    
}


export default connectDB;