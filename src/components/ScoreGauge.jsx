import React, { useEffect, useState } from 'react';

export default function ScoreGauge({ score, size = 120, showLabel = true }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius; // 282.74
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      const progress = Math.min(Math.max(score, 0), 100) / 100;
      setOffset(circumference - progress * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  // Determine visual themes based on score threshold
  let strokeColor = 'url(#gauge-rose)';
  let textColor = 'text-rose-600 dark:text-rose-400';
  let textShadow = 'shadow-rose-500/25';
  let badgeBg = 'bg-rose-500/10 text-rose-700 dark:text-rose-300';
  let ratingText = 'Low';

  if (score >= 80) {
    strokeColor = 'url(#gauge-emerald)';
    textColor = 'text-emerald-600 dark:text-emerald-400';
    textShadow = 'shadow-emerald-500/25';
    badgeBg = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
    ratingText = 'Excellent';
  } else if (score >= 70) {
    strokeColor = 'url(#gauge-amber)';
    textColor = 'text-amber-600 dark:text-amber-400';
    textShadow = 'shadow-amber-500/25';
    badgeBg = 'bg-amber-500/10 text-amber-700 dark:text-amber-300';
    ratingText = 'Good';
  } else if (score >= 60) {
    strokeColor = 'url(#gauge-orange)';
    textColor = 'text-orange-600 dark:text-orange-400';
    textShadow = 'shadow-orange-500/25';
    badgeBg = 'bg-orange-500/10 text-orange-700 dark:text-orange-300';
    ratingText = 'Fair';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gauge-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="gauge-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="gauge-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="gauge-rose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-800 fill-none"
            strokeWidth="8"
          />
          {/* Animated Foreground Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            className="gauge-path"
            style={{ strokeDashoffset: offset }}
          />
        </svg>
        {/* Core Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-3xl font-extrabold font-heading ${textColor}`}>
            {score}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Score
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={`mt-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeBg}`}>
          {ratingText}
        </span>
      )}
    </div>
  );
}
