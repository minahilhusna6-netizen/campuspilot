import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Kanban,
  List,
  Trash2,
  Edit2,
  Clock,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Task, Priority, TaskStatus } from '../../types';

export const TaskManagerView: React.FC = () => {
  const { tasks, subjects, addTask, toggleTaskStatus, editTask, deleteTask } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subjectId: subjects[0]?.id || '',
    priority: 'Medium' as Priority,
    dueDate: new Date().toISOString().split('T')[0],
    status: 'todo' as TaskStatus,
    category: 'Study',
  });

  const columns: { key: TaskStatus; label: string; color: string }[] = [
    { key: 'todo', label: 'To Do', color: 'border-slate-300 dark:border-slate-700' },
    { key: 'in_progress', label: 'In Progress', color: 'border-blue-500' },
    { key: 'completed', label: 'Completed', color: 'border-emerald-500' },
  ];

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const handleOpenAdd = (defaultStatus: TaskStatus = 'todo') => {
    setEditingId(null);
    setFormData({
      title: '',
      subjectId: subjects[0]?.id || '',
      priority: 'Medium',
      dueDate: new Date().toISOString().split('T')[0],
      status: defaultStatus,
      category: 'Study',
    });
    setIsModalOpen(true);
  };

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      editTask(editingId, formData);
    } else {
      addTask(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Task Manager & Kanban Board
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Organize daily study tasks, revision goals, project sub-items with priority tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`rounded-lg p-2 transition-all ${viewMode === 'kanban' ? 'bg-white text-indigo-600 shadow dark:bg-slate-900 dark:text-indigo-400' : 'text-slate-500'}`}
              title="Kanban Board View"
            >
              <Kanban className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-lg p-2 transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow dark:bg-slate-900 dark:text-indigo-400' : 'text-slate-500'}`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => handleOpenAdd('todo')}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4" />
            New Task
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none dark:text-slate-100"
        />
      </div>

      {viewMode === 'kanban' ? (
        /* Kanban Columns Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.key);
            return (
              <div
                key={col.key}
                className={`rounded-2xl border-t-4 border-x border-b border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 min-h-[420px] flex flex-col justify-between ${col.color}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase">{col.label}</h3>
                    <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {colTasks.map(t => {
                      const sub = subjects.find(s => s.id === t.subjectId);
                      return (
                        <div
                          key={t.id}
                          className="group relative rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 shadow-sm transition-all hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-800/40"
                        >
                          <div className="flex items-start justify-between">
                            <span className="inline-block rounded px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: sub?.color || '#6366F1' }}>
                              {sub?.code || t.category}
                            </span>
                            <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                              <button onClick={() => deleteTask(t.id)} className="text-slate-400 hover:text-rose-500">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <h4 className={`font-bold text-xs mt-2 ${t.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                            {t.title}
                          </h4>

                          <div className="flex items-center justify-between pt-3 mt-1 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Due {t.dueDate}</span>
                            <button
                              onClick={() => toggleTaskStatus(t.id)}
                              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              {t.status === 'completed' ? 'Reopen' : t.status === 'todo' ? 'Start' : 'Complete'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAdd(col.key)}
                  className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 py-2 text-xs font-bold text-slate-500 hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add to {col.label}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-2">
          {filteredTasks.map(t => (
            <div key={t.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTaskStatus(t.id)}
                  className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                    t.status === 'completed' ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {t.status === 'completed' && <CheckCircle2 className="h-4 w-4" />}
                </button>
                <span className={`text-xs font-bold ${t.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                  {t.title}
                </span>
              </div>
              <button onClick={() => deleteTask(t.id)} className="text-slate-400 hover:text-rose-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Task */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-base">New Study Task</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate} className="p-5 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read Chapter 4 & Solve Practice Set"
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
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
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
