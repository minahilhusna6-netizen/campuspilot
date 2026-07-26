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
  Achievement
} from '../types';

export const initialProfile: UserProfile = {
  id: 'usr_001',
  name: 'Alex Rivera',
  email: 'alex.rivera@stanford.edu',
  university: 'Stanford University',
  department: 'Computer Science',
  semester: 5,
  rollNumber: 'CS-2024-8849',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  gpa: 3.82,
  cgpa: 3.79,
  learningStreakDays: 14,
  productivityScore: 88,
  studyHoursThisWeek: 26.5,
  bio: 'Passionate CS junior exploring Artificial Intelligence, Distributed Systems, and Human-Computer Interaction.',
  achievementsCount: 6,
};

export const initialSubjects: Subject[] = [
  {
    id: 'sub_cs301',
    code: 'CS301',
    name: 'Data Structures & Algorithms',
    teacher: 'Dr. Evelyn Harper',
    room: 'Gates Hall 104',
    credits: 4,
    semester: 5,
    color: '#8B5CF6', // Purple
  },
  {
    id: 'sub_cs340',
    code: 'CS340',
    name: 'Database Management Systems',
    teacher: 'Prof. Marcus Vance',
    room: 'Packard Bldg 210',
    credits: 4,
    semester: 5,
    color: '#3B82F6', // Blue
  },
  {
    id: 'sub_math204',
    code: 'MATH204',
    name: 'Linear Algebra & Optimization',
    teacher: 'Dr. Sarah Jenkins',
    room: 'Sloan Math 380',
    credits: 3,
    semester: 5,
    color: '#10B981', // Emerald
  },
  {
    id: 'sub_phy201',
    code: 'PHY201',
    name: 'Quantum Physics Principles',
    teacher: 'Prof. Robert Chen',
    room: 'Varian Physics 108',
    credits: 3,
    semester: 5,
    color: '#F59E0B', // Amber
  },
  {
    id: 'sub_eng102',
    code: 'ENG102',
    name: 'Technical Writing & Ethics',
    teacher: 'Dr. Clara Oswald',
    room: 'Lathrop Library 220',
    credits: 2,
    semester: 5,
    color: '#EC4899', // Pink
  },
];

export const initialClasses: ClassSession[] = [
  {
    id: 'cls_1',
    subjectId: 'sub_cs301',
    dayOfWeek: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    room: 'Gates Hall 104',
    teacher: 'Dr. Evelyn Harper',
  },
  {
    id: 'cls_2',
    subjectId: 'sub_cs340',
    dayOfWeek: 'Monday',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    room: 'Packard Bldg 210',
    teacher: 'Prof. Marcus Vance',
  },
  {
    id: 'cls_3',
    subjectId: 'sub_math204',
    dayOfWeek: 'Tuesday',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    room: 'Sloan Math 380',
    teacher: 'Dr. Sarah Jenkins',
  },
  {
    id: 'cls_4',
    subjectId: 'sub_phy201',
    dayOfWeek: 'Wednesday',
    startTime: '01:30 PM',
    endTime: '03:00 PM',
    room: 'Varian Physics 108',
    teacher: 'Prof. Robert Chen',
  },
  {
    id: 'cls_5',
    subjectId: 'sub_cs301',
    dayOfWeek: 'Thursday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    room: 'Gates Hall 104',
    teacher: 'Dr. Evelyn Harper',
  },
  {
    id: 'cls_6',
    subjectId: 'sub_eng102',
    dayOfWeek: 'Friday',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    room: 'Lathrop Library 220',
    teacher: 'Dr. Clara Oswald',
  },
];

