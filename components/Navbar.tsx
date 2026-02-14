import React from 'react';
import { Menu, Sun, Moon, Bell, Search, User } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isDarkMode, toggleTheme, title }) => {
  return (
    <header className="h-16 fixed top-0 right-0 left-0 md:left-64 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-30 transition-all duration-300">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden transition-colors"
          >
            <Menu className="w-6 h-6 dark:text-slate-200" />
          </button>
          
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white capitalize">
            {title.replace('-', ' ')}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Bar - Hidden on small mobile */}
          <div className="hidden sm:flex relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Quick search..." 
              className="pl-9 pr-4 py-1.5 text-sm rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 w-48 lg:w-64 transition-colors"
            />
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 dark:text-slate-200" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 dark:text-slate-200" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          <button className="flex items-center gap-2 ml-1 pl-1">
             <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
               <User className="w-5 h-5" />
             </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;