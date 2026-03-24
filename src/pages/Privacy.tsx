import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors">
           <ArrowLeft size={16} /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-8 text-muted-foreground leading-relaxed text-lg">
            <section>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">1. Data Collection</h2>
              <p>
                We only collect data that is strictly necessary to maintain your academic portfolio and facilitate institutional verification. 
                This includes your name, email, department, and the explicit contents of the achievements you submit.
              </p>
            </section>
            
            <section>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">2. Data Usage</h2>
              <p>
                Your data is never sold to third parties. We use your information exclusively to generate your portfolio, calculate your Smart Score, 
                and provide AI-driven suggestions to improve your profile. 
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">3. Security</h2>
              <p>
                All data is encrypted in transit and at rest using industry-standard protocols. Authentication is handled securely, 
                and institutional administrators are strictly governed by Role-Based Access Controls to ensure they can only evaluate relevant records.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
