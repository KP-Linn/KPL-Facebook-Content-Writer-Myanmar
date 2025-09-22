
import React, { useState, useEffect } from 'react';
import { CopyIcon, ClipboardCheckIcon, PenToolIcon } from './IconComponents';
import { LoadingSpinner } from './LoadingSpinner';

interface GeneratedContentProps {
  content: string;
  isLoading: boolean;
}

export const GeneratedContent: React.FC<GeneratedContentProps> = ({ content, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

   useEffect(() => {
    // Reset copied state when new content is generated
    setCopied(false);
  }, [content]);


  return (
    <div className="h-full bg-slate-800/50 p-6 md:p-8 rounded-xl border border-slate-700/80 shadow-2xl shadow-slate-950/30 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-200">Generated Content</h2>
        {content && !isLoading && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-slate-700/50 hover:bg-slate-700 rounded-md transition-colors duration-200 text-slate-300"
          >
            {copied ? (
              <>
                <ClipboardCheckIcon className="h-4 w-4 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      <div className="mt-4 flex-grow bg-slate-900/70 rounded-lg p-4 min-h-[300px] lg:min-h-[465px] flex items-center justify-center relative overflow-y-auto">
        {isLoading ? (
          <LoadingSpinner />
        ) : content ? (
          <p className="whitespace-pre-wrap text-slate-300 w-full h-full text-left font-noto-mm text-base leading-relaxed">
            {content}
          </p>
        ) : (
          <div className="text-center text-slate-500">
            <PenToolIcon className="h-12 w-12 mx-auto" />
            <p className="mt-4 font-medium">Your generated content will appear here.</p>
            <p className="text-sm">ဖန်တီးထားသောစာကိုဤနေရာတွင်တွေ့ရပါမည်။</p>
          </div>
        )}
      </div>
    </div>
  );
};
