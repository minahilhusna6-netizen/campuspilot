import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Code, Calculator, CheckCircle2, MessageSquare, Send, RefreshCw, Trash2, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AiStudyAssistantView: React.FC = () => {
  const { chatMessages, isChatLoading, sendChatMessage, clearChatMessages } = useApp();

  const [mode, setMode] = useState<'general' | 'math' | 'code' | 'grammar' | 'viva'>('general');
  const [prompt, setPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isChatLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isChatLoading) return;

    const userMsg = prompt.trim();
    setPrompt('');
    await sendChatMessage(userMsg, mode);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Bot className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            AI Academic Tutor & Study Assistant
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Powered by Gemini API — step-by-step Math derivations, Code debugging, Essay grammar checking, and Viva Voce practice.
          </p>
        </div>
        <button
          onClick={clearChatMessages}
          className="self-start md:self-auto flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Trash2 className="h-3.5 w-3.5 text-slate-400" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Mode Selector */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <button
          type="button"
          onClick={() => setMode('general')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            mode === 'general' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" /> General Concept
        </button>

        <button
          type="button"
          onClick={() => setMode('math')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            mode === 'math' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calculator className="h-3.5 w-3.5" /> Math & Calculus Solver
        </button>

        <button
          type="button"
          onClick={() => setMode('code')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            mode === 'code' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Code className="h-3.5 w-3.5" /> Code & Algorithm Tutor
        </button>

        <button
          type="button"
          onClick={() => setMode('grammar')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            mode === 'grammar' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" /> Essay & Grammar
        </button>

        <button
          type="button"
          onClick={() => setMode('viva')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            mode === 'viva' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" /> Viva Voce Simulator
        </button>
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col h-[540px]">
        <div className="custom-scrollbar flex-1 overflow-y-auto p-5 space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${
                  msg.isError ? 'bg-amber-600' : 'bg-purple-600'
                }`}>
                  {msg.isError ? <AlertTriangle className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white font-medium shadow-sm'
                    : msg.isError
                    ? 'bg-amber-50 border border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/60 dark:text-amber-200'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800 dark:bg-slate-800/60 dark:border-slate-800 dark:text-slate-200'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isChatLoading && (
            <div className="flex items-center gap-3 pt-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl bg-purple-50 px-4 py-3 border border-purple-200/60 dark:bg-purple-950/30 dark:border-purple-800/40 text-xs">
                <Sparkles className="h-4 w-4 animate-spin text-purple-600 dark:text-purple-400" />
                <span className="font-bold text-purple-700 dark:text-purple-300">AI is typing response...</span>
                <span className="flex items-center gap-1 ml-1">
                  <span className="h-2 w-2 rounded-full bg-purple-600 animate-bounce"></span>
                  <span className="h-2 w-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleSubmit} className="p-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
          <input
            type="text"
            placeholder={`Ask a question in ${mode} mode...`}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={isChatLoading}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isChatLoading || !prompt.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20 hover:bg-purple-500 disabled:opacity-50 transition-all active:scale-95"
          >
            {isChatLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};
