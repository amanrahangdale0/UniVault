import { motion } from 'framer-motion';
import { Achievement, categoryColors, statusColors, categoryIcons } from '@/lib/mock-data';
import { ExternalLink, MessageCircle } from 'lucide-react';

interface Props {
  achievement: Achievement;
  index?: number;
}

export default function AchievementCard({ achievement, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass rounded-xl p-5 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${categoryColors[achievement.category]}`}>
            {categoryIcons[achievement.category]} {achievement.category}
          </span>
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${statusColors[achievement.status]}`}>
            {achievement.status}
          </span>
        </div>
        {achievement.proofLink && (
          <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>

      <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {achievement.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {achievement.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        {achievement.status === 'approved' && (
          <span className="text-xs text-success font-medium flex items-center gap-1">
            ✅ Verified
          </span>
        )}
      </div>

      {achievement.comment && achievement.status === 'rejected' && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-destructive flex items-center gap-1.5">
            <MessageCircle size={12} /> {achievement.comment}
          </p>
        </div>
      )}
    </motion.div>
  );
}
