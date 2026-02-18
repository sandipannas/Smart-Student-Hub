import React from 'react';
import { 
  Target, 
  BookOpen, 
  TrendingUp, 
  Award,
  Search,
  ExternalLink,
  Clock,
  MapPin,
  Building,
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
  Star,
  Briefcase
} from 'lucide-react';

const PlacementTools: React.FC = () => {
  const placementReadiness = {
    overall: 85,
    technical: 90,
    aptitude: 80,
    communication: 88,
    interview: 75
  };

  const jobRecommendations = [
    {
      title: 'Software Developer',
      company: 'TechCorp Solutions',
      location: 'Bangalore',
      salary: '₹6-8 LPA',
      match: 92,
      requirements: ['Java', 'Spring Boot', 'React'],
      applied: false
    },
    {
      title: 'Full Stack Developer',
      company: 'InnovateLabs',
      location: 'Hyderabad',
      salary: '₹7-10 LPA',
      match: 88,
      requirements: ['JavaScript', 'Node.js', 'MongoDB'],
      applied: true
    },
    {
      title: 'ML Engineer',
      company: 'DataTech Inc',
      location: 'Pune',
      salary: '₹8-12 LPA',
      match: 85,
      requirements: ['Python', 'TensorFlow', 'AWS'],
      applied: false
    }
  ];

  const upcomingDrives = [
    {
      company: 'Microsoft',
      role: 'Software Engineer Intern',
      date: '2024-02-15',
      type: 'On-campus',
      status: 'registered',
      deadline: '2024-02-10'
    },
    {
      company: 'Google',
      role: 'SDE - New Grad',
      date: '2024-02-20',
      type: 'Virtual',
      status: 'eligible',
      deadline: '2024-02-18'
    },
    {
      company: 'Amazon',
      role: 'Software Development Engineer',
      date: '2024-02-25',
      type: 'On-campus',
      status: 'not_eligible',
      deadline: '2024-02-22'
    }
  ];

  const scholarships = [
    {
      name: 'Merit Scholarship 2024',
      provider: 'Education Ministry',
      amount: '₹50,000',
      deadline: '2024-03-15',
      eligibility: 'CGPA > 8.0',
      status: 'eligible'
    },
    {
      name: 'Tech Excellence Award',
      provider: 'TechFoundation',
      amount: '₹75,000',
      deadline: '2024-03-20',
      eligibility: 'Technical projects',
      status: 'applied'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Placement & Career Tools</h1>
        <p className="text-gray-600 mt-2">Comprehensive tools to boost your placement readiness and career prospects</p>
      </div>

      {/* Placement Readiness Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 lg:mb-2">Placement Readiness</h2>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">{placementReadiness.overall}%</span>
            <span className="text-gray-600">Ready</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 relative">
              <div className="absolute inset-0 rounded-full bg-blue-100">
                <div 
                  className="rounded-full bg-blue-600 flex items-center justify-center text-white font-bold"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    background: `conic-gradient(#2563EB ${placementReadiness.technical * 3.6}deg, #e5e7eb 0deg)`
                  }}
                >
                  {placementReadiness.technical}%
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">Technical Skills</h3>
            <p className="text-sm text-blue-600">Excellent</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 relative">
              <div className="absolute inset-0 rounded-full bg-green-100">
                <div 
                  className="rounded-full bg-green-600 flex items-center justify-center text-white font-bold"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    background: `conic-gradient(#16A34A ${placementReadiness.communication * 3.6}deg, #e5e7eb 0deg)`
                  }}
                >
                  {placementReadiness.communication}%
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">Communication</h3>
            <p className="text-sm text-green-600">Very Good</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 relative">
              <div className="absolute inset-0 rounded-full bg-purple-100">
                <div 
                  className="rounded-full bg-purple-600 flex items-center justify-center text-white font-bold"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    background: `conic-gradient(#9333EA ${placementReadiness.aptitude * 3.6}deg, #e5e7eb 0deg)`
                  }}
                >
                  {placementReadiness.aptitude}%
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">Aptitude</h3>
            <p className="text-sm text-purple-600">Good</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 relative">
              <div className="absolute inset-0 rounded-full bg-orange-100">
                <div 
                  className="rounded-full bg-orange-600 flex items-center justify-center text-white font-bold"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    background: `conic-gradient(#EA580C ${placementReadiness.interview * 3.6}deg, #e5e7eb 0deg)`
                  }}
                >
                  {placementReadiness.interview}%
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">Interview Skills</h3>
            <p className="text-sm text-orange-600">Needs Improvement</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Job Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Recommended Jobs</h2>
            <p className="text-gray-600">Based on your skills and preferences</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {jobRecommendations.map((job, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600 flex items-center space-x-2">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-green-600">{job.match}% match</span>
                      </div>
                      {job.applied && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Applied</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">Required Skills:</p>
                    <div className="flex space-x-2">
                      {job.requirements.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    {!job.applied ? (
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Apply Now
                      </button>
                    ) : (
                      <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg cursor-not-allowed text-sm">
                        Already Applied
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Placement Drives */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Drives</h2>
            <p className="text-gray-600">Campus recruitment opportunities</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingDrives.map((drive, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{drive.company}</h3>
                      <p className="text-gray-600">{drive.role}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        drive.status === 'registered' ? 'bg-green-100 text-green-800' :
                        drive.status === 'eligible' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {drive.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{drive.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{drive.type}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-3">
                    Registration Deadline: {drive.deadline}
                  </p>
                  
                  {drive.status === 'eligible' && (
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Register Now
                    </button>
                  )}
                  {drive.status === 'registered' && (
                    <button className="w-full bg-green-100 text-green-800 py-2 rounded-lg cursor-default text-sm">
                      ✓ Registered
                    </button>
                  )}
                  {drive.status === 'not_eligible' && (
                    <button className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg cursor-not-allowed text-sm">
                      Not Eligible
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships & Higher Studies */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Scholarship Finder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Scholarship Opportunities</h2>
            <p className="text-gray-600">Financial aid and merit scholarships</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {scholarships.map((scholarship, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{scholarship.name}</h3>
                      <p className="text-gray-600">{scholarship.provider}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{scholarship.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        scholarship.status === 'eligible' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {scholarship.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <p><span className="font-medium">Eligibility:</span> {scholarship.eligibility}</p>
                    <p><span className="font-medium">Deadline:</span> {scholarship.deadline}</p>
                  </div>
                  
                  {scholarship.status === 'eligible' && (
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Apply Now
                    </button>
                  )}
                  {scholarship.status === 'applied' && (
                    <button className="w-full bg-green-100 text-green-800 py-2 rounded-lg cursor-default text-sm">
                      ✓ Application Submitted
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Higher Studies Support */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Higher Studies Support</h2>
            <p className="text-gray-600">Graduate programs and entrance exams</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">GRE Preparation</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Prepare for graduate school admission with comprehensive GRE resources</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Start Preparation
                </button>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">GATE Coaching</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Access to GATE preparation materials and mock tests</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Enroll Now
                </button>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">University Finder</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Find and compare graduate programs worldwide</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Explore Programs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Preparation */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
        <div className="flex flex-col lg:flex-row items-center space-x-4 mb-4">
          <div className="bg-orange-600 p-3 rounded-lg mb-2 lg:mb-0">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Interview Preparation Hub</h3>
            <p className="text-gray-600">Boost your interview performance with AI-powered practice sessions</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Mock Interviews</h4>
              <p className="text-sm text-gray-600">AI-powered interview simulation</p>
            </div>
          </button>
          
          <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Question Bank</h4>
              <p className="text-sm text-gray-600">Company-specific questions</p>
            </div>
          </button>
          
          <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Performance Analytics</h4>
              <p className="text-sm text-gray-600">Track improvement over time</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacementTools;