import React from 'react';
import { useState,useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award,
  Calendar,
  Target,
  BookOpen,
  Trophy,
  Download,
  Filter,
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const InstitutionAnalytics: React.FC = () => {
  const overallStats = {
    totalStudents: 2847,
    totalActivities: 1542,
    averageScore: 8.2,
    completionRate: 87,
    growthRate: 15.3
  };

  const departmentPerformance = [
    { 
      department: 'Computer Science', 
      students: 654, 
      activities: 432, 
      avgScore: 8.4, 
      growth: 18.2,
      trend: 'up'
    },
    { 
      department: 'Electronics', 
      students: 521, 
      activities: 298, 
      avgScore: 8.1, 
      growth: 12.5,
      trend: 'up'
    },
    { 
      department: 'Mechanical', 
      students: 487, 
      activities: 267, 
      avgScore: 7.9, 
      growth: 8.7,
      trend: 'stable'
    },
    { 
      department: 'Civil', 
      students: 423, 
      activities: 245, 
      avgScore: 7.7, 
      growth: -2.1,
      trend: 'down'
    },
    { 
      department: 'Chemical', 
      students: 312, 
      activities: 189, 
      avgScore: 8.0, 
      growth: 14.3,
      trend: 'up'
    }
  ];

  const [width, setWidth] = useState<number>(0);
  
    useEffect(() => {
      // set initial width
      setWidth(window.innerWidth);
  
      // optional: update on resize
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);


  const activityTrends = [
    { month: 'Aug', workshops: 45, competitions: 12, certifications: 28, internships: 8 },
    { month: 'Sep', workshops: 52, competitions: 18, certifications: 34, internships: 12 },
    { month: 'Oct', workshops: 48, competitions: 15, certifications: 31, internships: 10 },
    { month: 'Nov', workshops: 58, competitions: 22, certifications: 38, internships: 15 },
    { month: 'Dec', workshops: 62, competitions: 25, certifications: 42, internships: 18 },
    { month: 'Jan', workshops: 67, competitions: 28, certifications: 45, internships: 22 }
  ];

  const topPerformingStudents = [
    { name: 'John Smith', department: 'CSE', score: 9.2, activities: 24, rank: 1 },
    { name: 'Emily Johnson', department: 'CSE', score: 8.8, activities: 21, rank: 2 },
    { name: 'Michael Chen', department: 'ECE', score: 8.5, activities: 19, rank: 3 },
    { name: 'Sarah Davis', department: 'ME', score: 8.3, activities: 18, rank: 4 },
    { name: 'David Wilson', department: 'CE', score: 8.1, activities: 16, rank: 5 }
  ];

  const facultyEngagement = [
    { faculty: 'Dr. Sarah Wilson', department: 'CSE', approvals: 156, avgTime: 1.2, rating: 4.8 },
    { faculty: 'Prof. John Doe', department: 'ECE', approvals: 134, avgTime: 1.5, rating: 4.6 },
    { faculty: 'Dr. Emily Chen', department: 'ME', approvals: 128, avgTime: 1.8, rating: 4.5 },
    { faculty: 'Prof. Mike Johnson', department: 'CE', approvals: 112, avgTime: 2.1, rating: 4.3 },
    { faculty: 'Dr. Lisa Brown', department: 'CHE', approvals: 98, avgTime: 1.6, rating: 4.7 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-1 bg-gray-400 rounded-full"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className='mb-4 lg:mb-0'>
          <h1 className="text-3xl font-bold text-gray-900">Institution Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into institutional performance and trends</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center text-xs lg:text-lg space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-400" />
            <span>Filter</span>
          </button>
          <button className="bg-green-600 text-xs lg:text-lg text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{overallStats.totalStudents.toLocaleString()}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Total Students</h3>
          <p className="text-sm text-blue-600">All departments</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{overallStats.totalActivities.toLocaleString()}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Total Activities</h3>
          <p className="text-sm text-green-600">This academic year</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{overallStats.averageScore}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Average Score</h3>
          <p className="text-sm text-purple-600">Institution-wide</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{overallStats.completionRate}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Completion Rate</h3>
          <p className="text-sm text-orange-600">Activity completion</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-teal-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{overallStats.growthRate}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Growth Rate</h3>
          <p className="text-sm text-teal-600">Year over year</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Department Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Department Performance Analysis</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {departmentPerformance.map((dept, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{dept.department}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{dept.students} students</span>
                        <span>•</span>
                        <span>{dept.activities} activities</span>
                        <span>•</span>
                        <span>Score: {dept.avgScore}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(dept.trend)}
                      <span className={`text-sm font-semibold ${getTrendColor(dept.trend)}`}>
                        {dept.growth > 0 ? '+' : ''}{dept.growth}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex flex-col lg:flex-row justify-between text-xs text-gray-600 mb-1">
                        <span>Performance</span>
                        <span>{dept.avgScore}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(dept.avgScore / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex flex-col lg:flex-row justify-between text-xs text-gray-600 mb-1">
                        <span>Activity</span>
                        <span>{((dept.activities / dept.students) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${Math.min((dept.activities / dept.students) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex flex-col lg:flex-row justify-between text-xs text-gray-600 mb-1">
                        <span>Growth</span>
                        <span>{dept.growth > 0 ? '+' : ''}{dept.growth}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${dept.growth > 0 ? 'bg-green-600' : 'bg-red-600'}`}
                          style={{ width: `${Math.abs(dept.growth) * 2}%` }}
                        />
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
            <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topPerformingStudents.map((student, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      <span className="text-sm font-bold">{student.rank}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{student.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{student.department}</span>
                      <span>•</span>
                      <span>Score: {student.score}</span>
                      <span>•</span>
                      <span>{student.activities} activities</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Trends */}
      {width>550 &&<div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Activity Trends Over Time</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {activityTrends.map((month, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-center">
                  <span className="font-semibold text-gray-900">{month.month}</span>
                </div>
                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Workshops</span>
                      <span>{month.workshops}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(month.workshops / 80) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Competitions</span>
                      <span>{month.competitions}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(month.competitions / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Certifications</span>
                      <span>{month.certifications}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(month.certifications / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Internships</span>
                      <span>{month.internships}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full"
                        style={{ width: `${(month.internships / 25) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>}

      {/* Faculty Engagement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Faculty Engagement Metrics</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Faculty</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Approvals</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Time (days)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Performance</th>
                </tr>
              </thead>
              <tbody>
                {facultyEngagement.map((faculty, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{faculty.faculty}</td>
                    <td className="py-3 px-4 text-gray-600">{faculty.department}</td>
                    <td className="py-3 px-4 text-gray-900">{faculty.approvals}</td>
                    <td className="py-3 px-4 text-gray-900">{faculty.avgTime}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-900">{faculty.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(faculty.rating / 5) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <div className="flex flex-col lg:flex-row items-start lg:space-x-4 space-x-0">
          <div className="bg-green-600 p-2 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Key Insights & Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">📈 Growth Opportunities</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Computer Science shows highest engagement (18.2% growth)</li>
                  <li>• Certification programs gaining popularity (+25% this semester)</li>
                  <li>• Faculty approval time improved by 15% overall</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">🎯 Areas for Improvement</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Civil Engineering needs attention (-2.1% growth)</li>
                  <li>• Increase internship opportunities across all departments</li>
                  <li>• Focus on improving completion rates in lower-performing areas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionAnalytics;