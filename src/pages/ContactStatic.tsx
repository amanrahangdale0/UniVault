import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';

export default function ContactStatic() {
  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors">
           <ArrowLeft size={16} /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Contact Us</h1>
          <div className="space-y-8 text-muted-foreground leading-relaxed text-lg">
            <p>
              Whether you are an institution looking to integrate UniVault into your academic workflow or a student experiencing technical issues, 
              we are always here to listen.
            </p>
            
            <div className="grid gap-6 mt-10">
               <div className="flex items-center gap-4 p-6 border border-border rounded-xl bg-card/30">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                     <Mail size={24} />
                  </div>
                  <div>
                     <h3 className="font-semibold text-foreground">Email Support</h3>
                     <p>hello@univault.app</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 p-6 border border-border rounded-xl bg-card/30">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                     <MapPin size={24} />
                  </div>
                  <div>
                     <h3 className="font-semibold text-foreground">Headquarters</h3>
                     <p>Binary Brothers Labs, Technology Hub</p>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
