import React from 'react';
import useUserStore from '../useStore';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  AlertCircle,
  Star,
  Calendar,
  Target
} from 'lucide-react';

const FacultyOverview: React.FC = () => {
  const stats = {
    totalStudents: 48,
    pendingApprovals: 6,
    approvedThisMonth: 23,
    averageScore: 8.4
  };

  const recentActivities = [
    {
      student: 'John Smith',
      activity: 'Machine Learning Workshop',
      type: 'Workshop',
      status: 'pending',
      submittedAt: '2 hours ago'
    },
    {
      student: 'Emily Johnson',
      activity: 'React Certification',
      type: 'Certification',
      status: 'approved',
      submittedAt: '4 hours ago'
    },
    {
      student: 'Michael Chen',
      activity: 'TechFest Hackathon',
      type: 'Competition',
      status: 'pending',
      submittedAt: '1 day ago'
    },
    {
      student: 'Sarah Davis',
      activity: 'Community Blood Drive',
      type: 'Community Service',
      status: 'approved',
      submittedAt: '2 days ago'
    }
  ];

  const topPerformers = [
    { name: 'John Smith', score: 9.2, activities: 24, trend: 'up' },
    { name: 'Emily Johnson', score: 8.8, activities: 21, trend: 'up' },
    { name: 'Michael Chen', score: 8.5, activities: 19, trend: 'stable' },
    { name: 'Sarah Davis', score: 8.3, activities: 18, trend: 'up' },
    { name: 'David Wilson', score: 8.1, activities: 16, trend: 'down' }
  ];

  const user=useUserStore((state)=>state.user)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Here's an overview of your mentees' progress and pending activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalStudents}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Total Students</h3>
          <p className="text-sm text-gray-600">Under your mentorship</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">{stats.pendingApprovals}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Pending Approvals</h3>
          <p className="text-sm text-orange-600">Needs your review</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">{stats.approvedThisMonth}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Approved This Month</h3>
          <p className="text-sm text-green-600">+15% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">{stats.averageScore}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Average Score</h3>
          <p className="text-sm text-purple-600">Class performance</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Activity Submissions</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'pending' ? 'bg-orange-100' : 'bg-green-100'
                  }`}>
                    {activity.status === 'pending' ? (
                      <Clock className="w-4 h-4 text-orange-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{activity.activity}</h4>
                        <p className="text-gray-600 text-sm">{activity.student}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">{activity.type}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{activity.submittedAt}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {activity.status === 'pending' ? (
                          <>
                            <button className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-700 transition-colors">
                              Approve
                            </button>
                            <button className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-700 transition-colors">
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-sm text-green-600 font-medium">✓ Approved</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Top Performers</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topPerformers.map((student, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{student.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>Score: {student.score}</span>
                        <span>•</span>
                        <span>{student.activities} activities</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {student.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      )}
                      {student.trend === 'down' && (
                        <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />
                      )}
                      {student.trend === 'stable' && (
                        <div className="w-4 h-1 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm sm:text-base">Review Pending ({stats.pendingApprovals})</span>
              </button>
              <button className="w-full flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FileText className="w-5 h-5" />
                <span className="text-sm sm:text-base">Generate Reports</span>
              </button>
              <button className="w-full flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Users className="w-5 h-5" />
                <span className="text-sm sm:text-base">View All Students</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-purple-100">
        <div className="flex flex-col lg:flex-row items-start lg:space-x-4 space-x-0">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Upcoming Deadlines & Events</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Mid-term Portfolio Reviews</h4>
                <p className="text-sm text-gray-600">Review student portfolios for mid-semester evaluation</p>
                <p className="text-xs text-purple-600 mt-2">Due: February 25, 2024</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Department Meeting</h4>
                <p className="text-sm text-gray-600">Monthly faculty coordination meeting</p>
                <p className="text-xs text-blue-600 mt-2">Tomorrow: February 16, 2024 at 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyOverview;