import React, { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, User, Building, Award, Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Subject } from '../../types';

export const SubjectManagerView: React.FC = () => {
  const { subjects, addSubject, editSubject, deleteSubject } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    teacher: '',
    room: '',
    credits: 3,
    semester: 5,
    color: '#8B5CF6',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      code: '',
      name: '',
      teacher: '',
      room: '',
      credits: 3,
      semester: 5,
      color: '#8B5CF6',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sub: Subject) => {
    setEditingId(sub.id);
    setFormData({
      code: sub.code,
      name: sub.name,
      teacher: sub.teacher,
      room: sub.room,
      credits: sub.credits,
      semester: sub.semester,
      color: sub.color,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim() || !formData.name.trim()) return;

    if (editingId) {
      editSubject(editingId, formData);
    } else {
      addSubject(formData);
    }
    setIsModalOpen(false);
  };

  const totalCredits = subjects.reduce((acc, curr) => acc + curr.credits, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            Subject Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Organize registered courses, faculty info, credit hours, and classroom locations ({subjects.length} Subjects • {totalCredits} Total Credits).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add New Subject
        </button>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map(sub => (
          <div
            key={sub.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Top Color Accent */}
            <div className="absolute left-0 top-0 h-1.5 w-full" style={{ backgroundColor: sub.color }} />

            <div className="space-y-3">
              <div className="flex items-center justify-between pt-1">
                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: sub.color }}
                >
                  {sub.code}
                </span>
                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEdit(sub)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => deleteSubject(sub.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">{sub.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                  <User className="h-3.5 w-3.5 text-purple-500" />
                  {sub.teacher}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
                  <Building className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">{sub.room}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
                  <Award className="h-3.5 w-3.5 text-slate-400" />
                  <span>{sub.credits} Credits • Sem {sub.semester}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-base">{editingId ? 'Edit Subject' : 'Add New Subject'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Subject Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS301"
                    value={formData.code}
                    onChange={e => setFormData({ ...formData, code: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Badge Color</label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={e => setFormData({ ...formData, color: e.target.value })}
                    className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 p-1 cursor-pointer dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Subject Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Structures & Algorithms"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Professor / Instructor</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Evelyn Harper"
                  value={formData.teacher}
                  onChange={e => setFormData({ ...formData, teacher: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Classroom</label>
                  <input
                    type="text"
                    placeholder="e.g. Hall 104"
                    value={formData.room}
                    onChange={e => setFormData({ ...formData, room: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Credit Hours</label>
                  <input
                    type="number"
                    value={formData.credits}
                    onChange={e => setFormData({ ...formData, credits: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Semester</label>
                  <input
                    type="number"
                    value={formData.semester}
                    onChange={e => setFormData({ ...formData, semester: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500"
                >
                  <Check className="h-4 w-4" />
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
