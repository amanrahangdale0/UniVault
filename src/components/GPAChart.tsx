import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GPAChartProps {
  data: { semester: string; gpa: number }[];
}

export default function GPAChart({ data }: GPAChartProps) {
  return (
    <div className="h-[300px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
             dataKey="semester" 
             stroke="hsl(var(--muted-foreground))" 
             fontSize={12} 
             tickLine={false}
             axisLine={false}
          />
          <YAxis 
             domain={[0, 4.0]} 
             stroke="hsl(var(--muted-foreground))" 
             fontSize={12} 
             tickLine={false}
             axisLine={false}
             tickFormatter={(value) => value.toFixed(1)}
          />
          <Tooltip 
             contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
             }} 
             itemStyle={{ color: 'hsl(var(--primary))' }}
          />
          <Line 
            type="monotone" 
            dataKey="gpa" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
