
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
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
  className?: string;
};

// --- Icons ---

const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

// --- Enhanced Animated Icons ---

const SunnyIcon: React.FC<WeatherIconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
        <defs>
            <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
            <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            </filter>
        </defs>
        <g>
            {/* Glow */}
            <circle cx="32" cy="32" r="14" fill="#FCD34D" opacity="0.4" filter="url(#sunGlow)">
                 <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Core */}
            <circle cx="32" cy="32" r="12" fill="url(#sunGradient)" stroke="#F59E0B" strokeWidth="0.5" />
            
            {/* Rays - 12 rays for a perfect sun */}
            <g stroke="#FBBF24" strokeWidth="3" strokeLinecap="round">
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                    <line key={deg} x1="32" y1="14" x2="32" y2="6" transform={`rotate(${deg} 32 32)`} />
                ))}
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite" />
            </g>
        </g>
    </svg>
);

const MoonIcon: React.FC<WeatherIconProps> = ({ isDarkMode, className = "h-6 w-6" }) => {
    const strokeColor = isDarkMode ? '#E2E8F0' : '#475569';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
            <defs>
                <linearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F1F5F9" />
                    <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
            </defs>
            <g>
                <animateTransform attributeName="transform" type="rotate" values="-5 32 32; 5 32 32; -5 32 32" dur="6s" repeatCount="indefinite" />
                <path fill="url(#moonGrad)" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M46 34 A18 18 0 1 1 26 10 A14 14 0 0 0 46 34 z" />
                <circle cx="34" cy="28" r="2" fill="#64748B" opacity="0.2" />
                <circle cx="38" cy="36" r="1.5" fill="#64748B" opacity="0.2" />
            </g>
            <g fill="#FCD34D">
                <polygon points="54,10 55,13 58,13 56,15 57,18 54,16 51,18 52,15 50,13 53,13">
                     <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </polygon>
                <polygon points="10,50 11,53 14,53 12,55 13,58 10,56 7,58 8,55 6,53 9,53">
                     <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                </polygon>
            </g>
        </svg>
    );
};

const CloudyIcon: React.FC<WeatherIconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
        <defs>
            <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="darkCloudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
        </defs>
        <g opacity="0.8">
            <animateTransform attributeName="transform" type="translate" values="-2 0; 2 0; -2 0" dur="8s" repeatCount="indefinite" />
            <path d="M48 36 H20 c-4 0-7-3-7-7s3-7 7-7c.5 0 1 .1 1.5.2 C22.5 19 26 16 30 16c4 0 7.5 3 8.5 7 3 .5 5.5 3 5.5 6 0 3.5-3 7-7 7z" 
                fill="url(#darkCloudGrad)" stroke="#94A3B8" strokeWidth="0.5" transform="scale(1.2) translate(-5, 5)"/>
        </g>
        <g>
             <animateTransform attributeName="transform" type="translate" values="3 0; -3 0; 3 0" dur="6s" repeatCount="indefinite" />
             <path d="M46 48H18c-5.5 0-10-4.5-10-10s4.5-10 10-10c.8 0 1.5.1 2.3.3C21.9 21.9 27.5 18 34 18c7.2 0 13.3 4.7 15.3 11.3 5.1.9 9 5.3 9 10.7 0 6.1-4.9 11-11 11z" fill="url(#cloudGrad)" stroke="#CBD5E1" strokeWidth="1"/>
        </g>
    </svg>
);

const PartlyCloudyDayIcon: React.FC<WeatherIconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
         <defs>
            <radialGradient id="pcSunGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
            <linearGradient id="pcCloudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
        </defs>
         <g transform="translate(5, -5)">
            <g>
                <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite" />
                <circle cx="32" cy="32" r="12" fill="url(#pcSunGrad)" stroke="#F59E0B" strokeWidth="1" />
                {/* 8 Rays for partly cloudy */}
                <g stroke="#F59E0B" strokeWidth="3" strokeLinecap="round">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                        <line key={deg} x1="32" y1="14" x2="32" y2="6" transform={`rotate(${deg} 32 32)`} />
                    ))}
                </g>
            </g>
         </g>
         <g transform="translate(-5, 5)">
             <animateTransform attributeName="transform" type="translate" values="0 5; 0 7; 0 5" dur="4s" repeatCount="indefinite" />
             <path d="M46 48H18c-5.5 0-10-4.5-10-10s4.5-10 10-10c.8 0 1.5.1 2.3.3C21.9 21.9 27.5 18 34 18c7.2 0 13.3 4.7 15.3 11.3 5.1.9 9 5.3 9 10.7 0 6.1-4.9 11-11 11z" fill="url(#pcCloudGrad)" stroke="#CBD5E1" strokeWidth="1"/>
         </g>
    </svg>
);

