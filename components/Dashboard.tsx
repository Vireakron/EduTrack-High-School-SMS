import React from 'react';
import { Student } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import { Users, Award, AlertCircle, TrendingUp } from 'lucide-react';

interface DashboardProps {
  students: Student[];
  isDarkMode?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ students, isDarkMode = false }) => {
  // Calculate Stats
  const totalStudents = students.length;
  const avgGpa = (students.reduce((acc, s) => acc + s.gpa, 0) / totalStudents).toFixed(2);
  const avgAttendance = (students.reduce((acc, s) => acc + s.attendanceRate, 0) / totalStudents).toFixed(1);
  const atRiskStudents = students.filter(s => s.gpa < 2.5 || s.attendanceRate < 85).length;

  // Grade Distribution Data
  const gpaRanges = [
    { name: '3.5 - 4.0', count: students.filter(s => s.gpa >= 3.5).length },
    { name: '3.0 - 3.49', count: students.filter(s => s.gpa >= 3.0 && s.gpa < 3.5).length },
    { name: '2.5 - 2.99', count: students.filter(s => s.gpa >= 2.5 && s.gpa < 3.0).length },
    { name: '< 2.5', count: students.filter(s => s.gpa < 2.5).length },
  ];

  // Attendance vs GPA Scatter approximation (using line chart for trend)
  const sortedByGpa = [...students].sort((a, b) => a.gpa - b.gpa);
  const trendData = sortedByGpa.map(s => ({
    name: s.firstName,
    gpa: s.gpa,
    attendance: s.attendanceRate
  }));

  const chartTextColor = isDarkMode ? "#94a3b8" : "#64748b";
  const gridColor = isDarkMode ? "#334155" : "#e2e8f0";
  const tooltipStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    borderColor: isDarkMode ? '#334155' : '#ffffff',
    color: isDarkMode ? '#f1f5f9' : '#1e293b',
    borderRadius: '8px', 
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
  };

  const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-start justify-between transition-colors">
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{value}</h3>
        {sub && <p className={`text-xs mt-2 ${sub.includes('+') ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}`}>{sub}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color} text-white shadow-md`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h2>
        <div className="text-sm text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={totalStudents} 
          sub="+2 this month" 
          icon={Users} 
          color="bg-brand-600" 
        />
        <StatCard 
          title="Average GPA" 
          value={avgGpa} 
          sub="+0.1 from last semester" 
          icon={Award} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Avg Attendance" 
          value={`${avgAttendance}%`} 
          sub="Stable" 
          icon={TrendingUp} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="At Risk" 
          value={atRiskStudents} 
          sub="Needs attention" 
          icon={AlertCircle} 
          color="bg-red-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GPA Distribution Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">GPA Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gpaRanges}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" stroke={chartTextColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={chartTextColor} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: isDarkMode ? '#334155' : '#f1f5f9'}} contentStyle={tooltipStyle} itemStyle={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }} />
                <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance vs GPA Trend */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
           <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Performance vs Attendance</h3>
           <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" hide />
                <YAxis yAxisId="left" stroke="#0ea5e9" orientation="left" domain={[0, 4]} tick={{fill: "#0ea5e9"}} />
                <YAxis yAxisId="right" stroke="#22c55e" orientation="right" domain={[0, 100]} tick={{fill: "#22c55e"}} />
                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }} />
                <Line yAxisId="left" type="monotone" dataKey="gpa" stroke="#0ea5e9" strokeWidth={2} dot={false} name="GPA" />
                <Line yAxisId="right" type="monotone" dataKey="attendance" stroke="#22c55e" strokeWidth={2} dot={false} name="Attendance %" />
              </LineChart>
            </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;