/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';

interface Chapter {
  id: number;
  title: string;
  locked: boolean;
  progress: number;
}

interface SidebarProps {
  chapters: Chapter[];
  selectedChapterId: number;
  onSelectChapter: (id: number) => void;
  subject: string;
  cachedChapterKeys: string[];
  showTitle?: boolean;
  showProgressBar?: boolean;
}

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const ProgressBar: React.FC<{ progress: number; completed: number; total: number }> = ({ progress, completed, total }) => (
  <>
    <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Overall Progress</span>
        <span className="text-sm font-medium text-amber-800 dark:text-amber-600">{completed} / {total} Chapters</span>
    </div>
    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
        <div className="bg-amber-700 dark:bg-amber-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
    </div>
  </>
);

const ChapterListItem: React.FC<{
    chapter: Chapter;
    isSelected: boolean;
    isCached: boolean;
    isLocked: boolean;
    onClick: () => void;
    setRef: (el: HTMLButtonElement | null) => void;
}> = ({ chapter, isSelected, isCached, isLocked, onClick, setRef }) => {
    
    const textRef = useRef<HTMLSpanElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    // Split title into prefix, main title, and subtitle
    let chapterPrefix = '';
    let restOfTitle = chapter.title;

    // Check if the title follows the "Chapter X: ..." format
    if (chapter.title.match(/^Chapter \d+:/)) {
        const parts = chapter.title.split(/:\s(.*)/s);
        chapterPrefix = `${parts[0]}:`;
        restOfTitle = parts[1] || '';
    }

    const subtitleMatch = restOfTitle.match(/(.*)\s(\(.*\))/);
    const mainTitle = (subtitleMatch ? subtitleMatch[1] : restOfTitle).trim();
    const subtitle = subtitleMatch ? subtitleMatch[2] : null;

    // Effect to check for overflow on the descriptive title
    useLayoutEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                const hasOverflow = textRef.current.scrollWidth > textRef.current.clientWidth;
                // Only update state if it has changed to prevent re-render loops
                if (hasOverflow !== isOverflowing) {
                    setIsOverflowing(hasOverflow);
                }
            }
        };

        // Use a timeout to allow the browser to render before we measure
        const timeoutId = setTimeout(checkOverflow, 50);

        window.addEventListener('resize', checkOverflow);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [mainTitle]);

    const baseClasses = "w-full text-left flex items-center justify-between p-2 rounded-md text-sm font-medium transition-colors duration-200";
    let stateClasses = "";
    
    if (isLocked) {
        stateClasses = "text-zinc-400 dark:text-zinc-500 cursor-not-allowed bg-zinc-200/50 dark:bg-zinc-800";
    } else if (isSelected) {
        stateClasses = "bg-blue-600 text-white shadow";
    } else {
        stateClasses = "text-zinc-600 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100";
    }

    return (
        <li>
            <button
              ref={setRef}
              onClick={onClick}
              disabled={isLocked}
              className={`${baseClasses} ${stateClasses}`}
              aria-current={isSelected ? "page" : undefined}
            >
                <div className="flex items-center gap-3 flex-grow min-w-0">
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                      {!isLocked && chapter.progress === 100 && <CheckCircleIcon />}
                    </div>
                    
                    <div className="flex items-baseline flex-grow min-w-0">
                        {/* Static "tab" for chapter number with right margin for spacing */}
                        {chapterPrefix && (
                            <div className="flex-shrink-0 font-semibold whitespace-nowrap mr-1.5">
                                {chapterPrefix}
                            </div>
                        )}
                        
                        {/* Flexible "tab" for title with marquee */}
                        <div className="flex flex-col flex-grow min-w-0">
                            <div className="relative overflow-hidden h-5"> {/* Fixed height for alignment */}
                                {/* Span for measuring overflow */}
                                <span
                                    ref={textRef}
                                    className={`block truncate transition-opacity duration-200 ${isOverflowing ? 'opacity-0' : 'opacity-100'}`}
                                    aria-hidden={isOverflowing}
                                >
                                    {mainTitle}
                                </span>
                                {/* Marquee is rendered on top if overflowing */}
                                {isOverflowing && (
                                    <div className="absolute inset-0">
                                        <div className="marquee-container-sidebar">
                                            <span className="marquee-text-sidebar">{mainTitle}</span>
                                            <span className="marquee-text-sidebar" aria-hidden="true">{mainTitle}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {subtitle && <span className={`text-xs mt-1 font-normal truncate ${isSelected ? 'text-white/80' : 'text-zinc-500 dark:text-zinc-500'}`}>{subtitle}</span>}
                        </div>
                    </div>
                </div>
                <div className="pl-2 flex-shrink-0">
                    {isLocked ? <LockIcon /> : (isCached && <DownloadIcon />)}
                </div>
            </button>
        </li>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ chapters, selectedChapterId, onSelectChapter, subject, cachedChapterKeys, showTitle = true, showProgressBar = true }) => {
  const totalChapters = chapters.length;
  const completedChapters = chapters.filter(c => c.progress === 100).length;
  const overallProgress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
  const itemRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());

  useEffect(() => {
    const selectedItem = itemRefs.current.get(selectedChapterId);
    if (selectedItem) {
      // Use a timeout to ensure the scroll happens after the modal is fully visible
      setTimeout(() => {
        selectedItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 100);
    }
  }, [selectedChapterId]);
  
  return (
    <div className="h-full flex flex-col">
      {showTitle && (
        <div className="space-y-2 flex-shrink-0">
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">Course Outline</h3>
        </div>
      )}

      {showProgressBar && (
        <div className="my-3 flex-shrink-0">
          <ProgressBar progress={overallProgress} completed={completedChapters} total={totalChapters} />
        </div>
      )}

      <nav className={`flex-1 overflow-y-auto pr-2 force-scrollbar ${showTitle || showProgressBar ? 'mt-3' : ''}`}>
        <ul className="space-y-1">
          {chapters.map((chapter) => {
            const isSelected = chapter.id === selectedChapterId;
            const isLocked = chapter.locked;
            const cacheKey = `cached-chapter-${subject}-${chapter.id}`;
            const isCached = cachedChapterKeys.includes(cacheKey);

            return (
              <ChapterListItem
                key={chapter.id}
                chapter={chapter}
                isSelected={isSelected}
                isCached={isCached}
                isLocked={isLocked}
                onClick={() => !isLocked && onSelectChapter(chapter.id)}
                setRef={(el) => itemRefs.current.set(chapter.id, el)}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;