/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface StoragePermissionPageProps {
  onAllow: () => void;
}

const StorageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
);

const StoragePermissionPage: React.FC<StoragePermissionPageProps> = ({ onAllow }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-8 text-center flex flex-col justify-center items-center">
        
        <div className="my-8">
            <StorageIcon />
        </div>

        <div className="flex-grow flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">Storage Permission Required</h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400">
                To provide the best experience, including saving your progress and downloading content for offline use, our app needs permission to store data on your device.
            </p>
        </div>

        <div className="mt-8 w-full">
            <button
                onClick={onAllow}
                className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
                Allow Access
            </button>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-4">
                This allows the app to function as intended. We respect your privacy.
            </p>
        </div>
      </div>
    </div>
  );
};

export default StoragePermissionPage;