export const initialAssignments: Assignment[] = [
  {
    id: 'asg_1',
    title: 'Red-Black Tree & Balanced Search Trees Implementation',
    subjectId: 'sub_cs301',
    description: 'Implement a self-balancing Red-Black binary search tree in C++ or Java. Include benchmark comparisons with AVL trees and standard B-trees.',
    dueDate: '2026-08-01',
    priority: 'High',
    completed: false,
    estimatedHours: 6,
    attachments: ['RBTree_Specification.pdf'],
    aiExplanation: 'Red-Black Trees preserve O(log n) performance by enforcing five color invariants: node is red/black, root is black, leaves are black, red nodes have black children, and paths contain equal black nodes.',
    aiPlan: ['Set up tree struct and node insertion', 'Implement left & right rotation helpers', 'Write color rebalancing logic', 'Run stress benchmark test'],
    bookmarked: true,
  },
  {
    id: 'asg_2',
    title: 'SQL Normalization & Index Optimization Project',
    subjectId: 'sub_cs340',
    description: 'Refactor e-commerce database schema into 3NF and BCNF. Measure query speedup with B-Tree vs Hash indexing.',
    dueDate: '2026-08-05',
    priority: 'Medium',
    completed: false,
    estimatedHours: 4,
    attachments: ['Database_Schema_v1.sql'],
    bookmarked: false,
  },
  {
    id: 'asg_3',
    title: 'Eigenvalues & Principal Component Analysis (PCA)',
    subjectId: 'sub_math204',
    description: 'Derive covariance matrix decomposition for 100-dimensional image data set using Singular Value Decomposition (SVD).',
    dueDate: '2026-08-08',
    priority: 'High',
    completed: false,
    estimatedHours: 5,
    bookmarked: true,
  },
  {
    id: 'asg_4',
    title: 'Quantum Harmonic Oscillator Homework',
    subjectId: 'sub_phy201',
    description: 'Solve the ladder operator equation for 1D quantum harmonic oscillator energy eigenvalues.',
    dueDate: '2026-07-28',
    priority: 'Low',
    completed: true,
    estimatedHours: 3,
    bookmarked: false,
  },
];

export const initialTasks: Task[] = [
  {
    id: 'tsk_1',
    title: 'Review Chapter 4 Graph Algorithms (Dijkstra & A*)',
    category: 'academic',
    dueDate: '2026-07-27',
    priority: 'High',
    status: 'in_progress',
    progress: 60,
    subjectId: 'sub_cs301',
  },
  {
    id: 'tsk_2',
    title: 'Prepare slides for Engineering Ethics presentation',
    category: 'project',
    dueDate: '2026-07-29',
    priority: 'Medium',
    status: 'todo',
    progress: 25,
    subjectId: 'sub_eng102',
  },
  {
    id: 'tsk_3',
    title: 'Organize study session for Linear Algebra midterm',
    category: 'exam',
    dueDate: '2026-07-30',
    priority: 'High',
    status: 'todo',
    progress: 0,
    subjectId: 'sub_math204',
  },
  {
    id: 'tsk_4',
    title: 'Renew IEEE student membership',
    category: 'personal',
    dueDate: '2026-08-10',
    priority: 'Low',
    status: 'completed',
    progress: 100,
  },
];

export const initialFolders: NoteFolder[] = [
  { id: 'fld_cs', name: 'Computer Science', color: '#8B5CF6' },
  { id: 'fld_math', name: 'Mathematics', color: '#10B981' },
  { id: 'fld_phy', name: 'Physics & Optics', color: '#F59E0B' },
  { id: 'fld_general', name: 'General & Career', color: '#3B82F6' },
];

export const initialNotes: Note[] = [
  {
    id: 'not_1',
    title: 'Data Structures: Graph Traversal Cheat Sheet',
    folderId: 'fld_cs',
    content: `# Graph Algorithms Overview

## Breadth-First Search (BFS)
- Uses a Queue data structure (FIFO)
- Finds the shortest path on unweighted graphs
- Time Complexity: O(V + E)
- Space Complexity: O(V)

## Depth-First Search (DFS)
- Uses a Stack or recursion (LIFO)
- Useful for topological sorting, cycle detection, and strongly connected components
- Time Complexity: O(V + E)

\`\`\`cpp
// Dijkstra's Shortest Path Algorithm Skeleton
priority_queue<pair<int, int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
pq.push({0, startNode});
\`\`\`
`,
    tags: ['algorithms', 'graphs', 'cpp', 'exam-prep'],
    favorite: true,
    createdAt: '2026-07-20',
    updatedAt: '2026-07-25',
  },
  {
    id: 'not_2',
    title: 'Voice Note: DBMS Concurrency & Locking Summary',
    folderId: 'fld_cs',
    content: 'Transcribed Audio: Two-Phase Locking (2PL) guarantees serializability. Growing phase acquires locks; shrinking phase releases locks. Rigorous 2PL holds all locks until transaction commit.',
    tags: ['dbms', 'concurrency', 'voice-note'],
    favorite: false,
    isVoiceNote: true,
    createdAt: '2026-07-22',
    updatedAt: '2026-07-22',
  },
  {
    id: 'not_3',
    title: 'Linear Algebra: Eigenvectors & SVD Intuition',
    folderId: 'fld_math',
    content: 'Eigenvectors specify directions along which a linear transformation acts by scaling. SVD generalizes this to rectangular m x n matrices, decomposing A into U * Sigma * V^T.',
    tags: ['math', 'matrices', 'svd'],
    favorite: true,
    createdAt: '2026-07-18',
    updatedAt: '2026-07-24',
  },
];

