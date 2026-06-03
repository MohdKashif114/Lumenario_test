import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ArticleListView from './pages/ArticleListView';
import ArticleDetailView from './pages/ArticleDetailView';

export default function App() {
  const [stats, setStats] = useState({
    total: 0,
    publish: 0,
    needs_improvement: 0,
    do_not_publish: 0,
  });

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <Header stats={stats} />
          
          <main className="py-6">
            <Routes>
              
              <Route path="/" element={<ArticleListView setStats={setStats} />} />
              
              
              <Route path="/article/:id" element={<ArticleDetailView />} />
              
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          
          <footer className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200/40 dark:border-slate-800/40 mt-12 max-w-7xl mx-auto px-4">
            <p>Made with 💚 by Mohd Kashif</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
