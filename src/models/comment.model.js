const commentSchema = new Schema({
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tree: {
      type: Schema.Types.ObjectId,
      ref: 'Tree',
      required: true,
    },
  }, { timestamps: true });
  
  export default mongoose.model('Comment', commentSchema);
  