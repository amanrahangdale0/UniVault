import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import TimelineView from '@/components/TimelineView';
import { mockAchievements } from '@/lib/mock-data';

export default function Timeline() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Timeline</h1>
        <p className="text-muted-foreground mt-1">Your achievement journey, visualized</p>
      </motion.div>
      <TimelineView achievements={mockAchievements} />
    </DashboardLayout>
  );
}
