import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw, Calculator, Code, CheckCircle2, MessageSquare, Trash2, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AiAssistantModal: React.FC = () => {
  const {
    isAiAssistantOpen,
    setIsAiAssistantOpen,
    chatMessages,
    isChatLoading,
    sendChatMessage,
    clearChatMessages
  } = useApp();

  const [mode, setMode] = useState<'general' | 'math' | 'code' | 'grammar' | 'viva'>('general');
  const [prompt, setPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiAssistantOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatLoading, isAiAssistantOpen]);

  if (!isAiAssistantOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isChatLoading) return;

    const userMsg = prompt.trim();
    setPrompt('');
    await sendChatMessage(userMsg, mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col h-[580px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight">CampusPilot AI Tutor</h2>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">Powered by Gemini API</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearChatMessages}
              title="Clear chat history"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsAiAssistantOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-[11px] overflow-x-auto">
          <button
            type="button"
            onClick={() => setMode('general')}
            className={`rounded-lg px-2.5 py-1 font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              mode === 'general' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-3 w-3" /> General
          </button>
          <button
            type="button"
            onClick={() => setMode('math')}
            className={`rounded-lg px-2.5 py-1 font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              mode === 'math' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <Calculator className="h-3 w-3" /> Math
          </button>
          <button
            type="button"
            onClick={() => setMode('code')}
            className={`rounded-lg px-2.5 py-1 font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              mode === 'code' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <Code className="h-3 w-3" /> Code
          </button>
          <button
            type="button"
            onClick={() => setMode('grammar')}
            className={`rounded-lg px-2.5 py-1 font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              mode === 'grammar' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="h-3 w-3" /> Essay/Grammar
          </button>
          <button
            type="button"
            onClick={() => setMode('viva')}
            className={`rounded-lg px-2.5 py-1 font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              mode === 'viva' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="h-3 w-3" /> Viva
          </button>
        </div>

        {/* Chat Feed */}
        <div className="custom-scrollbar flex-1 overflow-y-auto p-4 space-y-3.5">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white ${
                  msg.isError ? 'bg-amber-600' : 'bg-purple-600'
                }`}>
                  {msg.isError ? <AlertTriangle className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>
              )}
              <div
                className={`max-w-[84%] rounded-2xl p-3.5 text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white font-medium shadow-sm'
                    : msg.isError
                    ? 'bg-amber-50 border border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/60 dark:text-amber-200'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isChatLoading && (
            <div className="flex items-center gap-2.5 pt-1">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-purple-50 px-3.5 py-2.5 border border-purple-200/60 dark:bg-purple-950/30 dark:border-purple-800/40 text-xs">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-purple-700 dark:text-purple-300">AI is typing...</span>
                <span className="flex items-center gap-1 ml-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Ask a question in ${mode} mode...`}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={isChatLoading}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isChatLoading || !prompt.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20 hover:bg-purple-500 disabled:opacity-50 transition-all active:scale-95"
          >
            {isChatLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};
