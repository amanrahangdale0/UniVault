import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  Shield,
  Database,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEntries: 0,
    pendingApprovals: 0,
    flaggedEntries: 0,
    systemHealth: 98,
    activeUsers: 0,
    newUsersToday: 0,
    serverLoad: 45
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'user_registered', user: 'John Doe', time: '2 mins ago', status: 'success' },
    { id: 2, type: 'achievement_submitted', user: 'Jane Smith', time: '5 mins ago', status: 'pending' },
    { id: 3, type: 'system_alert', user: 'System', time: '10 mins ago', status: 'warning' },
    { id: 4, type: 'user_login', user: 'Mike Johnson', time: '15 mins ago', status: 'success' },
    { id: 5, type: 'achievement_approved', user: 'Admin', time: '20 mins ago', status: 'success' },
  ]);

  const [systemMetrics, setSystemMetrics] = useState([
    { label: 'CPU Usage', value: 45, max: 100, unit: '%', color: 'bg-green-500' },
    { label: 'Memory', value: 62, max: 100, unit: '%', color: 'bg-yellow-500' },
    { label: 'Storage', value: 38, max: 100, unit: '%', color: 'bg-blue-500' },
    { label: 'Network', value: 25, max: 100, unit: '%', color: 'bg-green-500' },
  ]);

  const statCards = [
    { 
      label: 'Total Users', 
      value: stats.totalUsers, 
      icon: Users, 
      color: 'text-primary',
      change: '+12%',
      changeType: 'positive'
    },
    { 
      label: 'Total Entries', 
      value: stats.totalEntries, 
      icon: FileText, 
      color: 'text-success',
      change: '+8%',
      changeType: 'positive'
    },
    { 
      label: 'Pending Approvals', 
      value: stats.pendingApprovals, 
      icon: Clock, 
      color: 'text-warning',
      change: '-3%',
      changeType: 'negative'
    },
    { 
      label: 'Flagged Entries', 
      value: stats.flaggedEntries, 
      icon: AlertTriangle, 
      color: 'text-destructive',
      change: '0%',
      changeType: 'neutral'
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registered': return Users;
      case 'achievement_submitted': return FileText;
      case 'system_alert': return AlertTriangle;
      case 'user_login': return Shield;
      case 'achievement_approved': return CheckCircle;
      default: return Activity;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'warning': return 'text-orange-400 bg-orange-400/20';
      case 'error': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  useEffect(() => {
    // Simulate real-time stats
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalEntries: prev.totalEntries + Math.floor(Math.random() * 2),
        pendingApprovals: Math.max(0, prev.pendingApprovals + Math.floor(Math.random() * 3) - 1),
        activeUsers: Math.floor(Math.random() * 50) + 20,
        newUsersToday: Math.floor(Math.random() * 10) + 1,
        serverLoad: Math.floor(Math.random() * 30) + 30,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="text-primary" />
              Admin Control Panel
            </h1>
            <p className="text-muted-foreground mt-1">System administration and monitoring</p>
          </motion.div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2">
              <RefreshCw size={16} className="text-muted-foreground" />
              Refresh
            </button>
            <button className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2">
              <Download size={16} className="text-muted-foreground" />
              Export
            </button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.color.replace('text', 'bg').replace('400', '400/20')}`}>
                  <stat.icon size={20} className={stat.color} />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-success' : 
                  stat.changeType === 'negative' ? 'text-destructive' : 
                  'text-muted-foreground'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Health & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Health */}
          <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="text-success" />
                  System Health
                </h2>
                <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs font-medium">
                  {stats.systemHealth}% Healthy
                </span>
              </div>
            
            <div className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="font-medium">{metric.value}{metric.unit}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${metric.color} transition-all duration-500`}
                      style={{ width: `${(metric.value / metric.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="text-primary" />
                  Recent Activity
                </h2>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  View all
                </button>
              </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                      <ActivityIcon size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.type.replace('_', ' ')}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Database className="text-primary" />
              Quick Actions
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-secondary border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <Users size={20} className="text-primary mb-2" />
                <p className="text-sm font-medium">Manage Users</p>
                <p className="text-xs text-muted-foreground">Add, edit, remove users</p>
              </button>
              
              <button className="p-4 bg-secondary border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <FileText size={20} className="text-success mb-2" />
                <p className="text-sm font-medium">Review Entries</p>
                <p className="text-xs text-muted-foreground">Approve achievements</p>
              </button>
              
              <button className="p-4 bg-secondary border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <AlertTriangle size={20} className="text-warning mb-2" />
                <p className="text-sm font-medium">Flagged Content</p>
                <p className="text-xs text-muted-foreground">Review violations</p>
              </button>
              
              <button className="p-4 bg-secondary border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <Eye size={20} className="text-primary mb-2" />
                <p className="text-sm font-medium">View Analytics</p>
                <p className="text-xs text-muted-foreground">System insights</p>
              </button>
            </div>
          </motion.div>
      </div>
    </AdminLayout>
  );
}
