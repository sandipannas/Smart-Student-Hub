import mongoose from "mongoose"

const teacherSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    institution: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
});

const TeacherModel = mongoose.model("Teacher", teacherSchema);

export default TeacherModel;
