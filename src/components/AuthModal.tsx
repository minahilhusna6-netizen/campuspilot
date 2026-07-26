import React, { useState } from 'react';
import { User, X, Check, Mail, Lock, Building, GraduationCap, ShieldCheck, LogOut, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, updateProfile } = useApp();

  const [mode, setMode] = useState<'profile' | 'login' | 'signup' | 'forgot'>('profile');
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    university: user.university,
    department: user.department,
    semester: user.semester,
    rollNumber: user.rollNumber,
    avatarUrl: user.avatarUrl,
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setToastMsg('Profile updated successfully!');
    setTimeout(() => {
      setToastMsg(null);
      setIsAuthModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h2 className="font-bold text-base">Student Profile & Auth</h2>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {toastMsg && (
            <div className="rounded-xl bg-emerald-500/10 p-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-center">
              {toastMsg}
            </div>
          )}

          {mode === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div className="flex items-center gap-4 py-2">
                <img
                  src={formData.avatarUrl}
                  alt={formData.name}
                  className="h-16 w-16 rounded-xl object-cover ring-2 ring-purple-500"
                />
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Avatar Image URL</label>
                  <input
                    type="text"
                    value={formData.avatarUrl}
                    onChange={e => setFormData({ ...formData, avatarUrl: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">University</label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={e => setFormData({ ...formData, university: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Semester</label>
                  <input
                    type="number"
                    value={formData.semester}
                    onChange={e => setFormData({ ...formData, semester: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Roll Number</label>
                  <input
                    type="text"
                    value={formData.rollNumber}
                    onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setToastMsg('Logged out session.');
                    setTimeout(() => setIsAuthModalOpen(false), 800);
                  }}
                  className="flex items-center gap-1.5 text-xs text-rose-500 font-bold hover:underline"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500"
                >
                  <Check className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
