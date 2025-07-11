import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    unique: true,
    required: true
  },
    password: {
    type: String,
    required: true,
    minlength:6,
  },
  bio: {
    type: String,
    default:""
  },
  gender:{
      type:String,
      default:""
    },
    dob:{
      type:String,
      default:""
    },
    isVerified:{
      type:Boolean,
      default:false
    },
  image:{
        type: String,
        default: "",
    },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{timestamps:true,minimize:false})

export default mongoose.model('User', userSchema);