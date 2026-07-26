import React, { useState } from 'react';
import { Award, Plus, Trash2, Calculator, TrendingUp, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GpaCalculatorView: React.FC = () => {
  const { subjects, user } = useApp();

  const gradeMap: Record<string, number> = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0,
  };

  const [courses, setCourses] = useState(
    subjects.map(s => ({
      id: s.id,
      name: s.name,
      credits: s.credits,
      grade: 'A',
    }))
  );

  const [targetGpa, setTargetGpa] = useState(3.8);

  const calculateGpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      const g = gradeMap[c.grade] || 4.0;
      totalPoints += g * c.credits;
      totalCredits += c.credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '4.00';
  };

  const currentGpa = parseFloat(calculateGpa());

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        id: `custom-course-${Date.now()}`,
        name: 'Elective Course',
        credits: 3,
        grade: 'A',
      },
    ]);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          GPA & Target Grade Calculator
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Calculate current semester GPA, projection for target CGPA, and grade weighting requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course Grade Matrix Table (8 Cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Semester Course Grade Table</h3>
            <button
              onClick={handleAddCourse}
              className="flex items-center gap-1 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-500"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Extra Course
            </button>
          </div>

          <div className="space-y-2.5">
            {courses.map(c => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="flex-1 mr-4">
                  <input
                    type="text"
                    value={c.name}
                    onChange={e => {
                      const updated = courses.map(item => item.id === c.id ? { ...item, name: e.target.value } : item);
                      setCourses(updated);
                    }}
                    className="w-full bg-transparent font-bold text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-400">Credits:</span>
                    <input
                      type="number"
                      value={c.credits}
                      onChange={e => {
                        const updated = courses.map(item => item.id === c.id ? { ...item, credits: parseInt(e.target.value) || 1 } : item);
                        setCourses(updated);
                      }}
                      className="w-12 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-center dark:border-slate-700 dark:bg-slate-900"
                    />
                  </div>

                  <select
                    value={c.grade}
                    onChange={e => {
                      const updated = courses.map(item => item.id === c.id ? { ...item, grade: e.target.value } : item);
                      setCourses(updated);
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-extrabold text-purple-600 dark:border-slate-700 dark:bg-slate-900"
                  >
                    {Object.keys(gradeMap).map(g => (
                      <option key={g} value={g}>{g} ({gradeMap[g]})</option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleDeleteCourse(c.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results & Target Predictor (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
          <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-center text-white shadow-lg shadow-purple-500/20 space-y-1">
            <p className="text-xs uppercase font-bold text-purple-200">Calculated Semester GPA</p>
            <p className="text-4xl font-extrabold">{currentGpa}</p>
            <p className="text-[10px] text-purple-100 pt-1">
              {currentGpa >= 3.8 ? '🌟 First Class Honors' : currentGpa >= 3.0 ? '👍 Good Standing' : '⚠️ Academic Advisory'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase">Target CGPA Goal</h4>
            <div>
              <label className="text-xs text-slate-500">Target Grade Point Average</label>
              <input
                type="number"
                step="0.01"
                min="0.0"
                max="4.0"
                value={targetGpa}
                onChange={e => setTargetGpa(parseFloat(e.target.value) || 3.0)}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-extrabold dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div className="rounded-xl bg-purple-50 p-3 border border-purple-200 text-xs text-purple-900 dark:bg-purple-950/30 dark:border-purple-900/40 dark:text-purple-200 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                AI Target Advice
              </p>
              <p className="text-[11px] leading-relaxed">
                To achieve a {targetGpa} CGPA, ensure at least 2 courses maintain A grades in core 4-credit subjects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
