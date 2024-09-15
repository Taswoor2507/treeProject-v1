import mongoose from 'mongoose';
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
}, { timestamps: true });

export default mongoose.model('User', userSchema);
