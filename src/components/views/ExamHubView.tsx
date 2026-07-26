import React, { useState } from 'react';
import { GraduationCap, Clock, Plus, Sparkles, Trophy, AlertTriangle, Calendar, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Exam } from '../../types';

export const ExamHubView: React.FC = () => {
  const { exams, subjects, addExam } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subjectId: subjects[0]?.id || '',
    title: 'Midterm Examination',
    date: '2026-08-15',
    time: '10:00 AM',
    room: 'Hall 101',
    topics: 'Chapters 1-5, Graph Algorithms, Memory Paging',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addExam({
      ...formData,
      status: 'upcoming',
      targetScore: 90,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-amber-500" />
            Exam Preparation Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Live countdown timers, syllabus coverage checklists, and grade prediction tools.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 hover:bg-amber-400 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Exam Schedule
        </button>
      </div>

      {/* Grid of Upcoming Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exams.map(ex => {
          const sub = subjects.find(s => s.id === ex.subjectId);
          return (
            <div
              key={ex.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-200/80 bg-white p-5 shadow-sm dark:border-amber-900/30 dark:bg-slate-900"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {sub?.code || 'EXAM'}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-extrabold text-rose-500">
                    <Clock className="h-3.5 w-3.5" />
                    {ex.date}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">{ex.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub?.name} • Room {ex.room}</p>
                </div>

                {ex.topics && (
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/60 dark:bg-slate-800/40 dark:border-slate-800">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Syllabus Topics</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">{ex.topics}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Target Score: {ex.targetScore}%</span>
                <button
                  onClick={() => alert(`Generated revision checklist for ${ex.title}`)}
                  className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300"
                >
                  <Sparkles className="h-3 w-3" />
                  AI Revision Kit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Exam Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-base">Schedule Exam</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Exam Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Classroom / Room</label>
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Exam Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Syllabus Coverage</label>
                <textarea
                  rows={2}
                  value={formData.topics}
                  onChange={e => setFormData({ ...formData, topics: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
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
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-amber-500/20 hover:bg-amber-400"
                >
                  Save Exam Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
