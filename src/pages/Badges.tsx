import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import BadgeGrid from '@/components/BadgeGrid';

export default function Badges() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Badges</h1>
        <p className="text-muted-foreground mt-1">Earn badges by reaching milestones across categories</p>
      </motion.div>
      <BadgeGrid />
    </DashboardLayout>
  );
}
