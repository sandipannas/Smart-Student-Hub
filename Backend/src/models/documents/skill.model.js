import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true }
}, { _id: false });

const skillSchema=new mongoose.Schema({
    
    submittedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true,
        index:true
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true,
        enum:["curricular","extra-curricular"], 
    },

    level:{
        type:String,
        enum:["beginner","intermediate","advance","expert"],
        required:true
    },

    file:{
        type:fileSchema
    },

    //no need to verify skills 

},{timestamps:true})

const SkillModel=mongoose.model("Skill",skillSchema)

export default SkillModel