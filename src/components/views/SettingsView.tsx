import React, { useState } from 'react';
import { Settings, Moon, Sun, Download, Trash2, User, Building, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { user, isDarkMode, setIsDarkMode, updateProfile } = useApp();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    university: user.university,
    department: user.department,
    semester: user.semester,
    rollNumber: user.rollNumber,
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setToastMsg('Profile details saved successfully!');
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `campuspilot_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to reset CampusPilot data to default factory state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          Platform Settings & Preferences
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage student account, interface theme, data export backups, and local storage state.
        </p>
      </div>

      {toastMsg && (
        <div className="rounded-xl bg-emerald-500/10 p-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-center">
          {toastMsg}
        </div>
      )}

      {/* Theme Preference */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Appearance Mode</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Toggle between Light and Dark interface themes</span>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
            <span>{isDarkMode ? 'Light Theme' : 'Dark Theme'}</span>
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Student Profile Information</h3>

        <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-bold dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">University</label>
              <input
                type="text"
                value={formData.university}
                onChange={e => setFormData({ ...formData, university: e.target.value })}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Semester</label>
              <input
                type="number"
                value={formData.semester}
                onChange={e => setFormData({ ...formData, semester: parseInt(e.target.value) || 1 })}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Roll Number</label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500"
          >
            <Check className="h-4 w-4" />
            Save Profile
          </button>
        </form>
      </div>

      {/* Data Management */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Data Management & Backup</h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Export Backup File</p>
            <p className="text-[10px] text-slate-400">Download a JSON snapshot of all your subjects, notes, and tasks.</p>
          </div>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-bold text-rose-600">Factory Reset Local Storage</p>
            <p className="text-[10px] text-slate-400">Clear all local database entries and restore initial demo state.</p>
          </div>
          <button
            onClick={handleClearData}
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-rose-500/20 hover:bg-rose-500"
          >
            <Trash2 className="h-4 w-4" />
            Reset Platform
          </button>
        </div>
      </div>
    </div>
  );
};
