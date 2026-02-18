import React, { useState } from "react";
import useUserStore from "../useStore";
import axios from "axios";
import useFacultyStore from "../useFacultyStore";
import { PulseLoader,ClockLoader } from "react-spinners";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Save,
  X,
  Camera,
  Award,
  BookOpen,
  Users,
  GraduationCap,
  Building,
} from "lucide-react";

export default function FacultyProfile() {
  const [loading,setLoading]=useState<boolean>(false)
  const faculty=useFacultyStore((state)=>state.userData)
  const updateFaculty=useFacultyStore((state)=>state.updateUser)
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isEditing, setIsEditing] = useState(false);
  

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
          console.log(user?.profilePic);
        }
      } catch (err: any) {
        if (err.response) {
          console.error("Error Message:", err.response.data.message);
          alert(err.response.data.message);
        } else {
          console.error("Unexpected Error:", err.message);
        }
      }finally{
        setLoading(false)
        setIsEditing(false)
      }
    }
  };

  const handleSave = () => {
    
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    
    setIsEditing(false);
  };

  const achievements = [
    {
      title: "Best Faculty Award 2023",
      organization: "University",
      icon: Award,
    },
    {
      title: "Research Excellence Award",
      organization: "IEEE",
      icon: BookOpen,
    },
    {
      title: "Outstanding Mentor Award",
      organization: "Department",
      icon: Users,
    },
  ];

  return (
    <div className="p-8 max-h-screen overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">
              Faculty Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your professional information and academic details
            </p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-purple-600 text-white lg:px-6 lg:py-3 lg:text-lg px-2 py-2 text-xs rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-5 h-5 " />
                <span className="sm:test-sm">Edit Profile</span>
              </button>
            ) : (
              <div className="flex lg:flex-row   flex-col lg:space-x-3 lg:space-y-0 space-x-0 space-y-3">

                {!loading&&<button
                  onClick={handleCancel}
                  className="lg:px-6 lg:py-3 lg:text-lg px-2 py-2 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>}
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 text-white lg:px-6 lg:py-3 lg:text-lg px-2 py-2 text-xs rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  {!loading&&<Save className="w-5 h-5" />}
                  {loading?<PulseLoader color="#fff" size={10}/> :<span>Save Changes</span>}
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
                <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {user?.profilePic ? (
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
                  <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
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
              <p className="text-gray-600">{faculty?.designation}</p>
              <p className="text-sm text-gray-500">{faculty?.adminId}</p>
              <div className="mt-4 flex justify-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active Faculty
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4 ">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-bold text-gray-900">
                      {faculty?.experience}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Students Mentoring</p>
                    <p className="font-bold text-gray-900">48</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Publications</p>
                    <p className="font-bold text-gray-900">45</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
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
                      
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                      
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                      
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{faculty?.ph_no}</p>
                  )}
                </div>
                {/*<div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={faculty.}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {new Date(profileData.dateOfBirth).toLocaleDateString()}
                    </p>
                  )}
                </div>*/}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {faculty?.emergency_contact_no}
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
                    value={faculty?.address}
                    
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{faculty?.address}</p>
                )}
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Professional Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID
                  </label>
                  <p className="text-gray-900 py-2">{faculty?.adminId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <p className="text-gray-900 py-2">{faculty?.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation
                  </label>
                  <p className="text-gray-900 py-2">
                    {faculty?.designation}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification
                  </label>
                  <p className="text-gray-900 py-2">
                    {faculty?.qualification}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience
                  </label>
                  <p className="text-gray-900 py-2">{faculty?.experience}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Joining
                  </label>
                  <p className="text-gray-900 py-2">
                    {faculty?.dateOfJoining ? new Date(faculty.dateOfJoining).toDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Office Room
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Office Hours
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={faculty?.specialization}
                    
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">
                    {faculty?.specialization}
                  </p>
                )}
              </div>
            </div>

            {/* Research Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Research & Publications
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Research Areas
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publications
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
