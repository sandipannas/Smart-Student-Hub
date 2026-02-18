import React, { useState } from 'react';
import { useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Download,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  FileText,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

const ApprovalPanel: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [width, setWidth] = useState<number>(0);
    
      useEffect(() => {
        // set initial width
        setWidth(window.innerWidth);
    
        // optional: update on resize
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);
  

  const activities = [
    {
      id: 1,
      student: {
        name: 'John Smith',
        rollNo: 'CS2021001',
        class: '4th Year CSE',
        email: 'john.smith@college.edu'
      },
      activity: {
        title: 'Machine Learning Workshop',
        type: 'Workshop',
        date: '2024-01-15',
        location: 'Tech Hub, Main Campus',
        description: 'Attended 3-day intensive machine learning workshop covering supervised and unsupervised learning algorithms, neural networks, and practical implementation using Python and TensorFlow.',
        credits: 2,
        organizer: 'IEEE Student Chapter',
        certificate: 'ml_workshop_certificate.pdf'
      },
      submittedAt: '2024-01-16T10:30:00Z',
      status: 'pending',
      documents: ['certificate.pdf', 'participation_photos.jpg']
    },
    {
      id: 2,
      student: {
        name: 'Emily Johnson',
        rollNo: 'CS2021002',
        class: '4th Year CSE',
        email: 'emily.johnson@college.edu'
      },
      activity: {
        title: 'TechFest 2024 Hackathon',
        type: 'Competition',
        date: '2024-01-20',
        location: 'Innovation Center',
        description: 'Participated as team leader in 24-hour hackathon. Developed a web application for local business management using React and Node.js. Achieved 2nd place among 50+ teams.',
        credits: 3,
        organizer: 'TechFest Committee',
        achievement: '2nd Place Winner'
      },
      submittedAt: '2024-01-21T14:15:00Z',
      status: 'pending',
      documents: ['winner_certificate.pdf', 'project_demo.mp4', 'team_photo.jpg']
    },
    {
      id: 3,
      student: {
        name: 'Michael Chen',
        rollNo: 'CS2021003',
        class: '4th Year CSE',
        email: 'michael.chen@college.edu'
      },
      activity: {
        title: 'React Developer Certification',
        type: 'Certification',
        date: '2024-01-18',
        location: 'Online',
        description: 'Completed comprehensive React developer certification course covering advanced React concepts, state management, hooks, and modern development practices.',
        credits: 2,
        organizer: 'Meta Blueprint',
        validUntil: '2026-01-18'
      },
      submittedAt: '2024-01-19T09:45:00Z',
      status: 'approved',
      documents: ['meta_certificate.pdf'],
      approvedBy: 'Dr. Sarah Wilson',
      approvedAt: '2024-01-19T16:30:00Z',
      feedback: 'Excellent achievement! This certification aligns well with our curriculum.'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  const handleApprove = (activityId: number) => {
    console.log('Approving activity:', activityId);
    // Implementation for approval
  };

  const handleReject = (activityId: number) => {
    console.log('Rejecting activity:', activityId);
    // Implementation for rejection
  };

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className='mb-6 lg:mb-0'>
          <h1 className="text-3xl font-bold text-gray-900">Activity Approval Panel</h1>
          <p className="text-gray-600 mt-2">Review and approve student activity submissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Pending:</span>
          <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {activities.filter(a => a.status === 'pending').length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-fit lg:w-[100%]">
        <div className="p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {width>550 &&<div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                    filter === status ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {status} {status !== 'all' && `(${activities.filter(a => a.status === status).length})`}
                </button>
              ))}
            </div>}

            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-3">
              <div className="relative w-[100%] mb-4 lg:mb-0">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
      <div className="space-y-6">
        {filteredActivities.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex  justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.activity.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{item.student.name} ({item.student.rollNo})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{item.activity.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{item.activity.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Submitted {new Date(item.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Activity Description</h4>
                <p className="text-gray-700">{item.activity.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Type:</span>
                  <p className="text-gray-900">{item.activity.type}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Credits:</span>
                  <p className="text-gray-900">{item.activity.credits}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Organizer:</span>
                  <p className="text-gray-900">{item.activity.organizer}</p>
                </div>
              </div>

              {item.documents && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Submitted Documents</h4>
                  <div className="flex flex-col space-x-0 lg:space-x-3 lg:flex-row">
                    {item.documents.map((doc, index) => (
                      <button
                        key={index}
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 w-fit rounded-lg hover:bg-blue-100 transition-colors mb-4 lg:mb-0"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{doc}</span>
                        <Download className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {item.status === 'approved' && item.feedback && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Approved by {item.approvedBy}</p>
                      <p className="text-sm text-green-700 mt-1">{item.feedback}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col lg:flex-row justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex mb-4 space-x-3">
                  <button
                    onClick={() => setSelectedActivity(item)}
                    className="flex items-center space-x-2 lg:px-4 lg:py-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className='text-xs lg:text-lg'>View Details</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Student</span>
                  </button>
                </div>

                {item.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleReject(item.id)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs lg:text-lg bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex items-center space-x-2 px-6 py-2 text-xs lg:text-lg bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Actions */}
      {filter === 'pending' && filteredActivities.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-gray-900">Bulk Actions</span>
              <span className="text-sm text-gray-600">
                {filteredActivities.length} pending activities
              </span>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-xs lg:text-lg bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Reject All
              </button>
              <button className="px-4 py-2 text-xs lg:text-lg bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Approve All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalPanel;