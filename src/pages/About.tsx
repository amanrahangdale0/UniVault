import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors">
           <ArrowLeft size={16} /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">About UniVault</h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              UniVault was born out of a simple frustration: students do an incredible amount of work outside the classroom—hackathons, 
              sports, volunteering, and side projects—yet there is no unified, verified way to showcase that effort to the world.
            </p>
            <p>
              We built UniVault to solve this. Our platform isn't just a digital resume; it is an active, verified ecosystem where 
              institutions and students collaborate. By routing achievements through an administrative approval process, we bring 
              absolute credibility back to student portfolios.
            </p>
            <p>
              Built by Binary Brothers, UniVault represents our vision for the future of academic profiles: clean, minimal, blazing fast, 
              and profoundly useful.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
