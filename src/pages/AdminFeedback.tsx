import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import FeedbackPanel from '@/components/FeedbackPanel';
import { MessageSquare } from 'lucide-react';

export default function AdminFeedback() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
             <MessageSquare className="text-primary" /> Feedback & Contact
          </h1>
          <p className="text-muted-foreground mt-1">Manage user feedback and contact requests</p>
        </motion.div>
      </div>

      <FeedbackPanel />
    </AdminLayout>
  );
}
