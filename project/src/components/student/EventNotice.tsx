import React, { useState } from 'react';
import { 
  Calendar, 
  Bell, 
  FileText,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Eye,
  Download,
  Share,
  AlertCircle,
  CheckCircle,
  X,
  Star
} from 'lucide-react';
import { useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  type: 'event' | 'notice' | 'announcement';
  priority: 'low' | 'medium' | 'high';
  date: string;
  time?: string;
  location?: string;
  targetAudience: string[];
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
  isBookmarked?: boolean;
  isRead?: boolean;
}

const EventsNotices: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Mid-Semester Examination Schedule',
      description: 'Mid-semester examinations will be conducted from February 20-25, 2024. Students are advised to check the detailed timetable on the student portal and prepare accordingly. All examinations will be held in the main examination hall.',
      type: 'notice',
      priority: 'high',
      date: '2024-02-15',
      targetAudience: ['All Students', 'Faculty'],
      createdBy: 'Dr. Sarah Wilson',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'published',
      isBookmarked: true,
      isRead: false
    },
    {
      id: 2,
      title: 'Tech Symposium 2024',
      description: 'Annual technical symposium featuring industry experts, research presentations, and networking opportunities. Join us for keynote speeches, technical sessions, and career guidance from leading professionals in the technology industry.',
      type: 'event',
      priority: 'medium',
      date: '2024-03-10',
      time: '9:00 AM',
      location: 'Main Auditorium',
      targetAudience: ['CSE Students', 'Faculty'],
      createdBy: 'Prof. John Doe',
      createdAt: '2024-01-10T14:20:00Z',
      status: 'published',
      isBookmarked: false,
      isRead: true
    },
    {
      id: 3,
      title: 'Library Maintenance Notice',
      description: 'The central library will be closed for maintenance and system upgrades from February 18-20, 2024. Digital resources will remain accessible through the online portal. Students can access e-books and journals remotely.',
      type: 'announcement',
      priority: 'medium',
      date: '2024-02-18',
      targetAudience: ['All Students', 'Faculty'],
      createdBy: 'Dr. Emily Chen',
      createdAt: '2024-01-12T09:15:00Z',
      status: 'published',
      isBookmarked: false,
      isRead: true
    },
    {
      id: 4,
      title: 'Placement Drive - Google',
      description: 'Google campus recruitment drive for final year students. Eligible students can register through the placement portal. Pre-placement talk will be conducted on February 25th.',
      type: 'event',
      priority: 'high',
      date: '2024-02-28',
      time: '10:00 AM',
      location: 'Placement Cell',
      targetAudience: ['Final Year Students'],
      createdBy: 'Placement Officer',
      createdAt: '2024-01-20T11:45:00Z',
      status: 'published',
      isBookmarked: true,
      isRead: false
    },
    {
      id: 5,
      title: 'Workshop on Machine Learning',
      description: 'Three-day intensive workshop on machine learning fundamentals, practical implementation, and industry applications. Certificates will be provided upon completion.',
      type: 'event',
      priority: 'medium',
      date: '2024-02-22',
      time: '2:00 PM',
      location: 'Computer Lab 3',
      targetAudience: ['CSE Students', 'IT Students'],
      createdBy: 'Dr. Sarah Wilson',
      createdAt: '2024-01-18T16:30:00Z',
      status: 'published',
      isBookmarked: false,
      isRead: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'event' | 'notice' | 'announcement' | 'bookmarked'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // set initial width
    setWidth(window.innerWidth);

    // optional: update on resize
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log(width);
  }, [width]);

  const toggleBookmark = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isBookmarked: !event.isBookmarked }
        : event
    ));
  };

  const markAsRead = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isRead: true }
        : event
    ));
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = 
      filter === 'all' || 
      event.type === filter || 
      (filter === 'bookmarked' && event.isBookmarked);
    
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch && event.status === 'published';
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'notice':
        return <Bell className="w-5 h-5 text-orange-600" />;
      case 'announcement':
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-blue-100 text-blue-800';
      case 'notice':
        return 'bg-orange-100 text-orange-800';
      case 'announcement':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = (date: string) => {
    return new Date(date) > new Date();
  };

  const getDaysUntil = (date: string) => {
    const eventDate = new Date(date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events & Notices</h1>
        <p className="text-gray-600 mt-2">Stay updated with latest events, notices, and announcements</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {events.filter(e => e.type === 'event' && isUpcoming(e.date)).length}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Upcoming Events</h3>
          <p className="text-sm text-blue-600">This month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {events.filter(e => !e.isRead).length}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Unread Notices</h3>
          <p className="text-sm text-orange-600">Requires attention</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Bookmark className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {events.filter(e => e.isBookmarked).length}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Bookmarked</h3>
          <p className="text-sm text-purple-600">Saved items</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {events.filter(e => e.priority === 'high').length}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">High Priority</h3>
          <p className="text-sm text-green-600">Important items</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {width>550 &&(<div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {(['all', 'event', 'notice', 'announcement', 'bookmarked'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                    filter === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type === 'bookmarked' ? 'Saved' : type}
                  {type !== 'all' && type !== 'bookmarked' && ` (${events.filter(e => e.type === type).length})`}
                  {type === 'bookmarked' && ` (${events.filter(e => e.isBookmarked).length})`}
                </button>
              ))}
            </div>)}

            <div className="flex space-x-3">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 w-[100%] focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <div 
            key={event.id} 
            className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
              !event.isRead ? 'border-blue-200 bg-blue-50' : 'border-gray-100'
            } ${event.priority === 'high' ? 'ring-2 ring-red-100' : ''}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col min-[550px]:flex-row items-start  min-[550px]:space-x-4 space-x-0 flex-1">
                  <div className="bg-gray-50 p-3 rounded-lg w-fit mb-4 min-[550px]:mb-0">
                    {getTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col min-[550px]:flex-row items-start space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                     {!event.isRead && width>550 && (
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          NEW
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium mt-4 min-[550px]:mt-0 ${getTypeColor(event.type)}`}>
                        {event.type.toUpperCase()}
                      </span>
                      {event.priority === 'high' && width>550 &&(
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(event.priority)}`}>
                          HIGH PRIORITY
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()} {event.time && `at ${event.time}`}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{event.targetAudience.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>By {event.createdBy}</span>
                      </div>
                    </div>

                    {isUpcoming(event.date) && event.type === 'event' && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            {getDaysUntil(event.date) === 0 ? 'Today!' : 
                             getDaysUntil(event.date) === 1 ? 'Tomorrow' : 
                             `${getDaysUntil(event.date)} days to go`}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Posted on {new Date(event.createdAt).toLocaleDateString()}
                </div>
                {width>550 && (<div className="flex space-x-3">
                  {!event.isRead && (
                    <button 
                      onClick={() => markAsRead(event.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button 
                    onClick={() => toggleBookmark(event.id)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                      event.isBookmarked 
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {event.isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                    <span className="text-sm">{event.isBookmarked ? 'Saved' : 'Save'}</span>
                  </button>
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View Details</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    <Share className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>)}
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  {getTypeIcon(selectedEvent.type)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedEvent.type)}`}>
                      {selectedEvent.type.toUpperCase()}
                    </span>
                    {selectedEvent.priority === 'high' && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedEvent.priority)}`}>
                        HIGH PRIORITY
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>Date: {new Date(selectedEvent.date).toLocaleDateString()}</span>
                      </div>
                      {selectedEvent.time && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>Time: {selectedEvent.time}</span>
                        </div>
                      )}
                      {selectedEvent.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>Location: {selectedEvent.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isUpcoming(selectedEvent.date) && selectedEvent.type === 'event' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Upcoming Event</span>
                      </div>
                      <p className="text-sm text-green-700">
                        {getDaysUntil(selectedEvent.date) === 0 ? 'This event is today!' : 
                         getDaysUntil(selectedEvent.date) === 1 ? 'This event is tomorrow' : 
                         `${getDaysUntil(selectedEvent.date)} days remaining`}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Target Audience</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.targetAudience.map((audience, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Posted By</h4>
                    <p className="text-gray-700">{selectedEvent.createdBy}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedEvent.createdAt).toLocaleDateString()} at {new Date(selectedEvent.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <div className="flex space-x-3">
                <button 
                  onClick={() => toggleBookmark(selectedEvent.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedEvent.isBookmarked 
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedEvent.isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  <span>{selectedEvent.isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsNotices;