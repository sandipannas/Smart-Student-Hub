import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar.jsx';
import ProfileDropdown from '../../components/ProfileDropdown.jsx';
import { eventsAPI } from '../../api.js';
import '../../styles/Dashboard.css';

const FacultyDashboard = () => {
  const [activeSection, setActiveSection] = useState('classes');
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    type: 'event'
  });
  const [studentFormData, setStudentFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    semester: '',
    stream: '',
    year: ''
  });
  
  // Mock certificate requests data
  const [certificateRequests, setCertificateRequests] = useState([
    {
      id: 1,
      studentName: 'John Smith',
      studentId: 'CS2021001',
      certificateTitle: 'React Development Certification',
      issuingOrg: 'Meta',
      category: 'technical',
      submittedDate: '2024-01-15',
      status: 'pending',
      fileUrl: '#'
    },
    {
      id: 2,
      studentName: 'Sarah Johnson',
      studentId: 'CS2021002',
      certificateTitle: 'AWS Cloud Practitioner',
      issuingOrg: 'Amazon Web Services',
      category: 'professional',
      submittedDate: '2024-01-14',
      status: 'pending',
      fileUrl: '#'
    },
    {
      id: 3,
      studentName: 'Mike Davis',
      studentId: 'CS2021003',
      certificateTitle: 'Google Analytics Certified',
      issuingOrg: 'Google',
      category: 'professional',
      submittedDate: '2024-01-13',
      status: 'pending',
      fileUrl: '#'
    },
    {
      id: 4,
      studentName: 'Emily Chen',
      studentId: 'CS2021004',
      certificateTitle: 'Python Programming Certificate',
      issuingOrg: 'Coursera',
      category: 'academic',
      submittedDate: '2024-01-12',
      status: 'pending',
      fileUrl: '#'
    },
    {
      id: 5,
      studentName: 'Alex Rodriguez',
      studentId: 'CS2021005',
      certificateTitle: 'Digital Marketing Certification',
      issuingOrg: 'HubSpot',
      category: 'professional',
      submittedDate: '2024-01-11',
      status: 'pending',
      fileUrl: '#'
    }
  ]);

  // Mock students data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@student.edu',
      studentId: 'CS2021001',
      semester: '6th',
      stream: 'Computer Science',
      year: '3rd',
      gpa: '8.5',
      status: 'active',
      enrolledDate: '2021-08-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@student.edu',
      studentId: 'CS2021002',
      semester: '6th',
      stream: 'Computer Science',
      year: '3rd',
      gpa: '9.1',
      status: 'active',
      enrolledDate: '2021-08-15'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@student.edu',
      studentId: 'CS2021003',
      semester: '6th',
      stream: 'Computer Science',
      year: '3rd',
      gpa: '7.8',
      status: 'active',
      enrolledDate: '2021-08-15'
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@student.edu',
      studentId: 'CS2021004',
      semester: '6th',
      stream: 'Computer Science',
      year: '3rd',
      gpa: '8.9',
      status: 'active',
      enrolledDate: '2021-08-15'
    }
  ]);

  useEffect(() => {
    if (activeSection === 'events') {
      loadEvents();
    }
  }, [activeSection]);

  const loadEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await eventsAPI.update(editingEvent.id, formData);
      } else {
        await eventsAPI.create(formData);
      }
      await loadEvents();
      setShowModal(false);
      setEditingEvent(null);
      setFormData({ title: '', description: '', date: '', type: 'event' });
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        // Update existing student
        setStudents(prev => 
          prev.map(student => 
            student.id === editingStudent.id 
              ? { ...student, ...studentFormData }
              : student
          )
        );
      } else {
        // Add new student
        const newStudent = {
          ...studentFormData,
          id: Date.now(),
          gpa: '0.0',
          status: 'active',
          enrolledDate: new Date().toISOString().split('T')[0]
        };
        setStudents(prev => [...prev, newStudent]);
      }
      
      setShowStudentModal(false);
      setEditingStudent(null);
      setStudentFormData({
        name: '',
        email: '',
        studentId: '',
        semester: '',
        stream: '',
        year: ''
      });
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentFormData({
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      semester: student.semester,
      stream: student.stream,
      year: student.year
    });
    setShowStudentModal(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
      alert('Student removed successfully!');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      type: event.type
    });
    setShowModal(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventsAPI.delete(eventId);
        await loadEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleCertificateAction = (certificateId, action) => {
    setCertificateRequests(prev => 
      prev.map(cert => 
        cert.id === certificateId 
          ? { ...cert, status: action }
          : cert
      )
    );
    
    const certificate = certificateRequests.find(cert => cert.id === certificateId);
    alert(`Certificate "${certificate.certificateTitle}" has been ${action}!`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      academic: '#3b82f6',
      technical: '#10b981',
      professional: '#8b5cf6',
      extracurricular: '#f59e0b'
    };
    return colors[category] || '#64748b';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      approved: '#10b981',
      rejected: '#ef4444'
    };
    return colors[status] || '#64748b';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'classes':
        return (
          <div>
            <h2 className="section-title">👥 My Classes</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">4</span>
                <span className="stat-label">Active Classes</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">120</span>
                <span className="stat-label">Total Students</span>
              </div>
            </div>
            <div className="placeholder-content">
              Your class schedules and student management tools will be displayed here
            </div>
          </div>
        );
      case 'certificates':
        return (
          <div>
            <h2 className="section-title">✅ Certificates Approval</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">{certificateRequests.filter(cert => cert.status === 'pending').length}</span>
                <span className="stat-label">Pending Approvals</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{certificateRequests.filter(cert => cert.status === 'approved').length}</span>
                <span className="stat-label">Approved This Month</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{certificateRequests.filter(cert => cert.status === 'rejected').length}</span>
                <span className="stat-label">Rejected</span>
              </div>
            </div>
            
            {certificateRequests.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Certificate</th>
                    <th>Category</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificateRequests.map((cert) => (
                    <tr key={cert.id}>
                      <td>
                        <strong>{cert.studentName}</strong>
                        <br />
                        <small style={{ color: '#64748b' }}>{cert.studentId}</small>
                      </td>
                      <td>
                        <strong>{cert.certificateTitle}</strong>
                        <br />
                        <small style={{ color: '#64748b' }}>by {cert.issuingOrg}</small>
                      </td>
                      <td>
                        <span style={{ 
                          textTransform: 'capitalize',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: `${getCategoryColor(cert.category)}20`,
                          color: getCategoryColor(cert.category),
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {cert.category}
                        </span>
                      </td>
                      <td>{new Date(cert.submittedDate).toLocaleDateString()}</td>
                      <td>
                        <span style={{ 
                          textTransform: 'capitalize',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: `${getStatusColor(cert.status)}20`,
                          color: getStatusColor(cert.status),
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {cert.status}
                        </span>
                      </td>
                      <td>
                        {cert.status === 'pending' ? (
                          <div className="action-buttons">
                            <button 
                              className="btn btn-success btn-sm"
                              onClick={() => handleCertificateAction(cert.id, 'approved')}
                              title="Approve Certificate"
                            >
                              ✅ Approve
                            </button>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => handleCertificateAction(cert.id, 'rejected')}
                              title="Reject Certificate"
                            >
                              ❌ Reject
                            </button>
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => window.open(cert.fileUrl, '_blank')}
                              title="View Certificate"
                            >
                              👁️ View
                            </button>
                          </div>
                        ) : (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => window.open(cert.fileUrl, '_blank')}
                            title="View Certificate"
                          >
                            👁️ View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="placeholder-content">
                No certificate requests at the moment.
              </div>
            )}
          </div>
        );
      case 'students':
        return (
          <div>
            <h2 className="section-title">👨‍🎓 Student Management</h2>
            <div style={{ marginBottom: '24px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowStudentModal(true)}
              >
                ➕ Add New Student
              </button>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">{students.length}</span>
                <span className="stat-label">Total Students</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{students.filter(s => s.status === 'active').length}</span>
                <span className="stat-label">Active Students</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{(students.reduce((sum, s) => sum + parseFloat(s.gpa), 0) / students.length).toFixed(1)}</span>
                <span className="stat-label">Average GPA</span>
              </div>
            </div>
            
            {students.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Student ID</th>
                    <th>Year/Semester</th>
                    <th>Stream</th>
                    <th>GPA</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <strong>{student.name}</strong>
                        <br />
                        <small style={{ color: '#64748b' }}>{student.email}</small>
                      </td>
                      <td>{student.studentId}</td>
                      <td>{student.year} Year / {student.semester}</td>
                      <td>{student.stream}</td>
                      <td>
                        <span style={{ 
                          fontWeight: '600',
                          color: parseFloat(student.gpa) >= 8.0 ? '#059669' : parseFloat(student.gpa) >= 6.0 ? '#d97706' : '#dc2626'
                        }}>
                          {student.gpa}
                        </span>
                      </td>
                      <td>
                        <span style={{ 
                          textTransform: 'capitalize',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: student.status === 'active' ? '#dcfce7' : '#fef3c7',
                          color: student.status === 'active' ? '#166534' : '#92400e',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEditStudent(student)}
                            title="Edit Student"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteStudent(student.id)}
                            title="Remove Student"
                          >
                            🗑️ Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="placeholder-content">
                No students added yet. Click the button above to add one.
              </div>
            )}
          </div>
        );
      case 'events':
        return (
          <div>
            <h2 className="section-title">📢 Events & Notices</h2>
            <div style={{ marginBottom: '24px' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowModal(true)}
              >
                ➕ Add New Event/Notice
              </button>
            </div>
            
            {events.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td>
                        <strong>{event.title}</strong>
                        <br />
                        <small style={{ color: '#64748b' }}>{event.description}</small>
                      </td>
                      <td>
                        <span style={{ 
                          textTransform: 'capitalize',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: event.type === 'event' ? '#dbeafe' : '#f3f4f6',
                          color: event.type === 'event' ? '#1e40af' : '#374151'
                        }}>
                          {event.type}
                        </span>
                      </td>
                      <td>{event.date}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEdit(event)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(event.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="placeholder-content">
                No events or notices yet. Click the button above to create one.
              </div>
            )}
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
        role="faculty" 
        activeItem={activeSection}
        onItemClick={setActiveSection}
      />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Faculty Dashboard</h1>
            <p className="dashboard-subtitle">Manage your classes and communications</p>
          </div>
          <ProfileDropdown userRole="faculty" />
        </div>
        
        <div className="dashboard-main">
          {renderContent()}
        </div>
      </div>

      {/* Modal for adding/editing events */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingEvent ? 'Edit Event/Notice' : 'Add New Event/Notice'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  setEditingEvent(null);
                  setFormData({ title: '', description: '', date: '', type: 'event' });
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  style={{ minHeight: '100px' }}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    className="form-input"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="event">Event</option>
                    <option value="notice">Notice</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary">
                  {editingEvent ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingEvent(null);
                    setFormData({ title: '', description: '', date: '', type: 'event' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for adding/editing students */}
      {showStudentModal && (
        <div className="modal-overlay" onClick={() => setShowStudentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowStudentModal(false);
                  setEditingStudent(null);
                  setStudentFormData({
                    name: '',
                    email: '',
                    studentId: '',
                    semester: '',
                    stream: '',
                    year: ''
                  });
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleStudentSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={studentFormData.name}
                  onChange={(e) => setStudentFormData({ ...studentFormData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={studentFormData.email}
                  onChange={(e) => setStudentFormData({ ...studentFormData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Student ID</label>
                  <input
                    type="text"
                    className="form-input"
                    value={studentFormData.studentId}
                    onChange={(e) => setStudentFormData({ ...studentFormData, studentId: e.target.value })}
                    placeholder="e.g., CS2021001"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Stream</label>
                  <select
                    className="form-input"
                    value={studentFormData.stream}
                    onChange={(e) => setStudentFormData({ ...studentFormData, stream: e.target.value })}
                    required
                  >
                    <option value="">Select Stream</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Electrical">Electrical</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <select
                    className="form-input"
                    value={studentFormData.year}
                    onChange={(e) => setStudentFormData({ ...studentFormData, year: e.target.value })}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Semester</label>
                  <select
                    className="form-input"
                    value={studentFormData.semester}
                    onChange={(e) => setStudentFormData({ ...studentFormData, semester: e.target.value })}
                    required
                  >
                    <option value="">Select Semester</option>
                    <option value="1st">1st Semester</option>
                    <option value="2nd">2nd Semester</option>
                    <option value="3rd">3rd Semester</option>
                    <option value="4th">4th Semester</option>
                    <option value="5th">5th Semester</option>
                    <option value="6th">6th Semester</option>
                    <option value="7th">7th Semester</option>
                    <option value="8th">8th Semester</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary">
                  {editingStudent ? 'Update Student' : 'Add Student'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowStudentModal(false);
                    setEditingStudent(null);
                    setStudentFormData({
                      name: '',
                      email: '',
                      studentId: '',
                      semester: '',
                      stream: '',
                      year: ''
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

export default FacultyDashboard;