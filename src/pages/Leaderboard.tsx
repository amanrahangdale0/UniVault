import { motion } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import { mockUsers, mockAchievements, calculateSmartScore } from '@/lib/mock-data';
import { Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard() {
  // Mock generating scores for students based on mockAchievements
  const studentLeaderboard = mockUsers
    .filter(u => u.role === 'student')
    .map(u => ({
      ...u,
      score: u.id === '1' ? calculateSmartScore(mockAchievements) : Math.floor(Math.random() * 80) + 20, // Random score for demo
      achievementsCount: u.id === '1' ? mockAchievements.length : Math.floor(Math.random() * 10),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <AdminLayout>
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">Top performing students across departments</p>
        </motion.div>
      </div>

      <div className="bg-black border border-neutral-800 rounded-lg p-6">
        <div className="space-y-4">
          {studentLeaderboard.map((student, i) => (
            <motion.div 
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border border-border bg-background">
                  {i === 0 ? <Trophy size={20} className="text-warning" /> : 
                   i === 1 ? <Medal size={20} className="text-muted-foreground" /> :
                   i === 2 ? <Award size={20} className="text-accent" /> : 
                   <span className="text-muted-foreground text-sm">#{i + 1}</span>}
                </div>
                <div>
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-xs text-muted-foreground">{student.department} · {student.year}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-primary font-heading">{student.score} pts</div>
                <div className="text-xs text-muted-foreground">{student.achievementsCount} Achievements</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
