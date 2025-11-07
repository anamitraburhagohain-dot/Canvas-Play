/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface RewardsProps {
  rewardAmount: number;
}

const GoldMedalIcon = () => (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gold-ribbon-3d" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#6D28D9"/>
                <stop offset="100%" stopColor="#4338CA"/>
            </linearGradient>
            <radialGradient id="gold-medal-3d" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFFBEB"/>
                <stop offset="40%" stopColor="#FBBF24"/>
                <stop offset="100%" stopColor="#B45309"/>
            </radialGradient>
             <radialGradient id="gold-highlight-3d" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            <filter id="medal-shadow-3d" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.25"/>
            </filter>
        </defs>
        <g filter="url(#medal-shadow-3d)">
            {/* Ribbon */}
            <path d="M16 0 V18 L14 18 L24 26 L34 18 L32 18 V0 H16Z" fill="#312E81"/>
            <path d="M16 0 L16 18 L24 24 L32 18 L32 0 Z" fill="url(#gold-ribbon-3d)"/>
            {/* Medal */}
            <circle cx="24" cy="29" r="15" fill="#B45309"/>
            <circle cx="24" cy="29" r="14" fill="url(#gold-medal-3d)" stroke="#F59E0B" strokeWidth="1"/>
            <circle cx="24" cy="29" r="14" fill="url(#gold-highlight-3d)"/>
            {/* Star */}
            <path d="M24 22 l2.5 5 h5.5 l-4.5 3.5 l1.5 5.5 l-4.5 -3.5 l-4.5 3.5 l1.5 -5.5 l-4.5 -3.5 h5.5 Z" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="0.5"/>
        </g>
    </svg>
);

const SilverMedalIcon = () => (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="silver-ribbon-3d" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#3B82F6"/>
                <stop offset="100%" stopColor="#1D4ED8"/>
            </linearGradient>
            <radialGradient id="silver-medal-3d" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF"/>
                <stop offset="40%" stopColor="#E5E7EB"/>
                <stop offset="100%" stopColor="#6B7280"/>
            </radialGradient>
             <radialGradient id="silver-highlight-3d" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
        </defs>
        <g filter="url(#medal-shadow-3d)">
            {/* Ribbon */}
            <path d="M16 0 V18 L14 18 L24 26 L34 18 L32 18 V0 H16Z" fill="#1E3A8A"/>
            <path d="M16 0 L16 18 L24 24 L32 18 L32 0 Z" fill="url(#silver-ribbon-3d)"/>
            {/* Medal */}
            <circle cx="24" cy="29" r="15" fill="#6B7280"/>
            <circle cx="24" cy="29" r="14" fill="url(#silver-medal-3d)" stroke="#9CA3AF" strokeWidth="1"/>
            <circle cx="24" cy="29" r="14" fill="url(#silver-highlight-3d)"/>
            {/* Star */}
            <path d="M24 22 l2.5 5 h5.5 l-4.5 3.5 l1.5 5.5 l-4.5 -3.5 l-4.5 3.5 l1.5 -5.5 l-4.5 -3.5 h5.5 Z" fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="0.5"/>
        </g>
    </svg>
);

const BronzeMedalIcon = () => (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bronze-ribbon-3d" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#E11D48"/>
                <stop offset="100%" stopColor="#BE123C"/>
            </linearGradient>
            <radialGradient id="bronze-medal-3d" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FEE2E2"/>
                <stop offset="40%" stopColor="#F59E0B"/>
                <stop offset="100%" stopColor="#9A3412"/>
            </radialGradient>
             <radialGradient id="bronze-highlight-3d" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
        </defs>
        <g filter="url(#medal-shadow-3d)">
            {/* Ribbon */}
            <path d="M16 0 V18 L14 18 L24 26 L34 18 L32 18 V0 H16Z" fill="#881337"/>
            <path d="M16 0 L16 18 L24 24 L32 18 L32 0 Z" fill="url(#bronze-ribbon-3d)"/>
            {/* Medal */}
            <circle cx="24" cy="29" r="15" fill="#78350F"/>
            <circle cx="24" cy="29" r="14" fill="url(#bronze-medal-3d)" stroke="#A16207" strokeWidth="1"/>
            <circle cx="24" cy="29" r="14" fill="url(#bronze-highlight-3d)"/>
            {/* Star */}
            <path d="M24 22 l2.5 5 h5.5 l-4.5 3.5 l1.5 5.5 l-4.5 -3.5 l-4.5 3.5 l1.5 -5.5 l-4.5 -3.5 h5.5 Z" fill="#FEF3C7" stroke="#A16207" strokeWidth="0.5"/>
        </g>
    </svg>
);

const Rewards: React.FC<RewardsProps> = ({ rewardAmount }) => {
    
    const getBadge = (amount: number) => {
        if (amount > 200) {
            return <GoldMedalIcon />;
        }
        if (amount > 100) {
            return <SilverMedalIcon />;
        }
        return <BronzeMedalIcon />;
    };

    return (
        <div className="flex-shrink-0 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-1 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                    {getBadge(rewardAmount)}
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Rewards</p>
                    <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                        ₹{rewardAmount}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Rewards;
