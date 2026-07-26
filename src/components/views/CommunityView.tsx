import React, { useState } from 'react';
import { Users, Heart, MessageSquare, Plus, Share2, Search, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommunityView: React.FC = () => {
  const { posts, addPost, likePost, addComment, user } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('Computer Science, Study Group');

  const [commentInput, setCommentInput] = useState<Record<string, string>>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    addPost({
      authorName: user.name,
      authorAvatar: user.avatarUrl,
      title: postTitle,
      content: postContent,
      tags: postTags.split(',').map(t => t.trim()).filter(Boolean),
    });

    setPostTitle('');
    setPostContent('');
    setIsModalOpen(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInput[postId];
    if (text && text.trim()) {
      addComment(postId, user.name, text.trim());
      setCommentInput({ ...commentInput, [postId]: '' });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            Campus Peer Community & Q&A
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connect with classmates, share study guides, discuss exam preparation, and ask course questions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500"
        >
          <Plus className="h-4 w-4" />
          Create Post
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {posts.map(p => (
          <div
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <img src={p.authorAvatar} alt={p.authorName} className="h-9 w-9 rounded-full object-cover ring-2 ring-purple-500/30" />
              <div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{p.authorName}</h4>
                <p className="text-[10px] text-slate-400">{p.createdAt}</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{p.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{p.content}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {p.tags.map((tag, i) => (
                <span key={i} className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:bg-purple-950/50 dark:text-purple-300">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions: Likes & Comments Count */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <button
                onClick={() => likePost(p.id)}
                className="flex items-center gap-1 hover:text-rose-500 transition-colors"
              >
                <Heart className={`h-4 w-4 ${p.likes > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{p.likes} Likes</span>
              </button>

              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-purple-500" />
                <span>{p.comments.length} Comments</span>
              </span>
            </div>

            {/* Comments List */}
            {p.comments.length > 0 && (
              <div className="space-y-2 pt-2 bg-slate-50 p-3 rounded-xl dark:bg-slate-800/40">
                {p.comments.map(c => (
                  <div key={c.id} className="text-xs">
                    <span className="font-bold text-purple-600 dark:text-purple-400 mr-2">{c.authorName}:</span>
                    <span className="text-slate-700 dark:text-slate-300">{c.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInput[p.id] || ''}
                onChange={e => setCommentInput({ ...commentInput, [p.id]: e.target.value })}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                onClick={() => handleAddComment(p.id)}
                className="rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-500"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-base">Create Peer Post / Question</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-5 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Title / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need study partner for CS301 midterm"
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Post Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your study question or discussion topic..."
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Tags (comma separated)</label>
                <input
                  type="text"
                  value={postTags}
                  onChange={e => setPostTags(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
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
                  className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
