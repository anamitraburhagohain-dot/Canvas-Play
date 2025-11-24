
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { animatedWallpapers } from '../data/wallpapers.ts';
import { animatedAssistants } from '../data/assistants.ts';
import Spinner from './Spinner.tsx';

// Icons
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const DarkModeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);
const NightModeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18V4a8 8 0 110 16z" />
    </svg>
);
const SubscriptionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const AnalyticsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4" /></svg>;
const NotificationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
const LocationMarkerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;

type LocationSearchResult = { name: string; lat: number; lon: number };

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean; onToggleDarkMode: () => void;
  isNightMode: boolean; onToggleNightMode: () => void;
  isSubscribed: boolean; onOpenSubscriptionModal: () => void;
  onOpenProfilePicModal: () => void;
  onLogout: () => void;
  subscriptionDate: Date | null;
  profilePic: string | null;
  wallpaper: string; onSetWallpaper: (svg: string) => void;
  userProfile: { name: string; email: string; };
  onOpenDataAnalyticsModal: () => void;
  onOpenEditProfileModal: () => void;
  notificationsEnabled: boolean; onToggleNotificationsEnabled: () => void;
  homeLocation: { lat: number; lon: number; name: string } | null; onHomeLocationSearch: (query: string) => void; homeLocationResults: LocationSearchResult[]; isSearchingHomeLocation: boolean; onSetHomeLocation: (location: LocationSearchResult) => void; onClearHomeLocation: () => void;
  selectedAssistant: string; onSetAssistant: (svg: string) => void;
  onOpenAdminLogin: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-6">
        <h3 className="px-2 mb-2 text-xs font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{title}</h3>
        <div className="bg-zinc-100/70 dark:bg-zinc-800/70 rounded-xl divide-y divide-zinc-200/80 dark:divide-zinc-700/80 border border-zinc-500 dark:border-zinc-700">
            {children}
        </div>
    </div>
);

const SettingsRow: React.FC<{ icon: React.ReactNode; label: string; description: string; children: React.ReactNode; isButton?: boolean; onClick?: () => void; }> = ({ icon, label, description, children, isButton, onClick }) => {
    const content = (
        <>
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-zinc-500 dark:text-zinc-400">{icon}</div>
            <div className="flex-grow ml-3 min-w-0">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{label}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{description}</p>
            </div>
            <div className="flex-shrink-0 ml-3">{children}</div>
        </>
    );

    if (isButton) {
        return <button onClick={onClick} className="w-full flex items-center p-3 text-left transition-colors hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 first:rounded-t-xl last:rounded-b-xl">{content}</button>;
    }
    return <div className="flex items-center p-3">{content}</div>;
};

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; }> = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
        <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
);

