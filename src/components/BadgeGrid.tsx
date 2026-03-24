import { motion } from 'framer-motion';
import { mockBadges } from '@/lib/mock-data';

export default function BadgeGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {mockBadges.map((badge, i) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className={`glass rounded-xl p-4 text-center ${
            badge.earned ? 'border-primary/30' : 'opacity-40 grayscale'
          }`}
        >
          <span className="text-3xl block mb-2">{badge.icon}</span>
          <h4 className="font-heading text-sm font-semibold text-foreground">{badge.name}</h4>
          <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
          {badge.earned && (
            <span className="inline-block mt-2 text-xs text-primary font-medium">Earned ✓</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
