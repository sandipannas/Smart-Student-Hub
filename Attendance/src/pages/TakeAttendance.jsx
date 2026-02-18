import React, { useState, useEffect } from 'react';
import { Upload, Camera } from 'lucide-react';

export default function TakeAttendance() {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroomId, setSelectedClassroomId] = useState('');
  const [file, setFile] = useState(null);
  const [attendance, setAttendance] = useState(null);

  // Load classrooms on component mount
  useEffect(() => {
    const saved = localStorage.getItem('classrooms');
    if (saved) {
      setClassrooms(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedClassroomId) return;

    // Simulate API response - in real app this would be an API call
    const selectedClassroom = classrooms.find(c => c.id === selectedClassroomId);
    if (!selectedClassroom) return;

    // Mock attendance data based on classroom seats
    const mockAttendance = selectedClassroom.seats.map((seat, index) => ({
      seatId: seat.id,
      student: seat.studentName || null,
      status: Math.random() > 0.3 ? "Present" : "Absent" // Random for demo
    }));

    setAttendance(mockAttendance);

    // Save attendance record
    // Transform attendance array to object format expected by Reports
    const attendanceObject = {};
    mockAttendance.forEach(record => {
      attendanceObject[record.seatId] = record.status === "Present";
    });

    // Create photo URL from uploaded file
    const photoUrl = URL.createObjectURL(file);

    const attendanceRecord = {
      id: Date.now().toString(),
      classroomId: selectedClassroomId,
      classroomName: selectedClassroom.name,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString(),
      attendance: attendanceObject,
      photo: photoUrl
    };

    const existingRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    existingRecords.push(attendanceRecord);
    localStorage.setItem('attendanceRecords', JSON.stringify(existingRecords));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Take Attendance</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Classroom
          </label>
          <select
            value={selectedClassroomId}
            onChange={(e) => setSelectedClassroomId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Choose a classroom...</option>
            {classrooms.map(classroom => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.name} ({classroom.seats.length} seats)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Classroom Photo
          </label>
          <div className="flex items-center space-x-2">
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center space-x-2"
              disabled={!file || !selectedClassroomId}
            >
              <Camera className="w-4 h-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      </form>

      {attendance && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Attendance Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left font-medium text-gray-700">Seat</th>
                  <th className="p-3 text-left font-medium text-gray-700">Student</th>
                  <th className="p-3 text-left font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((r, i) => (
                  <tr 
                    key={i} 
                    className={`border-t ${
                      r.status === "Present" 
                        ? "bg-green-50 hover:bg-green-100" 
                        : "bg-red-50 hover:bg-red-100"
                    } transition-colors`}
                  >
                    <td className="p-3 font-medium">{r.seatId}</td>
                    <td className="p-3">{r.student || "Unassigned"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        r.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Total Students: {attendance.length}</span>
              <span className="text-green-600">
                Present: {attendance.filter(r => r.status === "Present").length}
              </span>
              <span className="text-red-600">
                Absent: {attendance.filter(r => r.status === "Absent").length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}