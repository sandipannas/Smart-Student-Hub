import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Database,
  Shield,
  Bell,
  Upload,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Wifi,
  Server
} from 'lucide-react';

const SystemManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'system' | 'security' | 'backup'>('users');

  const systemStats = {
    totalUsers: 3156,
    activeUsers: 2847,
    systemUptime: '99.8%',
    storageUsed: 78,
    lastBackup: '2024-01-15 02:00 AM'
  };

  const userStats = {
    students: 2847,
    faculty: 156,
    admins: 12,
    pendingApprovals: 23
  };

  const systemHealth = [
    { component: 'Database', status: 'healthy', uptime: '99.9%', lastCheck: '5 mins ago' },
    { component: 'Web Server', status: 'healthy', uptime: '99.8%', lastCheck: '2 mins ago' },
    { component: 'File Storage', status: 'warning', uptime: '98.5%', lastCheck: '1 min ago' },
    { component: 'Email Service', status: 'healthy', uptime: '99.7%', lastCheck: '3 mins ago' },
    { component: 'Backup System', status: 'healthy', uptime: '100%', lastCheck: '10 mins ago' }
  ];

  const recentActivities = [
    { action: 'Bulk user import completed', user: 'Admin', time: '2 hours ago', status: 'success' },
    { action: 'Database backup initiated', user: 'System', time: '4 hours ago', status: 'success' },
    { action: 'Security scan completed', user: 'System', time: '6 hours ago', status: 'warning' },
    { action: 'User permissions updated', user: 'Admin', time: '8 hours ago', status: 'success' },
    { action: 'System maintenance completed', user: 'System', time: '12 hours ago', status: 'success' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className='mb-4 lg:mb-0'>
          <h1 className="text-3xl font-bold text-gray-900">System Management</h1>
          <p className="text-gray-600 mt-2">Manage users, system health, security, and backups</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600  text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh Status</span>
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{systemStats.totalUsers.toLocaleString()}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Total Users</h3>
          <p className="text-sm text-blue-600">{systemStats.activeUsers.toLocaleString()} active</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Server className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{systemStats.systemUptime}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">System Uptime</h3>
          <p className="text-sm text-green-600">Last 30 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <HardDrive className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{systemStats.storageUsed}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Storage Used</h3>
          <p className="text-sm text-purple-600">2.3TB / 3TB</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-lg font-bold text-gray-900">Daily</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Backup Status</h3>
          <p className="text-sm text-orange-600">{systemStats.lastBackup}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
            <div className="bg-teal-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Secure</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Security Status</h3>
          <p className="text-sm text-teal-600">All systems protected</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        {(['users', 'system', 'security', 'backup'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors capitalize ${
              activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab} Management
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <div className="space-y-8">
          {/* User Statistics */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{userStats.students.toLocaleString()}</span>
              </div>
              <h3 className="font-semibold text-gray-900">Students</h3>
              <p className="text-sm text-blue-600">Active accounts</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{userStats.faculty}</span>
              </div>
              <h3 className="font-semibold text-gray-900">Faculty</h3>
              <p className="text-sm text-green-600">Teaching staff</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{userStats.admins}</span>
              </div>
              <h3 className="font-semibold text-gray-900">Administrators</h3>
              <p className="text-sm text-purple-600">System admins</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{userStats.pendingApprovals}</span>
              </div>
              <h3 className="font-semibold text-gray-900">Pending</h3>
              <p className="text-sm text-orange-600">Account approvals</p>
            </div>
          </div>

          {/* User Management Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">User Management Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <button className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Bulk Import Users</h3>
                  <p className="text-sm text-gray-600">Upload CSV file to add multiple users</p>
                </button>

                <button className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center">
                  <Download className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Export User Data</h3>
                  <p className="text-sm text-gray-600">Download user information as CSV</p>
                </button>

                <button className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-center">
                  <Settings className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Manage Permissions</h3>
                  <p className="text-sm text-gray-600">Configure user roles and access</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-8">
          {/* System Health */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">System Health Monitor</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {systemHealth.map((component, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(component.status)}
                      <div>
                        <h4 className="font-semibold text-gray-900">{component.component}</h4>
                        <p className="text-sm text-gray-600">Uptime: {component.uptime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(component.status)}`}>
                        {component.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{component.lastCheck}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">System Maintenance</h3>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <RefreshCw className="w-5 h-5" />
                  <span>Restart Services</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  <Database className="w-5 h-5" />
                  <span>Optimize Database</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <HardDrive className="w-5 h-5" />
                  <span>Clear Cache</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {recentActivities.slice(0, 4).map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'success' ? 'bg-green-600' :
                        activity.status === 'warning' ? 'bg-orange-600' : 'bg-red-600'
                      }`} />
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.action}</p>
                        <p className="text-gray-500">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-8">
          {/* Security Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-lg font-bold text-green-600">Secure</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Security Status</h3>
              <p className="text-sm text-gray-600">All systems protected</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Wifi className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-lg font-bold text-gray-900">SSL</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Encryption</h3>
              <p className="text-sm text-blue-600">Certificate valid</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-lg font-bold text-gray-900">24h</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Last Scan</h3>
              <p className="text-sm text-purple-600">No threats found</p>
            </div>
          </div>

          {/* Security Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Security Management</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <button className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Shield className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Run Security Scan</h3>
                  <p className="text-sm text-gray-600">Comprehensive system security check</p>
                </button>

                <button className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Settings className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Update Security Policies</h3>
                  <p className="text-sm text-gray-600">Configure access controls and permissions</p>
                </button>

                <button className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Bell className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Security Alerts</h3>
                  <p className="text-sm text-gray-600">Configure threat detection notifications</p>
                </button>

                <button className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Download className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Security Reports</h3>
                  <p className="text-sm text-gray-600">Download security audit logs</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'backup' && (
        <div className="space-y-8">
          {/* Backup Status */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-lg font-bold text-green-600">Success</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Last Backup</h3>
              <p className="text-sm text-gray-600">{systemStats.lastBackup}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-lg font-bold text-gray-900">2.3TB</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Backup Size</h3>
              <p className="text-sm text-blue-600">Total data backed up</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-lg font-bold text-gray-900">Daily</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Schedule</h3>
              <p className="text-sm text-purple-600">Automated backups</p>
            </div>
          </div>

          {/* Backup Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Backup Management</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <button className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Database className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Create Backup Now</h3>
                  <p className="text-sm text-gray-600">Immediate full system backup</p>
                </button>

                <button className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <RefreshCw className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Restore from Backup</h3>
                  <p className="text-sm text-gray-600">Restore system from previous backup</p>
                </button>

                <button className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Settings className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Backup Settings</h3>
                  <p className="text-sm text-gray-600">Configure backup schedule and retention</p>
                </button>

                <button className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Download className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Download Backup</h3>
                  <p className="text-sm text-gray-600">Export backup files for external storage</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemManagement;