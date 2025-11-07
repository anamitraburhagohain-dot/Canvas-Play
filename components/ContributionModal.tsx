/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import type { Chapter } from './types.ts';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contribution: { subject: string; chapterId: number; content: string }) => void;
  allChapters: { [key: string]: Chapter[] };
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ContributionModal: React.FC<ContributionModalProps> = ({ isOpen, onClose, onSubmit, allChapters }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const subjects = Object.keys(allChapters);
  const availableChapters = selectedSubject ? allChapters[selectedSubject] : [];

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setSelectedSubject('');
      setSelectedChapterId('');
      setContent('');
      setIsSubmitted(false);
    }
  }, [isOpen]);
  
  useEffect(() => {
    // Reset chapter selection if subject changes
    setSelectedChapterId('');
  }, [selectedSubject]);

  if (!isOpen) {
    return null;
  }

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !selectedChapterId || !content.trim()) {
      return;
    }
    onSubmit({
      subject: selectedSubject,
      chapterId: parseInt(selectedChapterId, 10),
      content: content.trim(),
    });
    setIsSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative transform transition-all flex flex-col"
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
        
        {isSubmitted ? (
            <div className="text-center flex flex-col items-center justify-center h-full py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100 mt-4">Thank You!</h2>
                <p className="text-zinc-600 dark:text-zinc-300 mt-2">Your contribution has been submitted for review.</p>
                <button onClick={onClose} className="mt-8 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    Close
                </button>
            </div>
        ) : (
            <>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">Contribute Content</h2>
                    <p className="mt-1 text-zinc-500 dark:text-zinc-400">Share your knowledge and help others learn.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="subject-select" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Subject</label>
                            <select
                                id="subject-select"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                required
                                className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white dark:placeholder-zinc-400"
                            >
                                <option value="" disabled>Select a subject...</option>
                                {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="chapter-select" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Chapter</label>
                            <select
                                id="chapter-select"
                                value={selectedChapterId}
                                onChange={(e) => setSelectedChapterId(e.target.value)}
                                required
                                disabled={!selectedSubject}
                                className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="" disabled>Select a chapter...</option>
                                {availableChapters.map(chapter => <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="content-textarea" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Your Content</label>
                        <textarea
                            id="content-textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={8}
                            required
                            placeholder="Write your article, explanation, or facts here..."
                            className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white dark:placeholder-zinc-500"
                        ></textarea>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-semibold py-2 px-4 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-600">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:bg-zinc-400 dark:disabled:bg-zinc-500 disabled:cursor-not-allowed">
                            Submit for Review
                        </button>
                    </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default ContributionModal;