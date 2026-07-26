import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Subject,
  ClassSession,
  Assignment,
  Task,
  NoteFolder,
  Note,
  FileItem,
  Exam,
  SubjectAttendance,
  Reminder,
  Goal,
  CommunityPost,
  Achievement,
  ChatMessage
} from '../types';
import { StorageService } from '../services/storageService';

interface AppContextType {
  user: UserProfile;
  subjects: Subject[];
  classes: ClassSession[];
  assignments: Assignment[];
  tasks: Task[];
  folders: NoteFolder[];
  notes: Note[];
  files: FileItem[];
  exams: Exam[];
  attendance: SubjectAttendance[];
  reminders: Reminder[];
  goals: Goal[];
  posts: CommunityPost[];
  achievements: Achievement[];
  theme: 'light' | 'dark';
  activeTab: string;
  searchQuery: string;
  isSearchOpen: boolean;
  isCameraOpen: boolean;
  isAuthModalOpen: boolean;
  isAiAssistantOpen: boolean;
  isRemindersOpen: boolean;

  // AI Chat
  chatMessages: ChatMessage[];
  isChatLoading: boolean;
  sendChatMessage: (content: string, mode?: 'general' | 'math' | 'code' | 'grammar' | 'viva') => Promise<void>;
  clearChatMessages: () => void;