const PartlyCloudyNightIcon: React.FC<WeatherIconProps> = ({ isDarkMode, className = "h-6 w-6" }) => {
    const strokeColor = isDarkMode ? '#E2E8F0' : '#475569';
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
            <defs>
                <linearGradient id="pcnMoonGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F1F5F9" />
                    <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
                <linearGradient id="pcnCloudGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
            </defs>
            <g transform="translate(8, -8)">
                <path fill="url(#pcnMoonGrad)" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M46 34 A18 18 0 1 1 26 10 A14 14 0 0 0 46 34 z" />
            </g>
            <g opacity="0.9" transform="translate(-5, 5)">
                 <animateTransform attributeName="transform" type="translate" values="-5 5; -3 5; -5 5" dur="5s" repeatCount="indefinite" />
                 <path d="M46 48H18c-5.5 0-10-4.5-10-10s4.5-10 10-10c.8 0 1.5.1 2.3.3C21.9 21.9 27.5 18 34 18c7.2 0 13.3 4.7 15.3 11.3 5.1.9 9 5.3 9 10.7 0 6.1-4.9 11-11 11z" fill="url(#pcnCloudGrad)" stroke="#64748B" strokeWidth="1"/>
            </g>
        </svg>
    );
};

const RainIcon: React.FC<WeatherIconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
        <defs>
            <linearGradient id="rainCloudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
        </defs>
        <g>
             <path d="M46 40H18c-5.5 0-10-4.5-10-10s4.5-10 10-10c.8 0 1.5.1 2.3.3C21.9 13.9 27.5 10 34 10c7.2 0 13.3 4.7 15.3 11.3 5.1.9 9 5.3 9 10.7 0 6.1-4.9 8-11 8z" fill="url(#rainCloudGrad)" stroke="#475569" strokeWidth="1"/>
             <g stroke="#3B82F6" strokeWidth="2" strokeLinecap="round">
                <line x1="24" y1="45" x2="20" y2="55">
                    <animate attributeName="y1" values="45;55" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="55;65" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="34" y1="45" x2="30" y2="55">
                    <animate attributeName="y1" values="45;55" dur="1.2s" repeatCount="indefinite" begin="0.3s" />
                    <animate attributeName="y2" values="55;65" dur="1.2s" repeatCount="indefinite" begin="0.3s" />
                    <animate attributeName="opacity" values="1;0" dur="1.2s" repeatCount="indefinite" begin="0.3s" />
                </line>
                <line x1="44" y1="45" x2="40" y2="55">
                    <animate attributeName="y1" values="45;55" dur="0.8s" repeatCount="indefinite" begin="0.6s" />
                    <animate attributeName="y2" values="55;65" dur="0.8s" repeatCount="indefinite" begin="0.6s" />
                    <animate attributeName="opacity" values="1;0" dur="0.8s" repeatCount="indefinite" begin="0.6s" />
                </line>
                {/* Puddle Splash */}
                <ellipse cx="32" cy="60" rx="10" ry="2" fill="none" stroke="#60A5FA" strokeWidth="1" opacity="0">
                    <animate attributeName="rx" values="0; 12" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1; 0" dur="2s" repeatCount="indefinite"/>
                </ellipse>
             </g>
        </g>
    </svg>
);

const SnowIcon: React.FC<WeatherIconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
        <defs>
            <linearGradient id="snowCloudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
        </defs>
        <g>
            <path d="M46 40H18c-5.5 0-10-4.5-10-10s4.5-10 10-10c.8 0 1.5.1 2.3.3C21.9 13.9 27.5 10 34 10c7.2 0 13.3 4.7 15.3 11.3 5.1.9 9 5.3 9 10.7 0 6.1-4.9 8-11 8z" fill="url(#snowCloudGrad)" stroke="#64748B" strokeWidth="1"/>
            <g fill="white">
                <circle cx="24" cy="50" r="2">
                    <animate attributeName="cy" values="45; 60" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1; 0" dur="2s" repeatCount="indefinite"/>
                     <animateTransform attributeName="transform" type="translate" values="0 0; 5 0; 0 0" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="34" cy="50" r="2.5">
                    <animate attributeName="cy" values="45; 60" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
                    <animate attributeName="opacity" values="1; 0" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
                     <animateTransform attributeName="transform" type="translate" values="0 0; -5 0; 0 0" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="44" cy="50" r="2">
                    <animate attributeName="cy" values="45; 60" dur="1.8s" repeatCount="indefinite" begin="1s"/>
                    <animate attributeName="opacity" values="1; 0" dur="1.8s" repeatCount="indefinite" begin="1s"/>
                </circle>
            </g>
        </g>
    </svg>
);

