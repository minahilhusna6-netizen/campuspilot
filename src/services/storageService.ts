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
import {
  initialProfile,
  initialSubjects,
  initialClasses,
  initialAssignments,
  initialTasks,
  initialFolders,
  initialNotes,
  initialFiles,
  initialExams,
  initialAttendance,
  initialReminders,
  initialGoals,
  initialCommunityPosts,
  initialAchievements
} from '../data/initialData';

const KEYS = {
  PROFILE: 'campus_pilot_profile_v1',
  SUBJECTS: 'campus_pilot_subjects_v1',
  CLASSES: 'campus_pilot_classes_v1',
  ASSIGNMENTS: 'campus_pilot_assignments_v1',
  TASKS: 'campus_pilot_tasks_v1',
  FOLDERS: 'campus_pilot_folders_v1',
  NOTES: 'campus_pilot_notes_v1',
  FILES: 'campus_pilot_files_v1',
  EXAMS: 'campus_pilot_exams_v1',
  ATTENDANCE: 'campus_pilot_attendance_v1',
  REMINDERS: 'campus_pilot_reminders_v1',
  GOALS: 'campus_pilot_goals_v1',
  COMMUNITY: 'campus_pilot_community_v1',
  ACHIEVEMENTS: 'campus_pilot_achievements_v1',
  THEME: 'campus_pilot_theme_v1',
  FOCUS_STATS: 'campus_pilot_focus_stats_v1',
  CHAT_HISTORY: 'campus_pilot_chat_history_v1',
};

function load<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading key ${key}`, err);
    return defaultValue;
  }
}

function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving key ${key}`, err);
  }
}

export const StorageService = {
  getProfile: (): UserProfile => load(KEYS.PROFILE, initialProfile),
  saveProfile: (p: UserProfile) => save(KEYS.PROFILE, p),

  getSubjects: (): Subject[] => load(KEYS.SUBJECTS, initialSubjects),
  saveSubjects: (s: Subject[]) => save(KEYS.SUBJECTS, s),

  getClasses: (): ClassSession[] => load(KEYS.CLASSES, initialClasses),
  saveClasses: (c: ClassSession[]) => save(KEYS.CLASSES, c),

  getAssignments: (): Assignment[] => load(KEYS.ASSIGNMENTS, initialAssignments),
  saveAssignments: (a: Assignment[]) => save(KEYS.ASSIGNMENTS, a),

  getTasks: (): Task[] => load(KEYS.TASKS, initialTasks),
  saveTasks: (t: Task[]) => save(KEYS.TASKS, t),

  getFolders: (): NoteFolder[] => load(KEYS.FOLDERS, initialFolders),
  saveFolders: (f: NoteFolder[]) => save(KEYS.FOLDERS, f),

  getNotes: (): Note[] => load(KEYS.NOTES, initialNotes),
  saveNotes: (n: Note[]) => save(KEYS.NOTES, n),

  getFiles: (): FileItem[] => load(KEYS.FILES, initialFiles),
  saveFiles: (f: FileItem[]) => save(KEYS.FILES, f),

  getExams: (): Exam[] => load(KEYS.EXAMS, initialExams),
  saveExams: (e: Exam[]) => save(KEYS.EXAMS, e),

  getAttendance: (): SubjectAttendance[] => load(KEYS.ATTENDANCE, initialAttendance),
  saveAttendance: (a: SubjectAttendance[]) => save(KEYS.ATTENDANCE, a),

  getReminders: (): Reminder[] => load(KEYS.REMINDERS, initialReminders),
  saveReminders: (r: Reminder[]) => save(KEYS.REMINDERS, r),

  getGoals: (): Goal[] => load(KEYS.GOALS, initialGoals),
  saveGoals: (g: Goal[]) => save(KEYS.GOALS, g),

  getCommunityPosts: (): CommunityPost[] => load(KEYS.COMMUNITY, initialCommunityPosts),
  saveCommunityPosts: (p: CommunityPost[]) => save(KEYS.COMMUNITY, p),

  getAchievements: (): Achievement[] => load(KEYS.ACHIEVEMENTS, initialAchievements),
  saveAchievements: (a: Achievement[]) => save(KEYS.ACHIEVEMENTS, a),

  getTheme: (): 'light' | 'dark' => load(KEYS.THEME, 'dark'),
  saveTheme: (theme: 'light' | 'dark') => save(KEYS.THEME, theme),

  getChatMessages: (): ChatMessage[] => load(KEYS.CHAT_HISTORY, [
    {
      id: 'welcome_msg_1',
      role: 'assistant',
      content: 'Hello! I am CampusPilot AI Tutor, powered by Gemini. Ask me any question about your subjects, equations, coding assignments, or exam preparation!',
      timestamp: new Date().toISOString(),
    }
  ]),
  saveChatMessages: (msgs: ChatMessage[]) => save(KEYS.CHAT_HISTORY, msgs),
  clearChatMessages: () => save(KEYS.CHAT_HISTORY, []),

  resetAllData: () => {
    localStorage.clear();
    window.location.reload();
  }
};
