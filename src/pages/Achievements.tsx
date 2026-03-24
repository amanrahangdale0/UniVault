import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import AchievementCard from '@/components/AchievementCard';
import AddAchievementModal from '@/components/AddAchievementModal';
import { mockAchievements, type AchievementCategory, type AchievementStatus, type Achievement } from '@/lib/mock-data';
import { Plus, Filter, Trophy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/EmptyState';
import { useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/AuthContext';

export default function Achievements() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const { user } = useAuth();
  const [filterCat, setFilterCat] = useState<AchievementCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<AchievementStatus | 'all'>('all');

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
       docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
       setAchievements(docs);
       setLoading(false);
    }, (error) => {
       console.error(error);
       setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filtered = achievements.filter(a => {
    if (filterCat !== 'all' && a.category !== filterCat) return false;
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    return true;
  });

  const categories: (AchievementCategory | 'all')[] = ['all', 'hackathon', 'internship', 'sports', 'academic', 'volunteer'];
  const statuses: (AchievementStatus | 'all')[] = ['all', 'pending', 'approved', 'rejected'];

  return (
    <DashboardLayout>
      <div className="flex items-end justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground">Achievements</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your accomplishments</p>
        </motion.div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-heading font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
        <Filter size={16} className="text-muted-foreground" />
        <div className="flex gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterCat === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <div className="h-5 w-px bg-border" />
        <div className="flex gap-2">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
           Array(6).fill(0).map((_, i) => (
             <Skeleton key={i} className="h-[140px] w-full rounded-xl" />
           ))
        ) : (
           filtered.map((a, i) => (
             <AchievementCard key={a.id} achievement={a} index={i} />
           ))
        )}
      </div>
      
      {loading && <p className="text-xs text-muted-foreground text-center mt-6">Fetching achievements data...</p>}

      {!loading && filtered.length === 0 && (
         <EmptyState 
           icon={<Trophy size={24} />}
           title="No achievements yet"
           description="You haven't added any achievements that match these filters. Start building your portfolio!"
           action={<button onClick={() => setModalOpen(true)} className="text-primary font-medium hover:underline text-sm">Add your first achievement</button>}
           className="mt-8"
         />
      )}

      <AddAchievementModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </DashboardLayout>
  );
}
