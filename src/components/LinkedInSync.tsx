import { useState } from 'react';
import { Linkedin, CheckCircle, Search, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function LinkedInSync() {
  const [url, setUrl] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncedData, setSyncedData] = useState<any>(null);

  const handleSync = () => {
    if (!url.includes('linkedin.com/in/')) {
      toast.error('Please enter a valid LinkedIn profile URL');
      return;
    }

    setSyncing(true);
    setSyncedData(null);

    // Mock extraction
    setTimeout(() => {
       setSyncedData({
          headline: 'Computer Science Student @ University | Full Stack Developer',
          skills: ['React.js', 'Node.js', 'TypeScript', 'Python', 'AWS'],
          experience: [
             { role: 'Software Engineering Intern', company: 'Tech Corp', duration: 'Jun 2024 - Aug 2024' },
             { role: 'Web Developer', company: 'University IT', duration: 'Jan 2023 - Present' }
          ]
       });
       setSyncing(false);
       toast.success('Profile data extracted successfully!');
    }, 2000);
  };

  const handleApply = () => {
     toast.success('Profile updated with LinkedIn data!');
     // In a real app, send to Firebase
     setSyncedData(null);
     setUrl('');
  };

  return (
    <div className="space-y-6">
       <div>
         <h3 className="font-heading font-medium text-lg flex items-center gap-2 mb-2">
           <Linkedin className="text-[#0A66C2]" /> Connect LinkedIn
         </h3>
         <p className="text-sm text-muted-foreground mb-4">
           Automatically sync your skills, experience, and headline directly from your LinkedIn profile.
         </p>
         
         <div className="flex flex-col sm:flex-row gap-3">
            <input 
               type="url"
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               placeholder="https://www.linkedin.com/in/your-profile"
               className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm placeholder:text-muted-foreground/50"
            />
            <button 
               onClick={handleSync}
               disabled={syncing || !url}
               className="bg-[#0A66C2] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#004182] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
               {syncing ? <Search size={16} className="animate-spin" /> : <Linkedin size={16} />}
               {syncing ? 'Scanning...' : 'Sync Profile'}
            </button>
         </div>
       </div>

       {syncedData && (
          <div className="bg-background border border-border rounded-xl p-5 space-y-4 animate-in fade-in slide-in-from-top-4">
             <div className="flex items-center gap-2 text-success font-medium">
                <CheckCircle size={18} /> Data Extracted Successfully
             </div>
             
             <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-muted-foreground block mb-1">Headline:</strong>
                  <div>{syncedData.headline}</div>
                </div>
                
                <div>
                  <strong className="text-muted-foreground block mb-1">Skills Found:</strong>
                  <div className="flex flex-wrap gap-2">
                     {syncedData.skills.map((s: string) => (
                       <span key={s} className="px-2.5 py-1 bg-secondary rounded-md text-xs font-medium">{s}</span>
                     ))}
                  </div>
                </div>
                
                <div>
                  <strong className="text-muted-foreground block mb-1">Experience:</strong>
                  <ul className="space-y-2">
                     {syncedData.experience.map((exp: any, i: number) => (
                       <li key={i} className="flex flex-col">
                          <span className="font-medium">{exp.role}</span>
                          <span className="text-xs text-muted-foreground">{exp.company} · {exp.duration}</span>
                       </li>
                     ))}
                  </ul>
                </div>
             </div>
             
             <div className="pt-2">
                <button 
                  onClick={handleApply}
                  className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                   <Save size={16} /> Apply to My Profile
                </button>
             </div>
          </div>
       )}
    </div>
  );
}
