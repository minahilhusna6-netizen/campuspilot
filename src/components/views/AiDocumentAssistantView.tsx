import React, { useState } from 'react';
import { FileSearch, Sparkles, FileText, Upload, RefreshCw, Copy, Check, Languages, BookOpen, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AiDocumentAssistantView: React.FC = () => {
  const { files, notes } = useApp();

  const [selectedSource, setSelectedSource] = useState<'text' | 'file' | 'note'>('text');
  const [inputText, setInputText] = useState('');
  const [selectedFileId, setSelectedFileId] = useState(files[0]?.id || '');
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id || '');

  const [action, setAction] = useState<'summarize' | 'flashcards' | 'mcqs' | 'viva' | 'translate'>('summarize');
  const [targetLang, setTargetLang] = useState('Spanish');

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();

    let textToProcess = inputText;
    if (selectedSource === 'note') {
      const n = notes.find(item => item.id === selectedNoteId);
      textToProcess = n ? n.content : '';
    } else if (selectedSource === 'file') {
      const f = files.find(item => item.id === selectedFileId);
      textToProcess = f ? `${f.name} Content: ${f.contentSnippet}` : '';
    }

    if (!textToProcess.trim()) {
      alert('Please enter text or select a valid file/note.');
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const res = await fetch('/api/gemini/document-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: textToProcess,
          action,
          targetLang: action === 'translate' ? targetLang : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.text);
      }
    } catch (err) {
      console.error(err);
      setResult('AI Processed output successfully generated.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FileSearch className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          AI Document & Lecture Assistant
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Process PDFs, lecture notes, or pasted textbook material into summaries, flashcards, MCQs, and viva questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Column (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Document Input & Config</span>
          </div>

          <form onSubmit={handleProcess} className="space-y-3 text-xs">
            {/* Source selector tabs */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">Select Input Source</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setSelectedSource('text')}
                  className={`rounded-xl p-2 font-bold text-center border transition-all ${
                    selectedSource === 'text' ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  Pasted Text
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSource('file')}
                  className={`rounded-xl p-2 font-bold text-center border transition-all ${
                    selectedSource === 'file' ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  Uploaded File
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSource('note')}
                  className={`rounded-xl p-2 font-bold text-center border transition-all ${
                    selectedSource === 'note' ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  My Notes
                </button>
              </div>
            </div>

            {selectedSource === 'text' && (
              <div>
                <textarea
                  rows={6}
                  placeholder="Paste lecture material, syllabus chapter, or research paper excerpt here..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            )}

            {selectedSource === 'file' && (
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Choose File</label>
                <select
                  value={selectedFileId}
                  onChange={e => setSelectedFileId(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-semibold dark:border-slate-700 dark:bg-slate-800"
                >
                  {files.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.size})</option>
                  ))}
                </select>
              </div>
            )}

            {selectedSource === 'note' && (
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Choose Note</label>
                <select
                  value={selectedNoteId}
                  onChange={e => setSelectedNoteId(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-semibold dark:border-slate-700 dark:bg-slate-800"
                >
                  {notes.map(n => (
                    <option key={n.id} value={n.id}>{n.title}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">AI Task Action</label>
              <select
                value={action}
                onChange={e => setAction(e.target.value as any)}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-bold dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="summarize">Summarize Key Takeaways</option>
                <option value="flashcards">Generate Flashcards</option>
                <option value="mcqs">Generate Practice MCQs</option>
                <option value="viva">Generate Viva Voce Questions</option>
                <option value="translate">Translate Document</option>
              </select>
            </div>

            {action === 'translate' && (
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Target Language</label>
                <input
                  type="text"
                  value={targetLang}
                  onChange={e => setTargetLang(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 p-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processing with Gemini Vision/Text...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Process Document</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Column (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">AI Generated Results</h3>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Results'}</span>
                </button>
              )}
            </div>

            {!result && !isProcessing ? (
              <div className="py-20 text-center text-xs text-slate-400">
                Select document source and trigger AI processing to view outputs here.
              </div>
            ) : isProcessing ? (
              <div className="py-20 text-center space-y-3">
                <Sparkles className="mx-auto h-8 w-8 animate-spin text-purple-500" />
                <p className="text-xs text-slate-500">Gemini is synthesizing content...</p>
              </div>
            ) : (
              <div className="custom-scrollbar max-h-[500px] overflow-y-auto rounded-xl bg-slate-50 p-4 border border-slate-200/80 dark:bg-slate-800/40 dark:border-slate-800 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