export const initialFiles: FileItem[] = [
  {
    id: 'file_1',
    name: 'CS301_Midterm_Syllabus_2026.pdf',
    size: '2.4 MB',
    type: 'pdf',
    folderName: 'Computer Science',
    createdAt: '2026-07-10',
    favorite: true,
    contentSnippet: 'Covers Chapters 1 to 6: Big-O analysis, Hash Tables, Balanced Trees, Heaps, and Graph Search.',
  },
  {
    id: 'file_2',
    name: 'Database_Normalization_Guide.docx',
    size: '1.1 MB',
    type: 'docx',
    folderName: 'Computer Science',
    createdAt: '2026-07-15',
    favorite: false,
    contentSnippet: 'Comprehensive walkthrough from 1NF to BCNF with relational algebra examples.',
  },
  {
    id: 'file_3',
    name: 'Quantum_Mechanics_Cheatsheet.png',
    size: '4.8 MB',
    type: 'image',
    folderName: 'Physics & Optics',
    createdAt: '2026-07-19',
    favorite: true,
    contentSnippet: 'Handwritten diagram of wavepackets and boundary equations.',
  },
];

export const initialExams: Exam[] = [
  {
    id: 'exm_1',
    subjectId: 'sub_cs301',
    title: 'Midterm Exam - Algorithms & Graphs',
    date: '2026-08-04',
    time: '10:00 AM',
    room: 'Terman Auditorium',
    weightPercentage: 25,
    targetScore: 92,
    status: 'upcoming',
  },
  {
    id: 'exm_2',
    subjectId: 'sub_math204',
    title: 'Midterm 2 - Linear Systems & SVD',
    date: '2026-08-10',
    time: '01:30 PM',
    room: 'Sloan Hall 102',
    weightPercentage: 30,
    targetScore: 90,
    status: 'upcoming',
  },
  {
    id: 'exm_3',
    subjectId: 'sub_cs340',
    title: 'Quiz 2 - Indexing & Query Tuning',
    date: '2026-07-20',
    time: '11:00 AM',
    room: 'Packard 210',
    weightPercentage: 10,
    score: 95,
    maxScore: 100,
    targetScore: 90,
    status: 'completed',
  },
];

export const initialAttendance: SubjectAttendance[] = [
  {
    id: 'att_1',
    subjectId: 'sub_cs301',
    totalClasses: 20,
    attendedClasses: 19,
    targetPercentage: 75,
    history: [
      { date: '2026-07-20', status: 'present' },
      { date: '2026-07-23', status: 'present' },
      { date: '2026-07-25', status: 'present' },
    ],
  },
  {
    id: 'att_2',
    subjectId: 'sub_cs340',
    totalClasses: 18,
    attendedClasses: 16,
    targetPercentage: 75,
    history: [
      { date: '2026-07-20', status: 'present' },
      { date: '2026-07-22', status: 'absent', note: 'Medical appointment' },
    ],
  },
  {
    id: 'att_3',
    subjectId: 'sub_math204',
    totalClasses: 16,
    attendedClasses: 11, // 68.75% -> Low attendance warning!
    targetPercentage: 75,
    history: [
      { date: '2026-07-21', status: 'absent' },
      { date: '2026-07-24', status: 'present' },
    ],
  },
  {
    id: 'att_4',
    subjectId: 'sub_phy201',
    totalClasses: 15,
    attendedClasses: 14,
    targetPercentage: 75,
    history: [{ date: '2026-07-22', status: 'present' }],
  },
  {
    id: 'att_5',
    subjectId: 'sub_eng102',
    totalClasses: 12,
    attendedClasses: 12,
    targetPercentage: 75,
    history: [{ date: '2026-07-24', status: 'present' }],
  },
];

