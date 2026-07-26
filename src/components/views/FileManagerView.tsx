import React, { useState } from 'react';
import {
  FolderArchive,
  Upload,
  Search,
  FileText,
  FileCode,
  Image,
  Trash2,
  Download,
  Star,
  Plus,
  Sparkles,
  FileSearch,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FileItem } from '../../types';

export const FileManagerView: React.FC = () => {
  const { files, addFile, deleteFile, toggleFileFavorite, setActiveTab } = useApp();

  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [uploadName, setUploadName] = useState('');
  const [uploadFolder, setUploadFolder] = useState('Computer Science');
  const [uploadType, setUploadType] = useState<'pdf' | 'docx' | 'image' | 'other'>('pdf');

  const filtered = files.filter(f => {
    const matchesFolder = selectedFolder === 'all' || (selectedFolder === 'favorites' ? f.favorite : f.folderName === selectedFolder);
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleCreateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim()) return;
    addFile({
      name: uploadName.endsWith('.pdf') || uploadName.endsWith('.docx') ? uploadName : `${uploadName}.${uploadType === 'pdf' ? 'pdf' : uploadType === 'docx' ? 'docx' : 'png'}`,
      size: '1.8 MB',
      type: uploadType,
      folderName: uploadFolder,
      favorite: false,
      contentSnippet: 'Uploaded course material and reference documentation.',
    });
    setUploadName('');
    setIsUploadOpen(false);
  };

  const getIcon = (type: string) => {
    if (type === 'pdf') return <FileText className="h-6 w-6 text-rose-500" />;
    if (type === 'docx') return <FileCode className="h-6 w-6 text-blue-500" />;
    if (type === 'image') return <Image className="h-6 w-6 text-emerald-500" />;
    return <FileText className="h-6 w-6 text-purple-500" />;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FolderArchive className="h-6 w-6 text-emerald-500" />
            File Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Store, search, and process course PDFs, DOCX slides, and whiteboard captures with AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ai-doc-assistant')}
            className="flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-xs font-bold text-purple-700 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-300"
          >
            <Sparkles className="h-4 w-4" />
            AI Doc Assistant
          </button>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-500 transition-all"
          >
            <Upload className="h-4 w-4" />
            Upload File
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setSelectedFolder('all')}
            className={`rounded-xl px-3 py-1.5 font-semibold ${selectedFolder === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            All Files ({files.length})
          </button>
          <button
            onClick={() => setSelectedFolder('favorites')}
            className={`rounded-xl px-3 py-1.5 font-semibold ${selectedFolder === 'favorites' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            Starred
          </button>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(f => (
          <div
            key={f.id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
                    {getIcon(f.type)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate max-w-[160px]">{f.name}</h4>
                    <p className="text-[10px] text-slate-400">{f.size} • {f.folderName}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFileFavorite(f.id)}
                  className="text-slate-300 hover:text-amber-400"
                >
                  <Star className={`h-4 w-4 ${f.favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
              </div>

              {f.contentSnippet && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-200/50 dark:border-slate-800/50">
                  {f.contentSnippet}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400">{f.createdAt}</span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('ai-doc-assistant')}
                  className="flex items-center gap-1 rounded-lg bg-purple-50 px-2 py-1 text-[10px] font-bold text-purple-700 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300"
                  title="Summarize with AI"
                >
                  <Sparkles className="h-3 w-3" />
                  AI Process
                </button>

                <button
                  onClick={() => alert(`Downloading preview for ${f.name}`)}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  title="Download File"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => deleteFile(f.id)}
                  className="rounded-lg p-1 text-slate-400 hover:text-rose-500"
                  title="Delete File"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-base">Upload Course File</h2>
              <button onClick={() => setIsUploadOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUpload} className="p-5 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">File Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating_Systems_Chapter4.pdf"
                  value={uploadName}
                  onChange={e => setUploadName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">File Type</label>
                  <select
                    value={uploadType}
                    onChange={e => setUploadType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="docx">Word DOCX</option>
                    <option value="image">PNG / JPG Image</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Folder</label>
                  <input
                    type="text"
                    value={uploadFolder}
                    onChange={e => setUploadFolder(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center dark:border-slate-800">
                <Upload className="mx-auto h-8 w-8 text-emerald-500" />
                <p className="mt-2 text-xs text-slate-500">Drag & drop document or tap to select</p>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-500"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
