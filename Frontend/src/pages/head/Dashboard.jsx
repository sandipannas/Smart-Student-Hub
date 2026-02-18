import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar.jsx';
import ProfileDropdown from '../../components/ProfileDropdown.jsx';
import { facultyAPI } from '../../api.js';
import '../../styles/Dashboard.css';

const HeadDashboard = () => {
  const [activeSection, setActiveSection] = useState('faculty');
  const [faculty, setFaculty] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    department: '',
    designation: ''
  });

  useEffect(() => {
    if (activeSection === 'faculty') {
      loadFaculty();
    }
  }, [activeSection]);

  const loadFaculty = async () => {
    try {
      const response = await facultyAPI.getAll();
      setFaculty(response.data);
    } catch (error) {
      console.error('Error loading faculty:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await facultyAPI.create(formData);
      await loadFaculty();
      setShowModal(false);
      setFormData({ email: '', name: '', department: '', designation: '' });
    } catch (error) {
      console.error('Error adding faculty:', error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'faculty':
        return (
          <div>
            <h2 className="section-title">👨‍🏫 Faculty Management</h2>
            <div style={{ marginBottom: '24px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowModal(true)}
              >
                ➕ Add Faculty Member
              </button>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">{faculty.length}</span>
                <span className="stat-label">Total Faculty</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">8</span>
                <span className="stat-label">Departments</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">95%</span>
                <span className="stat-label">Active Rate</span>
              </div>
            </div>
            
            {faculty.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty.map((member) => (
                    <tr key={member.id}>
                      <td><strong>{member.name}</strong></td>
                      <td>{member.email}</td>
                      <td>{member.department}</td>
                      <td>{member.designation}</td>
                      <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="placeholder-content">
                No faculty members added yet. Click the button above to add one.
              </div>
            )}
          </div>
        );
      case 'reports':
        return (
          <div>
            <h2 className="section-title">📊 Institution Reports</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">1,245</span>
                <span className="stat-label">Total Students</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">67</span>
                <span className="stat-label">Faculty Members</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">92%</span>
                <span className="stat-label">Attendance Rate</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">8.1</span>
                <span className="stat-label">Average GPA</span>
              </div>
            </div>
            <div className="placeholder-content">
              Comprehensive institution analytics and reports will be displayed here
            </div>
          </div>
        );
      case 'events':
        return (
          <div>
            <h2 className="section-title">🌐 Global Events/Notices</h2>
            <div className="placeholder-content">
              Institution-wide event management and global notices will be managed here
            </div>
          </div>
        );
      default:
        return (
          <div className="placeholder-content">
            Select a section from the sidebar
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        role="head" 
        activeItem={activeSection}
        onItemClick={setActiveSection}
      />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Head Dashboard</h1>
            <p className="dashboard-subtitle">Institutional management and oversight</p>
          </div>
          <ProfileDropdown userRole="head" />
        </div>
        
        <div className="dashboard-main">
          {renderContent()}
        </div>
      </div>

      {/* Modal for adding faculty */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Faculty Member</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  setFormData({ email: '', name: '', department: '', designation: '' });
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    className="form-input"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Economics">Economics</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Designation</label>
                  <select
                    className="form-input"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary">
                  Add Faculty
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ email: '', name: '', department: '', designation: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadDashboard;