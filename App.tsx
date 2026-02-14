import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import Settings from './components/Settings';
import { MOCK_STUDENTS } from './constants';
import { ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const handleSelectStudent = (id: string) => {
    setSelectedStudentId(id);
    setView('student-detail');
  };

  const handleBackToDirectory = () => {
    setSelectedStudentId(null);
    setView('students');
  };

  const selectedStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId);

  // View Title Logic
  const getPageTitle = () => {
    switch (view) {
      case 'dashboard': return 'Dashboard Overview';
      case 'students': return 'Student Directory';
      case 'student-detail': return 'Student Profile';
      case 'settings': return 'System Settings';
      default: return 'EduTrack';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans text-slate-900 dark:text-slate-100">
      
      <Sidebar 
        currentView={view} 
        onChangeView={setView} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
        <Navbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme}
          title={getPageTitle()}
        />

        <main className="flex-1 p-4 sm:p-8 pt-20 sm:pt-24 max-w-7xl mx-auto w-full">
          {view === 'dashboard' && (
            <Dashboard students={MOCK_STUDENTS} isDarkMode={isDarkMode} />
          )}

          {view === 'students' && (
            <StudentList 
              students={MOCK_STUDENTS} 
              onSelectStudent={handleSelectStudent} 
            />
          )}

          {view === 'student-detail' && selectedStudent && (
            <StudentDetail 
              student={selectedStudent} 
              onBack={handleBackToDirectory}
            />
          )}

          {view === 'student-detail' && !selectedStudent && (
            <div className="text-center py-20 animate-fade-in">
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">Student not found</h3>
              <button 
                onClick={handleBackToDirectory}
                className="mt-4 text-brand-600 dark:text-brand-400 hover:underline"
              >
                Back to directory
              </button>
            </div>
          )}

          {view === 'settings' && (
            <Settings />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;