
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  initialChapterId?: number;
  initialChapterTitle?: string;
  onSubmit?: (content: string, type: 'issue' | 'fact' | 'improvement' | 'quiz', source?: string) => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const BugIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const PencilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const PuzzleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;

const VividCreatorIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none">
        <defs>
            <linearGradient id="vivid-gradient-modal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
        </defs>
        <path d="M12 20h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="url(#vivid-gradient-modal)" stroke="none" />
    </svg>
);

type ContributionType = 'issue' | 'fact' | 'improvement' | 'quiz';

const ContributionModal: React.FC<ContributionModalProps> = ({ isOpen, onClose, initialSubject, initialChapterTitle, onSubmit }) => {
  const [type, setType] = useState<ContributionType>('improvement');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setContent('');
      setSource('');
      setIsSubmitted(false);
      setType('improvement');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
        onSubmit(content, type, source);
    }
    // Simulate submission delay for UI effect
    setTimeout(() => setIsSubmitted(true), 500);
  };

  const typeOptions: { id: ContributionType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'improvement', label: 'Improve Text', icon: <PencilIcon />, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: 'fact', label: 'Add Fact', icon: <LightbulbIcon />, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
    { id: 'issue', label: 'Report Issue', icon: <BugIcon />, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
    { id: 'quiz', label: 'Suggest Quiz', icon: <PuzzleIcon />, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white dark:bg-zinc-900 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-xl relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={handleModalContentClick}
      >
        {/* Header Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10 dark:opacity-20 pointer-events-none"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/50 dark:bg-black/20 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-white dark:hover:bg-black/40 transition-all z-10 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {isSubmitted ? (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 relative">
                     <div className="absolute inset-0 rounded-full border-4 border-green-200 dark:border-green-800 animate-ping opacity-20"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-2">Thank You!</h2>
                <p className="text-zinc-600 dark:text-zinc-300 mb-8 max-w-xs">
                    Your contribution helps make Canvas Play better for everyone. We'll review it shortly.
                </p>
                <button onClick={onClose} className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Back to Learning
                </button>
            </div>
        ) : (
            <div className="flex flex-col h-full">
                <div className="p-8 pb-4 z-0">
                    <div className="flex items-center mb-1">
                        <VividCreatorIcon />
                        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Creator Studio</h2>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        Contribute to <span className="font-semibold text-blue-600 dark:text-blue-400">{initialSubject}</span>
                        {initialChapterTitle && <span className="mx-1">•</span>}
                        <span className="italic">{initialChapterTitle}</span>
                    </p>
                </div>

                <div className="flex-grow overflow-y-auto px-8 pb-6 force-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Type Selection */}
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">What kind of contribution?</label>
                            <div className="grid grid-cols-2 gap-3">
                                {typeOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => setType(option.id)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                                            type === option.id 
                                            ? `border-transparent ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 ring-blue-500 bg-white dark:bg-zinc-800 shadow-md`
                                            : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg ${option.color}`}>
                                            {option.icon}
                                        </div>
                                        <span className={`font-semibold text-sm ${type === option.id ? 'text-zinc-900 dark:text-white' : ''}`}>{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                                {type === 'issue' ? 'Describe the issue' : type === 'quiz' ? 'Your Question & Answer' : 'Your Content'}
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={5}
                                placeholder={type === 'issue' ? "e.g., There is a typo in paragraph 2..." : "Share your knowledge here..."}
                                className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 resize-none"
                            ></textarea>
                        </div>

                        {/* Source Field */}
                        {(type === 'fact' || type === 'improvement') && (
                             <div>
                                <label htmlFor="source" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Source (Optional)</label>
                                <input
                                    type="text"
                                    id="source"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                    placeholder="e.g., Wikipedia, Textbook, etc."
                                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-zinc-800 dark:text-zinc-200 placeholder-zinc-400"
                                />
                            </div>
                        )}

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={!content.trim()}
                                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Submit Contribution
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ContributionModal;
