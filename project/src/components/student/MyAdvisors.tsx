import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Phone,
  Mail,
  Calendar,
  Star,
  Send,
  Clock,
  CheckCircle,
  User,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

const MyAdvisors: React.FC = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<any>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageForm, setMessageForm] = useState({ subject: '', message: '' });

  const advisors = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      designation: 'Professor & Head',
      department: 'Computer Science',
      email: 'sarah.wilson@college.edu',
      phone: '+91 98765 43210',
      office: 'Room 301, CS Block',
      officeHours: 'Mon-Fri: 2:00 PM - 4:00 PM',
      specialization: ['Machine Learning', 'Data Science', 'AI'],
      rating: 4.8,
      experience: '15 years',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isMainAdvisor: true,
      lastMeeting: '2024-01-10',
      nextMeeting: '2024-01-25',
      totalMeetings: 12,
      responseTime: '2 hours',
      subjects: ['Data Structures', 'Machine Learning'],
      achievements: ['Best Faculty Award 2023', 'Research Excellence Award'],
      researchAreas: ['Deep Learning', 'Computer Vision', 'NLP']
    },
    {
      id: 2,
      name: 'Prof. John Doe',
      designation: 'Associate Professor',
      department: 'Computer Science',
      email: 'john.doe@college.edu',
      phone: '+91 98765 43211',
      office: 'Room 205, CS Block',
      officeHours: 'Tue-Thu: 10:00 AM - 12:00 PM',
      specialization: ['Software Engineering', 'Web Development'],
      rating: 4.6,
      experience: '10 years',
      image: 'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isMainAdvisor: false,
      lastMeeting: '2024-01-08',
      nextMeeting: '2024-01-22',
      totalMeetings: 8,
      responseTime: '4 hours',
      subjects: ['Software Engineering', 'Web Technologies'],
      achievements: ['Industry Collaboration Award', 'Teaching Excellence'],
      researchAreas: ['Software Architecture', 'DevOps', 'Cloud Computing']
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      designation: 'Assistant Professor',
      department: 'Computer Science',
      email: 'emily.chen@college.edu',
      phone: '+91 98765 43212',
      office: 'Room 108, CS Block',
      officeHours: 'Mon-Wed: 3:00 PM - 5:00 PM',
      specialization: ['Database Systems', 'Data Analytics'],
      rating: 4.7,
      experience: '8 years',
      image: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isMainAdvisor: false,
      lastMeeting: '2024-01-12',
      nextMeeting: '2024-01-28',
      totalMeetings: 6,
      responseTime: '1 hour',
      subjects: ['Database Systems', 'Data Mining'],
      achievements: ['Young Researcher Award', 'Best Paper Award'],
      researchAreas: ['Big Data', 'Data Warehousing', 'Business Intelligence']
    }
  ];

  const recentMessages = [
    {
      id: 1,
      advisorId: 1,
      advisorName: 'Dr. Sarah Wilson',
      subject: 'Project Progress Review',
      message: 'Hi John, I reviewed your project proposal. The ML approach looks promising. Let\'s discuss the implementation details in our next meeting.',
      timestamp: '2024-01-15 10:30 AM',
      status: 'read',
      type: 'received'
    },
    {
      id: 2,
      advisorId: 2,
      advisorName: 'Prof. John Doe',
      subject: 'Assignment Feedback',
      message: 'Your software architecture design is well thought out. Consider adding more details about the security aspects.',
      timestamp: '2024-01-14 2:15 PM',
      status: 'read',
      type: 'received'
    },
    {
      id: 3,
      advisorId: 1,
      advisorName: 'Dr. Sarah Wilson',
      subject: 'Meeting Reschedule',
      message: 'I need to reschedule our Thursday meeting to Friday 3 PM. Please confirm if this works for you.',
      timestamp: '2024-01-13 9:45 AM',
      status: 'unread',
      type: 'received'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would send the message
    alert(`Message sent to ${selectedAdvisor?.name}!`);
    setMessageForm({ subject: '', message: '' });
    setShowMessageModal(false);
  };

  const openMessageModal = (advisor: any) => {
    setSelectedAdvisor(advisor);
    setShowMessageModal(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Advisors</h1>
        <p className="text-gray-600 mt-2">Connect with your faculty advisors and mentors</p>
      </div>

      {/* Advisor Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {advisors.map((advisor) => (
          <div key={advisor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {advisor.isMainAdvisor && (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2">
                <span className="text-sm font-semibold">Main Academic Advisor</span>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex flex-col lg:flex-row items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-4 lg:mb-0">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{advisor.name}</h3>
                  <p className="text-gray-600">{advisor.designation}</p>
                  <p className="text-sm text-gray-500">{advisor.department}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900">{advisor.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{advisor.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{advisor.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{advisor.officeHours}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialization</h4>
                <div className="flex flex-wrap gap-2">
                  {advisor.specialization.map((spec, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-bold text-gray-900">{advisor.totalMeetings}</div>
                  <div className="text-gray-600">Meetings</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-bold text-gray-900">{advisor.responseTime}</div>
                  <div className="text-gray-600">Avg Response</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => openMessageModal(advisor)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 auto-rows-min">
        {/* Recent Messages */}
        <div className="lg:col-span-2  h-fit bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className={`p-4 rounded-lg border ${
                  message.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{message.advisorName}</h4>
                      {message.status === 'unread' && (
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">New</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <h5 className="font-medium text-gray-800 mb-2">{message.subject}</h5>
                  <p className="text-gray-600 text-sm">{message.message}</p>
                  <div className="mt-3 flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Reply</button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm">Mark as Read</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Advisor Interaction Stats</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Meetings</span>
                  <span className="font-bold text-gray-900">26</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Messages Sent</span>
                  <span className="font-bold text-gray-900">48</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg Response Time</span>
                  <span className="font-bold text-gray-900">2.3 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Meeting</span>
                  <span className="font-bold text-blue-600">Jan 25</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Calendar className="w-5 h-5" />
                <span>Schedule Meeting</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>Send Message</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <BookOpen className="w-5 h-5" />
                <span>View Guidance</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedAdvisor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Send Message to {selectedAdvisor.name}</h2>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSendMessage} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter message subject"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your message here..."
                  required
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Advisor Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Office Hours:</span> {selectedAdvisor.officeHours}</p>
                  <p><span className="font-medium">Office:</span> {selectedAdvisor.office}</p>
                  <p><span className="font-medium">Avg Response Time:</span> {selectedAdvisor.responseTime}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="lg:px-6 lg:py-3 lg:text-lg px-2 py-2 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="lg:px-6 lg:py-3 lg:text-lg px-2 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvisors;