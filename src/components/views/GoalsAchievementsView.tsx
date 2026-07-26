import React, { useState } from 'react';
import { Target, Trophy, Award, Plus, CheckCircle2, Flame, Star, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GoalsAchievementsView: React.FC = () => {
  const { goals, achievements, addGoal, toggleGoal } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState<'academic' | 'study' | 'attendance' | 'project'>('academic');
  const [targetDate, setTargetDate] = useState('2026-08-30');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;
    addGoal({
      title: goalTitle,
      category: goalCategory,
      targetDate,
    });
    setGoalTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            Goals & Gamified Badges
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Set semester targets, unlock academic achievement badges, and track long-term milestones.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500"
        >
          <Plus className="h-4 w-4" />
          Set New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Goals List (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" /> Academic Milestones
            </h3>
            <span className="text-xs text-slate-400">{goals.filter(g => g.completed).length}/{goals.length} Completed</span>
          </div>

          <div className="space-y-3">
            {goals.map(g => (
              <div
                key={g.id}
                className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                  g.completed
                    ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/30 dark:bg-emerald-950/20'
                    : 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleGoal(g.id)}
                    className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                      g.completed ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {g.completed && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                  <div>
                    <h4 className={`font-bold text-xs ${g.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                      {g.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 capitalize">{g.category} • Target: {g.targetDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Grid (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" /> Badges & Unlocks
            </h3>
            <span className="text-xs text-amber-500 font-bold">
              {achievements.filter(a => a.unlocked).length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {achievements.map(ach => (
              <div
                key={ach.id}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                  ach.unlocked
                    ? 'border-amber-300 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/30'
                    : 'border-slate-200/60 bg-slate-50/30 opacity-50 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div className="text-3xl mb-1">{ach.icon}</div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">{ach.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-base">Set Academic Goal</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Goal Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maintain > 3.8 GPA in Semester 5"
                  value={goalTitle}
                  onChange={e => setGoalTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                  <select
                    value={goalCategory}
                    onChange={e => setGoalCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="academic">Academic GPA</option>
                    <option value="study">Study Hours</option>
                    <option value="attendance">Attendance Target</option>
                    <option value="project">Project / Assignment</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Target Date</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={e => setTargetDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
