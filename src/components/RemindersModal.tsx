import React, { useState } from 'react';
import { Bell, X, Check, Plus, Trash2, Calendar, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RemindersModal: React.FC = () => {
  const {
    isRemindersOpen,
    setIsRemindersOpen,
    reminders,
    addReminder,
    toggleReminder,
    deleteReminder,
  } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'assignment' | 'task' | 'exam' | 'study' | 'attendance'>('study');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('08:00 PM');

  if (!isRemindersOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addReminder({ title, category, date, time });
    setTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h2 className="font-bold text-base">Academic Reminders & Alerts</h2>
          </div>
          <button
            onClick={() => setIsRemindersOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Create Reminder Form */}
          <form onSubmit={handleCreate} className="space-y-3 rounded-xl bg-slate-50 p-3.5 border border-slate-200/80 dark:bg-slate-800/50 dark:border-slate-800">
            <input
              type="text"
              placeholder="Add reminder (e.g., Study Graph Algorithms)..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <div className="grid grid-cols-3 gap-2">
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium dark:border-slate-700 dark:bg-slate-900"
              >
                <option value="study">Study</option>
                <option value="assignment">Assignment</option>
                <option value="exam">Exam</option>
                <option value="task">Task</option>
                <option value="attendance">Attendance</option>
              </select>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium dark:border-slate-700 dark:bg-slate-900"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-1 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-500"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </form>

          {/* List of Reminders */}
          <div className="custom-scrollbar max-h-60 overflow-y-auto space-y-2">
            {reminders.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">No active reminders set.</p>
            ) : (
              reminders.map(rem => (
                <div
                  key={rem.id}
                  className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                    rem.completed
                      ? 'border-slate-200/50 bg-slate-50/50 opacity-60 dark:border-slate-800/50 dark:bg-slate-900/30'
                      : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleReminder(rem.id)}
                      className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                        rem.completed
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {rem.completed && <Check className="h-3.5 w-3.5" />}
                    </button>
                    <div>
                      <p className={`text-xs font-bold ${rem.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {rem.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="capitalize text-purple-600 dark:text-purple-400 font-medium">{rem.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{rem.date}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteReminder(rem.id)}
                    className="rounded-lg p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
