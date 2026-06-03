import React from 'react';
import { HelpCircle } from 'lucide-react';
import Tooltip from './Tooltip';

export default function ScoreBreakdown({ scores }) {
  if (!scores) return null;

  const scoreItems = [
    {
      key: 'search_intent_score',
      label: 'Search Intent',
      value: scores.search_intent_score,
      tooltip: 'Measures how accurately this article addresses the core search queries and answers what the user is looking for.',
    },
    {
      key: 'topical_coverage_score',
      label: 'Topical Coverage',
      value: scores.topical_coverage_score,
      tooltip: 'Evaluates if all necessary sub-topics, semantically relevant terms, and context keywords are covered.',
    },
    {
      key: 'structure_score',
      label: 'Structure & Formatting',
      value: scores.structure_score,
      tooltip: 'Rates the readability, heading hierarchy (H1, H2, H3), paragraphs, list structures, and overall organization.',
    },
    {
      key: 'trust_score',
      label: 'Trust & Authority',
      value: scores.trust_score,
      tooltip: 'Assesses the presence of trust factors, expert citations, references, original insights, and source authority.',
    },
  ];

  // Helper to determine score color class
  const getBarColor = (val) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 70) return 'bg-amber-500';
    if (val >= 60) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  const getTextColor = (val) => {
    if (val >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (val >= 70) return 'text-amber-600 dark:text-amber-400';
    if (val >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
        Score Breakdown
      </h3>
      <div className="space-y-4">
        {scoreItems.map((item) => (
          <div key={item.key} className="group">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {item.label}
                </span>
                <Tooltip text={item.tooltip}>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
                    aria-label={`About ${item.label}`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </Tooltip>
              </div>
              <span className={`text-sm font-bold ${getTextColor(item.value)}`}>
                {item.value}%
              </span>
            </div>
            {/* Progress Bar Container */}
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/40 dark:border-slate-700/40">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(item.value)}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
