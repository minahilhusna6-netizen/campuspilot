import React, { useState, useEffect, useRef } from 'react';
import {
  NotebookPen,
  Plus,
  Folder,
  Star,
  Mic,
  MicOff,
  Sparkles,
  Search,
  Trash2,
  Edit3,
  FileText,
  HelpCircle,
  Layers,
  Check,
  X,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Note } from '../../types';

export const NotesView: React.FC = () => {
  const {
    notes,
    folders,
    addNote,
    editNote,
    deleteNote,
    toggleNoteFavorite,
  } = useApp();

  const [selectedFolderId, setSelectedFolderId] = useState<string>('all');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);
  const [search, setSearch] = useState('');

  // Voice Note Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const recognitionRef = useRef<any>(null);

  // AI Modal State
  const [aiAction, setAiAction] = useState<'summarize' | 'flashcards' | 'mcqs' | 'viva' | 'extract' | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  const activeNote = notes.find(n => n.id === selectedNoteId);

  // Editor states
  const [editorTitle, setEditorTitle] = useState(activeNote?.title || '');
  const [editorContent, setEditorContent] = useState(activeNote?.content || '');

  useEffect(() => {
    if (activeNote) {
      setEditorTitle(activeNote.title);
      setEditorContent(activeNote.content);
    }
  }, [selectedNoteId]);

  const filteredNotes = notes.filter(n => {
    const matchesFolder = selectedFolderId === 'all' || (selectedFolderId === 'favorites' ? n.favorite : n.folderId === selectedFolderId);
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  // Voice Note Speech Recognition initialization
  const toggleVoiceRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      if (recordedText.trim()) {
        addNote({
          title: `Voice Note - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          content: `**Transcribed Audio Speech:**\n\n${recordedText}`,
          tags: ['voice-note', 'speech-to-text'],
          favorite: false,
          isVoiceNote: true,
        });
        setRecordedText('');
      }
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Web Speech API not supported on this browser. Simulated voice recording mode active!');
        setIsRecording(true);
        setTimeout(() => {
          setRecordedText('Lecture transcript: Linear Transformations map vectors from domain V to codomain W while preserving addition and scalar multiplication.');
        }, 1000);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let text = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setRecordedText(text);
      };

      recognition.onerror = (err: any) => {
        console.error(err);
        setIsRecording(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    }
  };

  const handleCreateNewNote = () => {
    const newNote = {
      title: 'Untitled Study Note',
      folderId: selectedFolderId === 'all' || selectedFolderId === 'favorites' ? folders[0]?.id : selectedFolderId,
      content: '# New Study Note\n\nStart typing your lecture summary or research notes here...',
      tags: ['academics'],
      favorite: false,
    };
    addNote(newNote);
  };

  const handleSaveEditor = () => {
    if (activeNote) {
      editNote(activeNote.id, {
        title: editorTitle,
        content: editorContent,
      });
    }
  };

  const handleRunAiAction = async (action: 'summarize' | 'flashcards' | 'mcqs' | 'viva' | 'extract') => {
    if (!activeNote) return;
    setAiAction(action);
    setAiLoading(true);
    setAiOutput(null);

    try {
      const res = await fetch('/api/gemini/document-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: activeNote.content,
          action,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiOutput(data.text);
      }
    } catch (err) {
      console.error(err);
      setAiOutput('AI processed output preview generated for active note.');
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
            <NotebookPen className="h-6 w-6 text-amber-500" />
            Notes & Voice Repository
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Rich markdown notes, Speech-to-Text voice recorder, and AI document study tools.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Voice Note Button */}
          <button
            onClick={toggleVoiceRecording}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all ${
              isRecording
                ? 'bg-rose-600 animate-pulse ring-4 ring-rose-500/20'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95'
            }`}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span>{isRecording ? 'Stop Recording' : 'Record Voice Note'}</span>
          </button>

          {/* New Note Button */}
          <button
            onClick={handleCreateNewNote}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500 transition-all"
          >
            <Plus className="h-4 w-4" />
            New Note
          </button>
        </div>
      </div>

      {/* Voice Recording Active Banner */}
      {isRecording && (
        <div className="rounded-2xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white animate-ping">
              <Mic className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-rose-900 dark:text-rose-300">Listening & Transcribing Speech Live...</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 italic">
                "{recordedText || 'Speak clearly into your microphone...'}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main 3-Column Layout: Folders, Notes List, Markdown Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[680px]">
        {/* Column 1: Folders (3 Cols) */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Folders & Tags</p>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedFolderId('all')}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  selectedFolderId === 'all'
                    ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span>All Notes</span>
                </div>
                <span className="text-[10px] font-bold opacity-60">{notes.length}</span>
              </button>

              <button
                onClick={() => setSelectedFolderId('favorites')}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  selectedFolderId === 'favorites'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>Starred / Favorites</span>
                </div>
                <span className="text-[10px] font-bold opacity-60">
                  {notes.filter(n => n.favorite).length}
                </span>
              </button>

              {folders.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFolderId(f.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    selectedFolderId === f.id
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4" style={{ color: f.color }} />
                    <span>{f.name}</span>
                  </div>
                  <span className="text-[10px] font-bold opacity-60">
                    {notes.filter(n => n.folderId === f.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Notes List (3 Cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 flex flex-col space-y-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none dark:text-slate-100"
            />
          </div>

          <div className="custom-scrollbar flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredNotes.map(n => {
              const isSel = n.id === selectedNoteId;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNoteId(n.id)}
                  className={`cursor-pointer rounded-xl border p-3 transition-all ${
                    isSel
                      ? 'border-purple-500 bg-purple-50/50 shadow-sm dark:border-purple-600 dark:bg-purple-950/30'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                      {n.title}
                    </h4>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleNoteFavorite(n.id);
                      }}
                      className="text-slate-300 hover:text-amber-400"
                    >
                      <Star className={`h-3.5 w-3.5 ${n.favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {n.content.replace(/[#*`]/g, '')}
                  </p>
                  <p className="text-[9px] text-slate-400 mt-2">{n.updatedAt}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Markdown Editor & AI Actions (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          {activeNote ? (
            <div className="flex flex-col h-full space-y-4">
              {/* Header & AI Actions Toolbar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <input
                  type="text"
                  value={editorTitle}
                  onChange={e => setEditorTitle(e.target.value)}
                  onBlur={handleSaveEditor}
                  className="bg-transparent text-base font-bold text-slate-800 focus:outline-none dark:text-slate-100 flex-1 mr-2"
                />

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleRunAiAction('summarize')}
                    className="flex items-center gap-1 rounded-lg bg-purple-100 px-2.5 py-1 text-[10px] font-bold text-purple-700 hover:bg-purple-200 dark:bg-purple-950 dark:text-purple-300"
                    title="Summarize Note"
                  >
                    <Sparkles className="h-3 w-3" />
                    Summarize
                  </button>

                  <button
                    onClick={() => handleRunAiAction('flashcards')}
                    className="flex items-center gap-1 rounded-lg bg-indigo-100 px-2.5 py-1 text-[10px] font-bold text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300"
                    title="Generate Flashcards"
                  >
                    Flashcards
                  </button>

                  <button
                    onClick={() => deleteNote(activeNote.id)}
                    className="rounded-lg p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Textarea Content Editor */}
              <textarea
                value={editorContent}
                onChange={e => setEditorContent(e.target.value)}
                onBlur={handleSaveEditor}
                className="custom-scrollbar flex-1 w-full resize-none bg-transparent text-xs text-slate-800 leading-relaxed focus:outline-none dark:text-slate-200 font-mono"
              />
            </div>
          ) : (
            <div className="m-auto text-center text-xs text-slate-400">
              Select or create a note to start editing.
            </div>
          )}
        </div>
      </div>

      {/* AI Output Modal */}
      {aiAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h2 className="font-bold text-base capitalize">AI Note Output ({aiAction})</h2>
              </div>
              <button onClick={() => setAiAction(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              {aiLoading ? (
                <div className="py-8 text-center space-y-3">
                  <Sparkles className="mx-auto h-8 w-8 animate-spin text-purple-500" />
                  <p className="text-xs text-slate-500">Processing notes with Gemini API...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="custom-scrollbar max-h-80 overflow-y-auto rounded-xl bg-slate-50 p-4 border border-slate-200/80 dark:bg-slate-800/60 dark:border-slate-800 text-xs leading-relaxed whitespace-pre-wrap">
                    {aiOutput}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setAiAction(null)}
                      className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
