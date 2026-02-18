import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true }
}, { _id: false });

const marksSchema=new mongoose.Schema({

    year:{
        type:String,
        required:true
    },

    semester:{
        type:String,
        required:true
    },

    sgpa:{
        type:Number,
        required:true
    },

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true,
        index:true,
    },
    
    digitalResult:[{
        subject:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subject',
            required:true,
            index:true,
        },
        score:{
            type:Number,
            required:true
        }
    }],

    result:{
        type:fileSchema,
        required:true
    }
},{timestamps:true})

const MarksModel=mongoose.model("Marks",marksSchema)

export default MarksModel