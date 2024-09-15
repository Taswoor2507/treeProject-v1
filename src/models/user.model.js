import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET,ACCESS_TOKEN_EXPIRY,REFRESH_TOKEN_SECRET,REFRESH_TOKEN_EXPIRY} from '../constant.js';
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'worker', 'user'],
    default: 'user',
  },
  refreshToken: {
    type: String
}
}, { timestamps: true });



userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}





export default mongoose.model('User', userSchema);