const ThunderstormIcon: React.FC<WeatherIconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
         <defs>
            <linearGradient id="stormCloudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#334155" />
            </linearGradient>
        </defs>
        <g>
            <path d="M46 40H18c-5.5 0-10-4.5-10-10s4.5-10 10-10c.8 0 1.5.1 2.3.3C21.9 13.9 27.5 10 34 10c7.2 0 13.3 4.7 15.3 11.3 5.1.9 9 5.3 9 10.7 0 6.1-4.9 8-11 8z" fill="url(#stormCloudGrad)" stroke="#1E293B" strokeWidth="1"/>
             {/* Lightning */}
            <path d="M36 40 L28 52 H34 L30 62 L42 48 H34 L38 40 Z" fill="#F59E0B" stroke="#FBBF24" strokeWidth="1">
                <animate attributeName="fill" values="#F59E0B; #FEF3C7; #F59E0B" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0; 1; 0; 0" dur="3s" repeatCount="indefinite" />
            </path>
             {/* Rain */}
             <g stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
                <line x1="20" y1="45" x2="18" y2="52"><animate attributeName="y1" values="45;50" dur="0.5s" repeatCount="indefinite"/><animate attributeName="y2" values="52;57" dur="0.5s" repeatCount="indefinite"/></line>
                <line x1="48" y1="45" x2="46" y2="52"><animate attributeName="y1" values="45;50" dur="0.6s" repeatCount="indefinite"/><animate attributeName="y2" values="52;57" dur="0.6s" repeatCount="indefinite"/></line>
             </g>
        </g>
    </svg>
);

const MistIcon: React.FC<WeatherIconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
        <g stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
             <line x1="10" y1="20" x2="40" y2="20" opacity="0.6">
                 <animate attributeName="x1" values="10; 15; 10" dur="5s" repeatCount="indefinite" />
                 <animate attributeName="x2" values="40; 45; 40" dur="5s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0.6; 0.3; 0.6" dur="3s" repeatCount="indefinite" />
             </line>
             <line x1="25" y1="32" x2="55" y2="32" opacity="0.8">
                 <animate attributeName="x1" values="25; 20; 25" dur="6s" repeatCount="indefinite" />
                 <animate attributeName="x2" values="55; 50; 55" dur="6s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0.8; 0.4; 0.8" dur="4s" repeatCount="indefinite" />
             </line>
             <line x1="15" y1="44" x2="45" y2="44" opacity="0.6">
                 <animate attributeName="x1" values="15; 20; 15" dur="5.5s" repeatCount="indefinite" />
                 <animate attributeName="x2" values="45; 50; 45" dur="5.5s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0.6; 0.3; 0.6" dur="3.5s" repeatCount="indefinite" />
             </line>
        </g>
    </svg>
);

const DewIcon: React.FC<WeatherIconProps> = ({ className = "h-6 w-6" }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
        <defs>
            <linearGradient id="leafGrad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#166534" />
                <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
            <radialGradient id="dewDropGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#3B82F6" />
            </radialGradient>
        </defs>
        <path d="M 10 60 Q 32 60 54 10 Q 40 40 10 60 Z" fill="url(#leafGrad)" stroke="#14532d" strokeWidth="1" />
        <circle cx="35" cy="35" r="4" fill="url(#dewDropGrad)" stroke="#2563eb" strokeWidth="0.5">
            <animate attributeName="cy" values="35; 55" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1"/>
            <animate attributeName="r" values="4; 2" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1"/>
            <animate attributeName="opacity" values="1; 0" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1"/>
        </circle>
         <circle cx="35" cy="35" r="0" fill="url(#dewDropGrad)" opacity="0">
             <animate attributeName="r" values="0; 4" dur="1s" begin="3.5s" repeatCount="indefinite" fill="freeze"/>
             <animate attributeName="opacity" values="0; 1" dur="1s" begin="3.5s" repeatCount="indefinite" fill="freeze"/>
         </circle>
    </svg>
);

