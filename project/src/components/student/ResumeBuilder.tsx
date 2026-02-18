import React, { ReactEventHandler, useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Edit,
  Star,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  Upload,
  Lightbulb,
  Plus,
  Save,
} from "lucide-react";

interface ProjectData {
  title: string;
  description: string;
  link: string;
  file: File | null;
}
interface SkillData{
  title:String
  description:String
  category:String
  level:String
  file: File|null
}

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "builder" | "scorer" | "templates"
  >("builder");
  const [cvScore, setCvScore] = useState(8.7);
  const [project, setProject] = React.useState(false);
  const [projectdata, setProjectdata] = React.useState<ProjectData>({
    title: "",
    description: "",
    link: "",
    file: null,
  });
  const [skilldata,setSkilldata]=React.useState<SkillData>({
    title:'',
    description:'',
    category:'',
    level:'',
    file: null
  })

  const scoringCriteria = [
    { category: "Contact Information", score: 10, max: 10, status: "complete" },
    { category: "Professional Summary", score: 8, max: 10, status: "good" },
    { category: "Work Experience", score: 9, max: 10, status: "complete" },
    { category: "Education", score: 10, max: 10, status: "complete" },
    { category: "Skills", score: 8, max: 10, status: "good" },
    { category: "Projects", score: 7, max: 10, status: "needs_improvement" },
    { category: "Certifications", score: 9, max: 10, status: "complete" },
    {
      category: "Keywords Optimization",
      score: 6,
      max: 10,
      status: "needs_improvement",
    },
  ];

  const handleProject = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Project Submitted successfully");
    console.log(projectdata);
    setProject(false)
    setProjectdata({
      ...projectdata,
      title: "",
      description: "",
      file: null,
      link: "",
    });
    
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "good":
        return <Star className="w-5 h-5 text-yellow-600" />;
      case "needs_improvement":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-green-600";
      case "good":
        return "text-yellow-600";
      case "needs_improvement":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Smart Resume Builder
          </h1>
          <p className="text-gray-600 mt-2">
            Create ATS-optimized resumes with AI-powered scoring
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white lg:px-6 lg:py-3 px-2 py-2 text-xs lg:text-lg rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Preview</span>
          </button>
          <button className="bg-blue-600 text-white lg:px-6 lg:py-3 px-2 py-2 text-xs lg:text-lg rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        <button
          onClick={() => setActiveTab("builder")}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === "builder"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Resume Builder
        </button>
        <button
          onClick={() => setActiveTab("scorer")}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === "scorer"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          CV Scorer
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === "templates"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Templates
        </button>
      </div>

      {activeTab === "builder" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  Resume Sections
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Personal Info</span>
                  </div>
                  <button className="text-green-600 hover:text-green-700">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium">Summary</span>
                  </div>
                  <button className="text-yellow-600 hover:text-yellow-700">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <button className="text-green-600 hover:text-green-700">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  onClick={() => {
                    setProject(true);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Plus className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-600">
                      Add Projects
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Education</span>
                  </div>
                  <button className="text-green-600 hover:text-green-700">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Skills</span>
                  </div>
                  <button className="text-green-600 hover:text-green-700">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  Quick Actions
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Lightbulb className="w-5 h-5" />
                  <span>AI Suggestions</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Target className="w-5 h-5" />
                  <span>Job Match Analysis</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Save className="w-5 h-5" />
                  <span>Save Progress</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[800px]">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    Resume Preview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">CV Score:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-yellow-600">
                        {cvScore}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Content */}
              <div className="p-8 bg-gray-50 min-h-[700px]">
                <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
                  {/* Header */}
                  <div className="text-center mb-8 pb-6 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900">
                      John Smith
                    </h1>
                    <p className="text-xl text-gray-600 mt-2">
                      Software Developer
                    </p>
                    <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-600">
                      <span>john.smith@email.com</span>
                      <span>+91 98765 43210</span>
                      <span>LinkedIn: /in/johnsmith</span>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Results-driven Computer Science graduate with 2+ years of
                      experience in full-stack development and machine learning.
                      Proven track record of leading technical projects and
                      delivering scalable solutions. Strong problem-solving
                      skills with expertise in Java, React, and cloud
                      technologies.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Professional Experience
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Software Developer Intern
                            </h3>
                            <p className="text-gray-600">TechCorp Solutions</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            Jun 2023 - Aug 2023
                          </span>
                        </div>
                        <ul className="text-gray-700 space-y-1 ml-4">
                          <li>
                            • Developed responsive web applications using React
                            and Node.js
                          </li>
                          <li>
                            • Collaborated with cross-functional teams to
                            deliver features on time
                          </li>
                          <li>
                            • Improved application performance by 25% through
                            code optimization
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                   <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Projects
                    </h2>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Project tittle
                          </h3>
                          <p className="text-gray-600">project description</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          
                        </span>
                      </div>
                      <p className="text-gray-700 ml-4">link</p>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Education
                    </h2>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            B.Tech Computer Science
                          </h3>
                          <p className="text-gray-600">ABC University</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          2020 - 2024
                        </span>
                      </div>
                      <p className="text-gray-700 ml-4">CGPA: 8.7/10</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Technical Skills
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Programming
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Java, JavaScript, Python, C++
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Frameworks
                        </h4>
                        <p className="text-gray-700 text-sm">
                          React, Spring Boot, Node.js, Express
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Databases
                        </h4>
                        <p className="text-gray-700 text-sm">
                          MySQL, MongoDB, PostgreSQL
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Tools
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Git, Docker, AWS, Jenkins
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {project && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Project
              </h2>
              <button
                onClick={() => {
                    setProject(false);
                    setProjectdata({
                      ...projectdata,
                      title: "",
                      description: "",
                      file: null,
                      link: "",
                    });
                  }}
                
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleProject}>
              <div className="flex">
                <div className="w-[100%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={projectdata.title}
                    onChange={(e) => {
                      setProjectdata({ ...projectdata, title: e.target.value });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter project title"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={projectdata.description}
                  onChange={(e) => {
                    setProjectdata({
                      ...projectdata,
                      description: e.target.value,
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the project and your role"
                  required
                />
              </div>

              <div className="flex">
                <div className="w-[100%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link
                  </label>
                  <input
                    type="text"
                    value={projectdata.link}
                    onChange={(e) => {
                      setProjectdata({ ...projectdata, link: e.target.value });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter link"
                    required
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg cursor-pointer p-6">
                {/* Label above */}
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload related files if necessary
                </label>

                {/* Upload box */}
                <label className=" p-6 text-center ">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>

                  {/* Hidden input */}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProjectdata({
                          ...projectdata,
                          file: e.target.files[0],
                        });
                      }
                    }}
                  />
                </label>

                {/* Show selected file name */}
                {projectdata.file && (
                  <p className="mt-2 text-sm text-gray-700">
                    Selected: <strong>{projectdata.file.name}</strong>
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setProject(false);
                    setProjectdata({
                      ...projectdata,
                      title: "",
                      description: "",
                      file: null,
                      link: "",
                    });
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === "scorer" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CV Score Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1">
                  <div className="bg-white rounded-full h-full w-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {cvScore}
                      </div>
                      <div className="text-sm text-gray-600">out of 10</div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Your CV Score
              </h3>
              <p className="text-green-600 font-semibold">Excellent</p>
              <p className="text-sm text-gray-600 mt-2">
                Your resume is well-optimized for ATS systems
              </p>
            </div>
          </div>

          {/* Detailed Scoring */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                Detailed Analysis
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {scoringCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(criteria.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {criteria.category}
                        </h4>
                        <span
                          className={`text-sm font-medium ${getStatusColor(
                            criteria.status
                          )}`}
                        >
                          {criteria.score}/{criteria.max}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            criteria.status === "complete"
                              ? "bg-green-600"
                              : criteria.status === "good"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                          }`}
                          style={{
                            width: `${(criteria.score / criteria.max) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Template Cards */}
          {[
            {
              name: "Professional",
              type: "ATS-Friendly",
              preview: "template1.jpg",
              popular: true,
            },
            {
              name: "Modern",
              type: "Creative",
              preview: "template2.jpg",
              popular: false,
            },
            {
              name: "Executive",
              type: "Leadership",
              preview: "template3.jpg",
              popular: true,
            },
            {
              name: "Technical",
              type: "Engineering",
              preview: "template4.jpg",
              popular: false,
            },
            {
              name: "Minimalist",
              type: "Clean",
              preview: "template5.jpg",
              popular: true,
            },
            {
              name: "Academic",
              type: "Research",
              preview: "template6.jpg",
              popular: false,
            },
          ].map((template, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[3/4] bg-gray-100 relative">
                <div className="absolute inset-4 bg-white rounded shadow-sm p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                {template.popular && (
                  <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{template.type}</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Use Template
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Recommendations */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <div className="flex flex-col lg:flex-row items-start lg:space-x-4 space-x-0">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              AI Recommendations
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Keyword Optimization
                </h4>
                <p className="text-sm text-gray-600">
                  Add more industry-specific keywords like "microservices",
                  "DevOps", and "agile methodology"
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Project Section
                </h4>
                <p className="text-sm text-gray-600">
                  Include 2-3 technical projects with quantifiable results and
                  technologies used
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
