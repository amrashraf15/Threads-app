import mongoose from "mongoose"
const threadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true },
  content: String,
  image:{
        type: String,
        default: "",
    },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
  parentThread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', default: null },

},{timestamps:true})

export default mongoose.model('Thread', threadSchema);