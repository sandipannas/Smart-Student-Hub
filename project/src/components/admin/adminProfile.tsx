import React, { useState } from "react";
import useUserStore from "../useStore";
import { ClockLoader,PulseLoader } from "react-spinners";
import axios from "axios";
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
  Building,
  Users,
  Shield,
  Settings,
} from "lucide-react";

export default function AdminProfile() {
  const [loading,setLoading]=useState<boolean>(false)
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    adminId: "ADM2024001",
    phone: "+91 98765 43210",
    dateOfBirth: "1980-08-15",
    address: "789 Admin Block, University Campus, City - 123456",
    designation: "System Administrator",
    department: "Administration",
    dateOfJoining: "2015-01-10",
    officeRoom: "Room 101, Admin Block",
    officeHours: "Mon-Fri: 9:00 AM - 5:00 PM",
    responsibilities:
      "System Management, User Administration, Data Analytics, Report Generation",
    permissions:
      "Full System Access, User Management, Report Generation, System Configuration",
    emergencyContact: "+91 98765 43212",
  });

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
      } finally{
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
    setProfileData({
      ...profileData,
      name: user?.name || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  const systemStats = [
    { label: "Total Users", value: "3,156", icon: Users },
    { label: "Active Sessions", value: "2,847", icon: Shield },
    { label: "System Uptime", value: "99.8%", icon: Settings },
    { label: "Data Processed", value: "2.3TB", icon: Building },
  ];

  return (
    <div className="p-8 max-h-screen overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">
              Administrator Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your administrative information and system access
            </p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                {!loading &&<button
                  onClick={handleCancel}
                  className="px-6 py-3 text-xs lg:text-lg border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>}
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 text-xs lg:text-lg text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  {!loading &&<Save className="w-5 h-5" />}
                 {loading?<PulseLoader color="#fff" size={10}/>: <span>Save Changes</span>}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture and Basic Info */}
          <div className="bg-white rounded-xl h-fit shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
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
                  <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                    {loading?<ClockLoader color="#fff" size={20}/>:<Camera className="w-4 h-4" />}
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={loading}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.name}
              </h2>
              <p className="text-gray-600">{profileData.designation}</p>
              <p className="text-sm text-gray-500">{profileData.adminId}</p>
              <div className="mt-4 flex justify-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Super Admin
                </span>
              </div>
            </div>

            {/* System Stats */}
            <div className="space-y-4">
              {systemStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <stat.icon className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal and Professional Information */}
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
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {new Date(profileData.dateOfBirth).toLocaleDateString()}
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
                      value={profileData.emergencyContact}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          emergencyContact: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {profileData.emergencyContact}
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
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.address}</p>
                )}
              </div>
            </div>

            {/* Administrative Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Administrative Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin ID
                  </label>
                  <p className="text-gray-900 py-2">{profileData.adminId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation
                  </label>
                  <p className="text-gray-900 py-2">
                    {profileData.designation}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <p className="text-gray-900 py-2">{profileData.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Joining
                  </label>
                  <p className="text-gray-900 py-2">
                    {new Date(profileData.dateOfJoining).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Office Room
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.officeRoom}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          officeRoom: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {profileData.officeRoom}
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
                      value={profileData.officeHours}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          officeHours: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {profileData.officeHours}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={profileData.responsibilities}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        responsibilities: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">
                    {profileData.responsibilities}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Permissions
                </label>
                <p className="text-gray-900 py-2">{profileData.permissions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
