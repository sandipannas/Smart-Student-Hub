import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import '../styles/Sidebar.css';

const Sidebar = ({ role, activeItem, onItemClick }) => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const menuItems = {
    student: [
      { id: 'attendance', label: 'Attendance', icon: '📊' },
      { id: 'marks', label: 'Marks', icon: '📝' },
      { id: 'certificates', label: 'Certificates', icon: '🏆' },
      { id: 'projects', label: 'Projects', icon: '💼' },
      { id: 'skills', label: 'Skills', icon: '⚡' },
      { id: 'events', label: 'Events & Notices', icon: '📢' },
      { id: 'admins', label: 'My Advisors', icon: '👨‍🏫' },
    ],
    faculty: [
      { id: 'classes', label: 'My Classes', icon: '👥' },
      { id: 'students', label: 'Student Management', icon: '👨‍🎓' },
      { id: 'certificates', label: 'Certificates Approval', icon: '✅' },
      { id: 'events', label: 'Events & Notices', icon: '📢' },
    ],
    head: [
      { id: 'faculty', label: 'Faculty Management', icon: '👨‍🏫' },
      { id: 'reports', label: 'Institution Reports', icon: '📊' },
      { id: 'events', label: 'Global Events/Notices', icon: '🌐' },
    ],
  };

  const currentMenuItems = menuItems[role] || [];

  return (
    <>
      <button className="mobile-menu-btn" onClick={toggleMobile}>
        ☰
      </button>
      
      <div className={`sidebar-overlay ${isMobileOpen ? 'show' : ''}`} onClick={toggleMobile}></div>
      
      <div className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <h2>Dashboard</h2>
          <p>{role} Portal</p>
        </div>
        
        <ul className="sidebar-nav">
          {currentMenuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <a
                href="#"
                className={activeItem === item.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick(item.id);
                  setIsMobileOpen(false);
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;