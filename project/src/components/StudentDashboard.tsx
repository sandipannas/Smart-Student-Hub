import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentProfile from "./student/studentProfile";
import StudentSidebar from "./student/StudentSidebar";
import DashboardOverview from "./student/DashboardOverview";
import ActivityTracker from "./student/ActivityTracker";
import DigitalPortfolio from "./student/DigitalPortfolio";
import ResumeBuilder from "./student/ResumeBuilder";
import PlacementTools from "./student/PlacementTools";
import CalendarTodo from "./student/CalendarTodo";
import AttendanceTracker from "./student/AttendanceTracker";
import MyAdvisors from "./student/MyAdvisors";
import EventsNotices from "./student/EventNotice";
import Chatbot from "./student/Chatbot";
import Lottie from "lottie-react";
import robo from "../robo.json";


const StudentDashboard = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [show,setShow]=useState<boolean>(false)
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 relative">
  <StudentSidebar setLoad={setLoad} />
  
  { show && <div className={ `absolute inset-0 bg-white/30 backdrop-blur z-10 ` } />}
  {load && <div className="absolute inset-0 bg-white/30 backdrop-blur z-[100000]" />}
  
  <Lottie
    animationData={robo}
    loop
    autoPlay
    className="fixed bottom-10 right-10 z-[10000] h-[100px] w-[100px] cursor-pointer"
    onClick={() => setShow(!show)}
  />
{show&&<Chatbot setShow={setShow}/>}
  <main className="flex-1 overflow-y-auto p-2 sm:p-4 relative z-0">
    
    
    <Routes>
      <Route path="/" element={<Navigate to="overview" replace />} />
      <Route path="profile" element={<StudentProfile />} />
      <Route path="overview" element={<DashboardOverview />} />
      <Route path="activities" element={<ActivityTracker />} />
      <Route path="portfolio" element={<DigitalPortfolio />} />
      <Route path="resume" element={<ResumeBuilder />} />
      <Route path="placement" element={<PlacementTools />} />
      <Route path="events" element={<EventsNotices />} />
      <Route path="calendar" element={<CalendarTodo />} />
      <Route path="attendance" element={<AttendanceTracker />} />
      <Route path="advisor" element={<MyAdvisors />} />
    </Routes>
  </main>
</div>


  );
};

export default StudentDashboard;
