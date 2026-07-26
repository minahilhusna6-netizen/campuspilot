import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, Clock, FileCheck2, Award, PieChart as PieChartIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { user, attendance, assignments, subjects } = useApp();

  const studyData = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 6.0 },
    { day: 'Wed', hours: 3.5 },
    { day: 'Thu', hours: 5.0 },
    { day: 'Fri', hours: 7.2 },
    { day: 'Sat', hours: 8.0 },
    { day: 'Sun', hours: 4.0 },
  ];

  const attendanceChartData = attendance.map(att => {
    const sub = subjects.find(s => s.id === att.subjectId);
    return {
      name: sub?.code || 'Course',
      pct: Math.round((att.attendedClasses / att.totalClasses) * 100),
    };
  });

  const assignmentStatusData = [
    { name: 'Completed', value: assignments.filter(a => a.completed).length, color: '#10B981' },
    { name: 'Pending', value: assignments.filter(a => !a.completed).length, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          Academic Analytics & Metrics
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Visual metrics for weekly study hours, assignment completion velocity, and attendance health.
        </p>
      </div>

      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Productivity Score</p>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{user.productivityScore}/100</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Weekly Study Hours</p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{user.studyHoursThisWeek} Hours</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Learning Streak</p>
          <p className="text-2xl font-black text-amber-500 mt-1">{user.learningStreakDays} Days 🔥</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Current CGPA</p>
          <p className="text-2xl font-black text-emerald-500 mt-1">{user.gpa}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Hours Bar Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-600" /> Daily Study Hours
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="hours" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Breakdown Bar Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <PieChartIcon className="h-4 w-4 text-emerald-500" /> Subject Attendance %
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceChartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="pct" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
