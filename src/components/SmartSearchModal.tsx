import React, { useState } from 'react';
import { Search, X, BookOpen, FileCheck2, NotebookPen, FolderArchive, CheckSquare, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SmartSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    subjects,
    assignments,
    notes,
    files,
    tasks,
    setActiveTab,
  } = useApp();

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const filteredSubjects = subjects.filter(s =>
    s.name.toLowerCase().includes(query) || s.code.toLowerCase().includes(query) || s.teacher.toLowerCase().includes(query)
  );

  const filteredAssignments = assignments.filter(a =>
    a.title.toLowerCase().includes(query) || a.description.toLowerCase().includes(query)
  );

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query) || n.tags.some(t => t.toLowerCase().includes(query))
  );

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(query) || f.folderName.toLowerCase().includes(query)
  );

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(query)
  );

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-16 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search subjects, assignments, notes, files, tasks..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none dark:text-slate-100"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Results Container */}
        <div className="custom-scrollbar max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Type to search across all your subjects, notes, files, assignments, and tasks...
            </div>
          ) : (
            <>
              {/* Subjects */}
              {filteredSubjects.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subjects</p>
                  <div className="space-y-1">
                    {filteredSubjects.map(s => (
                      <div
                        key={s.id}
                        onClick={() => handleNavigate('subjects')}
                        className="flex cursor-pointer items-center justify-between rounded-xl p-2.5 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="h-4 w-4 text-purple-500" />
                          <div>
                            <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{s.code} - {s.name}</span>
                            <span className="ml-2 text-[10px] text-slate-400">{s.teacher}</span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignments */}
              {filteredAssignments.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assignments</p>
                  <div className="space-y-1">
                    {filteredAssignments.map(a => (
                      <div
                        key={a.id}
                        onClick={() => handleNavigate('assignments')}
                        className="flex cursor-pointer items-center justify-between rounded-xl p-2.5 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileCheck2 className="h-4 w-4 text-blue-500" />
                          <div>
                            <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{a.title}</span>
                            <span className="ml-2 text-[10px] text-slate-400">Due: {a.dueDate}</span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {filteredNotes.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Notes</p>
                  <div className="space-y-1">
                    {filteredNotes.map(n => (
                      <div
                        key={n.id}
                        onClick={() => handleNavigate('notes')}
                        className="flex cursor-pointer items-center justify-between rounded-xl p-2.5 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                      >
                        <div className="flex items-center gap-2.5">
                          <NotebookPen className="h-4 w-4 text-amber-500" />
                          <div>
                            <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{n.title}</span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files */}
              {filteredFiles.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Files</p>
                  <div className="space-y-1">
                    {filteredFiles.map(f => (
                      <div
                        key={f.id}
                        onClick={() => handleNavigate('files')}
                        className="flex cursor-pointer items-center justify-between rounded-xl p-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                      >
                        <div className="flex items-center gap-2.5">
                          <FolderArchive className="h-4 w-4 text-emerald-500" />
                          <div>
                            <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{f.name}</span>
                            <span className="ml-2 text-[10px] text-slate-400">({f.size})</span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {filteredTasks.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks</p>
                  <div className="space-y-1">
                    {filteredTasks.map(t => (
                      <div
                        key={t.id}
                        onClick={() => handleNavigate('tasks')}
                        className="flex cursor-pointer items-center justify-between rounded-xl p-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckSquare className="h-4 w-4 text-indigo-500" />
                          <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{t.title}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredSubjects.length === 0 &&
                filteredAssignments.length === 0 &&
                filteredNotes.length === 0 &&
                filteredFiles.length === 0 &&
                filteredTasks.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No matching items found for "{searchQuery}".
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
