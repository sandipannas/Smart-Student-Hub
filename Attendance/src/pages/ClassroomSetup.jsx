import React, { useState, useEffect } from 'react';
import { Upload, Plus, Edit, Trash2, Eye } from 'lucide-react';
import SeatEditor from '../components/SeatEditor';

export default function ClassroomSetup() {
  const [classrooms, setClassrooms] = useState([]);
  const [currentClassroom, setCurrentClassroom] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    classroom: '',
    faculty: ''
  });

  // Sample data for dropdowns
  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Psychology'
  ];

  const classroomOptions = [
    'Room 101', 'Room 102', 'Room 103', 'Room 201', 'Room 202', 'Room 203',
    'Lab A', 'Lab B', 'Lab C', 'Auditorium', 'Conference Room', 'Library Hall'
  ];

  const faculties = [
    'Dr. Smith', 'Prof. Johnson', 'Dr. Williams', 'Prof. Brown', 'Dr. Davis',
    'Prof. Miller', 'Dr. Wilson', 'Prof. Moore', 'Dr. Taylor', 'Prof. Anderson'
  ];

  // Load saved classrooms from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('classrooms');
    if (saved) {
      setClassrooms(JSON.parse(saved));
    }
  }, []);

  // Save classrooms to localStorage
  const saveClassrooms = (updatedClassrooms) => {
    setClassrooms(updatedClassrooms);
    localStorage.setItem('classrooms', JSON.stringify(updatedClassrooms));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createNewClassroom = () => {
    if (!uploadedImage) {
      alert('Please upload a classroom image first');
      return;
    }
    
    if (!formData.name || !formData.subject || !formData.classroom || !formData.faculty) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newClassroom = {
      id: Date.now().toString(),
      name: formData.name,
      subject: formData.subject,
      classroom: formData.classroom,
      faculty: formData.faculty,
      image: uploadedImage,
      seats: [],
      createdAt: new Date().toISOString()
    };
    
    setCurrentClassroom(newClassroom);
    setShowEditor(true);
  };

  const editClassroom = (classroom) => {
    setCurrentClassroom(classroom);
    setUploadedImage(classroom.image);
    setShowEditor(true);
  };

  const deleteClassroom = (classroomId) => {
    if (confirm('Are you sure you want to delete this classroom?')) {
      const updated = classrooms.filter(c => c.id !== classroomId);
      saveClassrooms(updated);
    }
  };

  const saveSeatLayout = (seats) => {
    if (!currentClassroom) return;
    
    const updatedClassroom = {
      ...currentClassroom,
      seats,
      updatedAt: new Date().toISOString()
    };
    
    const existingIndex = classrooms.findIndex(c => c.id === currentClassroom.id);
    let updatedClassrooms;
    
    if (existingIndex >= 0) {
      updatedClassrooms = [...classrooms];
      updatedClassrooms[existingIndex] = updatedClassroom;
    } else {
      updatedClassrooms = [...classrooms, updatedClassroom];
    }
    
    saveClassrooms(updatedClassrooms);
    setShowEditor(false);
    setCurrentClassroom(null);
    setUploadedImage('');
  };

  const cancelEditor = () => {
    setShowEditor(false);
    setCurrentClassroom(null);
    setUploadedImage('');
    setFormData({ name: '', subject: '', classroom: '', faculty: '' });
  };

  if (showEditor) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {currentClassroom.id ? 'Edit' : 'Setup'} Classroom: {currentClassroom.name}
          </h3>
          <button
            onClick={cancelEditor}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
        
        <SeatEditor
          imageUrl={uploadedImage}
          existingSeats={currentClassroom.seats}
          onSave={saveSeatLayout}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Classroom</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter class name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classroom *
              </label>
              <select
                value={formData.classroom}
                onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Classroom</option>
                {classroomOptions.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faculty *
              </label>
              <select
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Faculty</option>
                {faculties.map(faculty => (
                  <option key={faculty} value={faculty}>{faculty}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Classroom Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> classroom photo
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            
            {uploadedImage && (
              <div className="mt-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded classroom"
                  className="max-w-xs h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>
          
          <button
            onClick={createNewClassroom}
            disabled={!uploadedImage || !formData.name || !formData.subject || !formData.classroom || !formData.faculty}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Create Classroom</span>
          </button>
        </div>
      </div>

      {/* Existing Classrooms */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Existing Classrooms</h3>
        </div>
        
        {classrooms.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No classrooms created yet. Upload an image to get started.</p>
          </div>
        ) : (
          <div className="divide-y">
            {classrooms.map((classroom) => (
              <div key={classroom.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={classroom.image}
                    alt={classroom.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{classroom.name}</h4>
                    <p className="text-sm text-gray-500">
                      {classroom.subject} • {classroom.classroom} • {classroom.faculty}
                    </p>
                    <p className="text-xs text-gray-400">
                      {classroom.seats.length} seats • Created: {new Date(classroom.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => editClassroom(classroom)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit classroom"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteClassroom(classroom.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete classroom"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}