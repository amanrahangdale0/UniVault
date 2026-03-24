import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Trophy, Sparkles, FileText, BarChart3, Award } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CubeBackground from '@/components/CubeBackground';

const features = [
  { icon: Trophy, title: 'Achievement Tracking', desc: 'Centralized repository for hackathons, internships, sports, and more.' },
  { icon: Shield, title: 'Verified Credentials', desc: 'Faculty-verified achievements with transparent approval workflow.' },
  { icon: Sparkles, title: 'AI-Powered Insights', desc: 'Smart suggestions to improve your profile and fill gaps.' },
  { icon: FileText, title: 'Portfolio Generator', desc: 'One-click shareable portfolio with verified badges.' },
  { icon: BarChart3, title: 'Smart Score', desc: 'Dynamic profile strength scoring across all categories.' },
  { icon: Award, title: 'Gamification', desc: 'Earn badges and track progress with visual milestones.' },
];

export default function Landing() {
  const [stats, setStats] = useState({ users: 0, achievements: 0, verified: 0 });

  useEffect(() => {
    // Listen to Users
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
       setStats(prev => ({ ...prev, users: snapshot.size }));
    });

    // Listen to all achievements
    const unsubscribeAchievements = onSnapshot(collection(db, 'achievements'), (snapshot) => {
       let verifiedCount = 0;
       snapshot.forEach(doc => {
          if (doc.data().status === 'approved') verifiedCount++;
       });
       setStats(prev => ({ 
          ...prev, 
          achievements: snapshot.size,
          verified: snapshot.size > 0 ? Math.round((verifiedCount / snapshot.size) * 100) : 0 
       }));
    });

    return () => {
       unsubscribeUsers();
       unsubscribeAchievements();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CubeBackground />
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link to="/" className="block">
          <img src="/univault.png" alt="UniVault Logo" className="h-10 md:h-12 lg:h-14 w-auto object-contain transition-all" />
        </Link>
        <Link
          to="/login"
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Open Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-medium text-primary">Student Achievement Platform</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            <span className="text-foreground">Your achievements,</span>
            <br />
            <span className="text-gradient-primary">verified & showcased.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            UniVault is the centralized, verified, and portfolio-ready platform for college students to track hackathons, internships, sports, and every milestone that matters.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-heading font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 glow-primary hover-scale"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-xl font-heading font-semibold hover:bg-secondary/80 transition-colors hover-scale"
            >
              View Demo Portfolio
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 mt-20 max-w-2xl"
        >
          {[
            { value: stats.users > 0 ? `${stats.users}+` : '0', label: 'Students' },
            { value: stats.achievements > 0 ? `${stats.achievements}+` : '0', label: 'Achievements Tracked' },
            { value: `${stats.verified}%`, label: 'Verification Rate' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-heading font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pb-32">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-heading text-3xl font-bold text-foreground mb-12"
        >
          Everything you need to <span className="text-gradient-accent">stand out.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-6 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                <f.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pb-20">
        <div className="glass rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="relative z-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Ready to build your verified portfolio?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of students who are tracking, verifying, and showcasing their achievements.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-heading font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 glow-primary hover-scale"
            >
              Start Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
           <div className="flex flex-col gap-4">
              <Link to="/" className="block">
                 <img src="/univault.png" alt="UniVault Logo" className="h-10 w-auto object-contain opacity-90" />
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs mt-2">The verified achievement tracking platform for ambitious students and institutions.</p>
           </div>
           
           <div className="flex gap-8">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/contact-static" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-6 border-t border-border/50 text-center">
           <p className="text-sm text-muted-foreground">© 2026 UniVault. Made by Binary Brothers</p>
        </div>
        
        <div className="border-t border-border py-6 px-8 flex justify-center text-center">
           <span className="text-sm font-medium text-muted-foreground">Made by Binary Brothers</span>
        </div>
      </footer>
    </div>
  );
}
