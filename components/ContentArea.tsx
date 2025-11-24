
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Chapter } from './types.ts';
import { translateText } from '../services/geminiService.ts';
import Spinner from './Spinner.tsx';

interface ContentAreaProps {
  chapter: Chapter | null;
  subject: string;
  onMarkAsComplete: (id: number) => void;
  onStartQuiz: (id: number) => void;
  cachedChapterKeys: string[];
  toggleChapterCache: (subject: string, chapterId: number) => void;
  isSubscribed: boolean;
  aiFeaturesEnabled: boolean;
  searchHighlightQuery: string | null;
  onOpenContributionModal: (subject: string, chapterId: number, chapterTitle: string) => void;
}

const TranslateIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502" />
    </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const PlayIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const RetakeQuizIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
);

const QuizLockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const CheckIconMini: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const ContributeIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none">
        <defs>
            <linearGradient id="vivid-pen-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
        </defs>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-600"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" fill="url(#vivid-pen-gradient)" stroke="none" />
    </svg>
);

const ContentArea: React.FC<ContentAreaProps> = ({ chapter, subject, onMarkAsComplete, onStartQuiz, cachedChapterKeys, toggleChapterCache, isSubscribed, aiFeaturesEnabled, searchHighlightQuery, onOpenContributionModal }) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translation, setTranslation] = useState<{ text: string; language: string; contentIndex: number; } | null>(null);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [activeInnerTab, setActiveInnerTab] = useState(0);
  
  const contentDisplayRef = useRef<HTMLDivElement>(null);
  const translateButtonRef = useRef<HTMLDivElement>(null);

  const INDIAN_LANGUAGES = [
    'Assamese', 'Bengali', 'Gujarati', 'Hindi', 'Kannada', 'Malayalam', 'Marathi', 
    'Punjabi', 'Tamil', 'Telugu'
  ].sort();
  
  // Reset translation when chapter changes
  useEffect(() => {
    setTranslation(null);
    setTranslationError(null);
    setIsLanguageMenuOpen(false);
    setActiveInnerTab(0);
  }, [chapter, subject]);

  // Handle clicks outside language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (translateButtonRef.current && !translateButtonRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Effect to scroll to highlighted text from search
  useEffect(() => {
    if (searchHighlightQuery && contentDisplayRef.current) {
        const timer = setTimeout(() => {
            const firstHighlight = contentDisplayRef.current?.querySelector('mark');
            if (firstHighlight) {
                firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

        return () => clearTimeout(timer);
    }
  }, [searchHighlightQuery]);

  if (!chapter) {
    return (
      <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-300 dark:border-zinc-800 h-full flex items-center justify-center">
        <p className="text-zinc-500 dark:text-zinc-400">Select a chapter to begin.</p>
      </div>
    );
  }
  
  if (chapter.locked) {
    return (
      <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-300 dark:border-zinc-800 h-full flex flex-col items-center justify-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Chapter Locked</h2>
        <p className="text-zinc-500 dark:text-zinc-500 mt-2">Complete the previous chapter's quiz with a score of 80% or higher to unlock.</p>
      </div>
    );
  }
  
  const hasTabbedContent = chapter.tabbedContent && chapter.tabbedContent.length > 0;

  const handleLanguageSelection = async (language: string) => {
    setIsLanguageMenuOpen(false);
    setTranslationError(null);

    if (language === 'English') {
      setTranslation(null);
      return;
    }

    if (translation?.language === language && translation?.contentIndex === activeInnerTab || !chapter) return;

    setIsTranslating(true);
    try {
        const textToTranslate = hasTabbedContent ? chapter.tabbedContent![activeInnerTab].content : chapter.content;
        const translatedText = await translateText(textToTranslate, language, chapter.id, hasTabbedContent ? activeInnerTab : undefined);
        setTranslation({ text: translatedText, language: language, contentIndex: activeInnerTab });
    } catch (error) {
        console.error("Translation failed:", error);
        setTranslationError("Sorry, the translation service is currently unavailable. Please try again in a few moments.");
        setTranslation(null);
    } finally {
        setIsTranslating(false);
    }
  };

  const handleInnerTabClick = (index: number) => {
    if (index !== activeInnerTab) {
      setActiveInnerTab(index);
      setTranslation(null);
      setTranslationError(null);
    }
  };

  const isCached = cachedChapterKeys.includes(`cached-chapter-${subject}-${chapter.id}`);
  
  const formattedContentToHtml = (content: string): string => {
    return content.split('\n').map((line) => {
      if (line.startsWith('# **')) {
        const text = line.replace(/# \*\*(.*)\*\*/, '$1');
        return `<h1 class="text-2xl font-bold my-4 dark:text-white">${text}</h1>`;
      }
      if (line.trim() === '') {
        return '<br />';
      }
      return `<p class="mb-4 leading-relaxed">${line}</p>`;
    }).join('');
  };
  
  const titleMatch = chapter.title.match(/(.*)\s(\(.*\))/);
  const mainTitle = titleMatch ? titleMatch[1] : chapter.title;
  const subtitle = titleMatch ? titleMatch[2] : null;

  const currentContent = hasTabbedContent ? chapter.tabbedContent![activeInnerTab].content : chapter.content;
  const isTranslationForCurrentView = translation && (!hasTabbedContent || translation.contentIndex === activeInnerTab);
  
  const contentToRender = isTranslationForCurrentView ? translation!.text : currentContent;
  const isHtml = /<[a-z][\s\S]*>/i.test(contentToRender);
  const finalHtml = isHtml ? contentToRender : formattedContentToHtml(contentToRender);

  const highlightedFinalHtml = useMemo(() => {
    if (!searchHighlightQuery?.trim() || !finalHtml) {
        return finalHtml;
    }

    const escapedQuery = searchHighlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    
    const parts = finalHtml.split(/(<[^>]*>)/g);
    const highlightedParts = parts.map(part => {
        if (part.match(/<[^>]*>/) || !part) {
            return part; 
        }
        return part.replace(regex, `<mark class="bg-yellow-200 dark:bg-amber-400/30 rounded px-1 py-0.5">$1</mark>`);
    });

    return highlightedParts.join('');
  }, [finalHtml, searchHighlightQuery]);


  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-300 dark:border-zinc-800">
      <div className="p-6 md:p-8">
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg mb-6">
          <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white">{mainTitle}</h1>
              {subtitle && <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-500 mt-1">{subtitle}</p>}
          </div>
          
          <div className="mt-4 flex flex-row flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hide">
              <button onClick={() => toggleChapterCache(subject, chapter.id)} className={`flex-shrink-0 flex items-center justify-center gap-1.5 text-xs font-medium px-3 h-8 rounded-full border transition-colors ${isCached ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-300 dark:border-zinc-700' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}>
                  {isCached ? <CheckCircleIcon className="animate-checkmark w-4 h-4" /> : <DownloadIcon className="w-4 h-4" />}
                  <span className="whitespace-nowrap">{isCached ? 'Saved' : 'Save for Offline'}</span>
              </button>
              
              <button
                  onClick={() => onOpenContributionModal(subject, chapter.id, chapter.title)}
                  className="flex-shrink-0 flex items-center justify-center gap-1.5 text-xs font-medium px-3 h-8 rounded-full border transition-colors bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                  <ContributeIcon className="w-4 h-4" />
                  <span className="whitespace-nowrap">Suggest Edit</span>
              </button>

              {aiFeaturesEnabled && (
                <div className="relative inline-block flex-shrink-0" ref={translateButtonRef}>
                    <button
                        onClick={() => setIsLanguageMenuOpen(prev => !prev)}
                        disabled={isTranslating || !isSubscribed}
                        className="flex items-center justify-center gap-1.5 text-xs font-medium px-3 h-8 rounded-full border bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={!isSubscribed ? "Translation is a PRO feature. Please upgrade." : "Translate content"}
                    >
                        <TranslateIcon className="w-4 h-4" />
                        <span>Translate</span>
                        {!isSubscribed && (
                          <span className="font-bold text-[7px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-zinc-500 text-white ml-1">
                            PRO
                          </span>
                        )}
                    </button>
                    {isLanguageMenuOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 z-10 animate-fade-in">
                            <ul className="py-1 max-h-60 overflow-y-auto">
                                {['English', ...INDIAN_LANGUAGES].map(lang => {
                                    const isSelected = (!translation && lang === 'English') || (translation?.language === lang && isTranslationForCurrentView);
                                    return (
                                        <li key={lang}>
                                            <button
                                                onClick={() => handleLanguageSelection(lang)}
                                                disabled={isTranslating}
                                                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                                    isSelected 
                                                    ? 'bg-blue-50 dark:bg-blue-900/40 font-semibold text-blue-600 dark:text-blue-300' 
                                                    : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                                                }`}
                                            >
                                                <span>{lang === 'English' ? 'English (Original)' : lang}</span>
                                                {isSelected && <CheckIconMini />}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
              )}
          </div>

          {hasTabbedContent && (
            <div className="mt-4 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                {chapter.tabbedContent!.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleInnerTabClick(index)}
                    className={`py-3 px-1 text-sm font-semibold whitespace-nowrap transition-colors duration-200 border-b-2
                      ${activeInnerTab === index
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100'
                      }
                    `}
                    role="tab"
                    aria-selected={activeInnerTab === index}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-200" ref={contentDisplayRef}>
          {isTranslating ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                  <Spinner />
                  <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-semibold">Translating...</p>
              </div>
          ) : translationError ? (
            <div className="flex flex-col items-center justify-center text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4 text-red-700 dark:text-red-300 font-semibold">Translation Failed</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{translationError}</p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: highlightedFinalHtml }} />
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 justify-end">
            {chapter.progress < 100 && (
                <button onClick={() => onMarkAsComplete(chapter.id)} className="flex items-center justify-center gap-2 w-full sm:w-48 bg-green-600 text-white font-bold h-12 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors duration-300 shadow-md">
                    <CheckIcon />
                    <span>Mark as Complete</span>
                </button>
            )}
            {!chapter.quizUnlocked ? (
                <button
                    disabled
                    className="flex items-center justify-center gap-2 w-full sm:w-48 bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 font-bold h-12 px-4 rounded-lg text-sm cursor-not-allowed grayscale"
                    title="Mark the chapter as complete to unlock the quiz"
                >
                    <QuizLockIcon />
                    <span>Quiz Locked</span>
                </button>
            ) : (
                <button onClick={() => onStartQuiz(chapter.id)} className="flex items-center justify-center gap-2 w-full sm:w-48 bg-blue-600 text-white font-bold h-12 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-300 shadow-md">
                    {chapter.quizCompleted ? <RetakeQuizIcon /> : <PlayIcon />}
                    <span>{chapter.quizCompleted ? 'Retake Quiz' : 'Start Quiz'}</span>
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
