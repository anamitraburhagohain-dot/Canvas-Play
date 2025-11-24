
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { getNewsFlash } from '../services/geminiService.ts';
import NewsDetailModal from './NewsDetailModal.tsx';
import type { NewsFlashItem } from './types.ts';

const BulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" viewBox="0 0 20 20">
        <defs>
            <clipPath id="bulb-clip-path">
                <path d="M7.5,13.5 C5.44,12.53,4,10.44,4,8 C4,4.69,6.69,2,10,2 C13.31,2,16,4.69,16,8 c0,2.44,-1.44,4.53,-3.5,5.5 H7.5z"/>
            </clipPath>

            <radialGradient id="bulb-glow-gradient-inside">
                <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="glass-sheen-final" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            
            <filter id="filament-glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
            </filter>
        </defs>

        {/* Pulsating Glow, clipped to the bulb's shape */}
        <g clipPath="url(#bulb-clip-path)">
            <ellipse cx="10" cy="8" rx="8" ry="8" fill="url(#bulb-glow-gradient-inside)">
                <animate 
                    attributeName="rx"
                    values="7.5; 9; 7.5"
                    dur="2.5s"
                    repeatCount="indefinite"
                    calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                />
                <animate 
                    attributeName="ry"
                    values="7.5; 9; 7.5"
                    dur="2.5s"
                    repeatCount="indefinite"
                    calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                />
                 <animate 
                    attributeName="opacity"
                    values="0.7; 1; 0.7"
                    dur="2.5s"
                    repeatCount="indefinite"
                    calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                />
            </ellipse>
        </g>

        {/* Bulb Glass Outline and Sheen */}
        <path
            d="M7.5,13.5 C5.44,12.53,4,10.44,4,8 C4,4.69,6.69,2,10,2 C13.31,2,16,4.69,16,8 c0,2.44,-1.44,4.53,-3.5,5.5 H7.5z"
            fill="url(#glass-sheen-final)"
            strokeWidth="0.5"
            className="stroke-zinc-400/30 dark:stroke-zinc-500/30"
        />

        {/* Bulb Base */}
        <path 
            d="M7.5,13.5V16c0,0.55,0.45,1,1,1h3c0.55,0,1-0.45,1-1v-2.5H7.5z"
            className="fill-zinc-400 dark:fill-zinc-500"
        />

        {/* Filament structure inside the bulb */}
        <g filter="url(#filament-glow)">
            <path 
                d="M8.5,13.5 V11 M11.5,13.5 V11 M8.5,11 C8.5,9,11.5,9,11.5,11"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                className="stroke-amber-400"
            >
                <animate 
                    attributeName="stroke"
                    values="#fcd34d; #fbbf24; #fcd34d"
                    dur="2.5s"
                    repeatCount="indefinite"
                    calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                />
            </path>
        </g>
    </svg>
);


interface NewsFlashProps {
    date: Date;
    userProfile: {
        dob?: string;
    };
    aiFeaturesEnabled: boolean;
}

const NewsFlash: React.FC<NewsFlashProps> = ({ date, userProfile, aiFeaturesEnabled }) => {
    const [articles, setArticles] = useState<NewsFlashItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            if (!date) return;
            setIsLoading(true);
            try {
                if (!aiFeaturesEnabled) {
                    setArticles([{ headline: "Welcome to Canvas Play!", story: "Explore and learn with our comprehensive educational content." }]);
                    return;
                }
                const newsItems = await getNewsFlash(date, userProfile.dob);
                setArticles(newsItems && newsItems.length > 0 ? newsItems : [{ headline: "Welcome to Canvas Play!", story: "Explore and learn with our comprehensive educational content." }]);
                setCurrentIndex(0);
                setFadeState('in');
            } catch (error) {
                console.error("Error in NewsFlash component:", error);
                setArticles([{ headline: "Did you know? Honey never spoils.", story: "Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!" }]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [date, userProfile.dob, aiFeaturesEnabled]);

    useEffect(() => {
        if (articles.length <= 1 || isModalOpen) return; // Pause rotation if modal is open

        const interval = setInterval(() => {
            setFadeState('out'); // Start fade out
        }, 29500); // Start fade out just before 30s cycle ends

        return () => clearInterval(interval);
    }, [articles.length, isModalOpen]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (fadeState === 'out') {
            const timeout = setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % (articles.length || 1));
                setFadeState('in'); // Fade back in with new content
            }, 500); // Must match CSS transition duration
            return () => clearTimeout(timeout);
        }
    }, [fadeState, articles]);

    const handleArticleClick = (article: NewsFlashItem) => {
        setSelectedArticle(article.story);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // A small delay can prevent a jarring jump if the article changes right after close
        setTimeout(() => setSelectedArticle(null), 300);
    };

    const SkeletonLoader = () => (
        <div className="w-full h-5 bg-blue-500/50 rounded-md animate-pulse"></div>
    );

    const currentArticle = articles.length > 0 ? articles[currentIndex] : { headline: '', story: '' };
    // Don't show the CTA for the birthday message
    const showCta = articles.length > 0 && !articles[0].headline.toLowerCase().includes('birthday');

    return (
        <>
            <div className="p-4 w-full rounded-2xl bg-blue-600 dark:bg-blue-700 border border-blue-500/50 dark:border-blue-800/50 shadow-lg news-flash-container">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                        <BulbIcon />
                    </div>
                    <div className="flex-grow min-w-0">
                        {isLoading ? <SkeletonLoader /> : (
                            <button
                                onClick={() => handleArticleClick(currentArticle)}
                                className="w-full cursor-pointer group flex items-center justify-between gap-4"
                                aria-label={`Read more about: ${currentArticle.headline}`}
                            >
                                <div className="flex-grow min-w-0 relative text-left">
                                    {/* Sizer element: invisible, but sets the height of the container */}
                                    <p className="text-sm font-medium leading-tight invisible" aria-hidden="true">
                                        {currentArticle.headline || '\u00A0'}
                                    </p>
                                    {/* Absolutely positioned element for fade transition */}
                                    <p className={`absolute inset-0 text-sm font-medium text-white leading-tight transition-all duration-500 group-hover:text-blue-100 ${fadeState === 'in' ? 'opacity-100' : 'opacity-0'}`}>
                                        {currentArticle.headline}
                                    </p>
                                </div>
                                {showCta && (
                                    <div className="flex-shrink-0">
                                        <p className={`text-xs font-semibold text-white/80 transition-all duration-500 group-hover:text-white ${fadeState === 'in' ? 'opacity-100' : 'opacity-0'}`}>
                                            Click to know more
                                        </p>
                                    </div>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <NewsDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                article={selectedArticle ?? ''}
            />
        </>
    );
};

export default NewsFlash;
