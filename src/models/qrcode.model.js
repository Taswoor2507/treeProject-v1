import { Schema } from "mongoose";
import mongoose from "mongoose";

const qrCodeSchema = new Schema({
    tree: {
      type: Schema.Types.ObjectId,
      ref: 'Tree',
      required: true,
    },
    qrCodeUrl: {
      type: String,
      required: true,
      unique: true,
    },
  }, { timestamps: true });
  
  export default mongoose.model('QrCode', qrCodeSchema);
  