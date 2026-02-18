import React, { useState } from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LandingPage />} />

        {/* Student Dashboard (Protected) */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Faculty Dashboard (Protected) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard (Protected) */}
        <Route
          path="/superAdmin/*"
          element={
            <ProtectedRoute allowedRole="superAdmin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default → Login */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;