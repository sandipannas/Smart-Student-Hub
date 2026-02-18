import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true }
}, { _id: false });

const certificateSchema=new mongoose.Schema({
    
    submittedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true,
        index:true,
    },

    title:{
        type:String,
        required:true
    },
    
    description:{
        type:String,
        required:true
    },

    verificationStatus:{
        type:String,
        required:true,
        enum:["Approved","Rejected","Pending"],
        default:"Pending"
    },

    file:{
        type:fileSchema,
        required:true
    },

    category:{
        type:String,
        required:true,
        enum:["Curricular","Extra-Curricular"],
    },

    // done by timestamps:true (same work)
    // submittedAt:{
    //     type:Date,
    //     required:true,
    //     default:Date.now
    // },

    approvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        //required:true, //what if it is not approved
        index:true,
    }
    
},{timestamps:true})

const certificateModel=mongoose.model("Certificate",certificateSchema)

export default certificateModel;