import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { MessageSquare, Send, Mail, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({ subject: '', message: '' });
  const [feedbackData, setFeedbackData] = useState({ rating: 0, comment: '' });
  const [sendingContact, setSendingContact] = useState(false);
  const [sendingFeedback, setSendingFeedback] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) return;
    
    setSendingContact(true);
    // Mock API Call
    setTimeout(() => {
       toast.success('Message sent to administration/support!');
       setSendingContact(false);
       setFormData({ subject: '', message: '' });
    }, 1000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackData.rating === 0) {
       toast.error('Please select a rating before submitting.');
       return;
    }
    
    setSendingFeedback(true);
    // Mock API Call
    setTimeout(() => {
       toast.success('Thank you for your feedback!');
       setSendingFeedback(false);
       setFeedbackData({ rating: 0, comment: '' });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
             <MessageSquare className="text-primary" /> Contact & Feedback
          </h1>
          <p className="text-muted-foreground mt-1">Get in touch with administration or share your thoughts.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="glass rounded-xl p-8"
         >
            <h2 className="font-heading font-semibold text-lg flex items-center gap-2 mb-6">
              <Mail size={18} className="text-primary" /> Contact Administration
            </h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
               <div>
                  <label className="text-sm font-medium block mb-1.5">Subject</label>
                  <input 
                     type="text" 
                     value={formData.subject}
                     onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                     placeholder="What do you need help with?"
                     required
                     className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
               </div>
               <div>
                  <label className="text-sm font-medium block mb-1.5">Message</label>
                  <textarea 
                     value={formData.message}
                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                     placeholder="Provide details here..."
                     required
                     className="w-full h-32 bg-background border border-border rounded-lg px-4 py-2 resize-none focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
               </div>
               <button 
                  type="submit"
                  disabled={sendingContact || !formData.subject || !formData.message}
                  className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
               >
                  {sendingContact ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <><Send size={16} /> Send Message</>}
               </button>
            </form>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 }}
           className="glass rounded-xl p-8 bg-gradient-to-br from-card/80 to-primary/5"
         >
            <h2 className="font-heading font-semibold text-lg flex items-center gap-2 mb-6">
              <Star size={18} className="text-warning fill-warning" /> Rate the Platform
            </h2>
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
               <div className="flex flex-col items-center">
                  <label className="text-sm font-medium mb-3 text-center">How would you rate your experience with UniVault?</label>
                  <div className="flex gap-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => {}}
                          onClick={() => setFeedbackData({ ...feedbackData, rating: star })}
                          className={`p-2 transition-all hover:scale-110 ${feedbackData.rating >= star ? 'text-warning' : 'text-muted-foreground hover:text-warning/50'}`}
                        >
                           <Star size={32} className={feedbackData.rating >= star ? 'fill-warning' : ''} />
                        </button>
                     ))}
                  </div>
               </div>
               <div>
                  <label className="text-sm font-medium block mb-1.5 text-center">Any suggestions for improvement? (Optional)</label>
                  <textarea 
                     value={feedbackData.comment}
                     onChange={(e) => setFeedbackData({ ...feedbackData, comment: e.target.value })}
                     placeholder="Let us know what we can do better..."
                     className="w-full h-24 bg-background border border-border rounded-lg px-4 py-2 resize-none focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
               </div>
               <button 
                  type="submit"
                  disabled={sendingFeedback || feedbackData.rating === 0}
                  className="w-full bg-secondary text-secondary-foreground py-2.5 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 border border-border"
               >
                  {sendingFeedback ? <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" /> : 'Submit Feedback'}
               </button>
            </form>
         </motion.div>
      </div>
    </DashboardLayout>
  );
}
