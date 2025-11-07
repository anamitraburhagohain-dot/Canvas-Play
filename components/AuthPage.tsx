/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';

// This lets TypeScript know that the 'google' object will be available globally
// from the script tag loaded in index.html.
declare const google: any;

// Icons for social login buttons and input fields
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.021,35.596,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

interface AuthPageProps {
  onGoogleLogin: (profile: { name: string; email: string; picture: string }) => void;
  onCredentialsLogin: (email: string, password: string) => Promise<boolean>;
  onCreateAccount: (name: string, email: string, password: string, dob: string) => Promise<boolean>;
  googleSignInEnabled: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ onGoogleLogin, onCredentialsLogin, onCreateAccount, googleSignInEnabled }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const maxDate = yesterday.toISOString().split('T')[0];
  
  const minDateObj = new Date(today);
  minDateObj.setFullYear(today.getFullYear() - 120);
  const minDate = minDateObj.toISOString().split('T')[0];

  useEffect(() => {
    if (googleSignInEnabled && googleButtonRef.current) {
        try {
            google.accounts.id.initialize({
                client_id: process.env.GOOGLE_CLIENT_ID,
                callback: (response: any) => {
                    // This function decodes the JWT token from Google
                    const base64Url = response.credential.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    const profile = JSON.parse(jsonPayload);
                    onGoogleLogin({ name: profile.name, email: profile.email, picture: profile.picture });
                }
            });
            google.accounts.id.renderButton(
                googleButtonRef.current,
                { theme: "outline", size: "large", type: "standard", text: "continue_with", width: "320" }
            );
        } catch (error) {
            console.error("Google Sign-In initialization failed:", error);
        }
    }
  }, [googleSignInEnabled, onGoogleLogin]);
  
  const handleToggleView = (isLogin: boolean) => {
    if (isLogin !== isLoginView) {
      setIsLoginView(isLogin);
      setError(''); // Clear errors when switching views
      // Clear form fields as well for a cleaner switch
      setName('');
      setEmail('');
      setPassword('');
      setDob('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let success = false;
    try {
        if (isLoginView) {
            success = await onCredentialsLogin(email, password);
            if (!success) {
                setError('Invalid email or password.');
            }
        } else {
            success = await onCreateAccount(name, email, password, dob);
             if (!success) {
                setError('An account with this email already exists.');
            }
        }
    } catch (err) {
        setError('An unexpected error occurred. Please try again.');
    }
  };

  const inputContainerClasses = "relative";
  const iconClasses = "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none";
  const inputClasses = "w-full pl-10 pr-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white dark:placeholder-zinc-500";
  const dateInputClasses = `${inputClasses} [color-scheme:light] dark:[color-scheme:dark]`;

  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            Canvas Play
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            {isLoginView ? 'Sign in to continue your journey.' : 'Join us to start learning.'}
          </p>
        </div>

        <div className="flex bg-zinc-100 dark:bg-black/20 p-1 rounded-full mb-6">
            <button
                onClick={() => handleToggleView(true)}
                className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isLoginView ? 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow' : 'text-zinc-500 dark:text-zinc-300'}`}
            >
                Sign In
            </button>
            <button
                onClick={() => handleToggleView(false)}
                className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${!isLoginView ? 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow' : 'text-zinc-500 dark:text-zinc-300'}`}
            >
                Create Account
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
                <div>
                    <div className={inputContainerClasses}>
                        <div className={iconClasses}><UserIcon /></div>
                        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className={inputClasses} />
                    </div>
                </div>
            )}
            <div>
                <div className={inputContainerClasses}>
                    <div className={iconClasses}><MailIcon /></div>
                    <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className={inputClasses} />
                </div>
            </div>
            <div>
                <div className={inputContainerClasses}>
                    <div className={iconClasses}><LockIcon /></div>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className={inputClasses} />
                </div>
            </div>
             {!isLoginView && (
                <div>
                     <div className={inputContainerClasses}>
                        <div className={iconClasses}><CalendarIcon /></div>
                        <input type="date" value={dob} onChange={e => setDob(e.target.value)} required className={dateInputClasses} min={minDate} max={maxDate} title="Select your date of birth" />
                    </div>
                </div>
            )}
            
            {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
            
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
              {isLoginView ? 'Sign In' : 'Create Account'}
            </button>
        </form>
        
        {googleSignInEnabled && (
           <>
             <div className="flex items-center my-6">
                <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
                <span className="flex-shrink mx-4 text-zinc-400 dark:text-zinc-500 text-sm">OR</span>
                <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
            </div>
            <div className="flex justify-center" ref={googleButtonRef}></div>
           </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;