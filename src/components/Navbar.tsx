import React from 'react';
import {
  Search,
  Camera,
  Bell,
  Sparkles,
  Sun,
  Moon,
  Plus,
  UserCheck,
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    user,
    theme,
    toggleTheme,
    setIsSearchOpen,
    setIsCameraOpen,
    setIsRemindersOpen,
    setIsAiAssistantOpen,
    setIsAuthModalOpen,
    reminders,
    setActiveTab,
  } = useApp();

  const pendingRemindersCount = reminders.filter(r => !r.completed).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#0A0A0B]/80 sm:px-6">
      {/* Search trigger & Mobile brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100/70 px-3 py-1.5 text-xs text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-zinc-700 sm:w-64"
        >
          <Search className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
          <span className="hidden sm:inline">Search anything... (Cmd + K)</span>
          <span className="sm:hidden">Search...</span>
        </button>

        {/* Learning Streak Pill */}
        <div
          onClick={() => setActiveTab('analytics')}
          className="hidden cursor-pointer items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 transition-all hover:bg-amber-500/20 dark:text-amber-400 md:flex"
        >
          <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 animate-pulse" />
          <span>{user.learningStreakDays} Day Streak</span>
        </div>
      </div>

      {/* Quick Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Camera Scan Notes */}
        <button
          onClick={() => setIsCameraOpen(true)}
          className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition-all hover:bg-indigo-100 dark:border-indigo-800/50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
          title="Scan Notes with Camera"
        >
          <Camera className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span className="hidden md:inline">Scan Notes</span>
        </button>

        {/* AI Study Assistant Quick Trigger */}
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="flex items-center gap-1.5 rounded-xl gradient-bg px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:opacity-95"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">AI Tutor</span>
        </button>

        {/* Reminders Bell */}
        <button
          onClick={() => setIsRemindersOpen(true)}
          className="relative rounded-xl border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          title="Reminders"
        >
          <Bell className="h-4 w-4" />
          {pendingRemindersCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              {pendingRemindersCount}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          title="Toggle Dark/Light Mode"
        >
          {theme === 'light' ? <Moon className="h-4 w-4 text-slate-700" /> : <Sun className="h-4 w-4 text-amber-400" />}
        </button>

        {/* User Profile Pill */}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 p-1 pr-3 transition-colors hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-800"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-8 w-8 rounded-lg object-cover ring-2 ring-indigo-500/30"
          />
          <div className="hidden text-left sm:block">
            <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">{user.name}</p>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">GPA: {user.gpa}</p>
          </div>
        </button>
      </div>
    </header>
  );
};
