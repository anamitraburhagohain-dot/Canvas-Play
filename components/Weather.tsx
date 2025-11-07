/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import type { WeatherCondition, GroundingSource } from './types.ts';

interface WeatherData {
  temperature: number;
  condition: WeatherCondition;
  forecast: string;
  sources?: GroundingSource[];
  timestamp: number;
}

interface WeatherProps {
  data: WeatherData | 'error' | 'loading';
  isDarkMode: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
}

type WeatherIconProps = {
  isDarkMode: boolean;
};

// Icons for different weather conditions
const SunnyIcon: React.FC<WeatherIconProps> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
        <g className="sun-icon">
            <circle cx="12" cy="12" r="4.5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
            <path stroke="#FBBF24" strokeLinecap="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </g>
    </svg>
);

const MoonIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8'; // Lighter stroke for dark mode
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
            <g className="moon-icon">
                <path
                    fill="#F1F5F9"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
            </g>
        </svg>
    );
};

const CloudyIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="cloud-icon">
                <path d="M18 16.5A5.5 5.5 0 0013.2 7.2a6 6 0 00-11.2 3.3A4.5 4.5 0 006.5 18h11.5z" fill="#E5E7EB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
};

const PartlyCloudyDayIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="sun-icon">
                <path d="M12 5.5V3.5M16.5 7.5L18 6M18.5 12H20.5M16.5 16.5L18 18M12 18.5V20.5M7.5 16.5L6 18M3.5 12H5.5M7.5 7.5L6 6" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="4" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
            </g>
            <g className="cloud-icon" style={{ animationDelay: '-2s' }}>
                <path d="M18 16.5A5.5 5.5 0 0013.2 7.2a6 6 0 00-11.2 3.3A4.5 4.5 0 006.5 18h11.5z" fill="#E5E7EB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
};

const PartlyCloudyNightIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="moon-icon">
                <path d="M15.2 3.8A7 7 0 009.2 2.8a9 9 0 1011.6 11.6 7 7 0 00-5.6-10.6z" fill="#F1F5F9" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g className="cloud-icon" style={{ animationDelay: '-2s' }}>
                <path d="M18 16.5A5.5 5.5 0 0013.2 7.2a6 6 0 00-11.2 3.3A4.5 4.5 0 006.5 18h11.5z" fill="#E5E7EB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
};

const MostlyCloudyDayIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="sun-icon" transform="translate(-2 -2) scale(0.8)">
                 <circle cx="12" cy="12" r="4.5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
                 <path stroke="#FBBF24" strokeLinecap="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </g>
            <g className="cloud-icon">
                <path d="M19 18.5A6.5 6.5 0 0014.2 6.2a7 7 0 00-12.2 4.3A5.5 5.5 0 007.5 20h11.5z" fill="#E5E7EB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
};

const MostlyCloudyNightIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="moon-icon" transform="translate(-4 -4) scale(0.8)">
                <path fill="#F1F5F9" stroke={isDarkMode ? '#cbd5e1' : '#94a3b8'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </g>
            <g className="cloud-icon">
                <path d="M19 18.5A6.5 6.5 0 0014.2 6.2a7 7 0 00-12.2 4.3A5.5 5.5 0 007.5 20h11.5z" fill="#E5E7EB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
};

const RainIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="cloud-icon">
                <path d="M18 16.5A5.5 5.5 0 0013.2 7.2a6 6 0 00-11.2 3.3A4.5 4.5 0 006.5 18h11.5z" fill="#E5E7EB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path className="rain-drop" style={{ animationDelay: '0s' }} d="M8 20L7 22" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
            <path className="rain-drop" style={{ animationDelay: '0.2s' }} d="M12 20L11 22" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
            <path className="rain-drop" style={{ animationDelay: '0.4s' }} d="M16 20L15 22" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

const SnowIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="cloud-icon">
                <path d="M18 16.5A5.5 5.5 0 0013.2 7.2a6 6 0 00-11.2 3.3A4.5 4.5 0 006.5 18h11.5z" fill="#F9FAFB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path className="snow-flake" style={{ animationDelay: '0s' }} d="M8 20L8 22M7 21H9" stroke="#A5F3FC" strokeWidth="1.5" strokeLinecap="round" />
            <path className="snow-flake" style={{ animationDelay: '0.5s' }} d="M16 20L16 22M15 21H17" stroke="#A5F3FC" strokeWidth="1.5" strokeLinecap="round" />
            <path className="snow-flake" style={{ animationDelay: '0.2s' }} d="M12 20L12 22M11 21H13" stroke="#A5F3FC" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

const ThunderstormIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="cloud-icon">
                <path d="M18 16.5A5.5 5.5 0 0013.2 7.2a6 6 0 00-11.2 3.3A4.5 4.5 0 006.5 18h11.5z" fill="#9CA3AF" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path d="M13 15l-4 6h6l-2-8z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
            </path>
        </svg>
    );
};

const FogIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="cloud-icon">
                <path d="M18 16.5A5.5 5.5 0 0013.2 7.2a6 6 0 00-11.2 3.3A4.5 4.5 0 006.5 18h11.5z" fill="#E5E7EB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 21h12">
                    <animate attributeName="d" values="M6 21h12; M4 21h14; M6 21h12" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M7 19h10" opacity="0.7">
                    <animate attributeName="d" values="M7 19h10; M9 19h8; M7 19h10" dur="3s" repeatCount="indefinite" begin="-1.5s"/>
                </path>
            </g>
        </svg>
    );
};

const WindyIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <g className="cloud-icon">
                 <path d="M18 16.5A5.5 5.5 0 0013.2 7.2a6 6 0 00-11.2 3.3A4.5 4.5 0 006.5 18h11.5z" fill="#E5E7EB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
             <g stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 21c4-1 8-1 12 0">
                    <animate attributeName="d" values="M4 21c4-1 8-1 12 0; M6 21c4-1 6-1 10 0; M4 21c4-1 8-1 12 0" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M6 19c3-1 6-1 10 0" opacity="0.7">
                     <animate attributeName="d" values="M6 19c3-1 6-1 10 0; M4 19c3-1 8-1 12 0; M6 19c3-1 6-1 10 0" dur="2s" repeatCount="indefinite" begin="-1s" />
                </path>
            </g>
        </svg>
    );
};

const WarningIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const ThematicLoadingIcon: React.FC<WeatherIconProps> = ({ isDarkMode }) => {
    const strokeColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    const fillColor = isDarkMode ? '#4b5563' : '#94a3b8';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M18 16.5A5.5 5.5 0 0013.2 7.2a6 6 0 00-11.2 3.3A4.5 4.5 0 006.5 18h11.5z" fill="#E5E7EB" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <g fill={fillColor}>
                 <circle cx="8" cy="13" r="1">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0s"/>
                </circle>
                <circle cx="12" cy="13" r="1">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                </circle>
                <circle cx="16" cy="13" r="1">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                </circle>
            </g>
        </svg>
    );
};

const SourcesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
);

const RefreshIcon: React.FC<{ isRefreshing: boolean }> = ({ isRefreshing }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
);


const SourceListItem: React.FC<{ source: GroundingSource }> = ({ source }) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useLayoutEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                const hasOverflow = textRef.current.scrollWidth > textRef.current.clientWidth;
                if (hasOverflow !== isOverflowing) {
                    setIsOverflowing(hasOverflow);
                }
            }
        };

        const timeoutId = setTimeout(checkOverflow, 50);
        window.addEventListener('resize', checkOverflow);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [source.web.title]);

    return (
        <li>
            <a
                href={source.web.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block text-xs text-blue-300 hover:text-blue-200 hover:underline overflow-hidden whitespace-nowrap"
                title={source.web.title}
            >
                <span ref={textRef} className="invisible" aria-hidden="true">{source.web.title}</span>
                {isOverflowing ? (
                     <div className="absolute inset-0">
                        <div className="marquee-container" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                            <span className="marquee-text">{source.web.title}</span>
                            <span className="marquee-text" aria-hidden="true">{source.web.title}</span>
                        </div>
                    </div>
                ) : (
                    <span className="absolute inset-0 truncate">{source.web.title}</span>
                )}
            </a>
        </li>
    );
};


const Weather: React.FC<WeatherProps> = ({ data, isDarkMode, isRefreshing, onRefresh }) => {
    const [showSources, setShowSources] = useState(false);
    const sourcesRef = useRef<HTMLDivElement>(null);
    const forecastTextRef = useRef<HTMLParagraphElement>(null);
    const [isForecastOverflowing, setIsForecastOverflowing] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sourcesRef.current && !sourcesRef.current.contains(event.target as Node)) {
                setShowSources(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useLayoutEffect(() => {
        const checkOverflow = () => {
            if (forecastTextRef.current) {
                const hasOverflow = forecastTextRef.current.scrollWidth > forecastTextRef.current.clientWidth;
                if (hasOverflow !== isForecastOverflowing) {
                    setIsForecastOverflowing(hasOverflow);
                }
            }
        };

        if (typeof data === 'object') {
            const timeoutId = setTimeout(checkOverflow, 50);
            window.addEventListener('resize', checkOverflow);
            return () => {
                clearTimeout(timeoutId);
                window.removeEventListener('resize', checkOverflow);
            };
        }
    }, [data]);

    const formatTimeAgo = (timestamp: number) => {
        const now = Date.now();
        const seconds = Math.floor((now - timestamp) / 1000);
        if (seconds < 60) return "just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes === 1) return "1 minute ago";
        return `${minutes} minutes ago`;
    };

    if (data === 'loading') {
        return (
            <div className="flex md:w-64 items-center gap-2 bg-black/20 dark:bg-black/40 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-full text-sm font-semibold border border-white/20 shadow-sm">
                <ThematicLoadingIcon isDarkMode={isDarkMode} />
                <span>-- &deg;C</span>
                 <div className="hidden md:flex items-center gap-2 flex-1 min-w-0">
                    <div className="h-4 w-px bg-white/30" />
                    <span className="text-xs text-white/80">Fetching forecast...</span>
                </div>
            </div>
        );
    }
    
    if (data === 'error' || typeof data !== 'object' || typeof data.temperature !== 'number' || isNaN(data.temperature) || !data.timestamp) {
        return (
            <div className="flex md:w-64 items-center gap-2 bg-black/20 dark:bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-sm font-semibold border border-red-500/80 shadow-sm text-red-400">
                <WarningIcon />
                <span className="text-white">-- &deg;C</span>
            </div>
        );
    }

    const getWeatherIcon = () => {
        switch (data.condition) {
            case 'Sunny': return <SunnyIcon isDarkMode={isDarkMode} />;
            case 'Moon': return <MoonIcon isDarkMode={isDarkMode} />;
            case 'PartlyCloudyDay': return <PartlyCloudyDayIcon isDarkMode={isDarkMode} />;
            case 'PartlyCloudyNight': return <PartlyCloudyNightIcon isDarkMode={isDarkMode} />;
            case 'MostlyCloudyDay': return <MostlyCloudyDayIcon isDarkMode={isDarkMode} />;
            case 'MostlyCloudyNight': return <MostlyCloudyNightIcon isDarkMode={isDarkMode} />;
            case 'Cloudy': return <CloudyIcon isDarkMode={isDarkMode} />;
            case 'Rain': return <RainIcon isDarkMode={isDarkMode} />;
            case 'Snow': return <SnowIcon isDarkMode={isDarkMode} />;
            case 'Thunderstorm': return <ThunderstormIcon isDarkMode={isDarkMode} />;
            case 'Fog': return <FogIcon isDarkMode={isDarkMode} />;
            case 'Windy': return <WindyIcon isDarkMode={isDarkMode} />;
            default: return <CloudyIcon isDarkMode={isDarkMode} />;
        }
    };

    const validSources = data.sources?.filter(s => s.web?.uri && s.web?.title) || [];

    return (
        <div className="flex md:w-64 items-center gap-2 bg-black/20 dark:bg-black/40 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-full text-sm font-semibold border border-white/20 shadow-sm">
            {getWeatherIcon()}
            <span>{Math.round(data.temperature)}&deg;C</span>
            
            <div className="hidden md:flex items-center gap-2 flex-1 min-w-0">
                <div className="h-4 w-px bg-white/30" />
                <div className="relative overflow-hidden flex-1 min-w-0 h-4">
                     <p ref={forecastTextRef} className="text-xs whitespace-nowrap invisible" aria-hidden="true">
                        {data.forecast}
                    </p>
                    {isForecastOverflowing ? (
                        <div className="absolute inset-0">
                            <div className="marquee-container" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                                <p className="marquee-text text-xs">
                                    {data.forecast}
                                </p>
                                <p className="marquee-text text-xs" aria-hidden="true">
                                    {data.forecast}
                                </p>
                            </div>
                        </div>
                    ) : (
                         <p className="absolute inset-0 text-xs truncate">
                            {data.forecast}
                        </p>
                    )}
                </div>
            </div>
            <div className="relative flex items-center">
                <div className="h-4 w-px bg-white/30 mr-2" />
                <button 
                    onClick={onRefresh} 
                    disabled={isRefreshing} 
                    className="group disabled:opacity-50" 
                    aria-label="Refresh weather"
                >
                    <RefreshIcon isRefreshing={isRefreshing} />
                </button>
            </div>
            {validSources.length > 0 && (
                <div className="relative hidden md:flex items-center" ref={sourcesRef}>
                     <div className="h-4 w-px bg-white/30 mr-2" />
                    <button 
                        onClick={() => setShowSources(prev => !prev)}
                        className="group" 
                        aria-label="Show weather sources"
                    >
                        <SourcesIcon />
                    </button>
                    {showSources && (
                        <div className="absolute top-full right-0 mt-2 w-64 bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-2xl border border-zinc-700 p-3 text-left animate-fade-in z-50">
                            <p className="text-xs font-bold text-white mb-2">Data Sources:</p>
                            <ul className="space-y-1.5">
                                {validSources.map((source, index) => (
                                    <SourceListItem key={index} source={source} />
                                ))}
                            </ul>
                            <div className="border-t border-zinc-600 mt-2 pt-2">
                                <p className="text-xs text-zinc-400">
                                    Last updated: {formatTimeAgo(data.timestamp)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Weather;