const WindyIcon: React.FC<WeatherIconProps> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 64 64">
        <g fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
            <path d="M16 24 h20 a4 4 0 1 1 0 8 h-2">
                <animate attributeName="d" values="M16 24 h20 a4 4 0 1 1 0 8 h-2; M12 24 h24 a4 4 0 1 1 0 8 h-2; M16 24 h20 a4 4 0 1 1 0 8 h-2" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M20 40 h16 a4 4 0 1 0 0 -8 h-2">
                <animate attributeName="d" values="M20 40 h16 a4 4 0 1 0 0 -8 h-2; M24 40 h12 a4 4 0 1 0 0 -8 h-2; M20 40 h16 a4 4 0 1 0 0 -8 h-2" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M10 32 h8">
                 <animate attributeName="x2" values="18; 24; 18" dur="1s" repeatCount="indefinite" />
            </path>
        </g>
    </svg>
);


// --- Weather Component ---

// Helper to format condition text
const formatCondition = (condition: string): string => {
  if (condition === 'Moon') return 'Clear';
  if (condition === 'Sunny') return 'Sunny';
  if (condition.includes('PartlyCloudy')) return 'Partly Cloudy';
  if (condition.includes('MostlyCloudy')) return 'Mostly Cloudy';
  return condition.replace(/([A-Z])/g, ' $1').trim();
};

const Weather: React.FC<WeatherProps> = ({ data, isDarkMode, isRefreshing, onRefresh }) => {
  if (data === 'loading') {
    return (
      <div className="h-9 w-24 bg-black/20 rounded-full animate-pulse flex items-center justify-center px-3">
        <span className="text-xs text-white/70">Loading...</span>
      </div>
    );
  }

  if (data === 'error') {
    return (
      <button 
          onClick={(e) => {
              e.currentTarget.blur();
              onRefresh();
          }}
          className="h-9 flex items-center gap-1 text-red-400 hover:text-red-300 bg-black/20 px-3 py-1 rounded-full transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-xs">Retry</span>
      </button>
    );
  }

  const { temperature, condition, forecast } = data;
  const conditionText = formatCondition(condition);
  
  const renderIcon = () => {
    // Compact icon size
    const iconProps = { isDarkMode, className: "h-full w-full" };
    switch (condition) {
      case 'Sunny': return <SunnyIcon {...iconProps} />;
      case 'Moon': return <MoonIcon {...iconProps} />;
      case 'PartlyCloudyDay': return <PartlyCloudyDayIcon {...iconProps} />;
      case 'PartlyCloudyNight': return <PartlyCloudyNightIcon {...iconProps} />;
      case 'MostlyCloudyDay': return <CloudyIcon {...iconProps} />;
      case 'MostlyCloudyNight': return <CloudyIcon {...iconProps} />;
      case 'Cloudy': return <CloudyIcon {...iconProps} />;
      case 'Rain': return <RainIcon {...iconProps} />;
      case 'Snow': return <SnowIcon {...iconProps} />;
      case 'Thunderstorm': return <ThunderstormIcon {...iconProps} />;
      case 'Fog': return <MistIcon {...iconProps} />;
      case 'Mist': return <MistIcon {...iconProps} />;
      case 'Dew': return <DewIcon {...iconProps} />;
      case 'Windy': return <WindyIcon {...iconProps} />;
      default: return <SunnyIcon {...iconProps} />;
    }
  };

  return (
    <div className="flex items-center bg-black/20 backdrop-blur-sm rounded-full border border-white/10 shadow-sm h-9 overflow-hidden">
        {/* Weather Info Section */}
        <div 
            className="flex items-center gap-2 pl-1.5 pr-2 h-full select-none cursor-help"
            title={`${conditionText} • ${forecast}`}
        >
            {/* Icon Wrapper */}
            <div className="flex-shrink-0 h-7 w-7">
                {renderIcon()}
            </div>
            {/* Temperature */}
            <span className="text-sm font-bold text-white leading-none whitespace-nowrap">{temperature}°C</span>
        </div>
        
        {/* Vertical Divider */}
        <div className="h-4 w-px bg-white/20"></div>

        {/* Refresh Button */}
        <button 
            onClick={(e) => {
                e.currentTarget.blur();
                onRefresh();
            }}
            disabled={isRefreshing}
            className="flex items-center justify-center px-2.5 h-full hover:bg-white/10 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:bg-white/20"
            aria-label="Refresh weather"
            title="Refresh Weather"
        >
            <RefreshIcon className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
    </div>
  );
};

export default Weather;
