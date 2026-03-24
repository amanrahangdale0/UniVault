import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import AchievementCard from '@/components/AchievementCard';
import SmartScore from '@/components/SmartScore';
import StatsCharts from '@/components/StatsCharts';
import BadgeGrid from '@/components/BadgeGrid';
import AddAchievementModal from '@/components/AddAchievementModal';
import { mockAchievements, mockUser } from '@/lib/mock-data';
import { Plus, Trophy, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useMemo } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/AuthContext';
import type { Achievement } from '@/lib/mock-data';

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const { user, profile } = useAuth();

  useEffect(() => {
    if (!user) {
      setAchievements(mockAchievements);
      setLoading(false);
      return;
    }

    const q = query(
       collection(db, 'achievements'), 
       where('userId', '==', user.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
       const docs: Achievement[] = [];
       snapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() } as Achievement);
       });
       // Sort by date descending natively locally for now if not indexed
       docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
       setAchievements(docs);
       setLoading(false);
    }, (error) => {
       console.error("Error fetching achievements", error);
       setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const approved = achievements.filter(a => a.status === 'approved').length;
  const pending = achievements.filter(a => a.status === 'pending').length;
  const rejected = achievements.filter(a => a.status === 'rejected').length;

  const statCards = useMemo(() => [
    { label: 'Total', value: achievements.length, icon: Trophy, color: 'text-primary' },
    { label: 'Approved', value: approved, icon: CheckCircle, color: 'text-success' },
    { label: 'Pending', value: pending, icon: Clock, color: 'text-warning' },
    { label: 'Rejected', value: rejected, icon: XCircle, color: 'text-destructive' },
  ], [achievements.length, approved, pending, rejected]);

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Welcome back, {profile?.name ? profile.name.split(' ')[0] : 'Student'}
          </h1>
          <p className="text-muted-foreground mt-1">{profile?.department || 'Student'} · {profile?.role}</p>
        </motion.div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary text-primary-foreground px-4 sm:px-5 py-2.5 rounded-lg font-heading font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
           Array(4).fill(0).map((_, i) => (
             <Skeleton key={i} className="h-[104px] w-full rounded-xl" />
           ))
        ) : (
           statCards.map((s, i) => (
             <motion.div
               key={s.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.08 }}
               className="bg-black border border-neutral-800 rounded-xl p-5"
             >
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm text-muted-foreground">{s.label}</span>
                 <s.icon size={18} className={s.color} />
               </div>
               <span className="text-2xl font-heading font-bold text-foreground">{s.value}</span>
             </motion.div>
           ))
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        {/* Main content */}
        <div className="xl:col-span-2 space-y-8">
          <StatsCharts />

          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Recent Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[140px] w-full rounded-xl" />
                ))
              ) : achievements.length > 0 ? (
                achievements.slice(0, 4).map((a, i) => (
                  <AchievementCard key={a.id} achievement={a} index={i} />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 text-center py-8 border border-dashed border-neutral-800 rounded-xl">
                  <p className="text-muted-foreground text-sm">No achievements yet. Start adding your progress!</p>
                </div>
              )}
            </div>
            {loading && <p className="text-xs text-muted-foreground text-center mt-4">Fetching data...</p>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <SmartScore />
        </div>
      </div>

      <div>
        <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Your Badges</h2>
        <BadgeGrid />
      </div>

      <AddAchievementModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </DashboardLayout>
  );
}
