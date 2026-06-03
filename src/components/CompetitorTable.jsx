import React from 'react';
import { ExternalLink, Trophy, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function CompetitorTable({ competitors = [], articleScore }) {
  if (!competitors || competitors.length === 0) {
    return (
      <div className="text-sm text-slate-500 dark:text-slate-400 italic p-6 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
        No competitor data available.
      </div>
    );
  }

  // Calculate competitor average
  const totalCompetitorScore = competitors.reduce((sum, c) => sum + c.score, 0);
  const avgCompetitorScore = totalCompetitorScore / competitors.length;
  const scoreDiff = articleScore - avgCompetitorScore;
  const beatsCompetitors = scoreDiff >= 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-slate-200">
          Competitor Analysis
        </h3>
        {/* Comparison Summary Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border shadow-sm ${
          beatsCompetitors
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-emerald-500/5'
            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 shadow-rose-500/5'
        }`}>
          {beatsCompetitors ? (
            <Trophy className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>
            {beatsCompetitors
              ? `Beats Competitor Avg by +${scoreDiff.toFixed(1)} pts`
              : `Below Competitor Avg by ${scoreDiff.toFixed(1)} pts`}
          </span>
        </div>
      </div>

      {/* Summary Score Comparison Widget */}
      <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/40 dark:border-slate-800/80">
        <div className="text-center border-r border-slate-200 dark:border-slate-800">
          <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
            Your Article
          </span>
          <span className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-200">
            {articleScore}
          </span>
        </div>
        <div className="text-center">
          <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
            Competitor Avg
          </span>
          <span className="text-2xl font-bold font-heading text-slate-700 dark:text-slate-300">
            {avgCompetitorScore.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-850 shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
              <th className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 w-16 text-center">Rank</th>
              <th className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Competitor Title</th>
              <th className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 text-center w-24">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150 dark:divide-slate-800">
            {competitors.map((comp) => {
              const compDiff = articleScore - comp.score;
              const beatsThisComp = compDiff >= 0;

              return (
                <tr
                  key={comp.rank}
                  className="hover:bg-slate-50/30 dark:hover:bg-slate-900/20 transition-colors"
                >
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                      #{comp.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                        {comp.title}
                      </span>
                      {comp.url && (
                        <a
                          href={comp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium focus:outline-none focus:underline"
                        >
                          Visit Link
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {comp.score}
                      </span>
                      <span className={`text-[10px] font-semibold mt-0.5 px-1 py-0.25 rounded ${
                        beatsThisComp
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {beatsThisComp ? `+${compDiff}` : compDiff}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
