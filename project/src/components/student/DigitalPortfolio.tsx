import React from 'react';
import { 
  Download, 
  Share, 
  Eye,
  Edit,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Users,
  Calendar,
  MapPin,
  Star,
  Trophy,
  CheckCircle
} from 'lucide-react';

const DigitalPortfolio: React.FC = () => {
  const portfolioStats = {
    totalActivities: 24,
    certifications: 8,
    competitions: 5,
    internships: 2,
    leadership: 3,
    communityService: 6
  };

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className='mb-4 lg:mb-0'>
          <h1 className="text-3xl font-bold text-gray-900">Digital Portfolio</h1>
          <p className="text-gray-600 mt-2">Your verified academic and professional achievements</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white lg:px-6 lg:py-3 lg:text-lg px-2 py-1 text-sm  rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Preview</span>
          </button>
          <button className="bg-blue-600 text-white lg:px-6 lg:py-3 lg:text-lg px-2 py-1 text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export PDF</span>
          </button>
          <button className="bg-purple-600 text-white lg:px-6 lg:py-3 lg:text-lg px-2 py-1 text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
            <Share className="w-5 h-5" />
            <span>Share Link</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        {/* Portfolio Overview Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{portfolioStats.totalActivities}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Total Activities</h3>
          <p className="text-sm text-green-600">All verified</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{portfolioStats.certifications}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Certifications</h3>
          <p className="text-sm text-blue-600">Professional & Academic</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{portfolioStats.competitions}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Competitions</h3>
          <p className="text-sm text-purple-600">Awards & Participations</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Briefcase className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{portfolioStats.internships}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Internships</h3>
          <p className="text-sm text-orange-600">Professional Experience</p>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-fit lg:w-[100%]">
        <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">JS</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold">John Smith</h2>
                <p className="text-xl opacity-90">Computer Science Engineering</p>
                <p className="opacity-75">Class of 2024 • CGPA: 8.7/10</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-5 h-5" />
                    <span>Verified Profile</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5" />
                    <span>CV Score: 8.7/10</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-75">Generated on</p>
              <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              <button className="mt-3 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Customize</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Professional Summary */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h3>
            <p className="text-gray-700 leading-relaxed">
              Passionate Computer Science student with strong foundation in software development, machine learning, 
              and web technologies. Demonstrated leadership through organizing technical events and active participation 
              in competitive programming. Seeking opportunities to contribute to innovative software solutions and 
              continue professional growth in technology industry.
            </p>
          </div>

          {/* Key Achievements */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Achievements</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">TechFest 2024 Winner</h4>
                </div>
                <p className="text-gray-600 text-sm">First place in 24-hour hackathon with AI-based solution</p>
                <div className="flex items-center space-x-2 mt-3 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>January 2024</span>
                  <MapPin className="w-4 h-4 ml-2" />
                  <span>Innovation Center</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Google Cloud Certified</h4>
                </div>
                <p className="text-gray-600 text-sm">Professional Cloud Developer certification</p>
                <div className="flex items-center space-x-2 mt-3 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>December 2023</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                  <span>Credential ID: GCP-2023-1234</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Tech Club President</h4>
                </div>
                <p className="text-gray-600 text-sm">Led 200+ member technical society, organized 15+ events</p>
                <div className="flex items-center space-x-2 mt-3 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>2023-2024 Academic Year</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Software Developer Intern</h4>
                </div>
                <p className="text-gray-600 text-sm">Full-stack development at TechCorp Solutions</p>
                <div className="flex items-center space-x-2 mt-3 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Summer 2023</span>
                  <MapPin className="w-4 h-4 ml-2" />
                  <span>Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Competencies */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills & Competencies</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Technical Skills</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Java/Spring Boot</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">React/JavaScript</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Python/ML</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Leadership</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Team Management</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Event Organization</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Public Speaking</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Soft Skills</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Communication</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Problem Solving</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Adaptability</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-4">Share Your Portfolio</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center space-x-2 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5 text-blue-600" />
                <span>Download PDF</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ExternalLink className="w-5 h-5 text-green-600" />
                <span>Get Share Link</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Share className="w-5 h-5 text-purple-600" />
                <span>LinkedIn Export</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3 text-center">
              Your portfolio URL: <span className="font-mono bg-white px-2 py-1 rounded">achievo.edu/portfolio/john-smith-2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalPortfolio;