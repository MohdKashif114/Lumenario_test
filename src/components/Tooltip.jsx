import React, { useState } from 'react';

export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-sm text-slate-100 text-xs font-normal rounded-lg shadow-xl border border-slate-700 dark:border-slate-600 pointer-events-none text-center z-50 leading-relaxed transition-all duration-200 ease-out animate-in fade-in slide-in-from-bottom-1">
          {text}
          
        </div>
      )}
    </div>
  );
}
