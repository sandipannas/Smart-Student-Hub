import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  MapPin,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Trophy,
  BookOpen,
  Users,
  Briefcase,
  Award,
  Heart
} from 'lucide-react';

const ActivityTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const activities = [
    {
      id: 1,
      title: 'Machine Learning Workshop',
      type: 'Workshop',
      date: '2024-01-15',
      status: 'approved',
      credits: 2,
      description: 'Advanced ML concepts and hands-on implementation',
      location: 'Tech Hub, Main Campus',
      faculty: 'Dr. Sarah Wilson'
    },
    {
      id: 2,
      title: 'TechFest 2024 Hackathon',
      type: 'Competition',
      date: '2024-01-20',
      status: 'pending',
      credits: 3,
      description: '24-hour coding competition - Team lead',
      location: 'Innovation Center',
      faculty: 'Prof. John Doe'
    },
    {
      id: 3,
      title: 'Community Blood Donation Drive',
      type: 'Community Service',
      date: '2024-01-18',
      status: 'approved',
      credits: 1,
      description: 'Organized and participated in blood donation camp',
      location: 'College Auditorium',
      faculty: 'Dr. Emily Chen'
    },
    {
      id: 4,
      title: 'Web Development Internship',
      type: 'Internship',
      date: '2024-01-10',
      status: 'needs_document',
      credits: 5,
      description: 'Summer internship at TechCorp Solutions',
      location: 'TechCorp, Bangalore',
      faculty: 'Prof. Mike Johnson'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'needs_document':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'needs_document':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Workshop':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'Competition':
        return <Trophy className="w-5 h-5 text-yellow-600" />;
      case 'Community Service':
        return <Heart className="w-5 h-5 text-pink-600" />;
      case 'Internship':
        return <Briefcase className="w-5 h-5 text-purple-600" />;
      default:
        return <Award className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return activity.status === 'pending';
    if (activeTab === 'approved') return activity.status === 'approved';
    return true;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 w-[100%]">
        <div className='mb-4'>
          <h1 className="text-3xl font-bold text-gray-900">Activity Tracker</h1>
          <p className="text-gray-600 mt-2">Upload and track your academic and extracurricular activities</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white lg:px-6 lg:py-3 px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm lg:text-lg">Add Activity</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-fit">
        <div className="p-6 w-fit">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Activities
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'pending' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'approved' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Approved
              </button>
            </div>

            <div className="flex space-x-3">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:w-[100%] w-[150%]">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  {getTypeIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                      <p className="text-gray-600">{activity.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(activity.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Type:</span>
                      <span>{activity.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{activity.faculty}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Credits:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                        {activity.credits}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                        Edit
                      </button>
                      {activity.status === 'needs_document' && (
                        <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center space-x-1">
                          <Upload className="w-4 h-4" />
                          <span>Upload Document</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Activity Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Activity</h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter activity title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Workshop</option>
                    <option>Competition</option>
                    <option>Community Service</option>
                    <option>Internship</option>
                    <option>Conference</option>
                    <option>Certification</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the activity and your role"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter location"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Certificate/Proof
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="lg:px-6 lg:py-3 text-sm px-2 py-1 lg:text-lg border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="lg:px-6 lg:py-3 text-sm px-2 py-1 lg:text-lg  bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTracker;