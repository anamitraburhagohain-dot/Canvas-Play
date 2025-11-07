/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  isSubscribed: boolean;
  isAdmin: boolean;
}

const ChevronDoubleLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
);

const ChevronDoubleRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
);

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, isSubscribed, isAdmin }) => {
  const proTabs = ['Current Affairs', 'G.K'];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
        const hasOverflow = el.scrollWidth > el.clientWidth;
        // Use a small buffer for floating point inaccuracies
        const isScrolledToStart = el.scrollLeft < 5;
        const isScrolledToEnd = el.scrollWidth - el.scrollLeft - el.clientWidth < 5;

        setShowLeftIndicator(hasOverflow && !isScrolledToStart);
        setShowRightIndicator(hasOverflow && !isScrolledToEnd);
    }
  }, []);

  // Check scrollability on mount, on tabs change, and on resize
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollability(); // Initial check

    // Use ResizeObserver to detect changes in container size or content
    const resizeObserver = new ResizeObserver(() => {
        checkScrollability();
    });
    resizeObserver.observe(el);

    // Also add a window resize listener as a fallback
    window.addEventListener('resize', checkScrollability);

    return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', checkScrollability);
    };
  }, [tabs, isAdmin, checkScrollability]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getButtonClasses = (tab: string, isActive: boolean, isDisabled: boolean = false) => `
    flex-grow flex-shrink-0 flex items-center justify-center whitespace-nowrap py-2 sm:py-2.5 px-2 sm:px-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 ease-in-out focus:outline-none
    ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : `text-zinc-500 dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`
    }
    ${ isDisabled ? 'opacity-60 cursor-not-allowed hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70' : '' }
  `;

  return (
    <div className="w-full flex items-center gap-1 sm:gap-2">
        {/* Left Scroll Button */}
        <button
            onClick={() => handleScroll('left')}
            className={`flex-shrink-0 p-2 rounded-full transition-opacity duration-300 ${showLeftIndicator ? 'opacity-100 hover:bg-zinc-200 dark:hover:bg-zinc-800' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll left"
            tabIndex={showLeftIndicator ? 0 : -1}
        >
            <ChevronDoubleLeftIcon />
        </button>

        <div className="flex-grow min-w-0 p-1.5 border border-zinc-300 dark:border-zinc-800 rounded-full bg-zinc-200 dark:bg-zinc-900">
            <div 
                ref={scrollContainerRef}
                onScroll={checkScrollability}
                className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide"
            >
                {tabs.map((tab) => {
                const isProTab = proTabs.includes(tab);
                const isDisabled = isProTab && !isSubscribed;
                const isActive = activeTab === tab;

                return (
                    <button
                    key={tab}
                    onClick={() => !isDisabled && onTabChange(tab)}
                    disabled={isDisabled}
                    className={getButtonClasses(tab, isActive, isDisabled)}
                    aria-current={isActive ? 'page' : undefined}
                    >
                    {tab}
                    {isProTab && !isSubscribed && (
                        <span className="ml-1.5 font-bold text-[7px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-zinc-500 text-white">
                        PRO
                        </span>
                    )}
                    </button>
                );
                })}

                {isAdmin && (
                <button
                    key="Admin"
                    onClick={() => onTabChange('Admin')}
                    className={getButtonClasses('Admin', activeTab === 'Admin')}
                    aria-current={activeTab === 'Admin' ? 'page' : undefined}
                    >
                    Admin
                    </button>
                )}
            </div>
        </div>

        {/* Right Scroll Button */}
        <button
            onClick={() => handleScroll('right')}
            className={`flex-shrink-0 p-2 rounded-full transition-opacity duration-300 ${showRightIndicator ? 'opacity-100 hover:bg-zinc-200 dark:hover:bg-zinc-800' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll right"
            tabIndex={showRightIndicator ? 0 : -1}
        >
            <ChevronDoubleRightIcon />
        </button>
    </div>
  );
};

export default Tabs;