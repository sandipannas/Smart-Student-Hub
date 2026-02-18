import mongoose from "mongoose"

const superAdminSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        index:true,
        required:true
    },
    faculties:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin', //array of admin User Ids assingned to this student
        required:true,
        index:true,
    }]
},{timestamps:true})

const SuperAdminModel=mongoose.model("Superadmin",superAdminSchema)

export default SuperAdminModel;