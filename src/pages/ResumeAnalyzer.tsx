import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Upload, FileText, CheckCircle, AlertTriangle, Sparkles, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AnalysisResult {
  score: number;
  missingSections: string[];
  weaknesses: string[];
  strengths: string[];
  suggestions: string[];
}

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeResume = () => {
    if (!resumeText.trim()) {
      toast.error('Please paste your resume text first');
      return;
    }

    setAnalyzing(true);
    setResult(null);

    // Simulated Logic-based Analysis
    setTimeout(() => {
       const text = resumeText.toLowerCase();
       let score = 50; // Base score
       const missingSections: string[] = [];
       const weaknesses: string[] = [];
       const strengths: string[] = [];
       const suggestions: string[] = [];

       // Basic Section checks
       const hasExperience = text.includes('experience') || text.includes('internship') || text.includes('work history');
       const hasProjects = text.includes('project') || text.includes('portfolio');
       const hasEducation = text.includes('education') || text.includes('university') || text.includes('college');
       const hasSkills = text.includes('skills') || text.includes('technologies');

       if (hasExperience) { score += 15; strengths.push("Strong experience section detected."); } 
       else { missingSections.push("Experience"); suggestions.push("Add an Experience section. Even personal projects or volunteer work count!"); }

       if (hasProjects) { score += 15; strengths.push("Projects included, showcasing practical skills."); }
       else { missingSections.push("Projects"); suggestions.push("Add a Projects section. Mention specific technologies used."); }

       if (hasEducation) { score += 5; } else { missingSections.push("Education"); }
       if (hasSkills) { score += 5; } else { missingSections.push("Skills"); }

       // Action verbs check
       const actionVerbs = ['developed', 'led', 'designed', 'optimized', 'built', 'created', 'managed'];
       let verbCount = 0;
       actionVerbs.forEach(verb => {
          if (text.includes(verb)) verbCount++;
       });
       
       if (verbCount > 3) {
          score += 10;
          strengths.push("Good use of action verbs (developed, led, etc).");
       } else {
          weaknesses.push("Lack of action verbs");
          suggestions.push("Use strong action verbs (e.g., 'developed', 'optimized', 'led') to describe your achievements.");
       }

       // Metrics Check (numbers, %, $, etc)
       if (/\d+%|\d+x|\$\d+|\d+\+/.test(text)) {
          score += 10;
          strengths.push("Quantifiable metrics detected.");
       } else {
          weaknesses.push("No quantifiable metrics");
          suggestions.push("Quantify your achievements. E.g., 'Optimized performance by 20%'.");
       }

       setResult({
         score: Math.min(score, 100),
         missingSections,
         strengths,
         weaknesses,
         suggestions
       });
       
       setAnalyzing(false);
       toast.success("Analysis complete!");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
             <Sparkles className="text-primary" /> Resume Analyzer
          </h1>
          <p className="text-muted-foreground mt-1">Get AI-powered feedback on your resume content.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         <div className="space-y-6">
            <div className="glass rounded-xl p-6">
               <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                 <FileText size={18} className="text-primary" /> Input Resume
               </h2>
               
               <div className="mb-4">
                 <textarea 
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume content here..."
                    className="w-full h-64 bg-background border border-border rounded-xl p-4 resize-none focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm placeholder:text-muted-foreground leading-relaxed"
                 />
               </div>
               
               <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Or upload a text file (simulated)
                  </div>
                  <button 
                     onClick={analyzeResume}
                     disabled={analyzing}
                     className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto justify-center"
                  >
                     {analyzing ? <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Sparkles size={16} />}
                     {analyzing ? 'Analyzing...' : 'Analyze Resume'}
                  </button>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            {!result && !analyzing && (
               <div className="glass rounded-xl p-12 flex flex-col items-center justify-center text-center h-full border border-dashed border-border/50">
                  <Upload size={48} className="text-muted-foreground mb-4 opacity-50" />
                  <h3 className="font-heading font-medium text-lg mb-2">Awaiting Resume</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">Paste your resume text and click analyze to see your score, strengths, and areas for improvement.</p>
               </div>
            )}
            
            {analyzing && (
               <div className="glass rounded-xl p-12 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
                  <h3 className="font-heading font-medium text-lg animate-pulse">Running analysis...</h3>
               </div>
            )}

            {result && !analyzing && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="space-y-6"
               >
                  <div className="glass rounded-xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10" />
                     <h2 className="font-heading font-semibold text-lg mb-2">Overall Score</h2>
                     <div className="flex items-end gap-4">
                        <span className={`text-5xl font-heading font-bold ${result.score > 70 ? 'text-success' : result.score > 40 ? 'text-warning' : 'text-destructive'}`}>
                           {result.score}
                        </span>
                        <span className="text-muted-foreground mb-2">/ 100</span>
                     </div>
                  </div>

                  {result.strengths.length > 0 && (
                     <div className="glass rounded-xl p-6 border border-success/20">
                        <h3 className="font-heading font-semibold text-success flex items-center gap-2 mb-3">
                           <CheckCircle size={18} /> Strengths
                        </h3>
                        <ul className="space-y-2 text-sm">
                           {result.strengths.map((s, i) => (
                              <li key={i} className="flex items-start gap-2">
                                 <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                                 {s}
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}

                  {(result.missingSections.length > 0 || result.weaknesses.length > 0) && (
                     <div className="glass rounded-xl p-6 border border-warning/20">
                        <h3 className="font-heading font-semibold text-warning flex items-center gap-2 mb-3">
                           <AlertTriangle size={18} /> Areas to Improve
                        </h3>
                        {result.missingSections.length > 0 && (
                           <div className="mb-4 text-sm">
                              <strong>Missing Sections:</strong> {result.missingSections.join(', ')}
                           </div>
                        )}
                        <ul className="space-y-2 text-sm">
                           {result.weaknesses.map((w, i) => (
                              <li key={i} className="flex items-start gap-2">
                                 <XCircle size={16} className="text-warning flex-shrink-0 mt-0.5" />
                                 {w}
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}

                  {result.suggestions.length > 0 && (
                     <div className="glass rounded-xl p-6 border border-primary/20 bg-primary/5">
                        <h3 className="font-heading font-semibold text-primary flex items-center gap-2 mb-3">
                           <Sparkles size={18} /> Actionable Suggestions
                        </h3>
                        <ul className="space-y-3 text-sm">
                           {result.suggestions.map((s, i) => (
                              <li key={i} className="bg-background rounded-lg p-3 border border-border shadow-sm">
                                 {s}
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}
               </motion.div>
            )}
         </div>
      </div>
    </DashboardLayout>
  );
}
