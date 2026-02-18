import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Filter,
  Search,
  Eye,
  Users,
  Award,
  BookOpen,
  Target
} from 'lucide-react';

const AccreditationReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'naac' | 'nirf' | 'nba' | 'aicte'>('naac');

  const reportData = {
    naac: {
      lastGenerated: '2024-01-15',
      nextDue: '2024-06-15',
      status: 'ready',
      completionRate: 98,
      criteriaData: [
        { criteria: 'Curricular Aspects', score: 3.2, maxScore: 3.5, status: 'good' },
        { criteria: 'Teaching & Learning', score: 3.4, maxScore: 3.5, status: 'excellent' },
        { criteria: 'Research & Innovation', score: 2.8, maxScore: 3.5, status: 'average' },
        { criteria: 'Infrastructure', score: 3.1, maxScore: 3.5, status: 'good' },
        { criteria: 'Student Support', score: 3.3, maxScore: 3.5, status: 'excellent' },
        { criteria: 'Governance & Leadership', score: 3.0, maxScore: 3.5, status: 'good' },
        { criteria: 'Institutional Values', score: 3.2, maxScore: 3.5, status: 'good' }
      ]
    },
    nirf: {
      lastGenerated: '2024-01-10',
      nextDue: '2024-03-01',
      status: 'in-progress',
      ranking: 145,
      parameters: [
        { parameter: 'Teaching Learning & Resources', score: 68.5, weight: 30 },
        { parameter: 'Research & Professional Practice', score: 72.3, weight: 30 },
        { parameter: 'Graduation Outcomes', score: 85.2, weight: 20 },
        { parameter: 'Outreach & Inclusivity', score: 76.8, weight: 10 },
        { parameter: 'Perception', score: 62.1, weight: 10 }
      ]
    },
    nba: {
      lastGenerated: '2024-01-05',
      nextDue: '2024-04-01',
      status: 'needs-attention',
      accreditedPrograms: 8,
      totalPrograms: 12,
      studentOutcomes: [
        { outcome: 'Engineering Knowledge', attainment: 3.2 },
        { outcome: 'Problem Analysis', attainment: 3.0 },
        { outcome: 'Design Solutions', attainment: 2.8 },
        { outcome: 'Investigation', attainment: 2.9 },
        { outcome: 'Modern Tool Usage', attainment: 3.1 },
        { outcome: 'Professional Ethics', attainment: 3.3 }
      ]
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'needs-attention':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'needs-attention':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCriteriaStatus = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-600';
      case 'good':
        return 'bg-blue-600';
      case 'average':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className='mb-4 lg:mb-0'>
          <h1 className="text-3xl font-bold text-gray-900">Accreditation Reports</h1>
          <p className="text-gray-600 mt-2">Generate and manage institutional accreditation documentation</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        {(['naac', 'nirf', 'nba', 'aicte'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors uppercase ${
              activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'naac' && (
        <div className="space-y-8">
          {/* NAAC Overview */}
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reportData.naac.status)}`}>
                  Ready
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">NAAC Status</h3>
              <p className="text-sm text-gray-600">Last updated: {reportData.naac.lastGenerated}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{reportData.naac.completionRate}%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Completion Rate</h3>
              <p className="text-sm text-blue-600">Data collection</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-lg font-bold text-gray-900">{reportData.naac.nextDue}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Next Due Date</h3>
              <p className="text-sm text-purple-600">Submission deadline</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">3.1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Overall Score</h3>
              <p className="text-sm text-orange-600">Out of 3.5</p>
            </div>
          </div>

          {/* NAAC Criteria Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">NAAC Criteria Assessment</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {reportData.naac.criteriaData.map((criteria, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{criteria.criteria}</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Score: {criteria.score}/{criteria.maxScore}</span>
                            <span>{((criteria.score / criteria.maxScore) * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getCriteriaStatus(criteria.status)}`}
                              style={{ width: `${(criteria.score / criteria.maxScore) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                          criteria.status === 'excellent' ? 'bg-green-100 text-green-800' :
                          criteria.status === 'good' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {criteria.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'nirf' && (
        <div className="space-y-8">
          {/* NIRF Overview */}
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reportData.nirf.status)}`}>
                  In Progress
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">NIRF Status</h3>
              <p className="text-sm text-gray-600">Last updated: {reportData.nirf.lastGenerated}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">#{reportData.nirf.ranking}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Current Ranking</h3>
              <p className="text-sm text-green-600">National ranking</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-lg font-bold text-gray-900">{reportData.nirf.nextDue}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Submission Due</h3>
              <p className="text-sm text-purple-600">Next deadline</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">72.8</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Overall Score</h3>
              <p className="text-sm text-orange-600">Out of 100</p>
            </div>
          </div>

          {/* NIRF Parameters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">NIRF Parameters</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {reportData.nirf.parameters.map((param, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{param.parameter}</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Score: {param.score}</span>
                            <span>Weight: {param.weight}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${param.score}%` }}
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
        </div>
      )}

      {activeTab === 'nba' && (
        <div className="space-y-8">
          {/* NBA Overview */}
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reportData.nba.status)}`}>
                  Needs Attention
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">NBA Status</h3>
              <p className="text-sm text-gray-600">Last updated: {reportData.nba.lastGenerated}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {reportData.nba.accreditedPrograms}/{reportData.nba.totalPrograms}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Accredited Programs</h3>
              <p className="text-sm text-blue-600">Engineering programs</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-lg font-bold text-gray-900">{reportData.nba.nextDue}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Next Review</h3>
              <p className="text-sm text-purple-600">Due date</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">3.1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Avg Attainment</h3>
              <p className="text-sm text-green-600">Student outcomes</p>
            </div>
          </div>

          {/* Student Outcomes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Student Outcome Attainment</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {reportData.nba.studentOutcomes.map((outcome, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{outcome.outcome}</h4>
                      <span className="font-bold text-gray-900">{outcome.attainment}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          outcome.attainment >= 3.0 ? 'bg-green-600' :
                          outcome.attainment >= 2.5 ? 'bg-orange-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${(outcome.attainment / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <div className="flex flex-col lg:flex-row items-start lg:space-x-4 space-x-0">
          <div className="bg-green-600 p-2 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Report Generation Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
                <Download className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Bulk Export</h4>
                <p className="text-sm text-gray-600">Export all accreditation data</p>
              </button>
              
              <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
                <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Custom Reports</h4>
                <p className="text-sm text-gray-600">Generate specific criteria reports</p>
              </button>
              
              <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
                <Calendar className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Schedule Reports</h4>
                <p className="text-sm text-gray-600">Automated report generation</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccreditationReports;