import mongoose from "mongoose"

const AdminSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,//✅
    },

    adminId:{
        type:String,
        required:true,
        unique:true//✅
    },

    department:{
        type:String,
        required:true//✅
    },

    designation:{
        type:String,
        required:true//✅
    },

    //More fields for convenience
    ph_no:{
        type:String,
        default:"",
        //required:true//✅
    },

    dateOfJoining:{
        type:String,
        required:true//✅
    },

    emergency_contact_no:{
        type:String,
        default:"",
        //required:true//✅
    },
    office_room:{
        type:String,
        //required:true//✅
    },
    office_time:{
        type:String,
        //required:true//✅
    },
     research_area:{
        type:String,//✅
    },
     research_publication:{
        type:String,//✅
    },
    //till here
//more feilds cause why not
    qualification:{
        type:String,
        required:true//✅
    },

    experience:{
        type:String,
        required:true,//✅
        default:""
    },

    dob:{
        type:Date,
        //required:true//✅
        defalut:""
    },

    specialization:{
        type:String,
        //required:true//✅
        default:""
    },
    address:{
        type:String,
        //required:true//✅
        default:""
    },

    class:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        index:true
    }],
    
    //manages:[{
    //    type:mongoose.Schema.Types.ObjectId,
    //    ref:"Student",
    //    index:true
    //}],
    //certificates:[{
    //    type:mongoose.Schema.Types.ObjectId,
    //    ref:'Certificate', //array of certificates submited by students
    //    required:true,
    //    index:true,
    //}],
    //events:[{
    //    type:mongoose.Schema.Types.ObjectId,
    //    ref:'Event', //array of Events/Notice submited by faculty
    //    required:true,
    //    index:true,
    //}]
},{timestamps:true})

const AdminModel=mongoose.model("Admin",AdminSchema)

export default AdminModel;