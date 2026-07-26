import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FocusModeView: React.FC = () => {
  const { subjects, addStudyHours } = useApp();

  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Selected subject for study session logging
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');

  // Sound environment state
  const [activeSound, setActiveSound] = useState<'rain' | 'lofi' | 'cafe' | 'forest' | null>(null);

  useEffect(() => {
    let timer: any = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (mode === 'work') {
        addStudyHours(parseFloat((durationMinutes / 60).toFixed(1)));
        alert('🎉 Focus Pomodoro completed! Take a 5-minute break.');
        setMode('break');
        setDurationMinutes(5);
        setTimeLeft(5 * 60);
      } else {
        alert('Break time over! Ready to dive back into deep focus?');
        setMode('work');
        setDurationMinutes(25);
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, mode, durationMinutes]);

  const handleSetDuration = (mins: number) => {
    setIsActive(false);
    setDurationMinutes(mins);
    setTimeLeft(mins * 60);
  };

  const handleToggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(durationMinutes * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const progressPct = Math.round(((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Flame className="h-6 w-6 text-amber-500 animate-bounce" />
          Focus Mode & Pomodoro Timer
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Distraction-free study timer with ambient background audio and automatic session logging.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Timer Display (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center space-y-6">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800">
            <button
              onClick={() => handleSetDuration(25)}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                durationMinutes === 25 ? 'bg-amber-500 text-white shadow' : 'text-slate-500'
              }`}
            >
              25m Pomodoro
            </button>
            <button
              onClick={() => handleSetDuration(50)}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                durationMinutes === 50 ? 'bg-amber-500 text-white shadow' : 'text-slate-500'
              }`}
            >
              50m Deep Study
            </button>
            <button
              onClick={() => handleSetDuration(5)}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                durationMinutes === 5 ? 'bg-amber-500 text-white shadow' : 'text-slate-500'
              }`}
            >
              5m Break
            </button>
          </div>

          {/* Large Ring Timer Display */}
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-8 border-slate-100 dark:border-slate-800 shadow-inner">
            <div className="text-center">
              <span className="block text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-mono">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mt-2 block">
                {mode === 'work' ? '🔥 Deep Focus' : '☕ Rest Break'}
              </span>
            </div>
          </div>

          {/* Subject Selector */}
          <div className="w-full max-w-xs space-y-1 text-left">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Focus Subject</label>
            <select
              value={selectedSubjectId}
              onChange={e => setSelectedSubjectId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="rounded-full border border-slate-200 p-3 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              title="Reset Timer"
            >
              <RotateCcw className="h-5 w-5" />
            </button>

            <button
              onClick={handleToggleTimer}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              {isActive ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
            </button>
          </div>
        </div>

        {/* Ambient Sounds Column (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Volume2 className="h-5 w-5 text-amber-500" />
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">Ambient Study Audio</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'rain', label: '🌧️ Heavy Rain', desc: 'Gentle raindrops' },
              { id: 'lofi', label: '🎧 Lo-Fi Beats', desc: 'Chill study tempo' },
              { id: 'cafe', label: '☕ Campus Cafe', desc: 'Subtle background hum' },
              { id: 'forest', label: '🌲 Forest Stream', desc: 'Nature acoustics' },
            ].map(snd => {
              const isSel = activeSound === snd.id;
              return (
                <button
                  key={snd.id}
                  onClick={() => setActiveSound(isSel ? null : snd.id as any)}
                  className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                    isSel
                      ? 'border-amber-500 bg-amber-50/60 dark:border-amber-500/80 dark:bg-amber-950/40'
                      : 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30'
                  }`}
                >
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{snd.label}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{snd.desc}</span>
                  <span className={`mt-3 text-[10px] font-bold ${isSel ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
                    {isSel ? 'Playing ●' : 'Tap to Play'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
