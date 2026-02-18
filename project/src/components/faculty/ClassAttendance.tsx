import React, { useState } from "react";
import {
  Camera,
  Upload,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  X,
  Plus,
  Eye,
  Download,
  Filter,
  Search,
  AlertCircle,
  FileImage,
  Trash2,
} from "lucide-react";

const ClassAttendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    classroom: "",
    faculty: "",
  });

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English",
    "History",
    "Geography",
    "Economics",
    "Psychology",
  ];

  const classroomOptions = [
    "Room 101",
    "Room 102",
    "Room 103",
    "Room 201",
    "Room 202",
    "Room 203",
    "Lab A",
    "Lab B",
    "Lab C",
    "Auditorium",
    "Conference Room",
    "Library Hall",
  ];

  const faculties = [
    "Dr. Smith",
    "Prof. Johnson",
    "Dr. Williams",
    "Prof. Brown",
    "Dr. Davis",
    "Prof. Miller",
    "Dr. Wilson",
    "Prof. Moore",
    "Dr. Taylor",
    "Prof. Anderson",
  ];

  const classes = [
    {
      id: "CS301",
      name: "Data Structures - CS301",
      students: 45,
      time: "9:00 AM - 10:00 AM",
    },
    {
      id: "CS302",
      name: "Computer Networks - CS302",
      students: 42,
      time: "10:00 AM - 11:00 AM",
    },
    {
      id: "CS303",
      name: "Database Systems - CS303",
      students: 48,
      time: "11:00 AM - 12:00 PM",
    },
    {
      id: "CS304",
      name: "Software Engineering - CS304",
      students: 40,
      time: "2:00 PM - 3:00 PM",
    },
  ];

  const recentAttendance = [
    {
      id: 1,
      class: "Data Structures - CS301",
      date: "2024-01-20",
      time: "9:00 AM",
      totalStudents: 45,
      presentStudents: 42,
      absentStudents: 3,
      percentage: 93.3,
      status: "completed",
      imageUrl: "class_photo_1.jpg",
    },
    {
      id: 2,
      class: "Computer Networks - CS302",
      date: "2024-01-19",
      time: "10:00 AM",
      totalStudents: 42,
      presentStudents: 38,
      absentStudents: 4,
      percentage: 90.5,
      status: "completed",
      imageUrl: "class_photo_2.jpg",
    },
    {
      id: 3,
      class: "Database Systems - CS303",
      date: "2024-01-18",
      time: "11:00 AM",
      totalStudents: 48,
      presentStudents: 45,
      absentStudents: 3,
      percentage: 93.8,
      status: "completed",
      imageUrl: "class_photo_3.jpg",
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessAttendance = async () => {
    if (!selectedClass || !uploadedImage) {
      alert("Please select a class and upload an image");
      return;
    }

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const mockAttendanceData = [
        {
          rollNo: "CS2021001",
          name: "John Smith",
          status: "present",
          confidence: 95,
        },
        {
          rollNo: "CS2021002",
          name: "Emily Johnson",
          status: "present",
          confidence: 92,
        },
        {
          rollNo: "CS2021003",
          name: "Michael Chen",
          status: "absent",
          confidence: 0,
        },
        {
          rollNo: "CS2021004",
          name: "Sarah Davis",
          status: "present",
          confidence: 88,
        },
        {
          rollNo: "CS2021005",
          name: "David Wilson",
          status: "present",
          confidence: 94,
        },
      ];

      setAttendanceData(mockAttendanceData);
      setIsProcessing(false);
      alert("Attendance processed successfully!");
    }, 3000);
  };

  const handleSaveAttendance = () => {
    // In real app, this would save to database
    alert("Attendance saved successfully!");
    setAttendanceData([]);
    setUploadedImage(null);
    setImagePreview(null);
    setSelectedClass("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Class Attendance
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Take attendance using AI-powered photo recognition
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Attendance Taking Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
              Take Attendance
            </h2>

            <div className="space-y-6">
              {/* Class Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Class
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Choose a class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} ({cls.students} students)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Class Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
                  {!imagePreview ? (
                    <>
                      <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        Upload Class Photo
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Take a photo of your class or upload an existing image
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer inline-flex items-center space-x-2 text-sm sm:text-base"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Choose Image</span>
                      </label>
                    </>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Class photo"
                        className="max-w-full max-h-48 sm:max-h-64 mx-auto rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setImagePreview(null);
                          setUploadedImage(null);
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Process Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleProcessAttendance}
                  disabled={!selectedClass || !uploadedImage || isProcessing}
                  className="bg-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 text-sm sm:text-base"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      <span>Process Attendance</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Results */}
          {attendanceData.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Attendance Results
                </h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => setAttendanceData([])}
                    className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSaveAttendance}
                    className="bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Save Attendance</span>
                  </button>
                </div>
              </div>

              <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-blue-900">
                      {
                        attendanceData.filter((s) => s.status === "present")
                          .length
                      }
                    </p>
                    <p className="text-sm text-blue-700">Present</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-red-900">
                      {
                        attendanceData.filter((s) => s.status === "absent")
                          .length
                      }
                    </p>
                    <p className="text-sm text-red-700">Absent</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-green-900">
                      {(
                        (attendanceData.filter((s) => s.status === "present")
                          .length /
                          attendanceData.length) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                    <p className="text-sm text-green-700">Attendance</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Roll No
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Student Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Confidence
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((student, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {student.rollNo}
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {student.name}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              student.status
                            )}`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {student.status === "present"
                            ? `${student.confidence}%`
                            : "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => {
                              const newData = [...attendanceData];
                              newData[index].status =
                                newData[index].status === "present"
                                  ? "absent"
                                  : "present";
                              setAttendanceData(newData);
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Toggle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Recent Attendance & Class Info */}
        <div className="space-y-6">
          {/* Selected Class Info */}
          {selectedClass && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Class Information
              </h3>
              {(() => {
                const classInfo = classes.find((c) => c.id === selectedClass);
                return classInfo ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Class Name</p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {classInfo.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="font-semibold text-gray-900">
                        {classInfo.students}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time Slot</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {classInfo.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* Recent Attendance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
              Recent Attendance
            </h3>
            <div className="space-y-4">
              {recentAttendance.map((record) => (
                <div key={record.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {record.class}
                    </h4>
                    <span className="text-sm text-gray-500">{record.date}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-600">Present: </span>
                      <span className="font-semibold text-green-600">
                        {record.presentStudents}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Absent: </span>
                      <span className="font-semibold text-red-600">
                        {record.absentStudents}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Attendance Rate</span>
                      <span>{record.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${record.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </button>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Export</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-4">
              How to Use
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <span className="font-semibold">1.</span>
                <span>Select your class from the dropdown</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold">2.</span>
                <span>Take a clear photo of the entire class</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold">3.</span>
                <span>Upload the image and click "Process Attendance"</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold">4.</span>
                <span>Review the results and make corrections if needed</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold">5.</span>
                <span>Save the attendance record</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAttendance;