  // Setters & CRUD
  setActiveTab: (tab: string) => void;
  setSearchQuery: (q: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCameraOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsAiAssistantOpen: (open: boolean) => void;
  setIsRemindersOpen: (open: boolean) => void;
  toggleTheme: () => void;

  updateProfile: (p: Partial<UserProfile>) => void;

  // Subjects
  addSubject: (s: Omit<Subject, 'id'>) => void;
  editSubject: (id: string, s: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;

  // Classes / Timetable
  addClassSession: (c: Omit<ClassSession, 'id'>) => void;
  deleteClassSession: (id: string) => void;

  // Assignments
  addAssignment: (a: Omit<Assignment, 'id'>) => void;
  toggleAssignment: (id: string) => void;
  editAssignment: (id: string, a: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;

  // Tasks
  addTask: (t: Omit<Task, 'id'>) => void;
  toggleTaskStatus: (id: string) => void;
  editTask: (id: string, t: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Notes
  addNote: (n: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editNote: (id: string, n: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  toggleNoteFavorite: (id: string) => void;

  // Files
  addFile: (f: Omit<FileItem, 'id' | 'createdAt'>) => void;
  deleteFile: (id: string) => void;
  toggleFileFavorite: (id: string) => void;

  // Exams
  addExam: (e: Omit<Exam, 'id'>) => void;
  updateExam: (id: string, e: Partial<Exam>) => void;
  deleteExam: (id: string) => void;

  // Attendance
  updateAttendance: (subjectId: string, attendedDelta: number, totalDelta: number) => void;

  // Reminders
  addReminder: (r: Omit<Reminder, 'id' | 'completed'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;

  // Goals
  addGoal: (g: Omit<Goal, 'id'>) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  toggleGoalStep: (goalId: string, stepId: string) => void;
  deleteGoal: (id: string) => void;

  // Community
  addCommunityPost: (p: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  likePost: (id: string) => void;
  addComment: (postId: string, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(StorageService.getProfile);
  const [subjects, setSubjects] = useState<Subject[]>(StorageService.getSubjects);
  const [classes, setClasses] = useState<ClassSession[]>(StorageService.getClasses);
  const [assignments, setAssignments] = useState<Assignment[]>(StorageService.getAssignments);
  const [tasks, setTasks] = useState<Task[]>(StorageService.getTasks);
  const [folders, setFolders] = useState<NoteFolder[]>(StorageService.getFolders);
  const [notes, setNotes] = useState<Note[]>(StorageService.getNotes);
  const [files, setFiles] = useState<FileItem[]>(StorageService.getFiles);
  const [exams, setExams] = useState<Exam[]>(StorageService.getExams);
  const [attendance, setAttendance] = useState<SubjectAttendance[]>(StorageService.getAttendance);
  const [reminders, setReminders] = useState<Reminder[]>(StorageService.getReminders);
  const [goals, setGoals] = useState<Goal[]>(StorageService.getGoals);
  const [posts, setPosts] = useState<CommunityPost[]>(StorageService.getCommunityPosts);
  const [achievements, setAchievements] = useState<Achievement[]>(StorageService.getAchievements);
  const [theme, setTheme] = useState<'light' | 'dark'>(StorageService.getTheme);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isRemindersOpen, setIsRemindersOpen] = useState<boolean>(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(StorageService.getChatMessages);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const sendChatMessage = async (content: string, mode: 'general' | 'math' | 'code' | 'grammar' | 'viva' = 'general') => {
    const trimmed = content.trim();
    if (!trimmed || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
      mode,
    };

    const updatedWithUser = [...chatMessages, userMsg];
    setChatMessages(updatedWithUser);
    StorageService.saveChatMessages(updatedWithUser);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: trimmed,
          mode,
          history: updatedWithUser,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to receive AI response from Gemini API.');
      }

      const assistantMsg: ChatMessage = {
        id: `ast_${Date.now()}`,
        role: 'assistant',
        content: data.text || data.reply || 'No response generated.',
        timestamp: new Date().toISOString(),
        mode,
      };

      const finalMsgs = [...updatedWithUser, assistantMsg];
      setChatMessages(finalMsgs);
      StorageService.saveChatMessages(finalMsgs);
    } catch (err: any) {
      console.error('Gemini chat API error:', err);
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Error generating response: ${err.message || 'Network failure or invalid response'}. Please verify your connection or Gemini API Key and try again.`,
        timestamp: new Date().toISOString(),
        mode,
        isError: true,
      };
      const finalMsgs = [...updatedWithUser, errorMsg];
      setChatMessages(finalMsgs);
      StorageService.saveChatMessages(finalMsgs);
    } finally {
      setIsChatLoading(false);
    }
  };

  const clearChatMessages = () => {
    const initialGreeting: ChatMessage[] = [
      {
        id: 'welcome_msg_1',
        role: 'assistant',
        content: 'Hello! I am CampusPilot AI Tutor, powered by Gemini. Ask me any question about your subjects, equations, coding assignments, or exam preparation!',
        timestamp: new Date().toISOString(),
      }
    ];
    setChatMessages(initialGreeting);
    StorageService.saveChatMessages(initialGreeting);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    StorageService.saveTheme(next);
  };

  const updateProfile = (p: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...p };
      StorageService.saveProfile(updated);
      return updated;
    });
  };

  // Subjects CRUD
  const addSubject = (s: Omit<Subject, 'id'>) => {
    const newSubject: Subject = { ...s, id: `sub_${Date.now()}` };
    const updated = [newSubject, ...subjects];
    setSubjects(updated);
    StorageService.saveSubjects(updated);
  };

  const editSubject = (id: string, s: Partial<Subject>) => {
    const updated = subjects.map(item => item.id === id ? { ...item, ...s } : item);
    setSubjects(updated);
    StorageService.saveSubjects(updated);
  };

  const deleteSubject = (id: string) => {
    const updated = subjects.filter(item => item.id !== id);
    setSubjects(updated);
    StorageService.saveSubjects(updated);
  };

  // Classes
  const addClassSession = (c: Omit<ClassSession, 'id'>) => {
    const newClass: ClassSession = { ...c, id: `cls_${Date.now()}` };
    const updated = [...classes, newClass];
    setClasses(updated);
    StorageService.saveClasses(updated);
  };

  const deleteClassSession = (id: string) => {
    const updated = classes.filter(item => item.id !== id);
    setClasses(updated);
    StorageService.saveClasses(updated);
  };

  // Assignments CRUD
  const addAssignment = (a: Omit<Assignment, 'id'>) => {
    const newAsg: Assignment = { ...a, id: `asg_${Date.now()}` };
    const updated = [newAsg, ...assignments];
    setAssignments(updated);
    StorageService.saveAssignments(updated);
  };

  const toggleAssignment = (id: string) => {
    const updated = assignments.map(a => a.id === id ? { ...a, completed: !a.completed } : a);
    setAssignments(updated);
    StorageService.saveAssignments(updated);
  };

  const editAssignment = (id: string, a: Partial<Assignment>) => {
    const updated = assignments.map(item => item.id === id ? { ...item, ...a } : item);
    setAssignments(updated);
    StorageService.saveAssignments(updated);
  };

  const deleteAssignment = (id: string) => {
    const updated = assignments.filter(item => item.id !== id);
    setAssignments(updated);
    StorageService.saveAssignments(updated);
  };

  // Tasks CRUD
  const addTask = (t: Omit<Task, 'id'>) => {
    const newTask: Task = { ...t, id: `tsk_${Date.now()}` };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    StorageService.saveTasks(updated);
  };

  const toggleTaskStatus = (id: string) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'completed' ? 'todo' : t.status === 'todo' ? 'in_progress' : 'completed';
        const progress = nextStatus === 'completed' ? 100 : nextStatus === 'in_progress' ? 50 : 0;
        return { ...t, status: nextStatus, progress };
      }
      return t;
    });
    setTasks(updated);
    StorageService.saveTasks(updated);
  };

  const editTask = (id: string, t: Partial<Task>) => {
    const updated = tasks.map(item => item.id === id ? { ...item, ...t } : item);
    setTasks(updated);
    StorageService.saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(item => item.id !== id);
    setTasks(updated);
    StorageService.saveTasks(updated);
  };

  // Notes CRUD
  const addNote = (n: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newNote: Note = {
      ...n,
      id: `not_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    StorageService.saveNotes(updated);
  };

  const editNote = (id: string, n: Partial<Note>) => {
    const now = new Date().toISOString().split('T')[0];
    const updated = notes.map(item => item.id === id ? { ...item, ...n, updatedAt: now } : item);
    setNotes(updated);
    StorageService.saveNotes(updated);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(item => item.id !== id);
    setNotes(updated);
    StorageService.saveNotes(updated);
  };

  const toggleNoteFavorite = (id: string) => {
    const updated = notes.map(item => item.id === id ? { ...item, favorite: !item.favorite } : item);
    setNotes(updated);
    StorageService.saveNotes(updated);
  };

  // Files
  const addFile = (f: Omit<FileItem, 'id' | 'createdAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newFile: FileItem = { ...f, id: `file_${Date.now()}`, createdAt: now };
    const updated = [newFile, ...files];
    setFiles(updated);
    StorageService.saveFiles(updated);
  };

  const deleteFile = (id: string) => {
    const updated = files.filter(item => item.id !== id);
    setFiles(updated);
    StorageService.saveFiles(updated);
  };

  const toggleFileFavorite = (id: string) => {
    const updated = files.map(item => item.id === id ? { ...item, favorite: !item.favorite } : item);
    setFiles(updated);
    StorageService.saveFiles(updated);
  };

  // Exams
  const addExam = (e: Omit<Exam, 'id'>) => {
    const newExam: Exam = { ...e, id: `exm_${Date.now()}` };
    const updated = [newExam, ...exams];
    setExams(updated);
    StorageService.saveExams(updated);
  };

  const updateExam = (id: string, e: Partial<Exam>) => {
    const updated = exams.map(item => item.id === id ? { ...item, ...e } : item);
    setExams(updated);
    StorageService.saveExams(updated);
  };

  const deleteExam = (id: string) => {
    const updated = exams.filter(item => item.id !== id);
    setExams(updated);
    StorageService.saveExams(updated);
  };

  // Attendance
  const updateAttendance = (subjectId: string, attendedDelta: number, totalDelta: number) => {
    const updated = attendance.map(item => {
      if (item.subjectId === subjectId) {
        const newAttended = Math.max(0, item.attendedClasses + attendedDelta);
        const newTotal = Math.max(newAttended, item.totalClasses + totalDelta);
        return { ...item, attendedClasses: newAttended, totalClasses: newTotal };
      }
      return item;
    });
    setAttendance(updated);
    StorageService.saveAttendance(updated);
  };

  // Reminders
  const addReminder = (r: Omit<Reminder, 'id' | 'completed'>) => {
    const newRem: Reminder = { ...r, id: `rem_${Date.now()}`, completed: false };
    const updated = [newRem, ...reminders];
    setReminders(updated);
    StorageService.saveReminders(updated);
  };

  const toggleReminder = (id: string) => {
    const updated = reminders.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    setReminders(updated);
    StorageService.saveReminders(updated);
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter(item => item.id !== id);
    setReminders(updated);
    StorageService.saveReminders(updated);
  };

  // Goals
  const addGoal = (g: Omit<Goal, 'id'>) => {
    const newGoal: Goal = { ...g, id: `gol_${Date.now()}` };
    const updated = [newGoal, ...goals];
    setGoals(updated);
    StorageService.saveGoals(updated);
  };

  const updateGoalProgress = (id: string, progress: number) => {
    const updated = goals.map(item => item.id === id ? { ...item, progress } : item);
    setGoals(updated);
    StorageService.saveGoals(updated);
  };

  const toggleGoalStep = (goalId: string, stepId: string) => {
    const updated = goals.map(g => {
      if (g.id === goalId) {
        const newSteps = g.steps.map(s => s.id === stepId ? { ...s, done: !s.done } : s);
        const doneCount = newSteps.filter(s => s.done).length;
        const progress = Math.round((doneCount / newSteps.length) * 100);
        return { ...g, steps: newSteps, progress };
      }
      return g;
    });
    setGoals(updated);
    StorageService.saveGoals(updated);
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter(item => item.id !== id);
    setGoals(updated);
    StorageService.saveGoals(updated);
  };

  // Community
  const addCommunityPost = (p: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    const newPost: CommunityPost = {
      ...p,
      id: `pst_${Date.now()}`,
      createdAt: 'Just now',
      likes: 0,
      comments: [],
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    StorageService.saveCommunityPosts(updated);
  };

  const likePost = (id: string) => {
    const updated = posts.map(p => {
      if (p.id === id) {
        const liked = !p.likedByMe;
        return { ...p, likedByMe: liked, likes: p.likes + (liked ? 1 : -1) };
      }
      return p;
    });
    setPosts(updated);
    StorageService.saveCommunityPosts(updated);
  };

  const addComment = (postId: string, text: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        const newComm = {
          id: `c_${Date.now()}`,
          author: user.name,
          authorAvatar: user.avatarUrl,
          text,
          createdAt: 'Just now',
        };
        return { ...p, comments: [...p.comments, newComm] };
      }
      return p;
    });
    setPosts(updated);
    StorageService.saveCommunityPosts(updated);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        subjects,
        classes,
        assignments,
        tasks,
        folders,
        notes,
        files,
        exams,
        attendance,
        reminders,
        goals,
        posts,
        achievements,
        theme,
        activeTab,
        searchQuery,
        isSearchOpen,
        isCameraOpen,
        isAuthModalOpen,
        isAiAssistantOpen,
        isRemindersOpen,

        chatMessages,
        isChatLoading,
        sendChatMessage,
        clearChatMessages,

        setActiveTab,
        setSearchQuery,
        setIsSearchOpen,
        setIsCameraOpen,
        setIsAuthModalOpen,
        setIsAiAssistantOpen,
        setIsRemindersOpen,
        toggleTheme,

        updateProfile,
        addSubject,
        editSubject,
        deleteSubject,
        addClassSession,
        deleteClassSession,
        addAssignment,
        toggleAssignment,
        editAssignment,
        deleteAssignment,
        addTask,
        toggleTaskStatus,
        editTask,
        deleteTask,
        addNote,
        editNote,
        deleteNote,
        toggleNoteFavorite,
        addFile,
        deleteFile,
        toggleFileFavorite,
        addExam,
        updateExam,
        deleteExam,
        updateAttendance,
        addReminder,
        toggleReminder,
        deleteReminder,
        addGoal,
        updateGoalProgress,
        toggleGoalStep,
        deleteGoal,
        addCommunityPost,
        likePost,
        addComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
