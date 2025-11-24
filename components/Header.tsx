
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef, useCallback } from 'react';
import SettingsMenu from './SettingsMenu.tsx';
import Weather from './Weather.tsx';
import { getWeatherData } from '../services/geminiService.ts';
import type { UserAccount, WeatherCondition, GroundingSource } from './types.ts';

// Icons
const SettingsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-200" viewBox="0 0 20 20" fill="currentColor">
      <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
    </svg>
);

const CalendarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


type LocationSearchResult = { name: string; lat: number; lon: number };

interface HeaderProps {
    isSubscribed: boolean;
    onOpenSubscriptionModal: () => void;
    onOpenProfilePicModal: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    isNightMode: boolean;
    onToggleNightMode: () => void;
    onLogout: () => void;
    subscriptionDate: Date | null;
    profilePic: string | null;
    wallpaper: string;
    onSetWallpaper: (svg: string) => void;
    userProfile: UserAccount;
    onOpenDataAnalyticsModal: () => void;
    onOpenEditProfileModal: () => void;
    date: Date;
    location: { lat: number; lon: number } | null;
    notificationsEnabled: boolean;
    onToggleNotificationsEnabled: () => void;
    homeLocation: { lat: number; lon: number; name: string } | null;
    onHomeLocationSearch: (query: string) => void;
    homeLocationResults: LocationSearchResult[];
    isSearchingHomeLocation: boolean;
    onSetHomeLocation: (location: LocationSearchResult) => void;
    onClearHomeLocation: () => void;
    selectedAssistant: string;
    onSetAssistant: (svg: string) => void;
    onOpenAssistantModal: () => void;
    onOpenAdminLogin: () => void;
}

interface WeatherData {
  temperature: number;
  condition: WeatherCondition;
  forecast: string;
  sources?: GroundingSource[];
  timestamp: number;
}

const Header: React.FC<HeaderProps> = (props) => {
    const { wallpaper, userProfile, date, location, isDarkMode, selectedAssistant, onOpenAssistantModal } = props;
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | 'error' | 'loading'>('loading');
    const [isWeatherRefreshing, setIsWeatherRefreshing] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const settingsRef = useRef<HTMLDivElement>(null);

    const lat = location?.lat;
    const lon = location?.lon;

    const fetchWeather = useCallback(async (isManualRefresh = false) => {
        if (lat === undefined || lon === undefined) return;

        if (isManualRefresh) {
            setIsWeatherRefreshing(true);
        } else {
            setWeatherData('loading');
        }
        try {
            const data = await getWeatherData(lat, lon, isManualRefresh);
            setWeatherData(data);
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
            setWeatherData('error');
        } finally {
            if (isManualRefresh) {
                setIsWeatherRefreshing(false);
            }
        }
    }, [lat, lon]);

    // Fetch weather data on initial location availability or when lat/lon changes
    useEffect(() => {
        if (lat !== undefined && lon !== undefined) {
            fetchWeather(false); // Initial fetch, don't bypass cache
        }
    }, [lat, lon, fetchWeather]);

    // Set and update greeting based on time of day
    useEffect(() => {
        const getGreetingMessage = () => {
            const hour = new Date().getHours();
            if (hour < 12) return 'Good Morning';
            if (hour < 17) return 'Good Afternoon';
            return 'Good Evening';
        };

        setGreeting(getGreetingMessage());
        // Update greeting every minute to catch hour changes.
        const intervalId = setInterval(() => {
            setGreeting(getGreetingMessage());
        }, 60000); 
        
        return () => clearInterval(intervalId);
    }, []);
    
    // Set and update time every second
    useEffect(() => {
        const formatTime = (date: Date) => {
            return date.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        };

        const timerId = setInterval(() => {
            setCurrentTime(formatTime(new Date()));
        }, 1000);

        // Set initial time
        setCurrentTime(formatTime(new Date()));

        return () => clearInterval(timerId);
    }, []);

    // Handle clicks outside the settings menu to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <header
            className="relative p-3 flex flex-col justify-between rounded-2xl shadow-lg"
            style={{
                background: `url('data:image/svg+xml;base64,${btoa(wallpaper)}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Top Bar */}
            <div className="flex items-center w-full">
                {/* Left Container */}
                <div className="relative z-10 flex-1 flex justify-start">
                     <Weather 
                        data={weatherData} 
                        isDarkMode={isDarkMode} 
                        isRefreshing={isWeatherRefreshing} 
                        onRefresh={() => fetchWeather(true)} 
                    />
                </div>

                {/* Center Container */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md whitespace-nowrap">
                        Canvas Play
                        <span className={`ml-2 inline-block align-middle rounded px-1 py-0 text-[7px] font-bold uppercase tracking-wider text-white shadow-md
                            ${props.isSubscribed
                                ? 'bg-gradient-to-br from-violet-500 to-pink-600'
                                : 'bg-zinc-500'
                            }
                        `}>
                            PRO
                        </span>
                    </h1>
                </div>
                
                {/* Right Container */}
                <div className="relative flex-1 flex justify-end items-center gap-4" ref={settingsRef}>
                    <button
                        onClick={() => setIsSettingsOpen(prev => !prev)}
                        className="p-1.5 bg-black/20 dark:bg-black/40 rounded-full group transition-colors hover:bg-black/30"
                        aria-label="Open settings"
                    >
                        <SettingsIcon />
                    </button>
                    <SettingsMenu isOpen={isSettingsOpen} {...props} onClose={() => setIsSettingsOpen(false)} />
                </div>
            </div>

            {/* Bottom Content */}
            <div className="mt-6 flex justify-between items-end">
                <div className="header-greeting-container">
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-white drop-shadow">
                            {greeting}, {userProfile.name.split(' ')[0]}!
                        </h2>
                        <p className="text-xs md:text-sm text-zinc-200 drop-shadow-sm">
                            Let's continue our learning journey.
                        </p>
                    </div>
                    <div className="mt-4">
                        <div className="inline-flex items-center gap-2 bg-black/20 dark:bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold border border-white/20 shadow-sm">
                            <CalendarIcon />
                            <span>{formatDate(date)}</span>
                            <div className="h-4 w-px bg-white/30"></div>
                            <span className="tabular-nums">{currentTime}</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={onOpenAssistantModal}
                    className="w-24 h-24 select-none transition-transform duration-300 hover:scale-110 mb-0 -mr-2 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/20 focus:ring-white rounded-full"
                    aria-label="Open AI Assistant"
                >
                    <img
                        src={`data:image/svg+xml;base64,${btoa(selectedAssistant)}`}
                        alt="Animated assistant character"
                        className="w-full h-full object-contain drop-shadow-lg"
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;