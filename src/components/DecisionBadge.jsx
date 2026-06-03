import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function DecisionBadge({ decision }) {
  switch (decision) {
    case 'publish':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Ready to Publish
        </span>
      );
    case 'needs_improvement':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/5">
          <AlertTriangle className="w-3.5 h-3.5" />
          Needs Improvement
        </span>
      );
    case 'do_not_publish':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shadow-sm shadow-rose-500/5">
          <XCircle className="w-3.5 h-3.5" />
          Do Not Publish
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
          {decision}
        </span>
      );
  }
}
