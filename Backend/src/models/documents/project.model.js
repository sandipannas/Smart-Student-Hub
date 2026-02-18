import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true }
}, { _id: false });

const ProjectSchema=new mongoose.Schema({
    
    submittedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',  //student
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

    file:{
        type:fileSchema,
        required:true
    },

    link:{
        type:String,
    },

    //no need to verify projects 

},{timestamps:true})

const ProjectModel=mongoose.model("Project",ProjectSchema)

export default ProjectModel;