import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Trophy, Clock, Sparkles, FileText,
  Award, Settings, LogOut, ChevronLeft, ChevronRight, User, BookOpen, Search, MessageSquare
} from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import { mockUser } from '@/lib/mock-data';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect } from 'react';

const studentNavItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
  { path: '/academic-record', label: 'Academic Record', icon: BookOpen },
  { path: '/resume-analyzer', label: 'Resume Analyzer', icon: Search },
  { path: '/timeline', label: 'Timeline', icon: Clock },
  { path: '/badges', label: 'Badges', icon: Award },
  { path: '/portfolio', label: 'Portfolio', icon: FileText },
  { path: '/contact', label: 'Contact', icon: MessageSquare },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const adminNavItems = [
  { path: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
  { path: '/users', label: 'User Management', icon: User },
  { path: '/achievements-manage', label: 'Manage Entries', icon: Trophy },
  { path: '/leaderboard', label: 'Leaderboard', icon: Award },
  { path: '/flags', label: 'Flagged Entries', icon: Sparkles },
  { path: '/admin-feedback', label: 'Feedback & Contact', icon: MessageSquare },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({ total: 0, verified: 0 });
  
  useEffect(() => {
    if (!user || profile?.role === 'admin') return;
    const q = query(collection(db, 'achievements'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let verified = 0;
      snapshot.forEach(doc => { 
        if (doc.data().status === 'approved') verified++; 
      });
      setStats({ total: snapshot.size, verified });
    });
    return () => unsubscribe();
  }, [user, profile]);

  const currentNavItems = profile?.role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-sidebar-border h-20">
        <Link to="/" className="flex items-center justify-center w-full">
          <img 
            src="/univault.png" 
            alt="UniVault Logo" 
            className="h-12 md:h-14 object-contain transition-all duration-300" 
          />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {currentNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full"
                  />
                )}
                <item.icon size={20} className="flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-primary" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-foreground truncate">{profile?.name || user?.email || mockUser.name}</p>
                <div className="flex items-center justify-between mt-0.5">
                   <p className="text-xs text-muted-foreground truncate capitalize">{profile?.role || mockUser.role}</p>
                   {profile?.role !== 'admin' && (
                     <div className="flex items-center gap-2 text-[10px] text-muted-foreground mr-2">
                        <span title="Total achievements">{stats.total} total</span>
                        <span className="text-success" title="Verified achievements">{stats.verified} ✓</span>
                     </div>
                   )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
