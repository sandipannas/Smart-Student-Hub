import React, { useState } from "react";
import {
  Calendar,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  X,
  Filter,
  Download,
  BarChart3,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";

const AttendanceTracker: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Generate attendance data for the year (dummy data)
  const generateAttendanceData = () => {
    const data: { [key: string]: "present" | "absent" | "holiday" | null } = {};
    const startDate = new Date(selectedYear, 0, 1);
    const endDate = new Date(selectedYear, 11, 31);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];
      const dayOfWeek = d.getDay();

      // Skip weekends
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        data[dateStr] = "holiday";
      } else {
        // Random attendance with 85% present rate
        const rand = Math.random();
        if (rand < 0.85) {
          data[dateStr] = "present";
        } else if (rand < 0.95) {
          data[dateStr] = "absent";
        } else {
          data[dateStr] = "holiday";
        }
      }
    }
    return data;
  };

  const attendanceData = generateAttendanceData();

  const getAttendanceStats = () => {
    const values = Object.values(attendanceData);
    const present = values.filter((v) => v === "present").length;
    const absent = values.filter((v) => v === "absent").length;
    const holidays = values.filter((v) => v === "holiday").length;
    const total = present + absent;

    return {
      present,
      absent,
      holidays,
      total,
      percentage: total > 0 ? ((present / total) * 100).toFixed(1) : "0",
    };
  };

  const stats = getAttendanceStats();

  const getColorForDate = (date: string) => {
    const status = attendanceData[date];
    switch (status) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "holiday":
        return "bg-gray-300";
      default:
        return "bg-gray-100";
    }
  };

  const getIntensity = (date: string) => {
    const status = attendanceData[date];
    switch (status) {
      case "present":
        return "opacity-100";
      case "absent":
        return "opacity-100";
      case "holiday":
        return "opacity-50";
      default:
        return "opacity-20";
    }
  };

  const generateCalendarGrid = () => {
    const weeks = [];
    const startDate = new Date(selectedYear, 0, 1);
    const endDate = new Date(selectedYear, 11, 31);

    // Get the first Sunday of the year or before
    const firstDay = new Date(startDate);
    firstDay.setDate(firstDay.getDate() - firstDay.getDay());

    let currentDate = new Date(firstDay);

    while (currentDate <= endDate || weeks.length < 53) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dateStr = currentDate.toISOString().split("T")[0];
        week.push({
          date: new Date(currentDate),
          dateStr,
          isCurrentYear: currentDate.getFullYear() === selectedYear,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);

      if (currentDate.getFullYear() > selectedYear) break;
    }

    return weeks;
  };

  const weeks = generateCalendarGrid();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const subjectAttendance = [
    { subject: "Data Structures", present: 42, total: 48, percentage: 87.5 },
    { subject: "Computer Networks", present: 38, total: 45, percentage: 84.4 },
    { subject: "Database Systems", present: 44, total: 47, percentage: 93.6 },
    {
      subject: "Software Engineering",
      present: 40,
      total: 46,
      percentage: 87.0,
    },
    { subject: "Machine Learning", present: 35, total: 42, percentage: 83.3 },
  ];

   const [width, setWidth] = useState<number>(0);
  
    useEffect(() => {
      // set initial width
      setWidth(window.innerWidth);
  
      // optional: update on resize
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-900">
            Attendance Tracker
          </h1>
          <p className="text-gray-600 mt-2">
            Track your attendance with visual insights
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 lg:px-4 lg:py-2 px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-xs lg:text-lg">Filter</span>
          </button>
          <button className="bg-blue-600 text-white lg:px-6lg:py-3 px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span className="text-xs lg:text-lg">Export Report</span>
          </button>
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.percentage}%
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            Overall Attendance
          </h3>
          <p className="text-sm text-green-600">
            {stats.present}/{stats.total} days
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.present}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Present Days</h3>
          <p className="text-sm text-blue-600">This academic year</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.absent}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Absent Days</h3>
          <p className="text-sm text-red-600">Need improvement</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {parseFloat(stats.percentage) >= 85
                ? "Good"
                : parseFloat(stats.percentage) >= 75
                ? "Average"
                : "Poor"}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Status</h3>
          <p
            className={`text-sm ${
              parseFloat(stats.percentage) >= 85
                ? "text-green-600"
                : parseFloat(stats.percentage) >= 75
                ? "text-orange-600"
                : "text-red-600"
            }`}
          >
            {parseFloat(stats.percentage) >= 85
              ? "Meeting requirements"
              : "Below minimum"}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-1 gap-2 mb-8  w-[100%] ">
        {/* Attendance Heatmap */}
        <div className="lg:col-span-2 bg-white  shadow-sm border border-gray-100 h-min overflow-x-auto">
          <div className="p-6 border-b border-gray-100 ">
            <div className="flex justify-start lg:justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 mr-8">
                Attendance Heatmap - {selectedYear}
              </h2>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
              </select>
            </div>
          </div>
          <div className="p-6 overflow-x-auto">
            <div className="mb-4 overflow-x-auto">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2 ">
                <span className="mr-4 hover:scale-110">Jan</span>
                <span className="mr-4 hover:scale-110">Feb</span>
                <span className="mr-4 hover:scale-110">Mar</span>
                <span className="mr-4 hover:scale-110">Apr</span>
                <span className="mr-4 hover:scale-110">May</span>
                <span className="mr-4 hover:scale-110">Jun</span>
                <span className="mr-4 hover:scale-110">Jul</span>
                <span className="mr-4 hover:scale-110">Aug</span>
                <span className="mr-4 hover:scale-110">Sep</span>
                <span className="mr-4 hover:scale-110">Oct</span>
                <span className="mr-4 hover:scale-110">Nov</span>
                <span className="mr-4 hover:scale-110">Dec</span>
              </div>
            </div>
            <div >
              <div className="flex flex-cols gap-5 overflow-x-auto   mb-4 w-[100%]">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-1 gap-1 ">
                    {week.map((day, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-3 h-3 rounded-sm hover:scale-110 ${
                          day.isCurrentYear
                            ? `${getColorForDate(day.dateStr)} ${getIntensity(
                                day.dateStr
                              )}`
                            : "bg-gray-100"
                        }`}
                        title={`${day.date.toDateString()}: ${
                          day.isCurrentYear
                            ? attendanceData[day.dateStr] || "No data"
                            : "Out of range"
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Less</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>

            <div className="mt-4 flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span>Present</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                <span>Absent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                <span>Holiday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">
              Monthly Breakdown
            </h3>
          </div>
          <div className="p-6">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 ">
              {monthNames.map((month, index) => {
                const monthData = Object.entries(attendanceData).filter(
                  ([date]) => {
                    const d = new Date(date);
                    return (
                      d.getMonth() === index && d.getFullYear() === selectedYear
                    );
                  }
                );

                const monthPresent = monthData.filter(
                  ([, status]) => status === "present"
                ).length;
                const monthTotal = monthData.filter(
                  ([, status]) => status === "present" || status === "absent"
                ).length;
                const monthPercentage =
                  monthTotal > 0
                    ? ((monthPresent / monthTotal) * 100).toFixed(0)
                    : "0";

                return (
                  <Button className=" bg-gray-100 flex flex-rows justify-between hover:bg-gray-200 hover:scale-105">
                    <span className="text-sm font-medium text-gray-700 align-self-center">
                      {month}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-28 bg-gray-200 rounded-full h-2 ">
                        <div
                          className={`h-2 rounded-full ${
                            parseInt(monthPercentage) >= 85
                              ? "bg-green-600"
                              : parseInt(monthPercentage) >= 75
                              ? "bg-orange-600"
                              : "bg-red-600"
                          }`}
                          style={{ width: `${monthPercentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-8">
                        {monthPercentage}%
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Subject-wise Attendance
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {subjectAttendance.map((subject, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {subject.subject}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {subject.present}/{subject.total} classes attended
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {width>550 &&(<div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        subject.percentage >= 85
                          ? "bg-green-600"
                          : subject.percentage >= 75
                          ? "bg-orange-600"
                          : "bg-red-600"
                      }`}
                      style={{ width: `${subject.percentage}%` }}
                    />
                  </div>)}
                  <span
                    className={`text-sm font-semibold w-12 ${
                      subject.percentage >= 85
                        ? "text-green-600"
                        : subject.percentage >= 75
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    {subject.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Alert */}
      {parseFloat(stats.percentage) < 75 && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">
                Attendance Alert
              </h3>
              <p className="text-red-700 mb-4">
                Your attendance is below the minimum requirement of 75%. You
                need to attend more classes to meet the academic requirements.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Recommendations:
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Attend all upcoming classes without fail</li>
                  <li>
                    • Speak with your academic advisor about your attendance
                  </li>
                  <li>
                    • Consider medical documentation for any legitimate absences
                  </li>
                  <li>• Set up attendance reminders and alerts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;
