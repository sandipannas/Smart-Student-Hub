import mongoose from "mongoose";

const instituteSchema=new mongoose.Schema({
    
    instituteName:{
        type:String,
        required:true,
        trim:true,
    },

    instituteEmail:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    
    address:{
        street: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
    },

    totalStudents:{
        type:Number,
        default:0,
    },

    totalAdmins:{
        type:Number,
        default:0,
    },

    totalFaclutyMembers:{
        type:Number,
        default:0,
    },

    totalEvents:{
        type:Number,
        default:0,
    },

    // averageScore:{
    //     type:Number,
    //     default:0,
    // },

    // approvalRate:{
    //     type:Number,
    //     default:0,
    // },
    
    superAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },

    contactNumber:String,
    
    website:String,

},{timestamps:true})

const InstituteModel = mongoose.model("Institute",instituteSchema);

export default InstituteModel;
