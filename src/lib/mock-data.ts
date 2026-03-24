export type AchievementCategory = 'hackathon' | 'internship' | 'sports' | 'academic' | 'volunteer';
export type AchievementStatus = 'pending' | 'approved' | 'rejected';
export type UserRole = 'student' | 'faculty' | 'admin';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  date: string;
  proofLink?: string;
  status: 'pending' | 'approved' | 'rejected';
  userId?: string;
  comment?: string;
};

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

export interface AISuggestion {
  id: string;
  message: string;
  category: AchievementCategory;
  priority: 'low' | 'medium' | 'high';
}

export const mockUser = {
  id: '1',
  name: 'Alex Rivera',
  email: 'alex@university.edu',
  role: 'student' as UserRole,
  avatar: '',
  department: 'Computer Science',
  year: '3rd Year',
};

export const mockUsers = [
  mockUser,
  { id: '2', name: 'Dr. Sarah Chen', email: 'schen@university.edu', role: 'faculty' as UserRole, department: 'Computer Science' },
  { id: '3', name: 'Admin User', email: 'admin@university.edu', role: 'admin' as UserRole },
  { id: '4', name: 'James Wilson', email: 'jwilson@university.edu', role: 'student' as UserRole, department: 'Electrical Engineering', year: '4th Year' },
  { id: '5', name: 'Maria Garcia', email: 'mgarcia@university.edu', role: 'student' as UserRole, department: 'Mechanical Engineering', year: '2nd Year' },
];

export const mockAchievements: Achievement[] = [
  { id: '1', title: 'HackMIT 2025 Winner', description: 'Built an AI-powered accessibility tool that won first place among 200+ teams.', category: 'hackathon', date: '2025-11-15', status: 'approved' },
  { id: '2', title: 'Google SWE Intern', description: 'Summer internship at Google working on Chrome DevTools performance optimization.', category: 'internship', date: '2025-06-01', status: 'approved' },
  { id: '3', title: 'University Basketball MVP', description: 'Named Most Valuable Player for the 2025 inter-university championship.', category: 'sports', date: '2025-03-20', status: 'approved' },
  { id: '4', title: 'TreeHacks Stanford', description: 'Developed a real-time sign language translator using computer vision.', category: 'hackathon', date: '2025-02-10', status: 'pending' },
  { id: '5', title: 'Meta Research Intern', description: 'Working on AR/VR interaction patterns for Meta Quest.', category: 'internship', date: '2025-09-01', status: 'pending' },
  { id: '6', title: 'Dean\'s List Fall 2025', description: 'Achieved 3.9+ GPA for the fall semester.', category: 'academic', date: '2025-12-15', status: 'approved' },
  { id: '7', title: 'Habitat for Humanity Lead', description: 'Led a team of 15 volunteers to build homes in the local community.', category: 'volunteer', date: '2025-04-10', status: 'rejected', comment: 'Please provide official documentation from the organization.' },
];

export const mockBadges: Badge[] = [
  { id: '1', name: 'Hackathon Pro', icon: '⚡', description: 'Participated in 3+ hackathons', earned: true },
  { id: '2', name: 'Internship Ready', icon: '🚀', description: 'Completed 2+ internships', earned: true },
  { id: '3', name: 'Sports Star', icon: '🏆', description: 'Achieved sports recognition', earned: true },
  { id: '4', name: 'Scholar Elite', icon: '📚', description: 'Made Dean\'s List', earned: true },
  { id: '5', name: 'Community Hero', icon: '🤝', description: 'Volunteer work recognized', earned: false },
  { id: '6', name: 'Triple Threat', icon: '💎', description: 'Achievements in 3+ categories', earned: true },
];

export function calculateSmartScore(achievements: Achievement[]): number {
  const approved = achievements.filter(a => a.status === 'approved');
  const hackathons = approved.filter(a => a.category === 'hackathon').length;
  const internships = approved.filter(a => a.category === 'internship').length;
  const sports = approved.filter(a => a.category === 'sports').length;
  const academic = approved.filter(a => a.category === 'academic').length;
  const volunteer = approved.filter(a => a.category === 'volunteer').length;
  
  const raw = (hackathons * 10) + (internships * 20) + (sports * 5) + (academic * 8) + (volunteer * 7);
  return Math.min(raw, 100);
}

export function getAISuggestions(achievements: Achievement[]): AISuggestion[] {
  const approved = achievements.filter(a => a.status === 'approved');
  const suggestions: AISuggestion[] = [];
  
  const cats = (c: AchievementCategory) => approved.filter(a => a.category === c).length;

  if (cats('internship') === 0) {
    suggestions.push({ id: '1', message: 'Boost your industry exposure by applying to internships. Companies value hands-on experience.', category: 'internship', priority: 'high' });
  }
  if (cats('hackathon') < 2) {
    suggestions.push({ id: '2', message: 'Join more hackathons to showcase your problem-solving skills and creativity.', category: 'hackathon', priority: 'medium' });
  }
  if (cats('sports') === 0) {
    suggestions.push({ id: '3', message: 'Extracurricular sports demonstrate teamwork and discipline. Consider joining a team.', category: 'sports', priority: 'low' });
  }
  if (cats('volunteer') === 0) {
    suggestions.push({ id: '4', message: 'Volunteering shows leadership and empathy. Look for community service opportunities.', category: 'volunteer', priority: 'medium' });
  }
  if (cats('academic') === 0) {
    suggestions.push({ id: '5', message: 'Academic achievements like Dean\'s List or research papers strengthen your profile significantly.', category: 'academic', priority: 'medium' });
  }
  
  return suggestions;
}

export const categoryColors: Record<AchievementCategory, string> = {
  hackathon: 'bg-primary/20 text-primary border-primary/30',
  internship: 'bg-info/20 text-info border-info/30',
  sports: 'bg-accent/20 text-accent border-accent/30',
  academic: 'bg-success/20 text-success border-success/30',
  volunteer: 'bg-warning/20 text-warning border-warning/30',
};

export const statusColors: Record<AchievementStatus, string> = {
  pending: 'bg-warning/20 text-warning border-warning/30',
  approved: 'bg-success/20 text-success border-success/30',
  rejected: 'bg-destructive/20 text-destructive border-destructive/30',
};

export const categoryIcons: Record<AchievementCategory, string> = {
  hackathon: '⚡',
  internship: '🚀',
  sports: '🏆',
  academic: '📚',
  volunteer: '🤝',
};
