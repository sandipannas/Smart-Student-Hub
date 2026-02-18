import React, { useEffect, useState } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useUserStore from "./useStore";
import isLoggedIn from "./useLogged";
import {
  GraduationCap,
  Users,
  BarChart3,
  Shield,
  Award,
  TrendingUp,
  BookOpen,
  Target,
  LogIn,
  Building,
} from "lucide-react";





const LandingPage = () => {
  const [loading,setLoading]=useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [showAdminModel, setShowAdminModel] = React.useState(false);
  const [adminpassword, setAdminpassword] = React.useState("");
  const Logged=isLoggedIn((state)=>state.setTrue)
  const navigate=useNavigate();
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
    
  });
  const [registerForm, setRegisterForm] = React.useState({
    instituteName: "",
    instituteEmail: "",
    instituteAddress: "",
    instituteNumber: "",
    instituteWebsite: "",
  });
  const [registerAdmin, setRegisterAdmin] = React.useState({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  useEffect(()=>{
    console.log(loading)
  },[loading])

  const setUser=useUserStore((state)=>state.setUser)

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(loginForm);
    
    try{
      setLoading(true)
      const logemail=loginForm.email;
      const logpassword=loginForm.password;

      const res=await axios.post("https://cognitivecampus.onrender.com/api/auth/user/login",
        {
          email:logemail,
          password:logpassword
        },
        {
          withCredentials:true
        }
      );
      
        // store token in localStorage if backend returns it
        if(res.status===200){
          console.log("login Success:", res.data);
          console.log(res.data.fullName)
          Logged()
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role",res.data.role)
          setUser({
            name:res.data.fullName,
            email:res.data.email,
            profilePic:res.data.profilePicture
          })
          navigate(`/${res.data.role}`)
          setShowLoginModal(false)
        }

    } catch(err:any){
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(registerForm);
    // In real app, this would create the institute and admin account
    alert(
      "Institute registered successfully! You can register as admin with your credentials."
    );
    setShowRegisterModal(false);
    setShowAdminModel(true);
  };

  const handleAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(registerAdmin);
    const fullName = registerAdmin.adminName;
    const email = registerAdmin.adminEmail;
    const password = registerAdmin.adminPassword;
    const instituteName = registerForm.instituteName;
    const instituteEmail = registerForm.instituteEmail;
    const address = registerForm.instituteAddress;
    const contactNumber = registerForm.instituteNumber;
    const website = registerForm.instituteWebsite;
    if (adminpassword === registerAdmin.adminPassword) {
      try {
        setLoading(true)
        const res = await axios.post(
          "https://cognitivecampus.onrender.com/api/auth/user/register",
          {
            fullName,
            email,
            password,
            instituteName,
            instituteEmail,
            address,
            contactNumber,
            website,
          },
          {
            withCredentials: true,
          }
        );

        console.log("Registration Success:", res.data);
        // store token in localStorage if backend returns it
        if(res.status===201){
          
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role",res.data.role)
          Logged()
          setUser({
            name:res.data.fullName,
            email:res.data.email,
            profilePic:res.data.profilePicture
          })
          navigate("/superAdmin")
          setShowAdminModel(false)
        }
        
      } catch (err: any) {
        if (err.response) {
          console.error("Error Message:", err.response.data.message);
          alert(err.response.data.message); // shows "Email is already registered, try to Log In"
        } else {
          console.error("Unexpected Error:", err.message);
        }
      } finally{
        setLoading(false)
      } 
    } else {
      alert("Write the same password");
      setAdminpassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Achievo</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Smart Student Hub</p>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowRegisterModal(true)}
                className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                <Building className="w-4 h-4 " />
                <span>Register Institute</span>
              </button>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="sm:hidden p-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Building className="w-4 h-4 " />
              </button>
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Centralized Student Achievement
            <span className="text-blue-600 block mt-2">Management Platform</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Build verified student profiles, track achievements, streamline
            faculty approvals, and prepare for placements with our comprehensive
            digital solution.
          </p>

          {/* Role Selection */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Student Portal
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Track your achievements, build portfolios, and prepare for
                placements
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Faculty Portal
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Approve student activities, mentor, and track progress
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Admin Portal
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Generate reports, manage accreditation, and oversee operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Feature Set
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Everything you need for modern student achievement management
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Faculty Validation
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                Credible achievement verification through faculty approval
                system
              </p>
            </div>

            <div className="text-center p-4 sm:p-6">
              <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Digital Portfolio
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                Auto-generated verified portfolios for placements and admissions
              </p>
            </div>

            <div className="text-center p-4 sm:p-6">
              <div className="bg-purple-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Analytics & Reports
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                Comprehensive reporting for NAAC, AICTE, and NIRF compliance
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="bg-orange-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Placement Ready
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                Resume builder, CV scoring, and career guidance tools
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Login to Achievo
              </h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/*<div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select 
                  value={loginForm.role}
                  onChange={(e) => setLoginForm({...loginForm, role: e.target.value as UserRole})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </div>*/}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="w-full p-4 flex flex-col items-center justify-evenly">
                  
                  <div className="flex items-center w-[100%] justify-start mb-2">
                    <p>Dummy Credentials:</p>
                  </div>
                  <div className="flex items-start flex-col justify-evenly w-[100%] text-sm lg:text-base lg:w-[70%] ">
                      <li>Admin:dip@gmail.com / Dip</li>
                  
                  <li>Faculty:albert@gmail.com  / Dip</li>
                  
                  <li>Student:s1@gmail.com / Dip</li>
                  </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {loading?<PulseLoader color="#fff" size={10}/>:"Login"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Register Institute
              </h2>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institute Name
                </label>
                <input
                  type="text"
                  value={registerForm.instituteName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      instituteName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter institute name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institute Email
                </label>
                <input
                  type="email"
                  value={registerForm.instituteEmail}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      instituteEmail: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="institute@yourinstitute.edu"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={registerForm.instituteAddress}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      instituteAddress: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="enter institute address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={registerForm.instituteNumber}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      instituteNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123-456-7890"
                  pattern="[0-9]{10}"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institute Website
                </label>
                <input
                  type="text"
                  value={registerForm.instituteWebsite}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      instituteWebsite: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="enter institute address"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Register Institute
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Admin */}
      {showAdminModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Register Admin
              </h2>
              <button
                onClick={() => setShowAdminModel(false)}
                className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAdmin} className="space-y-4">
              {/*<div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select 
                  value={loginForm.role}
                  onChange={(e) => setLoginForm({...loginForm, role: e.target.value as UserRole})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </div>*/}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={registerAdmin.adminName}
                  onChange={(e) =>
                    setRegisterAdmin({
                      ...registerAdmin,
                      adminName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={registerAdmin.adminEmail}
                  onChange={(e) =>
                    setRegisterAdmin({
                      ...registerAdmin,
                      adminEmail: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={registerAdmin.adminPassword}
                  onChange={(e) =>
                    setRegisterAdmin({
                      ...registerAdmin,
                      adminPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={adminpassword}
                  onChange={(e) => setAdminpassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="confirm password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                disabled={loading}
              >
                {loading?<PulseLoader color="#fff" size={10}/>:"Sign Up"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
