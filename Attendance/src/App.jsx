import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ClassroomSetup from './pages/ClassroomSetup';
import TakeAttendance from './pages/TakeAttendance';
import Reports from './pages/Reports';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ClassroomSetup />} />
          <Route path="/classroom-setup" element={<ClassroomSetup />} />
          <Route path="/take-attendance" element={<TakeAttendance />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;