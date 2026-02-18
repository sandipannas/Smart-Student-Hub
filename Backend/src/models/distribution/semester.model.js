import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
  
  department: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  
  semesterNo: {
    type: Number,
    required: true
  },

  syllabus: {
    subjects: [{
      subjectName: {
        type: String
      },
      subjectCode: {
        type: String
      },
      teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }],
      subjectType:{
        type: String,
        enum: ["theory", "practical"],
        required: true
      },
      maximumMarks: {
        type: Number,
        required: true
      },
      endSemMarks: {
        type: Number
      },
      attendanceMarks: {
        type: Number
      },
      continuousAssessment: {
        type: Number
      },
      practicalMarks: {
        type: Number
      },
      credit: {
        type: Number
      },
      objective: {
        type: String
      },
      aim: {
        type: String
      },
      preRequisite: {
        type: String
      },
      modules: [{
        unitNo: {
          type: Number
        },
        content: {
          type: String
        },
        hrsPerUnit: {
          type: Number
        }
      }]
    }]
  },

  courseName: {
    type: String
  },

  courseCode: {
    type: String
  },

});