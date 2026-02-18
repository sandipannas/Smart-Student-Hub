import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  Award,
  BookOpen,
  Target,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Star,
  Calendar,
  BarChart3
} from 'lucide-react';

const StudentProgress: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    {
      id: 1,
      name: 'John Smith',
      rollNo: 'CS2021001',
      email: 'john.smith@college.edu',
      class: '4th Year CSE',
      cgpa: 8.7,
      totalActivities: 24,
      approvedActivities: 18,
      pendingActivities: 6,
      score: 9.2,
      trend: 'up',
      lastActivity: '2024-01-20',
      strengths: ['Technical Skills', 'Leadership', 'Innovation'],
      improvements: ['Communication', 'Time Management'],
      recentActivities: [
        { title: 'ML Workshop', date: '2024-01-15', status: 'approved' },
        { title: 'Hackathon', date: '2024-01-20', status: 'pending' },
        { title: 'React Certification', date: '2024-01-10', status: 'approved' }
      ]
    },
    {
      id: 2,
      name: 'Emily Johnson',
      rollNo: 'CS2021002',
      email: 'emily.johnson@college.edu',
      class: '4th Year CSE',
      cgpa: 8.9,
      totalActivities: 21,
      approvedActivities: 19,
      pendingActivities: 2,
      score: 8.8,
      trend: 'up',
      lastActivity: '2024-01-18',
      strengths: ['Academic Excellence', 'Research', 'Collaboration'],
      improvements: ['Public Speaking', 'Technical Writing'],
      recentActivities: [
        { title: 'Research Paper', date: '2024-01-18', status: 'approved' },
        { title: 'Tech Conference', date: '2024-01-12', status: 'approved' },
        { title: 'Community Service', date: '2024-01-08', status: 'approved' }
      ]
    },
    {
      id: 3,
      name: 'Michael Chen',
      rollNo: 'CS2021003',
      email: 'michael.chen@college.edu',
      class: '4th Year CSE',
      cgpa: 8.2,
      totalActivities: 19,
      approvedActivities: 15,
      pendingActivities: 4,
      score: 8.5,
      trend: 'stable',
      lastActivity: '2024-01-16',
      strengths: ['Problem Solving', 'Coding', 'Team Work'],
      improvements: ['Leadership', 'Initiative'],
      recentActivities: [
        { title: 'Coding Contest', date: '2024-01-16', status: 'approved' },
        { title: 'Workshop Attendance', date: '2024-01-14', status: 'pending' },
        { title: 'Project Demo', date: '2024-01-11', status: 'approved' }
      ]
    }
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-1 bg-gray-400 rounded-full"></div>;
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Progress Tracking</h1>
        <p className="text-gray-600 mt-2">Monitor and analyze your mentees' academic and extracurricular progress</p>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{students.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Total Students</h3>
          <p className="text-sm text-blue-600">Active mentees</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {students.reduce((sum, s) => sum + s.approvedActivities, 0)}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">Approved Activities</h3>
          <p className="text-sm text-green-600">This semester</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {(students.reduce((sum, s) => sum + s.score, 0) / students.length).toFixed(1)}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">Average Score</h3>
          <p className="text-sm text-purple-600">Class average</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {students.filter(s => s.trend === 'up').length}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">Improving</h3>
          <p className="text-sm text-orange-600">Positive trends</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6">
          <div className="flex  flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-col lg:flex-row lg:space-x-3 space-x-0 ">
              <div className="relative  mb-4 lg:mb-0">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 w-[100%] focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-400" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="grid lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
                  <p className="text-gray-600">{student.rollNo}</p>
                  <p className="text-sm text-gray-500">{student.class}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(student.trend)}
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-900">{student.score}</span>
                    </div>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">CGPA</span>
                  </div>
                  <p className="text-lg font-bold text-blue-900">{student.cgpa}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Activities</span>
                  </div>
                  <p className="text-lg font-bold text-green-900">{student.totalActivities}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">
                    {student.approvedActivities}/{student.totalActivities}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor((student.approvedActivities / student.totalActivities) * 100)}`}
                    style={{ width: `${(student.approvedActivities / student.totalActivities) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Activities</h4>
                <div className="space-y-2">
                  {student.recentActivities.slice(0, 2).map((activity, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-900">{activity.title}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getActivityStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedStudent(student)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name} - Detailed View</h2>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Student Info */}
              <div>
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Student Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Roll Number:</span>
                      <span className="text-gray-900">{selectedStudent.rollNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="text-gray-900">{selectedStudent.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Class:</span>
                      <span className="text-gray-900">{selectedStudent.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">CGPA:</span>
                      <span className="text-gray-900">{selectedStudent.cgpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Overall Score:</span>
                      <span className="text-gray-900">{selectedStudent.score}/10</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Strengths & Areas for Improvement</h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-green-700 mb-2">Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.strengths.map((strength: string, index: number) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-700 mb-2">Areas for Improvement</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.improvements.map((improvement: string, index: number) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                          {improvement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity History */}
              <div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
                  <div className="space-y-3">
                    {selectedStudent.recentActivities.map((activity: any, index: number) => (
                      <div key={index} className="bg-white p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${getActivityStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{activity.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-3 text-xs lg:text-lg border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-3 text-xs lg:text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProgress;