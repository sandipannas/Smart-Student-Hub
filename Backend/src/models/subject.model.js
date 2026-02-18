import mongoose from "mongoose"

const subjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      // unique: true, if a code used one institue can't be used again by another institue
      trim: true,
      uppercase: true
    },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institute',
      required: true
    },
    classes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    }],
    teachers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  }, { timestamps: true });

// Added the compound index here so that a subject code is unique for an institute , not for the entire database
subjectSchema.index({ institute: 1, code: 1 }, { unique: true });

const SubjectModel=mongoose.model("Subject",subjectSchema)

export default SubjectModel;