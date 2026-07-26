import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { SmartSearchModal } from './components/SmartSearchModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { CameraScanModal } from './components/CameraScanModal';
import { RemindersModal } from './components/RemindersModal';
import { AuthModal } from './components/AuthModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { SubjectManagerView } from './components/views/SubjectManagerView';
import { AssignmentManagerView } from './components/views/AssignmentManagerView';
import { NotesView } from './components/views/NotesView';
import { FileManagerView } from './components/views/FileManagerView';
import { TimetableCalendarView } from './components/views/TimetableCalendarView';
import { TaskManagerView } from './components/views/TaskManagerView';
import { StudyPlannerView } from './components/views/StudyPlannerView';
import { ExamHubView } from './components/views/ExamHubView';
import { AttendanceView } from './components/views/AttendanceView';
import { GpaCalculatorView } from './components/views/GpaCalculatorView';
import { FocusModeView } from './components/views/FocusModeView';
import { GoalsAchievementsView } from './components/views/GoalsAchievementsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { AiDocumentAssistantView } from './components/views/AiDocumentAssistantView';
import { AiStudyAssistantView } from './components/views/AiStudyAssistantView';
import { AiSemesterAnalysisView } from './components/views/AiSemesterAnalysisView';
import { CommunityView } from './components/views/CommunityView';
import { SettingsView } from './components/views/SettingsView';

const MainLayout: React.FC = () => {
  const { activeTab, theme } = useApp();
  const isDark = theme === 'dark';

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'subjects':
        return <SubjectManagerView />;
      case 'assignments':
        return <AssignmentManagerView />;
      case 'notes':
        return <NotesView />;
      case 'files':
        return <FileManagerView />;
      case 'timetable':
        return <TimetableCalendarView />;
      case 'tasks':
        return <TaskManagerView />;
      case 'planner':
        return <StudyPlannerView />;
      case 'exams':
        return <ExamHubView />;
      case 'attendance':
        return <AttendanceView />;
      case 'gpa':
        return <GpaCalculatorView />;
      case 'focus':
        return <FocusModeView />;
      case 'goals':
        return <GoalsAchievementsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'ai-doc-assistant':
        return <AiDocumentAssistantView />;
      case 'ai-study-assistant':
        return <AiStudyAssistantView />;
      case 'ai-semester-analysis':
        return <AiSemesterAnalysisView />;
      case 'community':
        return <CommunityView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${isDark ? 'dark bg-[#0A0A0B] text-zinc-300' : 'bg-slate-50 text-slate-800'}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Navbar */}
          <Navbar />

          {/* Main Workspace View */}
          <main className="custom-scrollbar flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {renderActiveView()}
            </div>
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <SmartSearchModal />
      <AiAssistantModal />
      <CameraScanModal />
      <RemindersModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
