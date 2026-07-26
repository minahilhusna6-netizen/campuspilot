# 🎓 CampusPilot — All-in-One AI Student Productivity Platform

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-3.6_Flash-8E7CC3?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://campuspilot-tau.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Banner

```
   ██████╗ █████╗ ███╗   ███╗██████╗ ██╗███████╗██████╗ ██╗██╗      ██████╗ ████████╗
  ██╔════╝██╔══██╗████╗ ████║██╔══██╗██║██╔════╝██╔══██╗██║██║     ██╔═══██╗╚══██╔══╝
  ██║     ███████║██╔████╔██║██████╔╝██║███████╗██████╔╝██║██║     ██║   ██║   ██║   
  ██║     ██╔══██║██║╚██╔╝██║██╔═══╝ ██║╚════██║██╔═══╝ ██║██║     ██║   ██║   ██║   
  ╚██████╗██║  ██║██║ ╚═╝ ██║██║     ██║███████║██║     ██║███████╗╚██████╔╝   ██║   
   ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝ ╚═════╝    ╚═╝   
             🚀 Your Ultimate AI-Powered University Operating System
```

---

## 🔗 Live Demo & Links

- 🌐 **Live Application Website:** [https://campuspilot-tau.vercel.app](https://campuspilot-tau.vercel.app)
- 💻 **GitHub Repository:** [https://github.com/zainabnadeem/CampusPilot](https://github.com/zainabnadeem/CampusPilot) *(Replace with your repository link)*

---

## 📌 Problem Statement

University students navigate a chaotic academic ecosystem across disjointed platforms — scattered assignment deadlines, unorganized lecture slides, attendance thresholds, complex GPA calculations, and stressful exam prep. 

**CampusPilot** solves this fragmented experience by providing a single, cohesive **AI Student Operating System**. It aggregates academic task management, grade projections, schedule planning, and AI-powered tutoring into one unified dashboard, enabling students to boost productivity, minimize exam stress, and excel academically.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🔐 **Secure Authentication** | Multi-method student profile access with persistent state and local storage backup. |
| 📊 **Unified Dashboard** | Real-time academic metrics, GPA cards, upcoming tasks, attendance alerts, and quick actions. |
| 🤖 **AI Study Assistant** | Step-by-step math solver, code tutor, grammar editor, and viva voce simulator powered by Gemini API. |
| 📋 **Assignment Manager** | Status columns (Todo, In Progress, Submitted), priority tags, course links, and submission timers. |
| 📝 **Notes Manager** | Rich text lecture notes, subject tagging, quick filtering, and export tools. |
| ⚡ **AI Note Summarizer** | Instant AI-generated bullet summaries and key takeaway extractions from long notes. |
| 🗓️ **Timetable & Calendar** | Weekly schedule grid with course time-slots, instructor details, room numbers, and sync alerts. |
| 🎯 **Attendance Tracker** | Class-by-class percentage tracking with mandatory threshold safety warnings (e.g. 75% requirement). |
| 🎓 **GPA Calculator** | Semester & cumulative GPA calculator with grade weighting and target projections. |
| 🏆 **Exam Planner** | Countdown timers, exam syllabus checklists, weightage breakdown, and revision trackers. |
| 📅 **Interactive Calendar** | Month & week views mapping all assignments, exams, events, and personal reminders. |
| ⏳ **Study Planner & Pomodoro** | Customizable focus timers, study sessions, subject blocking, and habit streak counters. |
| 📈 **Analytics Dashboard** | Visual charts (Recharts/D3) tracking study hours, grade trends, and productivity scores. |
| 📁 **File Manager** | Centralized PDF, document, and lecture slides repository categorized by course. |
| 🎙️ **Voice Notes** | Speech-to-text audio note recording for fast capture during lectures. |
| 📷 **Camera Note Scanner** | Vision OCR scanning for textbook pages, handwritten notes, and whiteboard photos. |
| 📄 **AI Document Assistant** | Upload lecture PDFs/text and auto-generate flashcards, summaries, and revision questions. |
| 🌙 **Dark Mode & Aesthetics** | Premium high-contrast dark theme (#0A0A0B) with smooth glassmorphism effects. |
| 📱 **Responsive Design** | Fully responsive layout customized for desktop, tablet, and mobile browsers. |

---

## 🧠 Gemini AI Integration

CampusPilot leverages **Google Gemini 3.6 Flash** via server-side API proxying (`/api/gemini/*`) to ensure key security and high performance.

### AI Capabilities
1. **Academic Tutor (`/api/gemini/assistant`)**: Answers complex questions in 5 specialized modes:
   - `General`: Concept explanations and study guides.
   - `Math`: Step-by-step LaTeX formula derivations and calculus proofs.
   - `Code`: Multi-language code debugging, algorithms, and complexity analysis.
   - `Grammar`: Academic tone refinement and essay editing.
   - `Viva`: Interactive oral examination simulation with constructive feedback.
2. **OCR Vision Processing (`/api/gemini/ocr-scan`)**: Analyzes camera-captured textbook pages or handwritten notes to extract readable text, summaries, and action items.
3. **Smart Study Planner (`/api/gemini/planner`)**: Generates personalized revision timetables based on pending exams and subject priority.
4. **Semester Analysis (`/api/gemini/semester-analysis`)**: Synthesizes attendance, GPA, and study logs to offer actionable advice and motivation.

### 💡 AI System Prompt (Condensed Excerpt)
```text
You are CampusPilot AI, an elite university study assistant and academic tutor. 
Provide clear, well-formatted, thorough answers with Markdown, step-by-step guidance,
equations, code blocks, and academic rigor.

- Math Mode: Focus on step-by-step mathematical derivations, proofs, and formulas.
- Code Mode: Provide clean, well-commented code in TypeScript/Python/C++ with complexity analysis.
- Grammar Mode: Offer precise grammar corrections and academic style advice.
- Viva Mode: Act as a university professor conducting an oral exam.
```

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React Icons, Motion (Framer Motion)
- **Backend:** Node.js, Express.js (`server.ts`), Vite Middleware
- **Database / Persistence:** Browser LocalStorage Engine with sync state handlers & optional Firestore support
- **Authentication:** Local User Profile State / Firebase Auth integration
- **AI Model:** Google Gemini API (`@google/genai` SDK - Gemini 3.6 Flash)
- **Deployment:** Vercel / Cloud Run (Port 3000 Node server)

---

## 🚀 Installation & Local Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/)

### Step-by-Step Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zainabnadeem/CampusPilot.git
   cd CampusPilot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Folder Structure

```
CampusPilot/
├── public/                 # Static public assets
├── src/
│   ├── components/         # Modular UI Components & Modals
│   │   ├── views/          # Main application feature views
│   │   │   ├── DashboardView.tsx
│   │   │   ├── AiStudyAssistantView.tsx
│   │   │   ├── AssignmentManagerView.tsx
│   │   │   ├── NotesView.tsx
│   │   │   ├── TimetableCalendarView.tsx
│   │   │   ├── AttendanceView.tsx
│   │   │   ├── GpaCalculatorView.tsx
│   │   │   ├── ExamHubView.tsx
│   │   │   ├── AnalyticsView.tsx
│   │   │   ├── FileManagerView.tsx
│   │   │   ├── FocusModeView.tsx
│   │   │   └── ...
│   │   ├── AiAssistantModal.tsx
│   │   ├── CameraScanModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   ├── context/            # React Context (AppContext.tsx)
│   ├── services/           # Local Storage & API client services
│   ├── types.ts            # Global TypeScript interfaces & types
│   ├── App.tsx             # Application Root & Router Layout
│   ├── main.tsx            # Entry point
│   └── index.css           # Global Tailwind CSS & Custom Themes
├── .env.example            # Environment variables example
├── metadata.json           # Application metadata
├── package.json            # Dependencies and npm scripts
├── server.ts               # Express server with server-side Gemini API endpoints
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 📸 Screenshots

| Dashboard Overview | AI Study Assistant |
| :---: | :---: |
| ![Dashboard Screenshot](https://via.placeholder.com/600x350/0A0A0B/FFFFFF?text=CampusPilot+Dashboard+Overview) | ![AI Tutor Screenshot](https://via.placeholder.com/600x350/0A0A0B/FFFFFF?text=AI+Study+Assistant+Tutor) |

| Assignment & Exam Planner | Mobile & Dark Mode Layout |
| :---: | :---: |
| ![Assignments Screenshot](https://via.placeholder.com/600x350/0A0A0B/FFFFFF?text=Assignment+Manager+%26+Exam+Hub) | ![Mobile Layout Screenshot](https://via.placeholder.com/600x350/0A0A0B/FFFFFF?text=Mobile+Responsive+%26+Dark+Mode) |

---

## 🔮 Future Improvements

- [ ] **Collaborative Study Groups**: Real-time peer study rooms with shared whiteboards and document co-editing.
- [ ] **AI Speech Live Audio Tutor**: Multimodal voice-to-voice live academic coaching using Gemini Live API.
- [ ] **LMS Integration**: Direct calendar sync with Canvas, Moodle, and Google Classroom APIs.
- [ ] **Mobile Native App**: React Native mobile app with push notifications for class reminders.

---

## 🌐 Deployment

The application is hosted and deployed live on **Vercel**:

👉 **Live URL:** [https://campuspilot-tau.vercel.app](https://campuspilot-tau.vercel.app)

---

## 👤 Author

**Zainab Nadeem**  
*University Final Project*  
- 💼 **GitHub:** [@zainabnadeem](https://github.com/zainabnadeem)
- 🌐 **Live App:** [https://campuspilot-tau.vercel.app](https://campuspilot-tau.vercel.app)

---

<p center="align">
  <i>Made with ❤️ for university students worldwide. If you find CampusPilot helpful, please give this repository a ⭐️!</i>
</p>
