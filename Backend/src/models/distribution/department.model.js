import mongoose from "mongoose"

const DepartmentSchema = new mongoose.Schema({
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const DepartmentModel = mongoose.model("Department", DepartmentSchema);

export default DepartmentModel;