import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar.jsx';
import ProfileDropdown from '../../components/ProfileDropdown.jsx';
import '../../styles/Dashboard.css';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('attendance');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [messageData, setMessageData] = useState({
    subject: '',
    message: ''
  });
  const [uploadType, setUploadType] = useState('');
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    file: null,
    grade: '',
    subject: '',
    skillLevel: '',
    category: ''
  });
  
  // Mock admin tracking data
  const [trackingAdmins, setTrackingAdmins] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@university.edu',
      department: 'Computer Science',
      designation: 'Professor',
      lastContact: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Prof. Michael Brown',
      email: 'michael.brown@university.edu',
      department: 'Computer Science',
      designation: 'Associate Professor',
      lastContact: '2024-01-10',
      status: 'active'
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      email: 'emily.davis@university.edu',
      department: 'Mathematics',
      designation: 'Assistant Professor',
      lastContact: '2024-01-08',
      status: 'active'
    }
  ]);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // Here you would typically upload to your backend
    console.log('Uploading:', uploadType, uploadData);
    
    // Reset form and close modal
    setUploadData({
      title: '',
      description: '',
      file: null,
      grade: '',
      subject: '',
      skillLevel: '',
      category: ''
    });
    setShowUploadModal(false);
    setUploadType('');
    
    // Show success message (you could add a toast notification here)
    alert(`${uploadType} uploaded successfully!`);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log('Sending message to:', selectedAdmin.name, messageData);
    
    // Reset form and close modal
    setMessageData({
      subject: '',
      message: ''
    });
    setShowMessageModal(false);
    setSelectedAdmin(null);
    
    alert(`Message sent to ${selectedAdmin.name} successfully!`);
  };

  const openMessageModal = (admin) => {
    setSelectedAdmin(admin);
    setShowMessageModal(true);
  };
  const openUploadModal = (type) => {
    setUploadType(type);
    setShowUploadModal(true);
  };

  const renderUploadForm = () => {
    switch (uploadType) {
      case 'marks':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                value={uploadData.subject}
                onChange={(e) => setUploadData({ ...uploadData, subject: e.target.value })}
                placeholder="Enter subject name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Grade/Score</label>
              <input
                type="text"
                className="form-input"
                value={uploadData.grade}
                onChange={(e) => setUploadData({ ...uploadData, grade: e.target.value })}
                placeholder="Enter your grade or score"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Upload Mark Sheet</label>
              <input
                type="file"
                className="form-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
                required
              />
            </div>
          </>
        );
      case 'certificates':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Certificate Title</label>
              <input
                type="text"
                className="form-input"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                placeholder="Enter certificate title"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Issuing Organization</label>
              <input
                type="text"
                className="form-input"
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                placeholder="Enter organization name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={uploadData.category}
                onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                <option value="academic">Academic</option>
                <option value="technical">Technical</option>
                <option value="extracurricular">Extracurricular</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Upload Certificate</label>
              <input
                type="file"
                className="form-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
                required
              />
            </div>
          </>
        );
      case 'projects':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Project Title</label>
              <input
                type="text"
                className="form-input"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                placeholder="Enter project title"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Project Description</label>
              <textarea
                className="form-input"
                style={{ minHeight: '100px' }}
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                placeholder="Describe your project"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Upload Project Files</label>
              <input
                type="file"
                className="form-input"
                accept=".pdf,.zip,.rar,.doc,.docx"
                onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
                required
              />
            </div>
          </>
        );
      case 'skills':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Skill Name</label>
              <input
                type="text"
                className="form-input"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                placeholder="Enter skill name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Skill Level</label>
              <select
                className="form-input"
                value={uploadData.skillLevel}
                onChange={(e) => setUploadData({ ...uploadData, skillLevel: e.target.value })}
                required
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={uploadData.category}
                onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="communication">Communication</option>
                <option value="leadership">Leadership</option>
                <option value="technical">Technical</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Upload Proof/Certificate (Optional)</label>
              <input
                type="file"
                className="form-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };
  
  const renderContent = () => {
    switch (activeSection) {
      case 'attendance':
        return (
          <div>
            <h2 className="section-title">📊 Attendance</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">85%</span>
                <span className="stat-label">Overall Attendance</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">42</span>
                <span className="stat-label">Classes Attended</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">8</span>
                <span className="stat-label">Classes Missed</span>
              </div>
            </div>
            <div className="placeholder-content">
              Detailed attendance records will be displayed here
            </div>
          </div>
        );
      case 'marks':
        return (
          <div>
            <h2 className="section-title">📝 Marks</h2>
            <div style={{ marginBottom: '24px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => openUploadModal('marks')}
              >
                ➕ Upload Marks
              </button>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">8.2</span>
                <span className="stat-label">Current GPA</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">6</span>
                <span className="stat-label">Subjects</span>
              </div>
            </div>
            <div className="placeholder-content">
              Semester marks and grade reports will be shown here
            </div>
          </div>
        );
      case 'certificates':
        return (
          <div>
            <h2 className="section-title">🏆 Certificates</h2>
            <div style={{ marginBottom: '24px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => openUploadModal('certificates')}
              >
                ➕ Upload Certificate
              </button>
            </div>
            <div className="placeholder-content">
              Your earned certificates and achievements will be displayed here
            </div>
          </div>
        );
      case 'projects':
        return (
          <div>
            <h2 className="section-title">💼 Projects</h2>
            <div style={{ marginBottom: '24px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => openUploadModal('projects')}
              >
                ➕ Upload Project
              </button>
            </div>
            <div className="placeholder-content">
              Your project portfolio and submissions will be managed here
            </div>
          </div>
        );
      case 'skills':
        return (
          <div>
            <h2 className="section-title">⚡ Skills</h2>
            <div style={{ marginBottom: '24px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => openUploadModal('skills')}
              >
                ➕ Add Skill
              </button>
            </div>
            <div className="placeholder-content">
              Skill assessment and development tracking will be available here
            </div>
          </div>
        );
      case 'events':
        return (
          <div>
            <h2 className="section-title">📢 Events & Notices</h2>
            <div className="placeholder-content">
              Latest institutional events and important notices will be shown here
            </div>
          </div>
        );
      default:
        return (
          <div className="placeholder-content">
            Select a section from the sidebar
          </div>
        );
      case 'admins':
        return (
          <div>
            <h2 className="section-title">👨‍🏫 My Academic Advisors</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">{trackingAdmins.length}</span>
                <span className="stat-label">Total Advisors</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{trackingAdmins.filter(admin => admin.status === 'active').length}</span>
                <span className="stat-label">Active Advisors</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">3</span>
                <span className="stat-label">Messages This Month</span>
              </div>
            </div>
            
            {trackingAdmins.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Last Contact</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingAdmins.map((admin) => (
                    <tr key={admin.id}>
                      <td>
                        <strong>{admin.name}</strong>
                        <br />
                        <small style={{ color: '#64748b' }}>{admin.email}</small>
                      </td>
                      <td>{admin.department}</td>
                      <td>{admin.designation}</td>
                      <td>{new Date(admin.lastContact).toLocaleDateString()}</td>
                      <td>
                        <span style={{ 
                          textTransform: 'capitalize',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: admin.status === 'active' ? '#dcfce7' : '#fef3c7',
                          color: admin.status === 'active' ? '#166534' : '#92400e',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {admin.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => openMessageModal(admin)}
                            title="Send Message"
                          >
                            💬 Message
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="placeholder-content">
                No academic advisors assigned yet.
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        role="student" 
        activeItem={activeSection}
        onItemClick={setActiveSection}
      />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Student Dashboard</h1>
            <p className="dashboard-subtitle">Welcome to your academic portal</p>
          </div>
          <ProfileDropdown userRole="student" />
        </div>
        
        <div className="dashboard-main">
          {renderContent()}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                Upload {uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}
              </h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadType('');
                  setUploadData({
                    title: '',
                    description: '',
                    file: null,
                    grade: '',
                    subject: '',
                    skillLevel: '',
                    category: ''
                  });
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleUploadSubmit}>
              {renderUploadForm()}
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadType('');
                    setUploadData({
                      title: '',
                      description: '',
                      file: null,
                      grade: '',
                      subject: '',
                      skillLevel: '',
                      category: ''
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedAdmin && (
        <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                Send Message to {selectedAdmin.name}
              </h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowMessageModal(false);
                  setSelectedAdmin(null);
                  setMessageData({
                    subject: '',
                    message: ''
                  });
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleMessageSubmit}>
              <div className="form-group">
                <label className="form-label">To</label>
                <input
                  type="text"
                  className="form-input"
                  value={`${selectedAdmin.name} (${selectedAdmin.email})`}
                  disabled
                  style={{ backgroundColor: '#f8fafc', color: '#64748b' }}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-input"
                  value={messageData.subject}
                  onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                  placeholder="Enter message subject"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input"
                  style={{ minHeight: '120px' }}
                  value={messageData.message}
                  onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                  placeholder="Type your message here..."
                  required
                />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary">
                  📤 Send Message
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowMessageModal(false);
                    setSelectedAdmin(null);
                    setMessageData({
                      subject: '',
                      message: ''
                    });
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

export default StudentDashboard;