import React from 'react';
import useUserStore from '../useStore';
import { 
  Trophy, 
  BookOpen, 
  Users, 
  Calendar,
  TrendingUp,
  Star,
  Award,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from 'lucide-react';

const DashboardOverview: React.FC = () => {

  const user=useUserStore((state)=>state.user)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Here's your achievement summary and recent activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">24</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Total Achievements</h3>
          <p className="text-sm text-green-600">+3 this month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">18</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Verified Activities</h3>
          <p className="text-sm text-blue-600">6 pending approval</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">8.7</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">CV Score</h3>
          <p className="text-sm text-green-600">Excellent</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">92%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Placement Ready</h3>
          <p className="text-sm text-orange-600">Missing 2 skills</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="bg-green-600 p-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Machine Learning Workshop Approved</h4>
                  <p className="text-sm text-gray-600">Dr. Smith approved your ML workshop participation</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Hackathon Certificate Added</h4>
                  <p className="text-sm text-gray-600">TechFest 2024 participation certificate uploaded</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="bg-orange-600 p-2 rounded-full">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Internship Documentation Pending</h4>
                  <p className="text-sm text-gray-600">Submit completion certificate for summer internship</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm sm:text-base">Add New Activity</span>
              </button>
              <button className="w-full flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Download className="w-5 h-5" />
                <span className="text-sm sm:text-base">Export Portfolio</span>
              </button>
              <button className="w-full flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Users className="w-5 h-5" />
                <span className="text-sm sm:text-base">View Profile</span>
              </button>
            </div>
          </div>

          {/* Skill Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Skill Progress</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Technical Skills</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Leadership</span>
                  <span className="text-sm text-gray-600">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Communication</span>
                  <span className="text-sm text-gray-600">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;