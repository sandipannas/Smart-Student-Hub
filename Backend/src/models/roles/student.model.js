import mongoose from "mongoose";

//the profile pic field is now in user Schema because every user deserves a profile pic :)
// const fileSchema = new mongoose.Schema({
//   fileName: { type: String, required: true },
//   data: { type: Buffer, required: true },
//   contentType: { type: String, required: true }
// }, { _id: false });

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //acquiring name, email and password from User model
      required: true, //✅
      index: true,
    },

    studentId: {
      type: String,
      required: true,
      unique: true, //✅
      trim: true,
    },

    gender:{
      type:String,
      required:true,
    },

    semester: {
      type: String, //✅
      //required: true,
      trim: true,
    },

    //more fields for convinience
    department: {
      type: String,
      required: true, //✅
    },

    batch: {
      type: String,
      required: true, //✅
    },

    dateOfBirth: {
      type: Date,
      required: true, //✅
    },

    address: {
      type: String, //✅
      //required: true,
    },

    //new field added for convenience
    parentName: {
      type: String,
      //required: true, //✅
    },

    contact: {
      type: String,
      //required: true, //✅
    },

    bloodGroup: {
      type: String,
      //required: true, //✅
    },
    
    parentContact: {
      type: String,
      //required: true, //✅
    },

    // emergency_contact: {
    //   type: String,
    //   required: true, //✅
    // },
    // till here
    course: {//department and stream means the same thing
      type: String,
      required: true, //✅
      trim: true,
    },

    // subjects: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Subject", //refers to the subject model
    //     required: true, // to know the no. of subjects student haveS
    //     index: true, //for faster search
    //   },
    // ],

    /////////
    // class: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Class", //refers to the class model
    //     //required: true, // to know the no. of classes student haveS
    //     index: true, //for faster search
    //   },
    // ],

    // marks: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Marks", //array of marks assingned to this student
    //     index: true, //✅
    //   },
    // ],
    ////////

    trackedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //array of admin User Ids assingned to this student
        required: true,
        index: true, //✅
      },
    ],

    //below logic can cause memory issuses

    // certificates must have a id of the user who submitted it (aka student id)
    // certificates:[{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:'Certificate', //array of certificates submited by student
    //   index:true,
    // }],

    // projects must have a id of the user who submitted it (aka student id)
    // projects:[{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:'Project', //array of project submited by student
    //   index:true,
    // }],

    // skills must have a id of the user who listed them (aka student id)
    // skills:[{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:'Skill', //array of skills submited by student
    //   index:true,
    // }],

    // events have filter logic to filter the students for whom the events are relevant
    // events:[{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:'Event', //array of Events/Notice submited by faculty
    //   required:true,
    //   index:true,
    // }]
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;
