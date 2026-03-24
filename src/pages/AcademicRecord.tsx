import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import GPAChart from '@/components/GPAChart';
import { Plus, Trash2, Calculator, BookOpen } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  credits: number;
  gradePoints: number; // 0.0 to 4.0
}

interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
}

export default function AcademicRecord() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      name: 'Fall 2024',
      subjects: [
        { id: '101', name: 'Intro to CS', credits: 4, gradePoints: 4.0 },
        { id: '102', name: 'Calculus I', credits: 4, gradePoints: 3.5 },
      ]
    }
  ]);

  const addSemester = () => {
    setSemesters([...semesters, { id: Date.now().toString(), name: `Semester ${semesters.length + 1}`, subjects: [] }]);
  };

  const addSubject = (semesterId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        return {
          ...sem,
          subjects: [...sem.subjects, { id: Date.now().toString(), name: '', credits: 3, gradePoints: 0.0 }]
        };
      }
      return sem;
    }));
  };

  const updateSubject = (semesterId: string, subjectId: string, field: keyof Subject, value: any) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        return {
          ...sem,
          subjects: sem.subjects.map(sub => sub.id === subjectId ? { ...sub, [field]: value } : sub)
        };
      }
      return sem;
    }));
  };

  const removeSubject = (semesterId: string, subjectId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        return { ...sem, subjects: sem.subjects.filter(sub => sub.id !== subjectId) };
      }
      return sem;
    }));
  };

  const removeSemester = (semesterId: string) => {
    setSemesters(semesters.filter(sem => sem.id !== semesterId));
  };

  // Calculations
  const chartData = useMemo(() => {
    return semesters.map(sem => {
      let totalCredits = 0;
      let totalPoints = 0;
      sem.subjects.forEach(sub => {
        totalCredits += sub.credits;
        totalPoints += (sub.credits * sub.gradePoints);
      });
      const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
      return { semester: sem.name, gpa: Number(gpa.toFixed(2)), totalCredits };
    });
  }, [semesters]);

  const cgpa = useMemo(() => {
    let totalOverallCredits = 0;
    let totalOverallPoints = 0;
    semesters.forEach(sem => {
      sem.subjects.forEach(sub => {
        totalOverallCredits += sub.credits;
        totalOverallPoints += (sub.credits * sub.gradePoints);
      });
    });
    return totalOverallCredits > 0 ? (totalOverallPoints / totalOverallCredits).toFixed(2) : "0.00";
  }, [semesters]);

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
             <BookOpen className="text-primary" /> Academic Record
          </h1>
          <p className="text-muted-foreground mt-1">Track your coursework, SGPA, and calculate overall CGPA.</p>
        </motion.div>
        
        <div className="glass px-6 py-3 rounded-xl border border-primary/20 flex items-center gap-4">
           <div>
             <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Overall CGPA</p>
             <p className="text-3xl font-heading font-bold text-primary">{cgpa}</p>
           </div>
           <Calculator size={32} className="text-primary/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <div className="xl:col-span-2 space-y-6">
            <AnimatePresence>
               {semesters.map((sem, sIdx) => {
                  const data = chartData[sIdx];
                  return (
                    <motion.div 
                       key={sem.id}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       className="glass rounded-xl p-6 relative overflow-hidden group"
                    >
                       <div className="flex items-center justify-between mb-4">
                          <input 
                             type="text"
                             value={sem.name}
                             onChange={(e) => {
                               const newSems = [...semesters];
                               newSems[sIdx].name = e.target.value;
                               setSemesters(newSems);
                             }}
                             className="bg-transparent font-heading font-semibold text-lg border-none focus:ring-0 p-0 text-foreground w-[200px]"
                          />
                          <div className="flex items-center gap-4">
                             <span className="text-sm font-medium">SGPA: <span className="text-primary">{data.gpa.toFixed(2)}</span></span>
                             <button onClick={() => removeSemester(sem.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-destructive/10">
                                <Trash2 size={16} />
                             </button>
                          </div>
                       </div>
                       
                       <div className="space-y-3">
                          {sem.subjects.map(sub => (
                             <div key={sub.id} className="flex flex-col sm:flex-row gap-3 items-center">
                                <input 
                                   type="text" 
                                   placeholder="Subject Name"
                                   value={sub.name}
                                   onChange={(e) => updateSubject(sem.id, sub.id, 'name', e.target.value)}
                                   className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary outline-none focus:ring-1 focus:ring-primary w-full"
                                />
                                <div className="flex gap-3 w-full sm:w-auto">
                                   <div className="flex items-center gap-2">
                                     <span className="text-xs text-muted-foreground w-12">Credits:</span>
                                     <input 
                                        type="number" min="0" step="0.5"
                                        value={sub.credits}
                                        onChange={(e) => updateSubject(sem.id, sub.id, 'credits', parseFloat(e.target.value) || 0)}
                                        className="w-16 bg-background border border-border rounded-lg px-2 py-2 text-sm focus:border-primary outline-none text-center"
                                     />
                                   </div>
                                   <div className="flex items-center gap-2">
                                     <span className="text-xs text-muted-foreground w-12">Grade:</span>
                                     <input 
                                        type="number" min="0" max="4.0" step="0.1"
                                        value={sub.gradePoints}
                                        onChange={(e) => updateSubject(sem.id, sub.id, 'gradePoints', parseFloat(e.target.value) || 0)}
                                        className="w-16 bg-background border border-border rounded-lg px-2 py-2 text-sm focus:border-primary outline-none text-center"
                                     />
                                   </div>
                                   <button onClick={() => removeSubject(sem.id, sub.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors h-full flex items-center">
                                     <X size={16} />
                                   </button>
                                </div>
                             </div>
                          ))}
                       </div>
                       
                       <button onClick={() => addSubject(sem.id)} className="mt-4 text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors">
                          <Plus size={14} /> Add Subject
                       </button>
                    </motion.div>
                  )
               })}
            </AnimatePresence>
            
            <button onClick={addSemester} className="w-full py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-medium">
               <Plus size={18} /> Add Semester
            </button>
         </div>

         <div className="space-y-6">
            <div className="glass rounded-xl p-6 sticky top-6">
               <h2 className="font-heading font-semibold mb-2">Performance Trend</h2>
               <p className="text-xs text-muted-foreground">Your SGPA across all tracked semesters.</p>
               {chartData.length > 0 ? (
                  <GPAChart data={chartData} />
               ) : (
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                    Add data to see chart
                  </div>
               )}
            </div>
         </div>
      </div>
    </DashboardLayout>
  );
}

// Simple internal icon for this file to avoid another import
function X({ size, className }: { size: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
