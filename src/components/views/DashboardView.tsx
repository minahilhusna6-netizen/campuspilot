import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  FileCheck2,
  Calendar,
  Flame,
  Clock,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  PieChart,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Camera,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    user,
    subjects,
    classes,
    assignments,
    tasks,
    exams,
    attendance,
    toggleAssignment,
    toggleTaskStatus,
    setActiveTab,
    setIsCameraOpen,
    setIsAiAssistantOpen,
  } = useApp();

  const [aiTip, setAiTip] = useState<string>(
    'Focus on CS301 Graph Algorithms today. You have an assignment due in 5 days and a midterm scheduled for Aug 4th.'
  );

  const pendingAssignments = assignments.filter(a => !a.completed);
  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const upcomingExams = exams.filter(e => e.status === 'upcoming');

  const avgAttendancePct = Math.round(
    attendance.reduce((acc, curr) => acc + (curr.attendedClasses / curr.totalClasses) * 100, 0) / (attendance.length || 1)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 p-6 sm:p-8 text-white shadow-xl shadow-purple-500/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Semester {user.semester} • {user.university}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
              You are on a <span className="font-bold text-amber-300">{user.learningStreakDays}-day study streak</span>. You have {pendingAssignments.length} pending assignments and {upcomingExams.length} upcoming exams.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10 text-center">
              <p className="text-[10px] uppercase font-bold text-purple-200">GPA</p>
              <p className="text-xl font-extrabold">{user.gpa}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10 text-center">
              <p className="text-[10px] uppercase font-bold text-purple-200">Attendance</p>
              <p className="text-xl font-extrabold">{avgAttendancePct}%</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10 text-center">
              <p className="text-[10px] uppercase font-bold text-purple-200">Study Hours</p>
              <p className="text-xl font-extrabold">{user.studyHoursThisWeek}h</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10 text-center">
              <p className="text-[10px] uppercase font-bold text-purple-200">Score</p>
              <p className="text-xl font-extrabold">{user.productivityScore}/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendation Box */}
      <div className="flex items-start gap-4 rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50/80 to-indigo-50/80 p-4 dark:border-purple-900/50 dark:from-purple-950/30 dark:to-indigo-950/30">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
          <Bot className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
              AI Pilot Recommendation
            </span>
            <button
              onClick={() => setActiveTab('planner')}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              Generate Full Study Plan <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {aiTip}
          </p>
        </div>
      </div>

      {/* Quick Action Buttons Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setIsCameraOpen(true)}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-purple-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300">
            <Camera className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Scan Notes</p>
            <p className="text-[10px] text-slate-400">OCR & AI Summary</p>
          </div>
        </button>

        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">AI Tutor</p>
            <p className="text-[10px] text-slate-400">Explain Concepts</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Assignments</p>
            <p className="text-[10px] text-slate-400">{pendingAssignments.length} Pending</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('focus')}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-amber-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
            <Clock className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Pomodoro Timer</p>
            <p className="text-[10px] text-slate-400">Focus Session</p>
          </div>
        </button>
      </div>

      {/* Main Grid: Left Column (Classes & Assignments), Right Column (Exams & Attendance) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Classes Timeline */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Today's Class Schedule</h3>
              </div>
              <button onClick={() => setActiveTab('timetable')} className="text-xs font-bold text-purple-600 hover:underline">
                View Timetable
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {classes.slice(0, 4).map(cls => {
                const sub = subjects.find(s => s.id === cls.subjectId);
                return (
                  <div
                    key={cls.id}
                    className="flex items-start justify-between rounded-xl border border-slate-200/80 p-3.5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="space-y-1">
                      <span className="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: sub?.color || '#8B5CF6' }}>
                        {sub?.code || 'COURSE'}
                      </span>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">{sub?.name || 'Class'}</h4>
                      <p className="text-[10px] text-slate-500">{cls.room} • {cls.teacher}</p>
                    </div>
                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 px-2 py-1 rounded-md">
                      {cls.startTime}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Pending Assignments</h3>
              </div>
              <button onClick={() => setActiveTab('assignments')} className="text-xs font-bold text-purple-600 hover:underline">
                Manage All ({assignments.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingAssignments.slice(0, 3).map(asg => {
                const sub = subjects.find(s => s.id === asg.subjectId);
                return (
                  <div
                    key={asg.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleAssignment(asg.id)}
                        className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 dark:border-slate-600 hover:border-purple-600"
                      >
                        {asg.completed && <CheckCircle2 className="h-4 w-4 text-purple-600" />}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{asg.title}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            asg.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            {asg.priority}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">{sub?.code} • Due: {asg.dueDate}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('assignments')}
                      className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      AI Helper
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col wide) */}
        <div className="space-y-6">
          {/* Upcoming Exams Widget */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Upcoming Exams</h3>
              </div>
              <button onClick={() => setActiveTab('exams')} className="text-xs font-bold text-purple-600 hover:underline">
                Exam Hub
              </button>
            </div>

            <div className="space-y-3">
              {upcomingExams.map(ex => {
                const sub = subjects.find(s => s.id === ex.subjectId);
                return (
                  <div key={ex.id} className="rounded-xl border border-amber-200/60 bg-amber-50/40 p-3 dark:border-amber-900/30 dark:bg-amber-950/20">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-amber-900 dark:text-amber-300">{ex.title}</span>
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded">
                        {ex.date}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{sub?.name} • Room {ex.room}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attendance Overview Gauge */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-emerald-500" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Attendance Status</h3>
              </div>
              <button onClick={() => setActiveTab('attendance')} className="text-xs font-bold text-purple-600 hover:underline">
                Details
              </button>
            </div>

            <div className="space-y-3">
              {attendance.map(att => {
                const sub = subjects.find(s => s.id === att.subjectId);
                const pct = Math.round((att.attendedClasses / att.totalClasses) * 100);
                const isLow = pct < att.targetPercentage;
                return (
                  <div key={att.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{sub?.code || 'Course'}</span>
                      <span className={isLow ? 'text-rose-500 font-bold' : 'text-slate-600 dark:text-slate-400'}>
                        {pct}% {isLow && '⚠️ Low'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
