/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

interface NotificationPermissionPageProps {
  onComplete: (granted: boolean) => void;
}

const NotificationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);


const NotificationPermissionPage: React.FC<NotificationPermissionPageProps> = ({ onComplete }) => {
  const [error, setError] = useState<string>('');

  const handleAllow = () => {
    setError('');
    if (!('Notification' in window)) {
      setError('This browser does not support desktop notifications.');
      // Proceed after showing the message, with notifications disabled.
      setTimeout(() => onComplete(false), 3000);
      return;
    }

    // Request permission from the user
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        onComplete(true);
      } else {
        setError('Permission denied. You can enable notifications later in the settings menu.');
        // Proceed after showing the message, with notifications disabled.
        setTimeout(() => onComplete(false), 3000);
      }
    });
  };

  const handleSkip = () => {
    onComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-8 text-center flex flex-col justify-center items-center">
        
        <div className="my-8">
            <NotificationIcon />
        </div>

        <div className="flex-grow flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">Notification Permission</h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400">
                Allow us to send you daily facts and learning reminders to help you stay on track with your educational journey.
            </p>
        </div>

        <div className="mt-8 w-full">
            <button
                onClick={handleAllow}
                className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
                Allow Notifications
            </button>
             {error && (
              <p className="text-sm text-red-500 mt-4" role="alert">{error}</p>
            )}
            {!error && (
                 <button
                    onClick={handleSkip}
                    className="w-full text-zinc-500 dark:text-zinc-400 font-semibold py-3 px-8 mt-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    Maybe Later
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPermissionPage;