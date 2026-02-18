import mongoose from "mongoose";

//user model for admin, super admin and students

// const profilePictureSchema = new mongoose.Schema({
//   url: { type: String, required: true },
//   public_id: { type: String, required: true }
// }, { _id: false });//file schema was missing

const userSchema=new mongoose.Schema({

  fullName:{
    type:String,
    required:true,
    trim:true,
  },

  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
  },

  password:{
    type:String,
    required:true,
  },

  role:{
    type:String,
    required:true,
    enum:["student","teacher","admin","superAdmin"],
    default: "student" // Changed from "admin" to "student" for security
  },

  institute:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Institute', //refers to the institute model
    required:true,
    index:true, //for faster search
  },
  
  profilePicture:{
    type:String
  },
  
},{timestamps:true})

const UserModel=mongoose.model("User",userSchema);

export default UserModel;
