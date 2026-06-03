import React from 'react';
import { Search, X, ArrowUpDown, SlidersHorizontal } from 'lucide-react';

export default function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  decisionFilter,
  setDecisionFilter,
  sortOption,
  setSortOption,
  onReset,
  hasFiltersApplied
}) {
  const filterPills = [
    { label: 'All Articles', value: 'all' },
    { label: 'Ready to Publish', value: 'publish' },
    { label: 'Needs Improvement', value: 'needs_improvement' },
    { label: 'Do Not Publish', value: 'do_not_publish' }
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl shadow-md space-y-4 mb-6 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
          <h2 className="text-base font-bold font-heading text-slate-800 dark:text-slate-200">
            Search & Filter Controls
          </h2>
        </div>
        {hasFiltersApplied && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer focus:outline-none transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search Input (7 columns on medium, full on mobile) */}
        <div className="relative md:col-span-8 flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by article title or target keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Select (4 columns on medium, full on mobile) */}
        <div className="relative md:col-span-4 flex items-center">
          <ArrowUpDown className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none transition-all duration-200 cursor-pointer"
          >
            <option value="default">Sort by: Default</option>
            <option value="high_to_low">Score: High to Low</option>
            <option value="low_to_high">Score: Low to High</option>
          </select>
          <div className="absolute right-3.5 pointer-events-none border-l border-slate-200 dark:border-slate-800 pl-2 text-slate-400 dark:text-slate-500">
            ▼
          </div>
        </div>
      </div>

      {/* Filter Buttons Section */}
      <div className="flex flex-col gap-2 pt-1.5">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Filter by Status
        </span>
        <div className="flex flex-wrap gap-2">
          {filterPills.map((pill) => {
            const isActive = decisionFilter === pill.value;
            let activeStyles = 'bg-indigo-500 text-white shadow-md shadow-indigo-500/10 border-indigo-500';
            let inactiveStyles = 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-250/20 dark:border-slate-800/80';

           

            return (
              <button
                key={pill.value}
                onClick={() => setDecisionFilter(pill.value)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer focus:outline-none ${
                  isActive ? activeStyles : inactiveStyles
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
