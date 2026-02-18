import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import useFacultyStore from "../useFacultyStore";
import useUserStore from "../useStore";
import isLoggedIn from "../useLogged";
import {
  Home,
  CheckCircle,
  Users,
  BarChart3,
  LogOut,
  Calendar,
  GraduationCap,
  User,
  Bell,
  Settings,
  FileCheck,
  UserPlus,
  Megaphone,
} from "lucide-react";
interface FacultySidebarProps {
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const FacultySidebar: React.FC<FacultySidebarProps> = ({setLoad}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "approvals", label: "Activity Approvals", icon: CheckCircle },
    { id: "students", label: "Student Progress", icon: Users },
    { id: "attendance", label: "Class Attendance", icon: Calendar },
    { id: "events", label: "Events & Notice", icon: Megaphone },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "register", label: "Register Student", icon: UserPlus },
  ];
  const Loggedout=isLoggedIn((state)=>state.setFalse)
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
 const clearFaculty= useFacultyStore((state)=>state.clearUser)
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoad(true)
      await axios.post(
        "https://cognitivecampus.onrender.com/api/auth/user/logout",
        {},
        { withCredentials: true }
      );
      clearFaculty()
      Loggedout()
      localStorage.removeItem("role");
      clearUser(); // ✅ actually clears user from store

      navigate("/login");
    } catch (err: any) {
      console.error(
        "Logout failed:",
        err.response?.data?.message || err.message
      );
    } finally{
      setLoad(false)
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-purple-600 p-2 rounded-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Achievo</h2>
            <p className="text-xs text-gray-600">Faculty Portal</p>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`bg-white w-64 overflow-y-auto scrollbar-hide shadow-sm border-r border-gray-200 flex flex-col fixed lg:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo */}
      {/*<div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Achievo</h2>
            <p className="text-sm text-gray-600">Faculty Portal</p>
          </div>
        </div>
      </div>*/}

      {/* Faculty Info */}
      <NavLink
        className={`p-4 sm:p-6 cursor-pointer border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50
        `}
        to="/admin/profile"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="flex flex-col items-center justify-center ">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt={user?.name[0]}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User className="w-8 h-8 sm:w-16 sm:h-16" />
            )}
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900 text-xl sm:text-2xl lg:text-3xl">{user?.name}</p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">{user?.email}</p>
            {/*<div className="flex items-center mt-1">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Active
              </span>
              <div className="ml-2 flex items-center">
                <FileCheck className="w-3 h-3 text-orange-500" />
                <span className="text-xs text-orange-600 ml-1">6 pending</span>
              </div>
            </div>*/}
          </div>
        </div>
      </NavLink>

      {/* Navigation */}
      <nav className="flex-1 py-4 sm:py-6">
        <div className="space-y-1 px-2 sm:px-3">
          {menuItems.map((item) => (
            <NavLink
              to={`/admin/${item.id}`}
              key={item.id}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-purple-100 text-purple-700 border-r-2 border-purple-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm sm:text-base">{item.label}</span>
              {item.id === "approvals" && (
                <span className="ml-auto bg-orange-600 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  6
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 sm:p-6 border-t border-gray-200">
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="text-sm sm:text-base">Notifications</span>
          </button>
          <button className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm sm:text-base">Settings</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm sm:text-base">Logout</span>
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default FacultySidebar;
