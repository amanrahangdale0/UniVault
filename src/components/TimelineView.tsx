import { motion } from 'framer-motion';
import { Achievement, categoryColors, categoryIcons, statusColors } from '@/lib/mock-data';

interface Props {
  achievements: Achievement[];
}

export default function TimelineView({ achievements }: Props) {
  const sorted = [...achievements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-6">
        {sorted.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative flex gap-6 pl-14"
          >
            {/* Node */}
            <div className={`absolute left-4 top-3 w-5 h-5 rounded-full border-2 ${
              a.status === 'approved' ? 'border-success bg-success/20' :
              a.status === 'pending' ? 'border-warning bg-warning/20' :
              'border-destructive bg-destructive/20'
            }`}>
              <div className={`absolute inset-1 rounded-full ${
                a.status === 'approved' ? 'bg-success' :
                a.status === 'pending' ? 'bg-warning' :
                'bg-destructive'
              }`} />
            </div>

            {/* Content */}
            <div className="glass rounded-xl p-5 flex-1 group">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${categoryColors[a.category]}`}>
                  {categoryIcons[a.category]} {a.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusColors[a.status]}`}>
                  {a.status}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{a.description}</p>
              <span className="text-xs text-muted-foreground">
                {new Date(a.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