const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
    const { isOpen, onLogout, profilePic, userProfile, onClose, onOpenProfilePicModal, onOpenEditProfileModal, isDarkMode, onToggleDarkMode, isNightMode, onToggleNightMode, wallpaper, onSetWallpaper, selectedAssistant, onSetAssistant, isSubscribed, subscriptionDate, onOpenSubscriptionModal, onOpenDataAnalyticsModal, notificationsEnabled, onToggleNotificationsEnabled, homeLocation, onHomeLocationSearch, homeLocationResults, isSearchingHomeLocation, onSetHomeLocation, onClearHomeLocation, onOpenAdminLogin } = props;
    
    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [locationQuery, setLocationQuery] = useState('');

    // Debounce the search query to prevent excessive API calls
    useEffect(() => {
        if (!isEditingLocation) {
            return;
        }

        // When the user stops typing for 300ms, execute the search.
        const handler = setTimeout(() => {
            onHomeLocationSearch(locationQuery);
        }, 300); // 300ms debounce delay

        // Cleanup function: If the user types again, clear the previous timeout.
        return () => {
            clearTimeout(handler);
        };
    }, [locationQuery, isEditingLocation, onHomeLocationSearch]);

    const handleSelectLocation = (location: LocationSearchResult) => {
        onSetHomeLocation(location);
        setIsEditingLocation(false);
        setLocationQuery('');
    };
    
    const handleCancelEditLocation = () => {
        setIsEditingLocation(false);
        setLocationQuery('');
    };

    if (!isOpen) return null;

    const getProfilePicSrc = (picData: string | null) => {
        if (!picData) return '';
        if (picData.startsWith('<svg')) return `data:image/svg+xml;base64,${btoa(picData)}`;
        return picData;
    };
    
    const calculateCredit = () => {
        if (!subscriptionDate) return { daysLeft: 0 };
        const now = new Date();
        const diffTime = now.getTime() - subscriptionDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return { daysLeft: Math.max(0, 30 - diffDays) };
    };
    const { daysLeft } = calculateCredit();
    
    return (
        <div className="absolute top-11 right-0 w-96 max-w-[calc(100vw-2rem)] max-h-[60vh] md:max-h-[480px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-500 dark:border-zinc-700 text-zinc-800 dark:text-white animate-fade-in flex flex-col z-50">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Settings</h2>
                <button onClick={onClose} className="p-1 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"><CloseIcon /></button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto force-scrollbar">
                {/* Profile Section */}
                <div className="flex items-center gap-4 p-2">
                    <div className="relative flex-shrink-0">
                        <img src={getProfilePicSrc(profilePic)} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white/50 object-cover bg-zinc-700" />
                        <button onClick={onOpenProfilePicModal} className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-all shadow-md" aria-label="Change profile picture"><CameraIcon /></button>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-zinc-800 dark:text-white truncate">{userProfile.name}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{userProfile.email}</p>
                        <button onClick={onOpenEditProfileModal} className="mt-1 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"><EditIcon /> Edit Profile</button>
                    </div>
                </div>

                <Section title="Appearance">
                    <SettingsRow icon={<NightModeIcon />} label="Dark Mode" description="Reduces eye strain in low light">
                        <ToggleSwitch checked={isDarkMode} onChange={onToggleDarkMode} />
                    </SettingsRow>
                    <SettingsRow icon={<DarkModeIcon />} label="Night Mode" description="Applies a warm, sepia filter">
                        <ToggleSwitch checked={isNightMode} onChange={onToggleNightMode} />
                    </SettingsRow>
                    <div className="p-3">
                        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Wallpaper</label>
                        <div className="mt-2 flex space-x-4 overflow-x-auto py-2 -mx-1 px-1">
                            {animatedWallpapers.map(wp => (
                                <button key={wp.id} onClick={() => onSetWallpaper(wp.svg)} className={`relative flex-shrink-0 w-16 h-12 rounded-lg border-2 transition-all ${wallpaper === wp.svg ? 'border-blue-500 ring-2 ring-blue-500' : 'border-transparent hover:border-zinc-400'}`} title={wp.id}>
                                    <div className="w-full h-full rounded-md" style={{ background: `url('data:image/svg+xml;base64,${btoa(wp.svg)}')`, backgroundSize: 'cover' }}></div>
                                    {wallpaper === wp.svg && <div className="absolute inset-0 bg-blue-500/60 flex items-center justify-center rounded-md"><CheckIcon/></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div className="p-3">
                        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">AI Assistant</label>
                        <div className="mt-2 flex space-x-4 overflow-x-auto py-2 -mx-1 px-1">
                            {animatedAssistants.map(ast => (
                                <button key={ast.id} onClick={() => onSetAssistant(ast.svg)} className={`relative flex-shrink-0 w-14 h-14 rounded-lg p-1 border-2 transition-all ${selectedAssistant === ast.svg ? 'border-blue-500 ring-2 ring-blue-500' : 'border-transparent hover:border-zinc-400'}`}>
                                    <div className="w-full h-full rounded bg-zinc-200 dark:bg-zinc-700/50" style={{ background: `url('data:image/svg+xml;base64,${btoa(ast.svg)}')`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                                    {selectedAssistant === ast.svg && <div className="absolute inset-0 bg-blue-500/60 flex items-center justify-center rounded-md"><CheckIcon/></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                </Section>

                <Section title="Account & Plan">
                    <SettingsRow icon={<SubscriptionIcon />} label="Subscription" description={isSubscribed ? `PRO Plan - Renews in ${daysLeft} days` : 'Free Plan'}>
                        <button 
                            onClick={onOpenSubscriptionModal} 
                            className="px-3 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                        >
                            {isSubscribed ? 'Manage' : 'Upgrade'}
                        </button>
                    </SettingsRow>
                    <SettingsRow isButton onClick={onOpenDataAnalyticsModal} icon={<AnalyticsIcon />} label="Data Analytics" description="View your weekly usage stats">
                        <ArrowRightIcon />
                    </SettingsRow>
                </Section>
                
                <Section title="Preferences">
                    <SettingsRow icon={<NotificationIcon />} label="Daily Notifications" description="Receive daily learning reminders">
                        <ToggleSwitch checked={notificationsEnabled} onChange={onToggleNotificationsEnabled} />
                    </SettingsRow>
                    {!isEditingLocation ? (
                        <SettingsRow
                            icon={<LocationMarkerIcon />}
                            label="Home Location"
                            description={homeLocation ? homeLocation.name : 'Set for accurate local weather'}
                        >
                            <div className="flex items-center gap-2">
                                {homeLocation && (
                                    <button onClick={onClearHomeLocation} className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline">Clear</button>
                                )}
                                <button onClick={() => setIsEditingLocation(true)} className="px-3 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                                    {homeLocation ? 'Change' : 'Set'}
                                </button>
                            </div>
                        </SettingsRow>
                    ) : (
                        <div className="p-3">
                            <label htmlFor="location-search" className="block text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Search for a location</label>
                            <div className="flex items-start gap-2">
                                <div className="relative flex-grow">
                                    <div className="relative">
                                        <input
                                            id="location-search"
                                            type="text"
                                            value={locationQuery}
                                            onChange={(e) => setLocationQuery(e.target.value)}
                                            placeholder="e.g., Mumbai, India"
                                            className="w-full pl-4 pr-10 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                                            autoComplete="off"
                                        />
                                        {isSearchingHomeLocation && (
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`absolute left-0 right-0 mt-1 z-10 transition-all duration-300 ease-out transform origin-top ${homeLocationResults.length > 0 && locationQuery ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                        <ul className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                                            {homeLocationResults.map((result, index) => (
                                                <li key={index} className="border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
                                                    <button onClick={() => handleSelectLocation(result)} className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                                                        {result.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <button onClick={handleCancelEditLocation} className="flex-shrink-0 px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </Section>
                
                <Section title="Administration">
                    <SettingsRow isButton onClick={onOpenAdminLogin} icon={<ShieldCheckIcon />} label="Admin Dashboard" description="Manage content and contributions">
                        <ArrowRightIcon />
                    </SettingsRow>
                </Section>
            </div>
            
             {/* Footer */}
            <div className="flex-shrink-0 p-4 border-t border-zinc-200 dark:border-zinc-700">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold py-2 px-4 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
                >
                    <LogoutIcon />
                    <span className="ml-2">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SettingsMenu;