/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar.tsx';
import ContentArea from './ContentArea.tsx';
import type { Chapter } from './types.ts';
import QuizModal from './QuizModal.tsx';

interface GkPageProps {
  subject: string;
  chapters: Chapter[];
  cachedChapterKeys: string[];
  toggleChapterCache: (subject: string, chapterId: number) => void;
  isSubscribed: boolean;
  onMarkAsComplete: (subject: string, chapterId: number) => void;
  onQuizComplete: (subject: string, chapterId: number, score: number) => void;
  isAdmin: boolean;
  onNavigateToAdmin: () => void;
  aiFeaturesEnabled: boolean;
  selectedChapterId: number | undefined;
  onSelectChapter: (id: number) => void;
  searchHighlightQuery: string | null;
}

const CircularProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const radius = 22;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 48 48"
        className="transform -rotate-90"
      >
        <circle
          className="text-zinc-200 dark:text-zinc-700"
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx="24"
          cy="24"
        />
        <circle
          className="text-amber-700 dark:text-amber-600"
          stroke="currentColor"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx="24"
          cy="24"
        />
      </svg>
      <span className="absolute text-xs font-bold text-amber-700 dark:text-amber-600">
        {`${Math.round(progress)}%`}
      </span>
    </div>
  );
};

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const GkPage: React.FC<GkPageProps> = (props) => {
  const { 
    subject, chapters, cachedChapterKeys, toggleChapterCache, isSubscribed, 
    onMarkAsComplete, onQuizComplete, isAdmin, onNavigateToAdmin, 
    aiFeaturesEnabled, selectedChapterId, onSelectChapter, searchHighlightQuery
  } = props;

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isCourseOutlineOpen, setIsCourseOutlineOpen] = useState(false);
  const mobileOutlineRef = useRef<HTMLDivElement>(null);

  const totalChapters = chapters.length;
  const completedChapters = chapters.filter(c => c.progress === 100).length;
  const overallProgress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (mobileOutlineRef.current && !mobileOutlineRef.current.contains(event.target as Node)) {
            setIsCourseOutlineOpen(false);
        }
    };

    if (isCourseOutlineOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    } else {
        document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCourseOutlineOpen]);
  
  useEffect(() => {
    if (isQuizModalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [isQuizModalOpen]);

  const selectedChapter = chapters.find(c => c.id === selectedChapterId) || null;
  const quizChapter = chapters.find(c => c.id === selectedChapterId) || null;
  
  const handleSelectChapter = (id: number) => {
    onSelectChapter(id);
    setIsCourseOutlineOpen(false);
  };

  const handleMarkAsComplete = (id: number) => {
    onMarkAsComplete(subject, id);
  };
  
  const handleStartQuiz = (id: number) => {
    onSelectChapter(id);
    setIsQuizModalOpen(true);
  };
  
  const handleQuizComplete = (id: number, score: number) => {
    onQuizComplete(subject, id, score);
  };

  return (
    <div className="flex flex-col">
      {/* Mobile Sidebar Button & Popover */}
      <div className="md:hidden mb-4 flex-shrink-0" ref={mobileOutlineRef}>
        <button
          onClick={() => setIsCourseOutlineOpen(prev => !prev)}
          className="flex w-full items-center justify-between gap-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 shadow-sm"
          aria-expanded={isCourseOutlineOpen}
          aria-controls="mobile-course-outline"
        >
          <div className="flex items-center gap-3">
            <MenuIcon />
            <div className="text-left">
              <span className="font-semibold text-sm">Course Outline</span>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-xs">
                Complete chapters and quizzes to unlock new content.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CircularProgress progress={overallProgress} />
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 flex-shrink-0 ${isCourseOutlineOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      
        {isCourseOutlineOpen && (
          <div
            id="mobile-course-outline"
            className="w-full bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 animate-fade-in h-64 mt-2"
            role="dialog"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex-grow min-h-0">
                  <Sidebar
                     chapters={chapters}
                     selectedChapterId={selectedChapterId ?? -1}
                     onSelectChapter={handleSelectChapter}
                     subject={subject}
                     cachedChapterKeys={cachedChapterKeys}
                     showTitle={false}
                     showProgressBar={false}
                   />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full animate-fade-in">
        <aside className="hidden md:block w-full md:w-64 lg:w-72 flex-shrink-0 p-3 bg-zinc-100/70 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg">
          <Sidebar
            chapters={chapters}
            selectedChapterId={selectedChapterId ?? -1}
            onSelectChapter={onSelectChapter}
            subject={subject}
            cachedChapterKeys={cachedChapterKeys}
          />
        </aside>
        <main className="flex-1 min-w-0">
          <ContentArea 
            key={selectedChapter?.id}
            chapter={selectedChapter}
            subject={subject}
            onMarkAsComplete={handleMarkAsComplete}
            onStartQuiz={handleStartQuiz}
            cachedChapterKeys={cachedChapterKeys}
            toggleChapterCache={toggleChapterCache}
            isSubscribed={isSubscribed}
            isAdmin={isAdmin}
            onNavigateToAdmin={onNavigateToAdmin}
            aiFeaturesEnabled={aiFeaturesEnabled}
            searchHighlightQuery={searchHighlightQuery}
          />
        </main>
      </div>

      <QuizModal 
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        chapter={quizChapter}
        onQuizComplete={handleQuizComplete}
      />
    </div>
  );
};

export default GkPage;