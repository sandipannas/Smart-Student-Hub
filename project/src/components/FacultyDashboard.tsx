import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FacultyProfile from "./faculty/facultyProfile";
import FacultySidebar from "./faculty/FacultySidebar";
import FacultyOverview from "./faculty/FacultyOverview";
import ApprovalPanel from "./faculty/ApprovalPanel";
import StudentProgress from "./faculty/StudentProgress";
import ClassAttendance from "./faculty/ClassAttendance";
import Analytics from "./faculty/Analytics";
import RegisterStudent from "./faculty/RegisterStudent";
import EventNoticeManager from "./faculty/EventNoticeManager";

const FacultyDashboard = () => {
  const [load,setLoad]=useState<boolean>(false)
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <FacultySidebar setLoad={setLoad}/>
      {load && (
    <div className="absolute inset-0 bg-white/30 backdrop-blur pointer-events-none z-50"></div>
  )}
      <main className="flex-1 overflow-y-auto p-2 sm:p-4">
        <Routes>
          <Route path="/" element={<Navigate to="overview" replace />} />
          <Route path="profile" element={<FacultyProfile/>}/>
          <Route path="overview" element={<FacultyOverview />} />
          <Route path="approvals" element={<ApprovalPanel />} />
          <Route path="students" element={<StudentProgress />} />
          <Route path="attendance" element={<ClassAttendance />} />
          <Route path="events" element={<EventNoticeManager />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="register" element={<RegisterStudent />} />
        </Routes>
      </main>
    </div>
  );
};

export default FacultyDashboard;
