import React, { useState } from "react";
import { Routes, Route ,Navigate} from "react-router-dom";
import AdminProfile from "./admin/adminProfile";
import AdminSidebar from "./admin/AdminSidebar";
import AdminOverview from "./admin/AdminOverview";
import AccreditationReports from "./admin/AccreditationReports";
import SystemManagement from "./admin/SystemManagement";
import InstitutionAnalytics from "./admin/InstitutionAnalytics";
import RegisterFaculty from "./admin/RegisterFaculty";
import ClassroomSetup from "./admin/ClassroomSetup";

const AdminDashboard = () => {
  const [load,setLoad]=useState<boolean>(false)
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <AdminSidebar setLoad={setLoad}/>
      {load && (
    <div className="absolute inset-0 bg-white/30 backdrop-blur pointer-events-none z-50"></div>
  )}
      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-2 sm:p-4">
        <Routes>
          <Route path="/" element={<Navigate to="overview" replace />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="classsetup" element={<ClassroomSetup />} />
          <Route path="accreditation" element={<AccreditationReports />} />
          <Route path="system" element={<SystemManagement />} />
          <Route path="analytics" element={<InstitutionAnalytics />} />
          <Route path="register" element={<RegisterFaculty />} />

          {/* Default route */}
          <Route path="*" element={<AdminOverview />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
