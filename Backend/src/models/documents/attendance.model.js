import mongoose from "mongoose";


const attendanceSchema=new mongoose.Schema({

  student:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    index: true,
  },

  date:{
    type:Date,
    required:true,
    default:Date.now,
  },

  status:{
    type:String,
    required:true,
    enum:["present","absent"],
    default:"present",
  },

  class:{ //refers to the class model
    type:mongoose.Schema.Types.ObjectId,
    ref:'Class',
    required:true,
    index:true,
  },

  subject:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subject',
    required:true,
  },

  recordedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  },

  remarks:String, 

},{timestamps:true})

//prevent duplicate attendance entries
attendanceSchema.index({ student:1 , date:1 , subject:1 },{unique:true});

const AttendanceModel=mongoose.model("Attendance",attendanceSchema);

export default AttendanceModel;
