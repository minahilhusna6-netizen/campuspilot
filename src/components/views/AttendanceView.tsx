import React from 'react';
import { PieChart, AlertTriangle, CheckCircle2, XCircle, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AttendanceView: React.FC = () => {
  const { attendance, subjects, logAttendance } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <PieChart className="h-6 w-6 text-emerald-500" />
          Attendance Tracker & Eligibility
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Track subject-wise class presence, minimum threshold margin (75%), and calculate safe absences.
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {attendance.map(att => {
          const sub = subjects.find(s => s.id === att.subjectId);
          const pct = Math.round((att.attendedClasses / att.totalClasses) * 100);
          const isDanger = pct < att.targetPercentage;

          // Calculate safe skips or needed classes to reach target threshold
          // Target formula: (attended + needed) / (total + needed) >= target / 100
          // 100 * attended + 100 * needed >= target * total + target * needed
          // needed * (100 - target) >= target * total - 100 * attended
          const neededClasses = Math.max(
            0,
            Math.ceil((att.targetPercentage * att.totalClasses - 100 * att.attendedClasses) / (100 - att.targetPercentage))
          );

          const safeSkips = Math.max(
            0,
            Math.floor((100 * att.attendedClasses - att.targetPercentage * att.totalClasses) / att.targetPercentage)
          );

          return (
            <div
              key={att.id}
              className={`flex flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-sm transition-all bg-white dark:bg-slate-900 ${
                isDanger ? 'border-rose-300 dark:border-rose-900/60' : 'border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg px-2.5 py-1 text-xs font-bold text-white" style={{ backgroundColor: sub?.color || '#10B981' }}>
                    {sub?.code}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isDanger ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {pct}% Attended
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">{sub?.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {att.attendedClasses} / {att.totalClasses} total lectures conducted
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isDanger ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>Target Threshold: {att.targetPercentage}%</span>
                    <span>{pct}% Current</span>
                  </div>
                </div>

                {/* AI Advice Box */}
                <div className={`rounded-xl p-3 text-xs leading-relaxed ${
                  isDanger
                    ? 'bg-rose-50 text-rose-900 border border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900/40'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/40'
                }`}>
                  {isDanger ? (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                      <div>
                        <p className="font-bold">Attendance Warning!</p>
                        <p className="mt-0.5">You must attend the next <strong>{neededClasses} consecutive classes</strong> to reach {att.targetPercentage}% target requirement.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-bold">Safe Eligibility</p>
                        <p className="mt-0.5">You can safely miss up to <strong>{safeSkips} upcoming lectures</strong> while staying above {att.targetPercentage}%.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Log Attendance Buttons */}
              <div className="flex items-center gap-2 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => logAttendance(att.id, true)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Attended
                </button>
                <button
                  onClick={() => logAttendance(att.id, false)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:border-slate-800 dark:bg-slate-800 dark:text-rose-400"
                >
                  <XCircle className="h-4 w-4" />
                  Absent
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
