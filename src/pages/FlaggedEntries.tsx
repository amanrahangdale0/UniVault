import { motion } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import { Flag, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function FlaggedEntries() {
  const flags = [
     // Mock data for flags
     { id: '1', entryTitle: 'Google SWE Intern', studentName: 'James Wilson', reason: 'Possible forged certificate', date: '2025-10-12', status: 'investigating' },
     { id: '2', entryTitle: 'HackMIT Winner', studentName: 'Maria Garcia', reason: 'Duplicate entry detected', date: '2025-08-22', status: 'open' },
  ];

  const handleAction = (id: string, action: string) => {
    toast.success(`Flag ${action} successfully!`);
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
            <Flag className="text-destructive" /> Flagged Entries
          </h1>
          <p className="text-muted-foreground mt-1">Review suspicious or reported student entries</p>
        </motion.div>
      </div>

      <div className="space-y-4">
        {flags.length === 0 ? (
          <div className="bg-black border border-neutral-800 rounded-lg p-12 text-center text-muted-foreground">
             <CheckCircle size={48} className="mx-auto text-success mb-4 opacity-50" />
             <p>No flagged entries currently require review.</p>
          </div>
        ) : (
          flags.map((flag, i) => (
             <motion.div
               key={flag.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-black border border-neutral-800 rounded-lg p-5 border border-destructive/20"
             >
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle size={16} className="text-warning" />
                      <span className="font-semibold">{flag.entryTitle}</span>
                      <span className="text-xs text-muted-foreground ml-2">by {flag.studentName}</span>
                    </div>
                    <p className="text-sm text-destructive bg-destructive/10 px-3 py-1.5 rounded-md mt-2 inline-block">
                       Reason: {flag.reason}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">Reported on {new Date(flag.date).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                     <button
                        onClick={() => handleAction(flag.id, 'resolved')} 
                        className="px-4 py-2 bg-secondary hover:bg-success/20 hover:text-success text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                        <CheckCircle size={16} /> Mark Safe
                     </button>
                     <button 
                        onClick={() => handleAction(flag.id, 'deleted')}
                        className="px-4 py-2 bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Trash2 size={16} /> Delete Entry
                     </button>
                  </div>
               </div>
             </motion.div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
