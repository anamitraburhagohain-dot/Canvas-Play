/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

interface GeolocationPermissionPageProps {
  onAllow: () => void;
}

const GeolocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const GeolocationPermissionPage: React.FC<GeolocationPermissionPageProps> = ({ onAllow }) => {
  const [error, setError] = useState<string>('');

  const handleAllow = () => {
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        // On success, call the parent handler to update the app state
        onAllow();
      },
      (err) => {
        // On failure, show an informative error message
        if (err.code === err.PERMISSION_DENIED) {
          setError('Permission denied. To use the weather feature, please enable location services in your browser settings and refresh the page.');
        } else {
          setError('Could not get your location. Please ensure location services are enabled.');
        }
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-8 text-center flex flex-col justify-center items-center">
        
        <div className="my-8">
            <GeolocationIcon />
        </div>

        <div className="flex-grow flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">Location Permission Required</h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400">
                To show you relevant local weather information, our app needs permission to access your device's location. Your location data is used only for this purpose.
            </p>
        </div>

        <div className="mt-8 w-full">
            <button
                onClick={handleAllow}
                className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
                Allow Access
            </button>
            {error && (
              <p className="text-sm text-red-500 mt-4" role="alert">{error}</p>
            )}
            {!error && (
              <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-4">
                  This allows the weather feature to function correctly.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default GeolocationPermissionPage;