import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Shield } from 'lucide-react';
import { categoryIcons, statusColors, type Achievement } from '@/lib/mock-data';

interface Props {
  open: boolean;
  onClose: () => void;
  user: { id: string; name: string; email: string; role: string; department?: string; year?: string } | null;
  achievements: Achievement[];
}

export default function AdminPortfolioModal({ open, onClose, user, achievements }: Props) {
  if (!user) return null;

  const userAchievements = achievements.filter(a => a.userId === user.id);
  const approvedCount = userAchievements.filter(a => a.status === 'approved').length;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl pointer-events-auto relative z-10"
          >
            <div className="glass rounded-2xl p-6 md:p-8 border border-border shadow-2xl bg-card flex flex-col max-h-[85vh]">
              <div className="flex items-start justify-between mb-6 shrink-0">
                <div>
                  <h2 className="font-heading font-bold text-2xl text-foreground flex items-center gap-2">
                    {user.name}'s Portfolio
                    {user.role === 'admin' && <Shield size={18} className="text-destructive" />}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {user.email} • {user.department || 'No department'} {user.year ? `(${user.year})` : ''}
                  </p>
                </div>
                <button onClick={onClose} className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
                  <X size={20} />
                </button>
              </div>

              <div className="flex gap-4 mb-6 pb-6 border-b border-border shrink-0">
                <div className="bg-secondary/50 rounded-lg p-3 px-4 flex-1 border border-border/50">
                  <div className="text-2xl font-bold">{userAchievements.length}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Total Entries</div>
                </div>
                <div className="bg-success/10 rounded-lg p-3 px-4 flex-1 border border-success/20">
                  <div className="text-2xl font-bold text-success">{approvedCount}</div>
                  <div className="text-xs text-success/80 uppercase tracking-wider font-semibold mt-0.5">Verified</div>
                </div>
              </div>

              <div className="overflow-y-auto pr-2 space-y-4">
                {userAchievements.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground bg-secondary/20 rounded-xl border border-border/50 border-dashed">
                    This user has no recorded achievements.
                  </div>
                ) : (
                  userAchievements.map(achievement => (
                    <div key={achievement.id} className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 bg-background rounded-md text-foreground shadow-sm border border-border">
                            {categoryIcons[achievement.category]}
                          </span>
                          <h4 className="font-semibold">{achievement.title}</h4>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${statusColors[achievement.status]}`}>
                          {achievement.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{achievement.description}</p>
                      
                      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                        <span>{new Date(achievement.date).toLocaleDateString()}</span>
                        {achievement.proofLink && (
                          <a 
                            href={achievement.proofLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                          >
                            View Proof <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
