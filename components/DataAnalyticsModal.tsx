/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface DataAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { day: string; minutes: number }[];
}

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const BusiestDayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zM8 4h8v3.5l-4 4-4-4V4z"/>
    </svg>
);


// Summary Card Component
const SummaryCard: React.FC<{ icon: React.ReactNode; title: string; value: string; }> = ({ icon, title, value }) => (
    <div className="bg-zinc-100/50 dark:bg-zinc-800/50 p-4 rounded-lg flex items-center gap-4 border border-zinc-200/50 dark:border-zinc-700/50">
        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 p-2 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{title}</p>
            <p className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{value}</p>
        </div>
    </div>
);


export const DataAnalyticsModal: React.FC<DataAnalyticsModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) {
    return null;
  }

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  // Calculations
  const totalMinutes = data.reduce((sum, d) => sum + d.minutes, 0);
  const averageMinutes = data.length > 0 ? Math.round(totalMinutes / data.length) : 0;
  const busiestDay = data.reduce((busiest, current) => current.minutes > busiest.minutes ? current : busiest, { day: 'N/A', minutes: -1 });
  
  const dayMap: { [key: string]: string } = {
    'Sun': 'Sunday',
    'Mon': 'Monday',
    'Tue': 'Tuesday',
    'Wed': 'Wednesday',
    'Thu': 'Thursday',
    'Fri': 'Friday',
    'Sat': 'Saturday',
  };

  const formatTotalTime = (minutes: number) => {
      if (minutes < 60) return `${minutes}m`;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) return `${hours}h`;
      return `${hours}h ${remainingMinutes}m`;
  };

  const fullBusiestDayName = dayMap[busiestDay.day] || busiestDay.day;

  const maxMinutes = 24 * 60; // 24 hours in minutes

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-3xl p-6 md:p-8 relative transform transition-all flex flex-col border border-zinc-200/50 dark:border-zinc-700/50"
        style={{ maxHeight: '90vh' }}
        onClick={handleModalContentClick}
        role="document"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-zinc-800 dark:text-zinc-100">Weekly Activity</h2>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">Your learning time over the past 7 days.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <SummaryCard icon={<ClockIcon />} title="Total Time" value={formatTotalTime(totalMinutes)} />
            <SummaryCard icon={<CalendarIcon />} title="Daily Average" value={`${averageMinutes}m`} />
            <SummaryCard icon={<BusiestDayIcon />} title="Busiest Day" value={fullBusiestDayName} />
        </div>
        
        <div className="flex-grow">
          <div className="flex h-64 gap-3">
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between text-right text-xs text-zinc-400 dark:text-zinc-500">
              <span>24h</span>
              <span>18h</span>
              <span>12h</span>
              <span>6h</span>
              <span>0h</span>
            </div>

            {/* Chart Area */}
            <div className="flex-1 h-full flex items-end justify-around gap-2 relative">
              {/* Y-axis grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between -z-10">
                <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-700"></div>
                <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-700"></div>
                <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-700"></div>
                <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-700"></div>
                <div className="w-full border-t border-zinc-200 dark:border-zinc-700"></div>
              </div>
          
              {data.map((item, index) => {
                const percentage = maxMinutes > 0 ? (item.minutes / maxMinutes) * 100 : 0;
                const height = `${percentage}%`;
                
                return (
                  <div key={index} className="flex-1 h-full flex flex-col-reverse items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{item.day}</span>
                    <div className="relative w-full h-full flex items-end justify-center group">
                      <div 
                        className="w-3/4 max-w-md rounded-t-lg bg-gradient-to-t from-amber-700 to-amber-900 dark:from-amber-700 dark:to-amber-900 transform-gpu origin-bottom"
                        style={{ 
                            height: height, 
                            animationName: 'scale-in',
                            animationDuration: '0.5s',
                            animationDelay: `${index * 50}ms`,
                            animationTimingFunction: 'ease-out',
                            animationFillMode: 'backwards',
                        }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 dark:bg-zinc-700 text-white text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {formatTotalTime(item.minutes)}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-zinc-800 dark:border-t-zinc-700"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50 text-right">
            <button onClick={onClose} className="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-semibold py-2 px-4 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-600">
                Close
            </button>
        </div>
      </div>
    </div>
  );
};