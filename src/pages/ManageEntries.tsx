import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import { mockAchievements, statusColors, categoryIcons, type Achievement } from '@/lib/mock-data';
import { Search, Filter, Check, X, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ManageEntries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'achievements'), (snapshot) => {
       const docs: Achievement[] = [];
       snapshot.forEach(d => docs.push({ id: d.id, ...d.data() } as Achievement));
       docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
       setAchievements(docs);
       setLoading(false);
    }, () => setLoading(false));

    return () => unsubscribe();
  }, []);

  const filteredEntries = achievements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      if (id.length > 10) { // Naive check to see if it's a real Firebase ID vs mock ID
        await updateDoc(doc(db, 'achievements', id), { status: newStatus });
      } else {
        // Fallback for mock data (will reset on reload)
        setAchievements(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      }
      toast.success(`Entry ${newStatus} successfully!`);
    } catch (e: any) {
      toast.error('Failed to update status');
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Manage Entries
          </h1>
          <p className="text-muted-foreground mt-1">Review and approve student achievements</p>
        </motion.div>
      </div>

      <div className="bg-black border border-neutral-800 rounded-lg p-6 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search entries..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <div className="flex gap-2">
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value as any)}
               className="px-4 py-2 bg-background border border-border rounded-lg outline-none cursor-pointer"
             >
               <option value="all">All Statuses</option>
               <option value="pending">Pending</option>
               <option value="approved">Approved</option>
               <option value="rejected">Rejected</option>
             </select>
          </div>
        </div>

        {/* Entries Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-border/50">
                <th className="pb-3 px-4 font-medium text-muted-foreground">Title</th>
                <th className="pb-3 px-4 font-medium text-muted-foreground">Category</th>
                <th className="pb-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="pb-3 px-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((a, i) => (
                <motion.tr 
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">
                     <div className="line-clamp-1">{a.title}</div>
                     <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{a.description}</div>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span className="flex items-center gap-1.5 capitalize">
                      {categoryIcons[a.category]} {a.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${statusColors[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors" title="View details">
                        <Eye size={16} />
                      </button>
                      {a.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(a.id, 'approved')}
                            className="p-1.5 hover:bg-success/20 text-success rounded-md transition-colors" title="Approve">
                            <Check size={16} />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(a.id, 'rejected')}
                            className="p-1.5 hover:bg-destructive/20 text-destructive rounded-md transition-colors" title="Reject">
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
              
              {loading ? (
                <tr>
                   <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                         <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                         Fetching entries...
                      </div>
                   </td>
                </tr>
              ) : filteredEntries.length === 0 ? (
                <tr>
                   <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No entries found.
                   </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
