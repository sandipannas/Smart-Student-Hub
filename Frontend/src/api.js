import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3001', // Adjust to your backend URL
  timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock API functions for demonstration
export const authAPI = {
  login: async (email, password) => {
    // Mock login response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'student@test.com' && password === 'password') {
          resolve({ data: { token: 'mock-student-token', role: 'student' } });
        } else if (email === 'faculty@test.com' && password === 'password') {
          resolve({ data: { token: 'mock-faculty-token', role: 'faculty' } });
        } else if (email === 'head@test.com' && password === 'password') {
          resolve({ data: { token: 'mock-head-token', role: 'head' } });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
};

// Mock events API
export const eventsAPI = {
  getAll: () => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    return Promise.resolve({ data: events });
  },
  
  create: (event) => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const newEvent = { ...event, id: Date.now(), createdAt: new Date() };
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    return Promise.resolve({ data: newEvent });
  },
  
  update: (id, event) => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...event };
      localStorage.setItem('events', JSON.stringify(events));
      return Promise.resolve({ data: events[index] });
    }
    return Promise.reject(new Error('Event not found'));
  },
  
  delete: (id) => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const filteredEvents = events.filter(e => e.id !== id);
    localStorage.setItem('events', JSON.stringify(filteredEvents));
    return Promise.resolve({ data: { success: true } });
  }
};

// Mock faculty API
export const facultyAPI = {
  getAll: () => {
    const faculty = JSON.parse(localStorage.getItem('faculty') || '[]');
    return Promise.resolve({ data: faculty });
  },
  
  create: (facultyMember) => {
    const faculty = JSON.parse(localStorage.getItem('faculty') || '[]');
    const newFaculty = { ...facultyMember, id: Date.now(), createdAt: new Date() };
    faculty.push(newFaculty);
    localStorage.setItem('faculty', JSON.stringify(faculty));
    return Promise.resolve({ data: newFaculty });
  }
};

export default api;