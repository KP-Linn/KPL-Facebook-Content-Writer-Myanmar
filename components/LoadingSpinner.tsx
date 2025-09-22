
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-slate-500 border-t-teal-400 rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium">Generating content...</p>
    </div>
  );
};
