import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import SmartScore from '@/components/SmartScore';
import {
  mockAchievements, mockBadges, mockUser,
  categoryIcons, categoryColors
} from '@/lib/mock-data';
import { Download, Share2, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const approved = mockAchievements.filter(a => a.status === 'approved');
  const earnedBadges = mockBadges.filter(b => b.earned);

  return (
    <DashboardLayout>
      <div className="flex items-end justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground mt-1">Your verified achievement portfolio</p>
        </motion.div>
        <div className="flex gap-3">
          <button className="bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg font-heading font-semibold text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <Share2 size={16} /> Share
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-heading font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* Portfolio preview */}
      <div className="glass rounded-2xl p-8 border border-border">
        {/* Header */}
        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-border">
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center glow-primary">
            <span className="text-primary font-heading font-bold text-3xl">
              {mockUser.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-2xl font-bold text-foreground">{mockUser.name}</h2>
            <p className="text-muted-foreground">{mockUser.department} · {mockUser.year}</p>
            <p className="text-sm text-muted-foreground mt-1">{mockUser.email}</p>
            <div className="flex gap-2 mt-3">
              {earnedBadges.map(b => (
                <span key={b.id} className="px-2.5 py-1 glass rounded-md text-xs font-medium text-foreground">
                  {b.icon} {b.name}
                </span>
              ))}
            </div>
          </div>
          <div className="w-40">
            <SmartScore />
          </div>
        </div>

        {/* Achievements */}
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Verified Achievements</h3>
        <div className="space-y-4">
          {approved.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg">
                {categoryIcons[a.category]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-heading font-semibold text-foreground">{a.title}</h4>
                  <span className="text-success text-xs">✅ Verified</span>
                </div>
                <p className="text-sm text-muted-foreground">{a.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${categoryColors[a.category]}`}>
                    {a.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(a.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
