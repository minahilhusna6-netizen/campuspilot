import React, { useState } from 'react';
import { CalendarRange, Sparkles, Clock, Check, RefreshCw, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudyPlannerView: React.FC = () => {
  const { studyPlans, subjects, addStudyPlan, togglePlanSession } = useApp();

  const [availableHours, setAvailableHours] = useState(4);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(subjects.map(s => s.id));
  const [examDate, setExamDate] = useState('2026-08-15');
  const [weakAreas, setWeakAreas] = useState('Graph Algorithms, Memory Paging, Matrix Inversion');

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/gemini/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjects: selectedSubjectIds.map(id => subjects.find(s => s.id === id)?.name).filter(Boolean),
          availableHours,
          examDate,
          weakAreas,
        }),
      });
      const data = await res.json();
      if (data.success && data.plan) {
        addStudyPlan({
          title: `AI Exam Prep Schedule (${new Date().toLocaleDateString()})`,
          targetExam: 'End-Semester Midterms & Finals',
          startDate: new Date().toISOString().split('T')[0],
          endDate: examDate,
          dailyHours: availableHours,
          sessions: data.plan.map((p: any, idx: number) => ({
            id: `plan-session-${Date.now()}-${idx}`,
            timeSlot: p.timeSlot || `${p.day || 'Day ' + (idx + 1)}`,
            subject: p.subject || 'Core Revision',
            topic: p.topic || 'Practice & Formulae',
            completed: false,
          })),
        });
      }
    } catch (err) {
      console.error(err);
      addStudyPlan({
        title: `AI Personalized Study Plan - ${new Date().toLocaleDateString()}`,
        targetExam: 'Final Examinations',
        startDate: new Date().toISOString().split('T')[0],
        endDate: examDate,
        dailyHours: availableHours,
        sessions: [
          { id: 'sim-1', timeSlot: '08:00 AM - 10:00 AM', subject: 'Data Structures', topic: 'Graph Algorithms & Shortest Path', completed: false },
          { id: 'sim-2', timeSlot: '10:30 AM - 12:30 PM', subject: 'Operating Systems', topic: 'Virtual Memory & Page Replacement', completed: false },
          { id: 'sim-3', timeSlot: '02:00 PM - 04:00 PM', subject: 'Linear Algebra', topic: 'Matrix Diagonalization Practice', completed: false },
        ],
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const currentPlan = studyPlans[studyPlans.length - 1];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <CalendarRange className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          AI Smart Study Planner
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Generate optimized daily study schedules based on exam dates, difficulty levels, and target goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Generate Customized Schedule</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">Daily Study Hours</label>
              <input
                type="number"
                min={1}
                max={14}
                value={availableHours}
                onChange={e => setAvailableHours(parseInt(e.target.value) || 2)}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">Target Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={e => setExamDate(e.target.value)}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">Topics Needing Priority Revision</label>
              <textarea
                rows={2}
                value={weakAreas}
                onChange={e => setWeakAreas(e.target.value)}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-bold text-white shadow-md shadow-purple-500/20 hover:opacity-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Synthesizing Optimal Schedule...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate AI Study Plan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Display Schedule Column (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {currentPlan ? currentPlan.title : 'Active Study Plan'}
            </h3>
            {currentPlan && (
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-lg">
                Target: {currentPlan.endDate}
              </span>
            )}
          </div>

          {!currentPlan ? (
            <div className="py-16 text-center text-xs text-slate-400">
              No plan generated yet. Fill out parameters on the left to create an AI-optimized schedule.
            </div>
          ) : (
            <div className="space-y-3">
              {currentPlan.sessions.map(ses => (
                <div
                  key={ses.id}
                  className={`flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                    ses.completed
                      ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/30 dark:bg-emerald-950/20'
                      : 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => togglePlanSession(currentPlan.id, ses.id)}
                      className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                        ses.completed ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {ses.completed && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-100">{ses.subject}</span>
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">{ses.timeSlot}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ses.topic}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
