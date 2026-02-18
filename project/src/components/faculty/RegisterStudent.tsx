import React, { useState } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import {
  UserPlus,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Turtle,
} from "lucide-react";

const RegisterStudent: React.FC = () => {
  const [loading,setLoading]=useState<boolean>(false)
  const [noOfUploads,setnoOfUploads]=useState<number>(0)
  const [registrationMethod, setRegistrationMethod] = useState<
    "single" | "bulk"
  >("single");
  const [studentForm, setStudentForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    studentId: "",
    department: "",
    course: "",
    batch: "",
    gender: "",
    dateOfBirth: new Date(),
  });

  const [bulkUploadStatus, setBulkUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const departments = [
    "Computer Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Information Technology",
    "Electrical Engineering",
  ];

  const courses = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "BCA", "MCA", "MBA"];

  const batches = [
    "2024-2028",
    "2023-2027",
    "2022-2026",
    "2021-2025",
    "2020-2024",
  ];

  const genders = ["Male", "Female", "Attack Helicopter"];

  const handleSingleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would register the student
    console.log(studentForm);
    try {
      setLoading(true)
      const payload = {
        ...studentForm,
        dateOfBirth: studentForm.dateOfBirth.toISOString(),
        // full ISO format: "2025-09-22T00:00:00.000Z"
      };

      const res = await axios.post(
        "https://cognitivecampus.onrender.com/api/actions/admin/add_students",
        payload,
        { withCredentials: true }
      );
      if (res.status === 201) {
        alert("Student added successfully");
        setStudentForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          studentId: "",
          department: "",
          course: "",
          batch: "",
          dateOfBirth: new Date(),
          gender: "",
        });
        console.log(res.data);
      }
    } catch (err: any) {
      if (err.response) {
        console.error("Error Message:", err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error("Unexpected Error:", err.message);
      }
    } finally{
      setLoading(false)
    }
  };

  const handleBulkUpload =async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBulkUploadStatus("uploading");
      // Simulate upload process
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      try {
        setLoading(true)
        const res = await axios.post(
          "https://cognitivecampus.onrender.com/api/actions/admin/addStudentsInBulk",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data", 
            },
          }
        );
        console.log(res);
        if (res.status === 201) {
          setnoOfUploads(res.data.createdCount);
          setBulkUploadStatus("success");
        }
      } catch (err: any) {
        if (err.response) {
          console.error("Error Message:", err.response.data.message);
          alert(err.response.data.message);
        } else {
          console.error("Unexpected Error:", err.message);
        }
        setBulkUploadStatus("error");
      } finally {
         setTimeout(() => {
          setLoading(false)
          setBulkUploadStatus("idle")
    }, 3000);
      }
    }
  };

  const downloadTemplate = () => {
    // In real app, this would download a CSV template
    alert("CSV template downloaded! Check your downloads folder.");
  };

  const recentRegistrations = [
    {
      name: "Alice Johnson",
      studentId: "CS2024001",
      department: "Computer Science",
      registeredOn: "2024-01-15",
      status: "active",
    },
    {
      name: "Bob Smith",
      studentId: "EC2024002",
      department: "Electronics",
      registeredOn: "2024-01-14",
      status: "pending",
    },
    {
      name: "Carol Davis",
      studentId: "ME2024003",
      department: "Mechanical",
      registeredOn: "2024-01-13",
      status: "active",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Register Student</h1>
        <p className="text-gray-600 mt-2">
          Add new students to the system individually or in bulk
        </p>
      </div>

      {/* Registration Method Toggle */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        <button
          onClick={() => setRegistrationMethod("single")}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            registrationMethod === "single"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Single Registration
        </button>
        <button
          onClick={() => setRegistrationMethod("bulk")}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            registrationMethod === "bulk"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Bulk Upload
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Registration Form */}
        <div className="lg:col-span-2">
          {registrationMethod === "single" ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">
                  Student Registration Form
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSingleRegistration} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    {/*<h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>*/}
                    <div className="grid md:grid-cols-2 gap-4 h-fit">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={studentForm.firstName}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={studentForm.lastName}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={studentForm.email}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={studentForm.password}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              password: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Roll Number
                        </label>
                        <input
                          type="number"
                          value={studentForm.studentId}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              studentId: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department
                        </label>
                        <select
                          value={studentForm.department}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              department: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Batch
                        </label>
                        <select
                          value={studentForm.batch}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              batch: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          <option value="">Select batch</option>
                          {batches.map((batch) => (
                            <option key={batch} value={batch}>
                              {batch}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Course
                        </label>
                        <select
                          value={studentForm.course}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              course: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          <option value="">Select course</option>
                          {courses.map((course) => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender
                        </label>
                        <select
                          value={studentForm.gender}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              gender: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          <option value="">Select gender</option>
                          {genders.map((gender) => (
                            <option key={gender} value={gender}>
                              {gender}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={
                            studentForm.dateOfBirth.toISOString().split("T")[0]
                          }
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              dateOfBirth: new Date(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  {/*<div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                        <input
                          type="text"
                          value={studentForm.rollNumber}
                          onChange={(e) => setStudentForm({...studentForm, rollNumber: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <select
                          value={studentForm.department}
                          onChange={(e) => setStudentForm({...studentForm, department: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">course</label>
                        <select
                          value={studentForm.course}
                          onChange={(e) => setStudentForm({...studentForm, course: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          <option value="">Select course</option>
                          {courses.map((course) => (
                            <option key={course} value={course}>{course}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">batch</label>
                        <select
                          value={studentForm.batch}
                          onChange={(e) => setStudentForm({...studentForm, batch: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          <option value="">Select batch</option>
                          {batches.map((batch) => (
                            <option key={batch} value={batch}>{batch}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>*/}

                  {/* Parent/Guardian Information */}
                  {/*<div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent/Guardian Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Name</label>
                        <input
                          type="text"
                          value={studentForm.parentName}
                          onChange={(e) => setStudentForm({...studentForm, parentName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Parent Phone</label>
                        <input
                          type="tel"
                          value={studentForm.parentPhone}
                          onChange={(e) => setStudentForm({...studentForm, parentPhone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Parent Email</label>
                        <input
                          type="email"
                          value={studentForm.parentEmail}
                          onChange={(e) => setStudentForm({...studentForm, parentEmail: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>*/}

                  <div className="flex flex-col lg:flex-row justify-end lg:space-x-4 space-x-0">
                    {!loading &&<button
                      type="button"
                      className="px-6 py-3 mb-4 lg:mb-0 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Reset Form
                    </button>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                    >
                     {!loading && <UserPlus className="w-4 h-4" />}
                      {loading?<PulseLoader color="#fff" size={10}/>:<span>Register Student</span>}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">
                  Bulk Student Upload
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Instructions for Bulk Upload
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Download the CSV template below</li>
                      <li>• Fill in all required student information</li>
                      <li>• Don't change the pre-existing headings</li>
                      <li>• Ensure email addresses are unique</li>
                      <li>• Upload the completed CSV file</li>
                      <li>• Review and confirm the import</li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      
                      href="/addStudentsInBulk.csv"
                      download="addStudentsInBulk.csv"
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download CSV Template</span>
                    </a>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Upload Student Data
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop your CSV file here, or click to browse
                    </p>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleBulkUpload}
                      disabled={loading}
                      className="hidden"
                      id="bulk-upload"
                    />
                    <label
                      htmlFor="bulk-upload"
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer inline-block"
                    >
                      Choose File
                    </label>
                  </div>

                  {bulkUploadStatus === "uploading" && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-blue-800">
                          Processing upload...
                        </span>
                      </div>
                    </div>
                  )}

                  {bulkUploadStatus === "success" && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800">
                          Upload successful! {noOfUploads} students registered.
                        </span>
                      </div>
                    </div>
                  )}

                  {bulkUploadStatus === "error" && (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-800">
                          Upload failed. Please check your file format.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Registrations */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                Recent Registrations
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentRegistrations.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {student.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {student.studentId}
                      </p>
                      <p className="text-xs text-gray-500">
                        {student.department}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                Registration Stats
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Students</span>
                  <span className="font-bold text-gray-900">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-green-600">+156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Verification</span>
                  <span className="font-bold text-orange-600">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Students</span>
                  <span className="font-bold text-blue-600">2,824</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
