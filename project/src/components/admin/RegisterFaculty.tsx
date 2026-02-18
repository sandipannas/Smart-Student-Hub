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
  Award,
  GraduationCap,
} from "lucide-react";
const RegisterFaculty: React.FC = () => {
  const [loading,setLoading]=useState<boolean>(false)
  const [registrationMethod, setRegistrationMethod] = useState<
    "single" | "bulk"
  >("single");
  const [facultyForm, setFacultyForm] = useState({
    firstName: "", //✅
    lastName: "", //✅
    email: "", //✅
    password: "", //✅
    employeeId: "", //✅
    department: "", //✅
    designation: "", //✅
    qualification: "", //✅

    experience: "", //✅
    dateOfJoining: "", //✅
  });

  const [bulkUploadStatus, setBulkUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const [noOfUploads, setnoOfUploads] = useState(0);

  const departments = [
    "Computer Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Information Technology",
    "Electrical Engineering",
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Management Studies",
  ];

  const designations = [
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
    "Senior Lecturer",
    "Visiting Faculty",
    "Adjunct Professor",
    "Professor Emeritus",
  ];

  const qualifications = [
    "Ph.D",
    "M.Tech",
    "M.E",
    "M.Sc",
    "MBA",
    "M.A",
    "B.Tech",
    "B.E",
    "B.Sc",
  ];

  const handleSingleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would register the faculty
    try {
      setLoading(true)
      console.log({ ...facultyForm });
      const res = await axios.post(
        "https://cognitivecampus.onrender.com/api/actions/superAdmin/addAdmin",
        {
          ...facultyForm,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        alert("Faculty added successfully");
        setFacultyForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          employeeId: "",
          department: "",
          designation: "",
          qualification: "",
          experience: "",
          dateOfJoining: "",
        });
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

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          "https://cognitivecampus.onrender.com/api/actions/superAdmin/addAdminsInBulk",
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
      name: "Dr. Michael Johnson",
      employeeId: "FAC2024001",
      department: "Computer Science",
      designation: "Associate Professor",
      registeredOn: "2024-01-15",
      status: "active",
    },
    {
      name: "Prof. Sarah Williams",
      employeeId: "FAC2024002",
      department: "Electronics",
      designation: "Professor",
      registeredOn: "2024-01-14",
      status: "pending",
    },
    {
      name: "Dr. Robert Brown",
      employeeId: "FAC2024003",
      department: "Mechanical",
      designation: "Assistant Professor",
      registeredOn: "2024-01-13",
      status: "active",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Register Faculty</h1>
        <p className="text-gray-600 mt-2">
          Add new faculty members to the system individually or in bulk
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
                  Faculty Registration Form
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSingleRegistration} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={facultyForm.firstName}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={facultyForm.lastName}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={facultyForm.email}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={facultyForm.password}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              password: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>
                    {/*<div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <textarea
                        rows={3}
                        value={facultyForm.address}
                        onChange={(e) => setFacultyForm({...facultyForm, address: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    */}
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Professional Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Employee ID
                        </label>
                        <input
                          type="text"
                          value={facultyForm.employeeId}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              employeeId: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department
                        </label>
                        <select
                          value={facultyForm.department}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              department: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                          Designation
                        </label>
                        <select
                          value={facultyForm.designation}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              designation: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        >
                          <option value="">Select Designation</option>
                          {designations.map((designation) => (
                            <option key={designation} value={designation}>
                              {designation}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Highest Qualification
                        </label>
                        <select
                          value={facultyForm.qualification}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              qualification: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        >
                          <option value="">Select Qualification</option>
                          {qualifications.map((qualification) => (
                            <option key={qualification} value={qualification}>
                              {qualification}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience (Years)
                        </label>
                        <input
                          type="number"
                          value={facultyForm.experience}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              experience: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Joining
                        </label>
                        <input
                          type="date"
                          value={facultyForm.dateOfJoining}
                          onChange={(e) =>
                            setFacultyForm({
                              ...facultyForm,
                              dateOfJoining: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>
                    {/*<div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                      <input
                        type="text"
                        value={facultyForm.specialization}
                        onChange={(e) => setFacultyForm({...facultyForm, specialization: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Machine Learning, Data Science"
                        required
                      />
                    </div>*/}
                  </div>

                  {/* Emergency Contact */}
                  {/*<div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact (Optional)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
                        <input
                          type="text"
                          value={facultyForm.emergencyContact}
                          onChange={(e) => setFacultyForm({...facultyForm, emergencyContact: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
                        <input
                          type="tel"
                          value={facultyForm.emergencyPhone}
                          onChange={(e) => setFacultyForm({...facultyForm, emergencyPhone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          
                        />
                      </div>
                    </div>
                  </div>*/}

                  {/* Research Information */}
                  {/*<div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Information (Optional)</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Research Areas</label>
                        <textarea
                          rows={3}
                          value={facultyForm.researchAreas}
                          onChange={(e) => setFacultyForm({...facultyForm, researchAreas: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="List your research interests and areas"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Publications</label>
                        <textarea
                          rows={3}
                          value={facultyForm.publications}
                          onChange={(e) => setFacultyForm({...facultyForm, publications: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="List your notable publications"
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
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      {!loading &&<UserPlus className="w-4 h-4" />}
                      {loading?<PulseLoader color="#fff" size={10}/>:<span>Register Faculty</span>}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">
                  Bulk Faculty Upload
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
                      <li>• Fill in all required faculty information</li>
                      <li>• Don't change the pre-existing headings</li>
                      <li>
                        • Ensure email addresses and employee IDs are unique
                      </li>
                      <li>• Upload the completed CSV file</li>
                      <li>• Review and confirm the import</li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href="/addAdminInBulk.csv"
                      download="addAdminInBulk.csv"
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download CSV Template</span>
                    </a>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Upload Faculty Data
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
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer inline-block"
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
                          Upload successful! {noOfUploads} faculty members registered.
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
                {recentRegistrations.map((faculty, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {faculty.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {faculty.employeeId}
                      </p>
                      <p className="text-xs text-gray-500">
                        {faculty.department} • {faculty.designation}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        faculty.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {faculty.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Faculty Stats</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Faculty</span>
                  <span className="font-bold text-gray-900">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-green-600">+8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Verification</span>
                  <span className="font-bold text-orange-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Faculty</span>
                  <span className="font-bold text-blue-600">153</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFaculty;
