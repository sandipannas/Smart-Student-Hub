import mongoose from "mongoose"

//schema for events and notices

const EventSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        required:true,
        default:Date.now
    },

    type:{
        type:String,//event and notice in 1 place 
        required:true,
        enum:["Event","Notice"]
    },

    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,        
    },

    targetStudents: {
        years: [String],           // An array of applicable years, ["1st", "2nd"]
        semesters: [String],       // An array of applicable semesters, ["3rd", "5th"]
        streams: [String],         // An array of applicable streams, ["CSE", "ECE"]
        subjects: [String],        // An array of applicable subjects

        // An empty array for any of the above means it applies to ALL.
        cgpa: {
          // For handling conditions like "CGPA greater than 8.0"
          condition: {
            type: String,
            enum: ['greaterThan', 'lessThan', 'equalTo']
          },
          value: {
            type: Number
          }
        }
    }

},{timestamps:true})

const EventModel=mongoose.model("Event",EventSchema)

export default EventModel