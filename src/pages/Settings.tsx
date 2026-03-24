import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import LinkedInSync from '@/components/LinkedInSync';
import { Settings as SettingsIcon, Bell, Shield, Moon, Sun, Monitor, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showGPA, setShowGPA] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('univault-theme', theme);
  }, [theme]);

  // Initial load
  useEffect(() => {
    const storedTheme = localStorage.getItem('univault-theme') as any;
    if (storedTheme) setTheme(storedTheme);
  }, []);

  const handleSave = () => {
     toast.success('Settings saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
             <SettingsIcon className="text-primary" /> Settings
          </h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and integrations.</p>
        </motion.div>
        
        <button 
           onClick={handleSave}
           className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
           Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6"
            >
               <h2 className="font-heading font-semibold text-lg flex items-center gap-2 mb-6">
                 <Moon size={18} className="text-primary" /> Appearance
               </h2>
               
               <div className="grid grid-cols-3 gap-4">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'}`}
                  >
                     <Sun size={24} />
                     <span className="font-medium text-sm">Light</span>
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'}`}
                  >
                     <Moon size={24} />
                     <span className="font-medium text-sm">Dark</span>
                  </button>
                  <button 
                    onClick={() => setTheme('system')}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'}`}
                  >
                     <Monitor size={24} />
                     <span className="font-medium text-sm">System</span>
                  </button>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl p-6"
            >
               <h2 className="font-heading font-semibold text-lg flex items-center gap-2 mb-6">
                 <Bell size={18} className="text-primary" /> Notifications
               </h2>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                     <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates on entry approvals and AI suggestions.</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" className="sr-only peer" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} />
                       <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                     </label>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                     <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Get instant alerts in your browser when a badge is earned.</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" className="sr-only peer" checked={pushNotifs} onChange={(e) => setPushNotifs(e.target.checked)} />
                       <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                     </label>
                  </div>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
               <h2 className="font-heading font-semibold text-lg flex items-center gap-2 mb-6">
                 <Shield size={18} className="text-primary" /> Privacy
               </h2>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                     <div>
                        <p className="font-medium flex items-center gap-2">Public Portfolio <Lock size={14} className="text-muted-foreground" /></p>
                        <p className="text-sm text-muted-foreground">Allow recruiters or anyone with the link to view your portfolio.</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" className="sr-only peer" checked={publicProfile} onChange={(e) => setPublicProfile(e.target.checked)} />
                       <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                     </label>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                     <div>
                        <p className="font-medium">Show GPA on Portfolio</p>
                        <p className="text-sm text-muted-foreground">Display your verified academic record on your public profile.</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" className="sr-only peer" checked={showGPA} onChange={(e) => setShowGPA(e.target.checked)} />
                       <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                     </label>
                  </div>
               </div>
            </motion.div>
         </div>

         <div className="space-y-6">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="glass rounded-xl p-6"
            >
               <LinkedInSync />
            </motion.div>
         </div>
      </div>
    </DashboardLayout>
  );
}
