import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockAchievements } from '@/lib/mock-data';

const COLORS = [
  'hsl(180 100% 50%)',   // primary/cyan
  'hsl(200 98% 39%)',    // info
  'hsl(45 90% 55%)',     // accent/gold
  'hsl(160 84% 39%)',    // success
  'hsl(38 92% 50%)',     // warning
];

export default function StatsCharts() {
  const approved = mockAchievements.filter(a => a.status === 'approved');

  const categoryData = ['hackathon', 'internship', 'sports', 'academic', 'volunteer'].map(c => ({
    name: c.charAt(0).toUpperCase() + c.slice(1),
    value: approved.filter(a => a.category === c).length,
  })).filter(d => d.value > 0);

  const statusData = [
    { name: 'Approved', value: mockAchievements.filter(a => a.status === 'approved').length, fill: 'hsl(160 84% 39%)' },
    { name: 'Pending', value: mockAchievements.filter(a => a.status === 'pending').length, fill: 'hsl(38 92% 50%)' },
    { name: 'Rejected', value: mockAchievements.filter(a => a.status === 'rejected').length, fill: 'hsl(0 72% 51%)' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6"
      >
        <h3 className="font-heading font-semibold text-foreground mb-4">By Category</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: 'hsl(220 18% 10%)', border: '1px solid hsl(220 14% 18%)', borderRadius: '8px', color: 'hsl(210 20% 92%)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          {categoryData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
              {d.name}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-6"
      >
        <h3 className="font-heading font-semibold text-foreground mb-4">Status Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={statusData}>
            <XAxis dataKey="name" tick={{ fill: 'hsl(215 12% 50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'hsl(215 12% 50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'hsl(220 18% 10%)', border: '1px solid hsl(220 14% 18%)', borderRadius: '8px', color: 'hsl(210 20% 92%)' }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {statusData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
