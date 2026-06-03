import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../utils/dataLoader';
import SearchAndFilter from '../components/SearchAndFilter';
import ArticleCard from '../components/ArticleCard';
import { BookOpen, RefreshCw, AlertCircle, FileSearch } from 'lucide-react';

export default function ArticleListView({ setStats }) {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for search, filter, and sort 
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('lumenario-search') || '';
  });
  const [decisionFilter, setDecisionFilter] = useState(() => {
    return localStorage.getItem('lumenario-filter') || 'all';
  });
  const [sortOption, setSortOption] = useState(() => {
    return localStorage.getItem('lumenario-sort') || 'default';
  });

  // Fetch articles on mount
  const loadData = async (showLoading = true) => {
  if (showLoading) setLoading(true);

  try {
    setError(null);

    const data = await fetchArticles();

    setArticles(data);

    const counts = {
      total: data.length,
      publish: data.filter((a) => a.decision === "publish").length,
      needs_improvement: data.filter(
        (a) => a.decision === "needs_improvement"
      ).length,
      do_not_publish: data.filter(
        (a) => a.decision === "do_not_publish"
      ).length,
    };

    setStats(counts);
  } catch (err) {
    setError(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadData();
  }, []);

  // Sync state variables with localStorage
  useEffect(() => {
    localStorage.setItem('lumenario-search', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('lumenario-filter', decisionFilter);
  }, [decisionFilter]);

  useEffect(() => {
    localStorage.setItem('lumenario-sort', sortOption);
  }, [sortOption]);

  // Apply search, filters, and sort
  useEffect(() => {
    let result = [...articles];

    //  Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(query) ||
          art.target_keyword.toLowerCase().includes(query)
      );
    }

    // Decision Filter
    if (decisionFilter !== 'all') {
      result = result.filter((art) => art.decision === decisionFilter);
    }

    //  Sorting
    if (sortOption === 'high_to_low') {
      result.sort((a, b) => b.final_score - a.final_score);
    } else if (sortOption === 'low_to_high') {
      result.sort((a, b) => a.final_score - b.final_score);
    }

    setFilteredArticles(result);
  }, [articles, searchQuery, decisionFilter, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setDecisionFilter('all');
    setSortOption('default');
  };

  const hasFiltersApplied = searchQuery !== '' || decisionFilter !== 'all' || sortOption !== 'default';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-gradient-to-r">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-800 dark:text-slate-400 mt-1">
            Review article grading scores, topical gaps, and competitor analysis. Ready items are ready for CMS publishing.
          </p>
        </div>
      </div>

      
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        decisionFilter={decisionFilter}
        setDecisionFilter={setDecisionFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onReset={handleResetFilters}
        hasFiltersApplied={hasFiltersApplied}
      />

      
      {loading && (
      <div className="flex justify-center items-center py-20">
        <RefreshCw className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    )}  

      
      {!loading && error && (
        <div className="flex flex-col items-center justify-center text-center p-12 glass-panel rounded-3xl border border-rose-500/20 max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Data Fetch Error</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{error}</p>
          <button
            onClick={() => loadData(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md focus:outline-none transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Connection
          </button>
        </div>
      )}

    
      {!loading && !error && filteredArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center p-12 glass-panel rounded-3xl border border-slate-200/50 dark:border-slate-800/80 max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 flex items-center justify-center">
            <FileSearch className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Articles Found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No articles match your search query or filter settings. Try adjusting your keywords or clearing the filter state.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md focus:outline-none transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* cards*/}
      {!loading && !error && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
