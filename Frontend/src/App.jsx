import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import StudentDashboard from './pages/student/Dashboard.jsx';
import FacultyDashboard from './pages/faculty/Dashboard.jsx';
import HeadDashboard from './pages/head/Dashboard.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route 
            path="/student/dashboard" 
            element={
              <PrivateRoute allowedRoles={['student']}>
                <StudentDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/faculty/dashboard" 
            element={
              <PrivateRoute allowedRoles={['faculty']}>
                <FacultyDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/head/dashboard" 
            element={
              <PrivateRoute allowedRoles={['head']}>
                <HeadDashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;