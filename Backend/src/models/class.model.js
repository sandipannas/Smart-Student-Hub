import mongoose from "mongoose"

const timeSlotSchema = new mongoose.Schema({// time slot schema for start and end time
  start: {
    type: String,
    required: true, // ex: "10:00"
  },
  end: {
    type: String,
    required: true, // ex: "12:00"
  }
},{_id:false});

const scheduleSchema = new mongoose.Schema({// schedule for the days in a week class goes on
  day: {
    type: String,
    required: true, // ex: "Monday"
  },
  time: {
    type: [timeSlotSchema], // array of start-end pairs
    required: true
  }
},{_id:false});

const classSchema=new mongoose.Schema({
subject:{
    type:String,
    required:true
},
code:{
    type:String,
    required:true
},
institute:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Institute',//refers to the institute of which the c
    required:true,
    index:true
},
teacher:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Amin',//refers to the teacher assigned
    required:true,
    index:true
},
student:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student',//refers to all the students who are part of the class
    required:true,
    index:true
}],
population:{
    type:Number,
    required:true
},
schedule:{
    type:[scheduleSchema],//the days classes goes on in a week
    required:true,
    
}//ex- "Monday "10:00-12:00","2:00-3:00" ","Wedneasday "12:00-2:00" "
},{timestamps: true})

const classModel=mongoose.model("Class",classSchema)

export default classModel;