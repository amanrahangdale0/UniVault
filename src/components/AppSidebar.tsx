import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Trophy, Clock, Sparkles, FileText,
  Award, Settings, LogOut, ChevronLeft, ChevronRight, User, BookOpen, Search, MessageSquare,
  Menu, X
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
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <img src="/univault.png" alt="UniVault Logo" className="h-8 object-contain" />
        </Link>
        <button 
          onClick={() => setMobileOpen(true)} 
          className="p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setMobileOpen(false)}
             className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
           />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border z-50 flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <button 
          onClick={() => setMobileOpen(false)} 
          className="md:hidden absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground z-50"
        >
           <X size={20} />
        </button>
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-border h-20">
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
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
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
      <div className="p-3 border-t border-border">
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
                     <div className="flex items-center gap-2 text-xs text-muted-foreground mr-2">
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

      {/* Collapse toggle (Desktop only) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-secondary border border-border items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
    </>
  );
}
