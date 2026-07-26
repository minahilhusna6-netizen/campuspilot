import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Trash2,
  Edit2,
  Bot,
  ListOrdered,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Assignment, Priority } from '../../types';

export const AssignmentManagerView: React.FC = () => {
  const {
    assignments,
    subjects,
    addAssignment,
    toggleAssignment,
    editAssignment,
    deleteAssignment,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'completed'>('pending');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // AI Drawer state
  const [aiActiveAsg, setAiActiveAsg] = useState<Assignment | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiData, setAiData] = useState<{
    explanation?: string;
    plan?: string[];
    estimatedHours?: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subjectId: subjects[0]?.id || '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'High' as Priority,
    estimatedHours: 4,
  });

  const filtered = assignments.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    const matchesSub = selectedSubject === 'all' || a.subjectId === selectedSubject;
    const matchesPrio = selectedPriority === 'all' || a.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || (selectedStatus === 'pending' ? !a.completed : a.completed);
    return matchesSearch && matchesSub && matchesPrio && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      subjectId: subjects[0]?.id || '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'High',
      estimatedHours: 4,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (asg: Assignment) => {
    setEditingId(asg.id);
    setFormData({
      title: asg.title,
      subjectId: asg.subjectId,
      description: asg.description,
      dueDate: asg.dueDate,
      priority: asg.priority,
      estimatedHours: asg.estimatedHours || 4,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      editAssignment(editingId, formData);
    } else {
      addAssignment({
        ...formData,
        completed: false,
      });
    }
    setIsModalOpen(false);
  };

  const handleRunAiHelper = async (asg: Assignment) => {
    setAiActiveAsg(asg);
    setAiLoading(true);
    setAiData(null);

    const sub = subjects.find(s => s.id === asg.subjectId);

    try {
      const res = await fetch('/api/gemini/assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: asg.title,
          description: asg.description,
          dueDate: asg.dueDate,
          subject: sub?.name || 'Academic Course',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiData({
          explanation: data.explanation,
          plan: data.plan,
          estimatedHours: data.estimatedHours,
        });

        // Save AI explanation back to assignment
        editAssignment(asg.id, {
          aiExplanation: data.explanation,
          aiPlan: data.plan,
        });
      }
    } catch (err) {
      console.error(err);
      setAiData({
        explanation: `This assignment focuses on practical application of concepts taught in ${sub?.name || 'course'}. Review lecture material and solve sample problems before drafting answers.`,
        plan: [
          'Step 1: Read specification thoroughly and highlight requirements.',
          'Step 2: Draft initial outline and pseudocode/structure.',
          'Step 3: Execute core solution and test edge cases.',
          'Step 4: Final formatting and submission.'
        ],
        estimatedHours: 'approx. 5.5 hours spread across 2 days',
      });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FileCheck2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Assignment Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track coursework deadlines, priority levels, AI explanation breakdowns, and completion schedules.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Assignment
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter assignments..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none dark:text-slate-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-medium dark:border-slate-800 dark:bg-slate-800"
          >
            <option value="all">All Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={e => setSelectedPriority(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-medium dark:border-slate-800 dark:bg-slate-800"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value as any)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-medium dark:border-slate-800 dark:bg-slate-800"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Only</option>
            <option value="completed">Completed Only</option>
          </select>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <FileCheck2 className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-700" />
            <p className="mt-2 text-xs font-semibold text-slate-500">No assignments match your criteria.</p>
          </div>
        ) : (
          filtered.map(asg => {
            const sub = subjects.find(s => s.id === asg.subjectId);
            return (
              <div
                key={asg.id}
                className={`group relative flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border p-4.5 transition-all shadow-sm ${
                  asg.completed
                    ? 'border-slate-200/60 bg-slate-50/60 opacity-75 dark:border-slate-800/60 dark:bg-slate-900/40'
                    : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-800'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleAssignment(asg.id)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                      asg.completed
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 hover:border-indigo-600 dark:border-slate-600'
                    }`}
                  >
                    {asg.completed && <CheckCircle2 className="h-4 w-4" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: sub?.color || '#3B82F6' }}>
                        {sub?.code || 'COURSE'}
                      </span>
                      <h3 className={`font-bold text-sm ${asg.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                        {asg.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        asg.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {asg.priority}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                      {asg.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-rose-500">
                        <Clock className="h-3.5 w-3.5" /> Due {asg.dueDate}
                      </span>
                      {asg.estimatedHours && (
                        <span>• Est: {asg.estimatedHours} Hours</span>
                      )}
                      {asg.attachments && asg.attachments.length > 0 && (
                        <span>• {asg.attachments.length} Attachment(s)</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* AI & Edit Actions */}
                <div className="flex items-center gap-2 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleRunAiHelper(asg)}
                    className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700 transition-all hover:bg-purple-100 dark:border-purple-800/60 dark:bg-purple-950/40 dark:text-purple-300"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                    <span>AI Assistant</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(asg)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => deleteAssignment(asg.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* AI Assistant Drawer Modal */}
      {aiActiveAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h2 className="font-bold text-base">AI Assignment Breakdown</h2>
              </div>
              <button onClick={() => setAiActiveAsg(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{aiActiveAsg.title}</h3>

              {aiLoading ? (
                <div className="py-8 text-center space-y-3">
                  <Sparkles className="mx-auto h-8 w-8 animate-spin text-purple-500" />
                  <p className="text-xs text-slate-500">Analyzing requirements & synthesizing completion strategy...</p>
                </div>
              ) : aiData ? (
                <div className="space-y-4 text-xs">
                  {/* AI Explanation */}
                  <div className="rounded-xl bg-purple-50/60 p-3.5 border border-purple-200/80 dark:bg-purple-950/30 dark:border-purple-900/40">
                    <p className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5 mb-1">
                      <FileText className="h-4 w-4" /> Concept Explanation
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{aiData.explanation}</p>
                  </div>

                  {/* Step by step plan */}
                  {aiData.plan && (
                    <div className="rounded-xl bg-indigo-50/60 p-3.5 border border-indigo-200/80 dark:bg-indigo-950/30 dark:border-indigo-900/40">
                      <p className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5 mb-2">
                        <ListOrdered className="h-4 w-4" /> Step-by-Step Execution Plan
                      </p>
                      <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                        {aiData.plan.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Estimated Time */}
                  {aiData.estimatedHours && (
                    <div className="rounded-xl bg-amber-50/60 p-3 border border-amber-200/80 dark:bg-amber-950/30 dark:border-amber-900/40 flex items-center justify-between">
                      <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <Clock className="h-4 w-4" /> Estimated Effort
                      </span>
                      <span className="font-semibold text-amber-900 dark:text-amber-200">{aiData.estimatedHours}</span>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-base">{editingId ? 'Edit Assignment' : 'Add New Assignment'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red-Black Tree Implementation"
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Description & Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Enter details, guidelines, or prompt..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Due Date</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Estimated Hours</label>
                  <input
                    type="number"
                    value={formData.estimatedHours}
                    onChange={e => setFormData({ ...formData, estimatedHours: parseFloat(e.target.value) || 1 })}
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
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
