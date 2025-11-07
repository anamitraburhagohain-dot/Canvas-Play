/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface WelcomePageProps {
  onComplete: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white">
          Welcome to Canvas Play!
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
          Your personalized journey into the world of knowledge begins now.
        </p>
        <p className="mt-6 text-zinc-500 dark:text-zinc-400">
          We've prepared interactive chapters, quizzes, and AI-powered tools to make learning engaging and effective.
        </p>
        <button
          onClick={onComplete}
          className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg text-lg"
        >
          Let's Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;