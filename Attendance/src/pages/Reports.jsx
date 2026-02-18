import React, { useState, useEffect } from 'react';
import { Download, Calendar, Users, TrendingUp, Eye, Trash2, BookOpen, User } from 'lucide-react';

export default function Reports() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('records'); // 'records', 'class-wise', 'student-wise'
  const [studentReportClassFilter, setStudentReportClassFilter] = useState('');

  useEffect(() => {
    // Load attendance records and classrooms
    const records = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    const classroomData = JSON.parse(localStorage.getItem('classrooms') || '[]');
    setAttendanceRecords(records);
    setClassrooms(classroomData);
  }, []);

  const filteredRecords = attendanceRecords.filter(record => {
    if (selectedClassroom && record.classroomId !== selectedClassroom) return false;
    if (dateFilter && record.date !== dateFilter) return false;
    return true;
  });

  const getAttendanceStats = (record) => {
    const values = Object.values(record.attendance || {});
    const present = values.filter(v => v === true).length;
    const absent = values.filter(v => v === false).length;
    const total = values.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { present, absent, total, percentage };
  };

  const getOverallStats = () => {
    if (filteredRecords.length === 0) return { avgAttendance: 0, totalSessions: 0, totalStudents: 0 };
    
    let totalPresent = 0;
    let totalPossible = 0;
    let uniqueStudents = new Set();
    
    filteredRecords.forEach(record => {
      const values = Object.values(record.attendance || {});
      totalPresent += values.filter(v => v === true).length;
      totalPossible += values.length;
      
      // Get student names from classroom data
      const classroom = classrooms.find(c => c.id === record.classroomId);
      if (classroom) {
        classroom.seats.forEach(seat => {
          if (seat.studentName) uniqueStudents.add(seat.studentName);
        });
      }
    });
    
    const avgAttendance = totalPossible > 0 ? Math.round((totalPresent / totalPossible) * 100) : 0;
    
    return {
      avgAttendance,
      totalSessions: filteredRecords.length,
      totalStudents: uniqueStudents.size
    };
  };

  const getClassWiseReport = () => {
    const classReport = {};
    
    attendanceRecords.forEach(record => {
      const classroom = classrooms.find(c => c.id === record.classroomId);
      if (!classroom) return;
      
      if (!classReport[record.classroomId]) {
        classReport[record.classroomId] = {
          name: record.classroomName,
          subject: classroom.subject,
          faculty: classroom.faculty,
          totalSessions: 0,
          totalPresent: 0,
          totalPossible: 0,
          students: new Set()
        };
      }
      
      const values = Object.values(record.attendance || {});
      classReport[record.classroomId].totalSessions++;
      classReport[record.classroomId].totalPresent += values.filter(v => v === true).length;
      classReport[record.classroomId].totalPossible += values.length;
      
      // Add students to set
      classroom.seats.forEach(seat => {
        if (seat.studentName) {
          classReport[record.classroomId].students.add(seat.studentName);
        }
      });
    });
    
    return Object.values(classReport).map(report => ({
      ...report,
      studentCount: report.students.size,
      avgAttendance: report.totalPossible > 0 ? Math.round((report.totalPresent / report.totalPossible) * 100) : 0
    }));
  };

  const getStudentWiseReport = () => {
    const studentReport = {};
    
    attendanceRecords.forEach(record => {
      // Apply class filter if selected
      if (studentReportClassFilter && record.classroomId !== studentReportClassFilter) {
        return;
      }
      
      const classroom = classrooms.find(c => c.id === record.classroomId);
      if (!classroom) return;
      
      Object.entries(record.attendance || {}).forEach(([seatId, status]) => {
        const seat = classroom.seats.find(s => s.id === seatId);
        if (!seat || !seat.studentName) return;
        
        const studentKey = `${seat.studentName}-${seat.studentId}`;
        
        if (!studentReport[studentKey]) {
          studentReport[studentKey] = {
            name: seat.studentName,
            studentId: seat.studentId,
            totalSessions: 0,
            presentSessions: 0,
            classes: new Set()
          };
        }
        
        studentReport[studentKey].totalSessions++;
        if (status === true) {
          studentReport[studentKey].presentSessions++;
        }
        studentReport[studentKey].classes.add(record.classroomName);
      });
    });
    
    return Object.values(studentReport).map(report => ({
      ...report,
      classCount: report.classes.size,
      avgAttendance: report.totalSessions > 0 ? Math.round((report.presentSessions / report.totalSessions) * 100) : 0
    })).sort((a, b) => b.avgAttendance - a.avgAttendance);
  };
  const deleteRecord = (recordId) => {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      const updatedRecords = attendanceRecords.filter(r => r.id !== recordId);
      setAttendanceRecords(updatedRecords);
      localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
    }
  };

  const exportToCSV = () => {
    if (filteredRecords.length === 0) return;
    
    const headers = ['Date', 'Time', 'Classroom', 'Student', 'Seat', 'Status'];
    const rows = [];
    
    filteredRecords.forEach(record => {
      const classroom = classrooms.find(c => c.id === record.classroomId);
      
      Object.entries(record.attendance || {}).forEach(([seatId, status]) => {
        const seat = classroom?.seats.find(s => s.id === seatId);
        rows.push([
          record.date,
          new Date(record.time).toLocaleTimeString(),
          record.classroomName,
          seat?.studentName || 'Unknown',
          seatId,
          status === true ? 'Present' : status === false ? 'Absent' : 'Not Marked'
        ]);
      });
    });
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const overallStats = getOverallStats();
  const classWiseReport = getClassWiseReport();
  const studentWiseReport = getStudentWiseReport();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Attendance</p>
              <p className="text-2xl font-bold text-green-600">{overallStats.avgAttendance}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-blue-600">{overallStats.totalSessions}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-purple-600">{overallStats.totalStudents}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('records')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'records'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Attendance Records
            </button>
            <button
              onClick={() => setActiveTab('class-wise')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'class-wise'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Class-wise Report
            </button>
            <button
              onClick={() => setActiveTab('student-wise')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'student-wise'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Student-wise Report
            </button>
          </nav>
        </div>
        
        {/* Filters - only show for records tab */}
        {activeTab === 'records' && (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Classroom
                  </label>
                  <select
                    value={selectedClassroom}
                    onChange={(e) => setSelectedClassroom(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Classrooms</option>
                    {classrooms.map(classroom => (
                      <option key={classroom.id} value={classroom.id}>
                        {classroom.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Date
                  </label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <button
                onClick={exportToCSV}
                disabled={filteredRecords.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Class-wise Report */}
      {activeTab === 'class-wise' && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Class-wise Attendance Report
              </h3>
            </div>
            
            {classWiseReport.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No class data available.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Faculty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sessions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Attendance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {classWiseReport
                      .sort((a, b) => b.avgAttendance - a.avgAttendance)
                      .map((classData, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{classData.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {classData.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {classData.faculty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {classData.studentCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {classData.totalSessions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  classData.avgAttendance >= 80
                                    ? 'bg-green-500'
                                    : classData.avgAttendance >= 60
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${classData.avgAttendance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {classData.avgAttendance}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Student-wise Report */}
      {activeTab === 'student-wise' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Student-wise Attendance Report
              </h3>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Filter by Class:</label>
                <select
                  value={studentReportClassFilter}
                  onChange={(e) => setStudentReportClassFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Classes</option>
                  {classrooms.map(classroom => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {studentWiseReport.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>
                {studentReportClassFilter 
                  ? `No student data available for the selected class.`
                  : `No student data available.`
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="px-6 py-3 bg-gray-50 border-b">
                <p className="text-sm text-gray-600">
                  {studentReportClassFilter 
                    ? `Showing ${studentWiseReport.length} students from ${classrooms.find(c => c.id === studentReportClassFilter)?.name || 'selected class'}`
                    : `Showing ${studentWiseReport.length} students across all classes`
                  }
                </p>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Classes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Sessions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Present Sessions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentWiseReport.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {student.studentId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.classCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.totalSessions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.presentSessions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                student.avgAttendance >= 80
                                  ? 'bg-green-500'
                                  : student.avgAttendance >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${student.avgAttendance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {student.avgAttendance}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Attendance Records */}
      {activeTab === 'records' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Attendance Records ({filteredRecords.length})
            </h3>
          </div>
          
          {filteredRecords.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No attendance records found.</p>
              <p className="text-sm">Records will appear here after taking attendance.</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredRecords
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .map((record) => {
                const stats = getAttendanceStats(record);
                
                return (
                  <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium text-gray-900">{record.classroomName}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(record.time).toLocaleDateString()} at {new Date(record.time).toLocaleTimeString()}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span>Present: {stats.present}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span>Absent: {stats.absent}</span>
                            </span>
                            <span className="font-medium text-gray-700">
                              {stats.percentage}% attendance
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Attendance Details - {selectedRecord.classroomName}
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Date:</span> {new Date(selectedRecord.time).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {new Date(selectedRecord.time).toLocaleTimeString()}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Attendance Photo</h4>
                <img
                  src={selectedRecord.photo}
                  alt="Attendance photo"
                  className="max-w-full h-64 object-contain border rounded"
                />
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Student Attendance</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {Object.entries(selectedRecord.attendance || {}).map(([seatId, status]) => {
                    const classroom = classrooms.find(c => c.id === selectedRecord.classroomId);
                    const seat = classroom?.seats.find(s => s.id === seatId);
                    
                    return (
                      <div
                        key={seatId}
                        className={`p-2 rounded border text-sm ${
                          status === true
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : status === false
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                      >
                        <div className="font-medium">{seat?.studentName || 'Unknown'}</div>
                        <div className="text-xs">
                          {seatId} - {status === true ? 'Present' : status === false ? 'Absent' : 'Not Marked'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}