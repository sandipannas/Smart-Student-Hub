import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Camera } from 'lucide-react';
import { authAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileDropdown.css';

const ProfileDropdown = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePic: null,
    role: userRole
  });
  const [formData, setFormData] = useState({
    name: profileData.name,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Load user profile data (mock data for now)
    const mockUserData = {
      student: { name: 'Alex Johnson', email: 'alex.student@university.edu' },
      faculty: { name: 'Dr. Sarah Wilson', email: 'sarah.faculty@university.edu' },
      head: { name: 'Prof. Michael Brown', email: 'michael.head@university.edu' }
    };
    
    const userData = mockUserData[userRole] || mockUserData.student;
    setProfileData({ ...profileData, ...userData });
    setFormData({ ...formData, name: userData.name });
  }, [userRole]);

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Validate password fields if changing password
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        alert('New passwords do not match!');
        return;
      }
      if (formData.newPassword.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
      }
    }

    // Update profile data
    const updatedProfile = {
      ...profileData,
      name: formData.name,
      profilePic: previewUrl || profileData.profilePic
    };
    
    setProfileData(updatedProfile);
    
    // Reset form
    setFormData({
      name: updatedProfile.name,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowProfileModal(false);
    
    alert('Profile updated successfully!');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      student: 'Student',
      faculty: 'Faculty',
      head: 'Department Head'
    };
    return roleNames[role] || 'User';
  };

  return (
    <>
      <div className="profile-dropdown" ref={dropdownRef}>
        <button 
          className="profile-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="profile-avatar">
            {profileData.profilePic ? (
              <img src={profileData.profilePic} alt="Profile" />
            ) : (
              <span>{getInitials(profileData.name)}</span>
            )}
          </div>
        </button>

        {isOpen && (
          <div className="profile-menu">
            <div className="profile-header">
              <div className="profile-avatar-large">
                {profileData.profilePic ? (
                  <img src={profileData.profilePic} alt="Profile" />
                ) : (
                  <span>{getInitials(profileData.name)}</span>
                )}
              </div>
              <div className="profile-info">
                <h4>{profileData.name}</h4>
                <p>{getRoleDisplayName(profileData.role)}</p>
                <small>{profileData.email}</small>
              </div>
            </div>
            
            <div className="profile-menu-divider"></div>
            
            <button 
              className="profile-menu-item"
              onClick={() => {
                setShowProfileModal(true);
                setIsOpen(false);
              }}
            >
              <Settings size={16} />
              Edit Profile
            </button>
            
            <button 
              className="profile-menu-item logout"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Profile</h3>
              <button 
                className="modal-close"
                onClick={() => setShowProfileModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleProfileUpdate}>
              <div className="profile-pic-section">
                <div className="current-pic">
                  {previewUrl || profileData.profilePic ? (
                    <img src={previewUrl || profileData.profilePic} alt="Profile" />
                  ) : (
                    <div className="pic-placeholder">
                      <User size={40} />
                    </div>
                  )}
                </div>
                <div className="pic-upload">
                  <input
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="profilePic" className="upload-btn">
                    <Camera size={16} />
                    Change Photo
                  </label>
                </div>
              </div>

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
                  value={profileData.email}
                  disabled
                  style={{ backgroundColor: '#f8fafc', color: '#64748b' }}
                />
                <small style={{ color: '#64748b', fontSize: '12px' }}>
                  Email cannot be changed
                </small>
              </div>

              <div className="form-section">
                <h4 style={{ marginBottom: '16px', color: '#374151' }}>Change Password (Optional)</h4>
                
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowProfileModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;