export const initialReminders: Reminder[] = [
  {
    id: 'rem_1',
    title: 'Submit CS301 Red-Black Tree Code',
    category: 'assignment',
    date: '2026-08-01',
    time: '11:59 PM',
    completed: false,
  },
  {
    id: 'rem_2',
    title: 'Review Linear Algebra SVD Proofs',
    category: 'study',
    date: '2026-07-28',
    time: '07:00 PM',
    completed: false,
  },
  {
    id: 'rem_3',
    title: 'CS301 Midterm Exam In Terman Auditorium',
    category: 'exam',
    date: '2026-08-04',
    time: '09:30 AM',
    completed: false,
  },
];

export const initialGoals: Goal[] = [
  {
    id: 'gol_1',
    title: 'Maintain 3.8+ GPA this Semester',
    category: 'Academic',
    targetDate: '2026-12-15',
    progress: 85,
    steps: [
      { id: 's1', text: 'Score 90%+ in CS301 Midterm', done: false },
      { id: 's2', text: 'Complete all DB Lab assignments on time', done: true },
      { id: 's3', text: 'Attend Math weekly office hours', done: true },
    ],
    aiSuggestions: 'Schedule 2 hours of active recall every Saturday to solidify complex algorithm concepts.',
  },
  {
    id: 'gol_2',
    title: 'Build Open Source React/AI Portfolio Project',
    category: 'Career',
    targetDate: '2026-09-01',
    progress: 50,
    steps: [
      { id: 's4', text: 'Finalize app architecture & wireframes', done: true },
      { id: 's5', text: 'Integrate Gemini API server backend', done: true },
      { id: 's6', text: 'Deploy to Cloud Run & post on GitHub', done: false },
    ],
  },
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'pst_1',
    authorName: 'Samantha Wu',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    title: 'How do you effectively prepare for Dr. Harper’s CS301 Graph exams?',
    content: 'Hey everyone! For upperclassmen who took CS301, does Dr. Harper focus more on runtime proofs or writing code on paper? Any study group interest?',
    category: 'Study Groups',
    tags: ['CS301', 'ExamPrep', 'Algorithms'],
    likes: 18,
    comments: [
      {
        id: 'c1',
        author: 'David K.',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        text: 'Focus heavily on invariant proofs for Dijkstra and Bellman-Ford! She loves asking edge case questions.',
        createdAt: '2 hours ago',
      },
    ],
    createdAt: '5 hours ago',
  },
  {
    id: 'pst_2',
    authorName: 'Liam O’Connor',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    title: 'Curated List of Linear Algebra 3Blue1Brown Intuition Notes',
    content: 'I summarized the Essence of Linear Algebra series with LaTeX equations and geometric transformations. Check out my shared notes in the file directory!',
    category: 'Resources',
    tags: ['Math', 'LinearAlgebra', 'Notes'],
    likes: 34,
    comments: [],
    createdAt: '1 day ago',
  },
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach_1',
    title: 'Study Streak Master',
    description: 'Maintain a continuous 10-day active study streak.',
    iconName: 'Flame',
    unlocked: true,
    unlockedAt: '2026-07-22',
    progress: 14,
    maxProgress: 10,
    category: 'study',
  },
  {
    id: 'ach_2',
    title: 'Assignment Crusher',
    description: 'Complete 15 academic assignments prior to due date.',
    iconName: 'CheckCircle2',
    unlocked: true,
    unlockedAt: '2026-07-24',
    progress: 15,
    maxProgress: 15,
    category: 'assignments',
  },
  {
    id: 'ach_3',
    title: 'Perfect Attendance Scholar',
    description: 'Achieve >90% attendance across all registered courses.',
    iconName: 'GraduationCap',
    unlocked: false,
    progress: 88,
    maxProgress: 90,
    category: 'attendance',
  },
  {
    id: 'ach_4',
    title: 'AI Quiz Champion',
    description: 'Generate and solve 5 AI mock practice quizzes.',
    iconName: 'Sparkles',
    unlocked: true,
    unlockedAt: '2026-07-25',
    progress: 5,
    maxProgress: 5,
    category: 'quiz',
  },
];
