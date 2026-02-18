import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Check, 
  AlertCircle,
  BookOpen,
  Users,
  Briefcase,
  Award,
  Bell,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

const CalendarTodo: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] = useState<'calendar' | 'todo' | 'agenda'>('calendar');

  const tasks = [
    {
      id: 1,
      title: 'Submit Machine Learning Assignment',
      type: 'Academic',
      dueDate: '2024-02-15',
      priority: 'high',
      completed: false,
      category: 'assignment'
    },
    {
      id: 2,
      title: 'Attend Career Fair',
      type: 'Career',
      dueDate: '2024-02-18',
      priority: 'medium',
      completed: false,
      category: 'event'
    },
    {
      id: 3,
      title: 'Complete React Certification',
      type: 'Skill Development',
      dueDate: '2024-02-20',
      priority: 'medium',
      completed: true,
      category: 'certification'
    },
    {
      id: 4,
      title: 'Register for TechTalk 2024',
      type: 'Event',
      dueDate: '2024-02-10',
      priority: 'low',
      completed: false,
      category: 'registration'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Data Structures Exam',
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'Academic',
      location: 'Room 101'
    },
    {
      id: 2,
      title: 'Google Campus Drive',
      date: '2024-02-18',
      time: '9:00 AM',
      type: 'Placement',
      location: 'Auditorium'
    },
    {
      id: 3,
      title: 'Tech Club Meeting',
      date: '2024-02-20',
      time: '4:00 PM',
      type: 'Extracurricular',
      location: 'Conference Room'
    },
    {
      id: 4,
      title: 'Project Presentation',
      date: '2024-02-22',
      time: '2:00 PM',
      type: 'Academic',
      location: 'Lab 3'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-400 bg-red-50';
      case 'medium':
        return 'border-orange-400 bg-orange-50';
      case 'low':
        return 'border-green-400 bg-green-50';
      default:
        return 'border-gray-400 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'assignment':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'event':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'certification':
        return <Award className="w-4 h-4 text-green-600" />;
      case 'registration':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Academic':
        return 'bg-blue-100 text-blue-800';
      case 'Placement':
        return 'bg-purple-100 text-purple-800';
      case 'Extracurricular':
        return 'bg-green-100 text-green-800';
      case 'Career':
        return 'bg-orange-100 text-orange-800';
      case 'Skill Development':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-8 w-fit">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className='mb-4'>
          <h1 className="text-3xl font-bold text-gray-900">Calendar & Tasks</h1>
          <p className="text-gray-600 mt-2">Manage your schedule and track important deadlines</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white lg:px-6 lg:py-3  px-2 py-2 text-xs lg:text-lg rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Task</span>
          </button>
          <button className="bg-purple-600 text-white lg:px-6 lg:py-3  px-2 py-2 text-xs lg:text-lg rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        <button
          onClick={() => setActiveView('calendar')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeView === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Calendar View
        </button>
        <button
          onClick={() => setActiveView('todo')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeView === 'todo' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Task List
        </button>
        <button
          onClick={() => setActiveView('agenda')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeView === 'agenda' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Agenda
        </button>
      </div>

      {activeView === 'calendar' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-fit">
          {/* Calendar Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between items-center ">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6 w-fit">
            <div className="grid grid-cols-7 gap-4 mb-4">
              {dayNames.map(day => (
                <div key={day} className="p-3 w-fit text-center font-semibold text-gray-600 mr-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-gray-100 ${
                    day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                  } ${
                    day === new Date().getDate() && 
                    currentDate.getMonth() === new Date().getMonth() && 
                    currentDate.getFullYear() === new Date().getFullYear()
                      ? 'bg-blue-50 border-blue-200' 
                      : ''
                  }`}
                >
                  {day && (
                    <>
                      <div className="font-semibold text-gray-900 mb-1">{day}</div>
                      <div className="space-y-1">
                        {events
                          .filter(event => new Date(event.date).getDate() === day)
                          .slice(0, 2)
                          .map(event => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded truncate ${getTypeColor(event.type)}`}
                            >
                              {event.title}
                            </div>
                          ))
                        }
                        {events.filter(event => new Date(event.date).getDate() === day).length > 2 && (
                          <div className="text-xs text-gray-600">
                            +{events.filter(event => new Date(event.date).getDate() === day).length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === 'todo' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Task List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Your Tasks</h2>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)} ${
                      task.completed ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <button
                          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            task.completed
                              ? 'bg-green-600 border-green-600 text-white'
                              : 'border-gray-300 hover:border-green-600'
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3" />}
                        </button>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              {getCategoryIcon(task.category)}
                              <span className="text-sm text-gray-600">{task.type}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{task.dueDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Task Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Task Overview</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Tasks</span>
                    <span className="font-bold text-gray-900">{tasks.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-bold text-green-600">{tasks.filter(t => t.completed).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-bold text-orange-600">{tasks.filter(t => !t.completed).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">High Priority</span>
                    <span className="font-bold text-red-600">{tasks.filter(t => t.priority === 'high').length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Quick Add</h3>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Task title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Academic</option>
                    <option>Career</option>
                    <option>Skill Development</option>
                    <option>Event</option>
                  </select>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'agenda' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events & Deadlines</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {events.map(event => (
                <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{event.title}</h3>
                    <div className="grid md:grid-cols-3 gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Bell className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarTodo;