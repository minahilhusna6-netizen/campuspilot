export type Priority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type Category = 'academic' | 'personal' | 'exam' | 'project' | 'other';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  university: string;
  department: string;
  semester: number;
  rollNumber: string;
  avatarUrl: string;
  gpa: number;
  cgpa: number;
  learningStreakDays: number;
  productivityScore: number; // 0 - 100
  studyHoursThisWeek: number;
  bio?: string;
  achievementsCount: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  teacher: string;
  room: string;
  credits: number;
  semester: number;
  color: string; // hex or tailwind color
}

export interface ClassSession {
  id: string;
  subjectId: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // e.g. "09:00 AM"
  endTime: string;   // e.g. "10:30 AM"
  room: string;
  teacher: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  priority: Priority;
  completed: boolean;
  estimatedHours?: number;
  attachments?: string[];
  aiExplanation?: string;
  aiPlan?: string[];
  bookmarked?: boolean;
}

export interface Task {
  id: string;
  title: string;
  category: Category;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  progress: number; // 0 - 100
  subjectId?: string;
}

export interface NoteFolder {
  id: string;
  name: string;
  color: string;
}

export interface Note {
  id: string;
  title: string;
  folderId?: string;
  content: string;
  tags: string[];
  favorite: boolean;
  isVoiceNote?: boolean;
  audioUrl?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'docx' | 'image' | 'other';
  folderName: string;
  url?: string;
  createdAt: string;
  favorite: boolean;
  contentSnippet?: string;
}

export interface Exam {
  id: string;
  subjectId: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM"
  room: string;
  weightPercentage: number;
  score?: number;
  maxScore?: number;
  targetScore: number;
  status: 'upcoming' | 'completed';
}

export interface AttendanceHistory {
  date: string;
  status: 'present' | 'absent' | 'cancelled';
  note?: string;
}

export interface SubjectAttendance {
  id: string;
  subjectId: string;
  totalClasses: number;
  attendedClasses: number;
  targetPercentage: number; // default 75
  history: AttendanceHistory[];
}

export interface Reminder {
  id: string;
  title: string;
  category: 'assignment' | 'task' | 'exam' | 'study' | 'attendance';
  date: string;
  time: string;
  completed: boolean;
}

export interface GoalStep {
  id: string;
  text: string;
  done: boolean;
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  progress: number; // 0 - 100
  steps: GoalStep[];
  aiSuggestions?: string;
}

export interface FocusSession {
  id: string;
  date: string;
  durationMinutes: number;
  mode: 'pomodoro' | 'short_break' | 'long_break' | 'custom';
  subjectId?: string;
}

export interface CommunityComment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  likedByMe?: boolean;
  comments: CommunityComment[];
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  category: 'attendance' | 'study' | 'quiz' | 'assignments';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: 'general' | 'math' | 'code' | 'grammar' | 'viva';
  isError?: boolean;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}
