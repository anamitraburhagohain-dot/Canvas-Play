/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';

// Define the structure for a single search result
export interface SearchResult {
  subject: string;
  chapterId: number;
  chapterTitle: string;
  contentSnippet: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  results: SearchResult[];
  onResultClick: (subject: string, chapterId: number, query: string) => void;
}

// Icons
const SearchIconFab = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const SearchIconInput = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ClearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, results, onResultClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    
    // State for positioning and interaction
    const fabRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0, isInitial: true });
    const [isHiding, setIsHiding] = useState(false);
    const [isActivelyDragging, setIsActivelyDragging] = useState(false);
    
    // Consolidate drag state into a single ref to prevent stale closures and unnecessary re-renders
    const dragInfo = useRef({
        isPointerDown: false,
        didDrag: false, // Will be true only if moved past a threshold
        startX: 0,
        startY: 0,
        initialX: 0,
        initialY: 0,
    });
    
    const FAB_SIZE = 56;
    const PADDING = 24;
    const DRAG_THRESHOLD = 5; // pixels

    // Initialize FAB position to bottom right
    useEffect(() => {
        setPosition({
            x: window.innerWidth - FAB_SIZE - PADDING,
            y: window.innerHeight - FAB_SIZE - PADDING,
            isInitial: false
        });
    }, []);

    // Debounce search input
    useEffect(() => {
        if (!isOpen) return;
        const handler = setTimeout(() => onSearch(query), 300); // 300ms debounce delay
        return () => clearTimeout(handler);
    }, [query, isOpen, onSearch]);
    
    // --- New Drag and Click Handlers using Pointer Events ---

    const handleDoubleClick = () => {
        if (isOpen) return;
        setIsOpen(true);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (isOpen) return;

        dragInfo.current = {
            isPointerDown: true,
            didDrag: false,
            startX: event.clientX,
            startY: event.clientY,
            initialX: position.x,
            initialY: position.y,
        };
        
        if (isHiding) setIsHiding(false);
        setIsActivelyDragging(true);

        // Capture pointer events to the button, so we get events even if the cursor leaves the button
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!dragInfo.current.isPointerDown) return;

        const deltaX = event.clientX - dragInfo.current.startX;
        const deltaY = event.clientY - dragInfo.current.startY;

        // Check for drag threshold. Only set didDrag if moved enough.
        if (!dragInfo.current.didDrag && Math.sqrt(deltaX ** 2 + deltaY ** 2) > DRAG_THRESHOLD) {
            dragInfo.current.didDrag = true;
        }

        // Only move the FAB if the drag has officially started (past the threshold)
        if (dragInfo.current.didDrag) {
            const newX = dragInfo.current.initialX + deltaX;
            const newY = dragInfo.current.initialY + deltaY;

            const clampedX = Math.max(0, Math.min(newX, window.innerWidth - FAB_SIZE));
            const clampedY = Math.max(0, Math.min(newY, window.innerHeight - FAB_SIZE));

            setPosition({ x: clampedX, y: clampedY, isInitial: false });
        }
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!dragInfo.current.isPointerDown) return;

        event.currentTarget.releasePointerCapture(event.pointerId);
        setIsActivelyDragging(false);

        if (dragInfo.current.didDrag) {
            // If it was a drag, handle snapping to the edge
            setPosition(currentPos => {
                let finalX = currentPos.x;
                let finalIsHiding = false;

                if (currentPos.x < FAB_SIZE / 2) {
                    finalX = -FAB_SIZE / 2;
                    finalIsHiding = true;
                } else if (currentPos.x > window.innerWidth - FAB_SIZE * 1.5) {
                    finalX = window.innerWidth - FAB_SIZE / 2;
                    finalIsHiding = true;
                }
                setIsHiding(finalIsHiding);
                return { ...currentPos, x: finalX, isInitial: false };
            });
        } else {
            // If it wasn't a drag, it's a single click. The only action is to un-hide.
            if (isHiding) {
                const newX = position.x < window.innerWidth / 2 ? PADDING : window.innerWidth - FAB_SIZE - PADDING;
                setPosition(prev => ({ ...prev, x: newX }));
                setIsHiding(false);
            }
            // Opening the modal is now handled by onDoubleClick
        }
        
        // Reset drag state
        dragInfo.current.isPointerDown = false;
    };
    
    const handleClose = () => {
        setIsOpen(false);
        onSearch('');
        setQuery('');
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    const handleResultItemClick = (result: SearchResult) => {
        onResultClick(result.subject, result.chapterId, query);
        handleClose();
    };

    return (
        <>
            {/* Draggable FAB (Closed State) */}
            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    visibility: position.isInitial ? 'hidden' : 'visible',
                    transition: isActivelyDragging ? 'none' : 'transform 0.2s ease-out, opacity 0.3s ease-out',
                    touchAction: 'none', // Prevent browser interference on touch devices
                }}
                className={`fixed top-0 left-0 z-50 ${isHiding ? 'opacity-50' : ''}`}
            >
                <button
                    ref={fabRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onDoubleClick={handleDoubleClick}
                    className={`w-14 h-14 flex items-center justify-center bg-blue-600 rounded-full shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        ${isActivelyDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    aria-label="Open search"
                >
                    <SearchIconFab />
                </button>
            </div>

            {/* Search Modal (Open State) */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end animate-fade-in">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                    
                    <div 
                        className="relative w-full bg-white dark:bg-zinc-800 rounded-t-2xl shadow-2xl border-t border-zinc-200 dark:border-zinc-700 max-h-[60vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Input field container */}
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors z-20"
                                aria-label="Close search"
                            >
                                <CloseIcon />
                            </button>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <SearchIconInput />
                                </span>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search all subjects..."
                                    className="w-full h-14 pl-12 pr-12 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 rounded-full border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                    autoFocus
                                    aria-label="Search input"
                                />
                                {query && (
                                    <button onClick={handleClear} className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200" aria-label="Clear search">
                                        <ClearIcon />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Results list container */}
                        <div className="flex-grow overflow-y-auto">
                            {results.length > 0 && query ? (
                                <ul>
                                    {results.map((result, index) => (
                                        <li key={`${result.subject}-${result.chapterId}-${index}`} className="border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
                                            <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                <div className="flex-grow min-w-0">
                                                    <p className="font-semibold text-zinc-800 dark:text-zinc-100 truncate">{result.chapterTitle}</p>
                                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">{result.subject}</p>
                                                    <p
                                                        className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2"
                                                        dangerouslySetInnerHTML={{ __html: result.contentSnippet }}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => handleResultItemClick(result)}
                                                    className="flex-shrink-0 bg-blue-600 text-white font-bold text-xs py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-sm self-start sm:self-center"
                                                >
                                                    Go to Chapter
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                query && (
                                    <div className="flex items-center justify-center p-8">
                                        <p className="text-zinc-500 dark:text-zinc-400">No results found for "{query}"</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchBar;
