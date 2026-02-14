import React from 'react';
import { LayoutDashboard, Users, GraduationCap, Settings, LogOut, X } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar / Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 dark:bg-slate-950 text-white flex flex-col h-screen border-r border-slate-800 dark:border-slate-900 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800 dark:border-slate-900 h-16">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-brand-500 w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">EduTrack</h1>
            </div>
          </div>
          {/* Close button - Mobile only */}
          <button 
            onClick={onClose} 
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4 mt-2">
            Main Menu
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onChangeView(item.id as ViewState);
                onClose(); // Close drawer on mobile selection
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                currentView === item.id || (item.id === 'students' && currentView === 'student-detail')
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:pl-5'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${
                 currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'
              }`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4 mt-8">
            System
          </div>
           <button 
              onClick={() => {
                onChangeView('settings');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                 currentView === 'settings' 
                 ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50' 
                 : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:pl-5'
              }`}
           >
              <Settings className="w-5 h-5 text-slate-500 group-hover:text-white" />
              <span>Settings</span>
           </button>
        </nav>

        <div className="p-4 border-t border-slate-800 dark:border-slate-900 bg-slate-900/50 dark:bg-slate-950/50">
           <div className="flex items-center gap-3 px-4 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">admin@edutrack.edu</p>
              </div>
           </div>
           <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors text-sm">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;