/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: string;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ isOpen, onClose, article }) => {
  if (!isOpen) {
    return null;
  }

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative transform transition-all flex flex-col"
        style={{ maxHeight: '80vh' }}
        onClick={handleModalContentClick}
        role="document"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">Today's Fact</h2>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2">
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {article}
          </p>
        </div>
        
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-right">
            <button onClick={onClose} className="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-semibold py-2 px-4 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-600">
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailModal;