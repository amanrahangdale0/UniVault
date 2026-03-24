import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Calendar, Shield, MapPin, Phone, Award, FileText, TrendingUp } from 'lucide-react';

export default function UserDetailDrawer({ user, open, onClose }) {
  if (!user) return null;

  const userStats = {
    achievements: 12,
    verified: 8,
    pending: 3,
    rejected: 1,
    score: 85
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-neutral-800 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">User Details</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-900 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      <Shield size={10} />
                      {user.role}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="text-sm">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Join Date</div>
                    <div className="text-sm">{user.joinDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Department</div>
                    <div className="text-sm">{user.department}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="text-sm">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="border-t border-neutral-800 pt-6 mb-6">
                <h4 className="text-sm font-medium mb-4">Achievement Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Award size={14} className="text-primary" />
                      <span className="text-xs text-muted-foreground">Total</span>
                    </div>
                    <div className="text-xl font-bold">{userStats.achievements}</div>
                  </div>
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={14} className="text-green-400" />
                      <span className="text-xs text-muted-foreground">Score</span>
                    </div>
                    <div className="text-xl font-bold text-green-400">{userStats.score}%</div>
                  </div>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="border-t border-neutral-800 pt-6">
                <h4 className="text-sm font-medium mb-4">Status Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-400">Verified</span>
                    <span className="text-sm font-medium">{userStats.verified}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-400">Pending</span>
                    <span className="text-sm font-medium">{userStats.pending}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-400">Rejected</span>
                    <span className="text-sm font-medium">{userStats.rejected}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-neutral-800 pt-6 mt-6">
                <div className="space-y-3">
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Edit User
                  </button>
                  <button className="w-full border border-neutral-800 py-2 rounded-lg hover:bg-neutral-900 transition-colors">
                    View Full Profile
                  </button>
                  <button className="w-full border border-red-500/30 text-red-400 py-2 rounded-lg hover:bg-red-500/10 transition-colors">
                    Deactivate User
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
