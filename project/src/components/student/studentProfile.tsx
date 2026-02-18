import React, { useState } from "react";
import useUserStore from "../useStore";
import axios from "axios";
import useStudentStore from "../useStudentStore";
import { PulseLoader,ClockLoader } from "react-spinners";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Save,
  Trophy,
  X,
  Camera,
  Upload,
  Award,
  BookOpen,
  Target,
} from "lucide-react";

export default function StudentProfile() {
  const [loading,setLoading]=useState<boolean>(false)
  const student=useStudentStore((state)=>state.studentData)
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isEditing, setIsEditing] = useState(false);
  const [pic, setPic] = useState("");
 

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append("profilePicture", file);
      try {
        setLoading(true)
        const res = await axios.put(
          "https://cognitivecampus.onrender.com/api/auth/user/update_profilePicture",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200) {
          alert("Profile pic Updated");
          console.log(res.data.profilePicture);
          setUser({
            profilePic: res.data.profilePicture, // ✅ use url if it’s from Cloudinary
          });
          console.log(user?.profilePic)
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
        setIsEditing(false)
      }
    }
  };

  const handleSave = () => {
    // Update user store with new data

    setIsEditing(false);
    // In real app, this would make an API call to update the profile
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
   
    setIsEditing(false);
  };

  const achievements = [
    { title: "Dean's List", semester: "6th Semester", icon: Award },
    { title: "Best Project Award", event: "TechFest 2024", icon: Trophy },
    { title: "Hackathon Winner", event: "CodeStorm 2023", icon: Target },
  ];

  return (
    <div className="p-8 max-h-screen overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Student Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your personal information and academic details
            </p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white lg:px-6 lg:py-3 px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-5 h-5" />
                <span className="text-xs lg:text-lg">Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-3  items-center ">
                {!loading &&<button
                  onClick={handleCancel}
                  className="px-2 py-1 lg:px-6 lg:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span className="text-xs lg:text-lg">Cancel</span>
                </button>}
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 text-white lg:px-6 lg:py-3 px-2 py-1 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  {!loading &&<Save className="w-5 h-5" />}
                  {loading?<PulseLoader color="#fff" size={10}/>:<span className="text-xs lg:text-lg">Save Changes</span>}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture and Basic Info */}
          <div className="bg-white h-fit rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-blue-600 rounded-full text-white flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {user?.profilePic? (
                    <img
                      src={user.profilePic}
                      alt={user?.name[0]}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-16 h-16" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    {loading?<ClockLoader color="#fff" size={20}/>:<Camera className="w-4 h-4" />}
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      disabled={loading}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.name}
              </h2>
              <p className="text-gray-600">{student?.studentId}</p>
              <div className="mt-4 flex justify-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active Student
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Current CGPA</p>
                    <p className="font-bold text-gray-900">
                      8/10
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Current Semester</p>
                    <p className="font-bold text-gray-900">
                      5
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Achievements</p>
                    <p className="font-bold text-gray-900">
                      3
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user?.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user?.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2"></p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {student?.dateOfBirth?new Date(student?.dateOfBirth).toLocaleDateString():"N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  {isEditing ? (
                    <select
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 py-2">
                      
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2"></p>
                )}
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Academic Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <p className="text-gray-900 py-2">{student?.studentId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree
                  </label>
                  <p className="text-gray-900 py-2">{student?.course}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <p className="text-gray-900 py-2">{student?.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch
                  </label>
                  <p className="text-gray-900 py-2">{student?.batch}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current CGPA
                  </label>
                  <p className="text-gray-900 py-2">8/10</p>
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Parent/Guardian Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                     
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                     
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
