import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  CalendarDays,
  GraduationCap,
  PieChart,
  Calculator,
  NotebookPen,
  FolderArchive,
  FileSearch,
  CheckSquare,
  Sparkles,
  Timer,
  Target,
  BarChart3,
  BrainCircuit,
  Award,
  Users,
  Settings,
  ShieldCheck,
  ChevronRight,
  Compass,
  Mic,
  Camera
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, user } = useApp();

  const navGroups = [
    {
      title: 'ACADEMICS',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'subjects', label: 'Subjects', icon: BookOpen },
        { id: 'assignments', label: 'Assignments', icon: FileCheck2 },
        { id: 'timetable', label: 'Timetable & Calendar', icon: CalendarDays },
        { id: 'exams', label: 'Exam Hub', icon: GraduationCap },
        { id: 'attendance', label: 'Attendance Tracker', icon: PieChart },
        { id: 'gpa', label: 'GPA Calculator', icon: Calculator },
      ],
    },
    {
      title: 'MATERIALS & REPOSITORY',
      items: [
        { id: 'notes', label: 'Notes & Voice', icon: NotebookPen },
        { id: 'files', label: 'File Manager', icon: FolderArchive },
        { id: 'ai-doc-assistant', label: 'AI Doc Assistant', icon: FileSearch, badge: 'AI' },
      ],
    },
    {
      title: 'PRODUCTIVITY',
      items: [
        { id: 'tasks', label: 'Task Manager', icon: CheckSquare },
        { id: 'planner', label: 'AI Study Planner', icon: Sparkles, badge: 'AI' },
        { id: 'focus', label: 'Focus Mode (Pomodoro)', icon: Timer },
        { id: 'goals', label: 'Goals & Badges', icon: Target },
      ],
    },
    {
      title: 'AI INSIGHTS',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'ai-semester-analysis', label: 'Semester Analysis', icon: BrainCircuit, badge: 'AI' },
        { id: 'ai-study-assistant', label: 'AI Study Tutor', icon: Sparkles, badge: 'AI' },
      ],
    },
    {
      title: 'COMMUNITY & SYSTEM',
      items: [
        { id: 'community', label: 'Student Community', icon: Users },
        { id: 'settings', label: 'Settings & Export', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-zinc-800 bg-[#0A0A0B] text-zinc-300 shrink-0">
      {/* Brand Header */}
      <div className="flex flex-col overflow-hidden flex-1">
        <div className="flex h-16 items-center gap-3 border-b border-zinc-800/80 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg shadow-lg shadow-indigo-500/20">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">CampusPilot</h1>
            <p className="text-[10px] font-medium text-indigo-400">AI Student OS</p>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="custom-scrollbar flex-1 overflow-y-auto p-3 space-y-5">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                {group.title}
              </p>
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? 'sidebar-active text-white font-semibold'
                        : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 transition-transform group-hover:scale-105 ${isActive ? 'text-indigo-400' : 'text-zinc-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded px-1.5 py-0.5 text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Profile Mini-Widget */}
      <div className="border-t border-zinc-800 p-3 bg-zinc-950/80">
        <div className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 p-2.5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="relative shrink-0">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-9 w-9 rounded-lg object-cover ring-1 ring-indigo-500/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
            </div>
            <div className="overflow-hidden text-left">
              <p className="truncate text-xs font-semibold text-white">{user.name}</p>
              <p className="truncate text-[10px] text-zinc-500">{user.department} • Sem {user.semester}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('settings')}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
