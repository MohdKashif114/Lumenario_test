import React from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';

export default function RecommendationList({ recommendations = [], missingTopics = [] }) {
  const hasMissingTopics = missingTopics && missingTopics.length > 0;
  const hasRecommendations = recommendations && recommendations.length > 0;

  return (
    <div className="space-y-6">
      
      <div>
        <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          Missing Topics
        </h3>
        {hasMissingTopics ? (
          <div className="flex flex-wrap gap-2">
            {missingTopics.map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {topic}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 rounded-xl text-sm">
            <Check className="w-4 h-4 shrink-0" />
            <span>Excellent! No critical missing topics identified.</span>
          </div>
        )}
      </div>

     
      <div>
        <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-slate-200 mb-3">
          Actionable Recommendations
        </h3>
        {hasRecommendations ? (
          <ul className="space-y-2.5">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/80 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-200 group"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold text-xs shrink-0 mt-0.5 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                  {index + 1}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rec}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400 italic p-3.5 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            No recommendations provided.
          </div>
        )}
      </div>
    </div>
  );
}
