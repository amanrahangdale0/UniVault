import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/AuthContext';
import { toast } from 'sonner';
import type { AchievementCategory } from '@/lib/mock-data';

interface Props {
  open: boolean;
  onClose: () => void;
}

const categories: AchievementCategory[] = ['hackathon', 'internship', 'sports', 'academic', 'volunteer'];

export default function AddAchievementModal({ open, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<AchievementCategory>('hackathon');
  const [date, setDate] = useState('');
  const [proofLink, setProofLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date) return toast.error('Please fill required fields');
    
    setIsSubmitting(true);
    try {
       await addDoc(collection(db, 'achievements'), {
          title,
          description,
          category,
          date,
          proofLink,
          status: 'pending',
          userId: user?.uid || 'demo-user',
          createdAt: serverTimestamp()
       });
       toast.success('Achievement submitted for verification!');
       setTitle('');
       setDescription('');
       setDate('');
       setProofLink('');
       onClose();
    } catch (error: any) {
       toast.error(error.message || 'Failed to submit achievement');
    } finally {
       setIsSubmitting(false);
    }
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg"
            >
              <div className="bg-card border border-neutral-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-xl text-foreground">Add Achievement</h2>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Title</label>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. HackMIT 2025 Winner"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-24"
                    placeholder="Describe your achievement..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as AchievementCategory)}
                      className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {categories.map(c => (
                        <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Proof Link (optional)</label>
                  <input
                    value={proofLink}
                    onChange={e => setProofLink(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="https://..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-heading font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <><Plus size={18} /> Submit Achievement</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
        </>
      )}
    </AnimatePresence>
  );
}
