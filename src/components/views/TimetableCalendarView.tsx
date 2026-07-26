import React, { useState } from 'react';
import { CalendarDays, Clock, Plus, Trash2, BookOpen, GraduationCap, FileCheck2, CheckSquare, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TimetableCalendarView: React.FC = () => {
  const { classes, subjects, assignments, exams, tasks, addClassSession, deleteClassSession } = useApp();

  const [viewMode, setViewMode] = useState<'timetable' | 'calendar'>('timetable');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const [formData, setFormData] = useState({
    subjectId: subjects[0]?.id || '',
    dayOfWeek: 'Monday' as any,
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    room: 'Hall 101',
    teacher: 'Dr. Evelyn Harper',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addClassSession(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            Timetable & Interactive Calendar
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Weekly class schedule matrix, classroom map, and interactive calendar overview.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('timetable')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === 'timetable' ? 'bg-white text-purple-600 shadow dark:bg-slate-900 dark:text-purple-400' : 'text-slate-500'
              }`}
            >
              Weekly Schedule
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === 'calendar' ? 'bg-white text-purple-600 shadow dark:bg-slate-900 dark:text-purple-400' : 'text-slate-500'
              }`}
            >
              Calendar View
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500"
          >
            <Plus className="h-4 w-4" />
            Add Class Slot
          </button>
        </div>
      </div>

      {viewMode === 'timetable' ? (
        /* Weekly Matrix */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {days.map(day => {
            const dayClasses = classes.filter(c => c.dayOfWeek === day);
            return (
              <div
                key={day}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between min-h-[360px]"
              >
                <div className="space-y-3">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
                    <h3 className="font-bold text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider">{day}</h3>
                    <span className="text-[10px] font-semibold text-slate-400">{dayClasses.length} Classes</span>
                  </div>

                  <div className="space-y-2.5">
                    {dayClasses.map(cls => {
                      const sub = subjects.find(s => s.id === cls.subjectId);
                      return (
                        <div
                          key={cls.id}
                          className="group relative rounded-xl border p-3 transition-all hover:shadow-md"
                          style={{ borderColor: `${sub?.color || '#8B5CF6'}40`, backgroundColor: `${sub?.color || '#8B5CF6'}10` }}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-extrabold text-[11px] text-slate-800 dark:text-slate-100">{sub?.code}</span>
                            <button
                              onClick={() => deleteClassSession(cls.id)}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="font-bold text-xs text-slate-700 dark:text-slate-200 mt-0.5">{sub?.name}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                            <Clock className="h-3 w-3 text-purple-500" />
                            <span>{cls.startTime} - {cls.endTime}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{cls.room}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Interactive Monthly Calendar */
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">August 2026</h3>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500" /> Assignments</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Exams</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Tasks</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 py-2 border-b border-slate-100 dark:border-slate-800">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          {/* Calendar Day Matrix Grid */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => i + 1).map(dayNum => {
              const dateStr = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              const dayAsgs = assignments.filter(a => a.dueDate === dateStr);
              const dayExams = exams.filter(e => e.date === dateStr);
              return (
                <div
                  key={dayNum}
                  className="min-h-[70px] rounded-xl border border-slate-100 p-1.5 dark:border-slate-800/80 hover:border-purple-300 transition-colors"
                >
                  <span className="text-[10px] font-bold text-slate-400">{dayNum}</span>
                  <div className="space-y-1 mt-1">
                    {dayAsgs.map(a => (
                      <div key={a.id} className="rounded bg-indigo-500/10 px-1 py-0.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-300 truncate">
                        {a.title}
                      </div>
                    ))}
                    {dayExams.map(e => (
                      <div key={e.id} className="rounded bg-amber-500/10 px-1 py-0.5 text-[9px] font-bold text-amber-600 dark:text-amber-300 truncate">
                        ⚠️ {e.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Class Slot Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-base">Add Timetable Class Slot</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Subject</label>
                <select
                  value={formData.subjectId}
                  onChange={e => setFormData({ ...formData, subjectId: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Day of Week</label>
                  <select
                    value={formData.dayOfWeek}
                    onChange={e => setFormData({ ...formData, dayOfWeek: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  >
                    {days.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Classroom</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={e => setFormData({ ...formData, room: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Start Time</label>
                  <input
                    type="text"
                    value={formData.startTime}
                    onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">End Time</label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
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
                  Save Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
