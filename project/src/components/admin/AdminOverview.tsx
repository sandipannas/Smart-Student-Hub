import React from 'react';
import { 
  Users, 
  FileCheck, 
  TrendingUp, 
  Award,
  BookOpen,
  GraduationCap,
  Shield,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminOverview: React.FC = () => {

  const navigate = useNavigate();
  const institutionStats = {
    totalStudents: 2847,
    totalFaculty: 156,
    activePrograms: 24,
    totalActivities: 1542,
    approvalRate: 94,
    averageScore: 8.2
  };

  const departmentStats = [
    { name: 'Computer Science', students: 654, activities: 432, avgScore: 8.4 },
    { name: 'Electronics', students: 521, activities: 298, avgScore: 8.1 },
    { name: 'Mechanical', students: 487, activities: 267, avgScore: 7.9 },
    { name: 'Civil', students: 423, activities: 245, avgScore: 7.7 },
    { name: 'Others', students: 762, activities: 300, avgScore: 8.0 }
  ];

  const recentActivities = [
    { type: 'system', message: 'Monthly report generated successfully', time: '5 mins ago', status: 'success' },
    { type: 'approval', message: '23 new activities approved by faculty', time: '1 hour ago', status: 'info' },
    { type: 'accreditation', message: 'NAAC data export completed', time: '2 hours ago', status: 'success' },
    { type: 'alert', message: 'High pending approvals in ECE department', time: '3 hours ago', status: 'warning' },
    { type: 'system', message: 'Database backup completed', time: '6 hours ago', status: 'success' }
  ];

  const accreditationStatus = {
    naac: { status: 'ready', lastUpdate: '2024-01-15', nextReview: '2024-06-15' },
    nirf: { status: 'in-progress', lastUpdate: '2024-01-10', nextReview: '2024-03-01' },
    nba: { status: 'needs-attention', lastUpdate: '2024-01-05', nextReview: '2024-04-01' }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'needs-attention':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Shield className="w-4 h-4 text-blue-600" />;
      case 'approval':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'accreditation':
        return <FileCheck className="w-4 h-4 text-purple-600" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Institution Overview</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Comprehensive dashboard for institutional management and analytics</p>
        </div>
        <div className="flex space-x-2 sm:space-x-3">
          <button className="bg-green-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1 sm:space-x-2">
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Export Data</span>
          </button>
        </div>
      </div>

      {/* Institution Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{institutionStats.totalStudents.toLocaleString()}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm lg:text-base">Total Students</h3>
          <p className="text-sm text-blue-600">All programs</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{institutionStats.totalFaculty}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Faculty Members</h3>
          <p className="text-sm text-green-600">Active teaching staff</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{institutionStats.activePrograms}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Programs</h3>
          <p className="text-sm text-purple-600">Active courses</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{institutionStats.totalActivities.toLocaleString()}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Activities</h3>
          <p className="text-sm text-orange-600">This academic year</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-teal-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{institutionStats.approvalRate}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Approval Rate</h3>
          <p className="text-sm text-teal-600">Faculty approvals</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-pink-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-pink-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{institutionStats.averageScore}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Avg Score</h3>
          <p className="text-sm text-pink-600">Student performance</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Department Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Department Overview</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{dept.students} students</span>
                      <span>•</span>
                      <span>{dept.activities} activities</span>
                      <span>•</span>
                      <span>Score: {dept.avgScore}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(dept.avgScore / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accreditation Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Accreditation Status</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">NAAC</h4>
                  <p className="text-sm text-gray-600">Last updated: {accreditationStatus.naac.lastUpdate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(accreditationStatus.naac.status)}`}>
                  Ready
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">NIRF</h4>
                  <p className="text-sm text-gray-600">Last updated: {accreditationStatus.nirf.lastUpdate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(accreditationStatus.nirf.status)}`}>
                  In Progress
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">NBA</h4>
                  <p className="text-sm text-gray-600">Last updated: {accreditationStatus.nba.lastUpdate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(accreditationStatus.nba.status)}`}>
                  Needs Attention
                </span>
              </div>
            </div>
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Generate Reports
            </button>
          </div>
        </div>
      </div>

      {/* Recent System Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent System Activities</h2>
            <button className="text-green-600 hover:text-green-700 font-medium">View All</button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'success' ? 'bg-green-100 text-green-800' :
                  activity.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-start space-x-4">
          <div className="bg-green-600 p-2 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Administrative Quick Actions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
                <FileCheck className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Generate NAAC Report</h4>
                <p className="text-sm text-gray-600">Compile comprehensive accreditation data</p>
              </button>
              
              <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
              onClick={() => navigate('/superAdmin/register')}>
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Bulk User Management</h4>
                <p className="text-sm text-gray-600">Import/export student and faculty data</p>
              </button>
              
              <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
              onClick={() => navigate('/superAdmin/analytics')}>
                <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Analytics Dashboard</h4>
                <p className="text-sm text-gray-600">View detailed institutional analytics</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;