import { motion } from 'framer-motion';
import { calculateSmartScore, mockAchievements } from '@/lib/mock-data';

export default function SmartScore() {
  const score = calculateSmartScore(mockAchievements);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getLabel = (s: number) => {
    if (s >= 80) return { text: 'Exceptional', color: 'text-primary' };
    if (s >= 60) return { text: 'Strong', color: 'text-success' };
    if (s >= 40) return { text: 'Growing', color: 'text-accent' };
    return { text: 'Emerging', color: 'text-warning' };
  };

  const label = getLabel(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-6 flex flex-col items-center"
    >
      <h3 className="font-heading font-semibold text-foreground mb-4">Profile Strength</h3>
      
      <div className="relative w-28 h-28 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" strokeWidth="6" className="stroke-secondary" />
          <motion.circle
            cx="50" cy="50" r="45" fill="none" strokeWidth="6"
            strokeLinecap="round"
            className="stroke-primary"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-heading font-bold text-foreground"
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>

      <span className={`text-sm font-semibold ${label.color}`}>{label.text}</span>

      <div className="w-full mt-4 space-y-2">
        {[
          { label: 'Hackathons', count: 2, color: 'bg-primary' },
          { label: 'Internships', count: 1, color: 'bg-info' },
          { label: 'Sports', count: 1, color: 'bg-accent' },
          { label: 'Academic', count: 1, color: 'bg-success' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${item.color}`} />
            <span className="text-muted-foreground flex-1">{item.label}</span>
            <span className="text-foreground font-medium">{item.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
