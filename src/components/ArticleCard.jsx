import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Globe, Target } from 'lucide-react';
import DecisionBadge from './DecisionBadge';

export default function ArticleCard({ article }) {
  const { article_id, title, tenant, target_keyword, final_score, decision } = article;

  // Determine status-specific borders
  let borderLeftColor = 'border-l-rose-500';
  let scoreBadgeColor = 'bg-rose-500/10 text-rose-600 dark:text-rose-400';

  if (decision === 'publish') {
    borderLeftColor = 'border-l-emerald-500';
    scoreBadgeColor = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
  } else if (decision === 'needs_improvement') {
    borderLeftColor = 'border-l-amber-500';
    scoreBadgeColor = 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
  }

  return (
    <div className={`glass-panel border-l-4 ${borderLeftColor} p-5 rounded-2xl flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 `}>
      <div className="space-y-4">
        
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            
            <span>{tenant}</span>
          </div>
          <h3 className="text-base font-extrabold font-heading text-slate-800 dark:text-slate-100 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors ">
            {title}
          </h3>
        </div>

        
        <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          
          <span className="line-clamp-1 italic">
            Keyword: <span className="font-semibold text-slate-600 dark:text-slate-300">{target_keyword}</span>
          </span>
        </div>
      </div>

     
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-2">
        
        <div className="flex items-center gap-1.5">
          <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${scoreBadgeColor}`}>
            {final_score}
          </div>
          <DecisionBadge decision={decision} />
        </div>

        {/* View Details Link */}
        <Link
          to={`/article/${article_id}`}
          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-850 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 hover:border-indigo-500 dark:hover:border-indigo-600 transition-all duration-200 focus:outline-none"
        >
          Details
          <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
