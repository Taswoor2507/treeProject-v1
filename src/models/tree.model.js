import mongoose from "mongoose"
const treeSchema = new mongoose.Schema({
    treeName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    wateringSchedule: {
      type: String,
      required: true,
    },
    diseases: [{
      type: String,
      default: 'None',
    }],
    age: {
      type: Number,
      required: true,
    },
    uses: {
      type: String,
      required: true,
    },
    qrCode: {
      type: Schema.Types.ObjectId,
      ref: 'QrCode',
    },
  }, { timestamps: true });
  
  export default mongoose.model('Tree', treeSchema);
  