import React from 'react';
import { Sun, Moon, Sparkles, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Header({ stats }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="glass-panel sticky top-0 z-40 w-full px-4 sm:px-6 py-4 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
           
            <div>
              <span className="text-xl font-extrabold font-heading  dark:text-amber-50 bg-clip-text text-transparent tracking-tight">
                Lumenario
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                Article Scoreboard
              </span>
            </div>
          </Link>

          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            type="button"
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none transition-colors"
            aria-label="Toggle visual theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Stats and Theme Toggle Desktop */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between md:justify-end">
          {stats && (
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/20 text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200 mr-1">{stats.total}</span>
                Articles
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <span className="font-semibold mr-1">{stats.publish}</span>
                Publish
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <span className="font-semibold mr-1">{stats.needs_improvement}</span>
                Improvement
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                <span className="font-semibold mr-1">{stats.do_not_publish}</span>
                Reject
              </div>
            </div>
          )}

          {/* Theme Toggle Desktop */}
          <button
            onClick={toggleTheme}
            type="button"
            className="hidden md:flex p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:scale-105 focus:outline-none transition-all cursor-pointer"
            aria-label="Toggle visual theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
