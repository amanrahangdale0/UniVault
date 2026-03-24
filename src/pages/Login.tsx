import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { toast } from 'sonner';

export default function Login() {
  const [isStudent, setIsStudent] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Always use the login function which handles both Firebase and demo mode
      await login(email, password);
      toast.success('Login successful');
      
      // Navigate based on email or role
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 selection:bg-primary selection:text-primary-foreground">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[400px] flex flex-col items-center"
      >
        <div className="mb-12">
           <h1 className="font-sans text-3xl font-semibold tracking-tight text-center">UniVault</h1>
        </div>
        
        <div className="w-full bg-card border border-border rounded-xl p-8 mb-6">
           <h2 className="text-xl font-medium mb-1">Sign in</h2>
           <p className="text-muted-foreground text-sm mb-8">Enter your details to continue.</p>

           <div className="flex bg-secondary border border-border rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setIsStudent(true)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  isStudent ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setIsStudent(false)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  !isStudent ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Admin / Faculty
              </button>
           </div>

           <form onSubmit={handleLogin} className="space-y-5">
             <div>
               <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Email</label>
               <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full bg-transparent border border-input rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                 placeholder="Enter your email"
                 required
               />
             </div>
             
             <div>
               <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Password</label>
               <input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-transparent border border-input rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                 placeholder="••••••••"
                 required
               />
             </div>

             <button
               type="submit"
               disabled={loading || !email || !password}
               className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed mt-2"
             >
               {loading ? 'Signing in...' : 'Sign In'}
             </button>
           </form>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
           <button 
             onClick={() => {setEmail('student@demo.com'); setPassword('123456'); setIsStudent(true);}} 
             className="flex-1 py-2 bg-secondary border border-border hover:bg-accent rounded-lg text-xs font-medium text-foreground transition-colors"
           >
             Demo Student
           </button>
           <button 
             onClick={() => {setEmail('admin@demo.com'); setPassword('123456'); setIsStudent(false);}} 
             className="flex-1 py-2 bg-secondary border border-border hover:bg-accent rounded-lg text-xs font-medium text-foreground transition-colors"
           >
             Demo Admin
           </button>
        </div>
        
        <div className="text-muted-foreground text-xs text-center border border-border rounded-lg p-3 bg-secondary/50 w-full leading-relaxed">
           <strong>Demo Credentials:</strong><br/>
           student@demo.com / 123456<br/>
           admin@demo.com / 123456
        </div>
      </motion.div>
    </div>
  );
}
