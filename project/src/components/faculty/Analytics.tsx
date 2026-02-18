import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award,
  Download,
  Calendar,
  Target,
  BookOpen,
  Trophy,
  Clock,
  CheckCircle
} from 'lucide-react';

const Analytics: React.FC = () => {
  const overviewStats = {
    totalStudents: 48,
    activeStudents: 42,
    averageScore: 8.4,
    completionRate: 87,
    monthlyGrowth: 15
  };

  const activityTypeData = [
    { type: 'Workshops', count: 45, percentage: 35, color: 'bg-blue-600' },
    { type: 'Competitions', count: 28, percentage: 22, color: 'bg-green-600' },
    { type: 'Certifications', count: 32, percentage: 25, color: 'bg-purple-600' },
    { type: 'Community Service', count: 15, percentage: 12, color: 'bg-orange-600' },
    { type: 'Internships', count: 8, percentage: 6, color: 'bg-pink-600' }
  ];

  const monthlyTrends = [
    { month: 'Aug', activities: 25, approvals: 22 },
    { month: 'Sep', activities: 32, approvals: 28 },
    { month: 'Oct', activities: 28, approvals: 26 },
    { month: 'Nov', activities: 35, approvals: 31 },
    { month: 'Dec', activities: 40, approvals: 35 },
    { month: 'Jan', activities: 45, approvals: 41 }
  ];

  const topPerformers = [
    { name: 'John Smith', activities: 24, score: 9.2, improvement: '+12%' },
    { name: 'Emily Johnson', activities: 21, score: 8.8, improvement: '+8%' },
    { name: 'Michael Chen', activities: 19, score: 8.5, improvement: '+5%' },
    { name: 'Sarah Davis', activities: 18, score: 8.3, improvement: '+15%' }
  ];

  const departmentComparison = [
    { department: 'Computer Science', average: 8.4, students: 48, color: 'bg-blue-600' },
    { department: 'Electronics', average: 8.1, students: 42, color: 'bg-green-600' },
    { department: 'Mechanical', average: 7.8, students: 38, color: 'bg-purple-600' },
    { department: 'Civil', average: 7.6, students: 35, color: 'bg-orange-600' }
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className='mb-4 lg:mb-0'>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into student performance and activities</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{overviewStats.totalStudents}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Total Students</h3>
          <p className="text-sm text-blue-600">{overviewStats.activeStudents} active</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{overviewStats.averageScore}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Average Score</h3>
          <p className="text-sm text-green-600">Class performance</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{overviewStats.completionRate}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Completion Rate</h3>
          <p className="text-sm text-purple-600">Activity completion</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{overviewStats.monthlyGrowth}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Monthly Growth</h3>
          <p className="text-sm text-orange-600">Activity increase</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-pink-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-pink-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">2.3</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Avg Review Time</h3>
          <p className="text-sm text-pink-600">Days to approval</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Activity Types Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Activity Types Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activityTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="font-medium text-gray-900">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{item.count}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Monthly Activity Trends</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {monthlyTrends.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 w-12">{month.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Submitted</span>
                          <span>{month.activities}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(month.activities / 50) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Approved</span>
                          <span>{month.approvals}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(month.approvals / 50) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Top Performers</h3>
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
                    <h4 className="font-semibold text-gray-900">{student.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Score: {student.score}</span>
                      <span>•</span>
                      <span>{student.activities} activities</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-sm font-semibold text-green-600">{student.improvement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Department Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Department Performance Comparison</h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentComparison.map((dept, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${dept.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-white font-bold text-lg">{dept.average}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{dept.department}</h4>
                <p className="text-sm text-gray-600">{dept.students} students</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${dept.color}`}
                      style={{ width: `${(dept.average / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100]">
        <div className="flex flex-col lg:flex-row items-start lg:space-x-4 space-x-0">
          <div className="bg-blue-600 p-2 rounded-lg mb-4 lg:mb-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Key Insights & Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">📈 Positive Trends</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 15% increase in monthly activity submissions</li>
                  <li>• Improved average approval time by 0.5 days</li>
                  <li>• 87% completion rate exceeds target</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">🎯 Focus Areas</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Encourage more internship participation</li>
                  <li>• Promote certification in emerging technologies</li>
                  <li>• Increase community service engagement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;