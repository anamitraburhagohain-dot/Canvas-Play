/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef, useState, useEffect } from 'react';
import type { Contribution, Chapter } from './types.ts';

interface AdminPageProps {
  contributions: Contribution[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  allChaptersData: { [key: string]: Chapter[] };
  onChapterDataUpload: (fileContent: string) => Promise<void>;
  googleSignInEnabled: boolean;
  onToggleGoogleSignIn: () => void;
  aiFeaturesEnabled: boolean;
  onToggleAiFeatures: () => void;
  onLogout: () => void;
  notificationContent: string;
  onSaveNotificationContent: (content: string) => void;
}

// Icons for UI elements
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const ContentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
);

const SubmissionsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
);

// A more robust card component to prevent click-interception issues with backdrop-blur.
const AdminCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="relative rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl" aria-hidden="true"></div>
        <div className="relative p-6">
            <div className="border-b border-zinc-200/80 dark:border-zinc-700/80 pb-4 mb-6">
                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{title}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{description}</p>
            </div>
            {children}
        </div>
    </div>
);

type AdminTab = 'Dashboard' | 'Content' | 'Submissions';

const AdminTabButton: React.FC<{
    label: AdminTab;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
    notificationCount?: number;
}> = ({ label, icon, isActive, onClick, notificationCount }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center gap-3 py-2.5 px-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-zinc-500 dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800'
        }`}
    >
        {icon}
        <span>{label}</span>
        {notificationCount !== undefined && notificationCount > 0 && (
            <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
            </span>
        )}
    </button>
);


const AdminPage: React.FC<AdminPageProps> = ({ contributions, onApprove, onReject, allChaptersData, onChapterDataUpload, googleSignInEnabled, onToggleGoogleSignIn, aiFeaturesEnabled, onToggleAiFeatures, onLogout, notificationContent, onSaveNotificationContent }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [currentNotificationContent, setCurrentNotificationContent] = useState(notificationContent);
  const [activeTab, setActiveTab] = useState<AdminTab>('Dashboard');

  useEffect(() => {
    setCurrentNotificationContent(notificationContent);
  }, [notificationContent]);
  
  const ToggleSwitch: React.FC<{ id: string; checked: boolean; onChange: () => void; }> = ({ id, checked, onChange }) => (
    <div className="relative">
      <input 
        id={id}
        type="checkbox" 
        className="sr-only peer" 
        checked={checked} 
        onChange={onChange} 
      />
      <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
    </div>
  );

  const handleDownloadChapters = () => {
    const fileContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import type { Chapter } from '../components/types.ts';

// This file was generated by the application.
// It contains the current state of all chapter data, including admin edits and approved contributions.

export const initialChaptersData = ${JSON.stringify(allChaptersData, null, 2)};
`;
    const blob = new Blob([fileContent], { type: 'application/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chapters.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      try {
        await onChapterDataUpload(content);
        setUploadStatus({ message: 'Content updated successfully for this session!', type: 'success' });
      } catch (error) {
         setUploadStatus({ message: `Upload failed: ${error instanceof Error ? error.message : 'Invalid file format.'}`, type: 'error' });
      }
      setTimeout(() => setUploadStatus(null), 5000);
    };
    reader.onerror = () => {
        setUploadStatus({ message: 'Failed to read the file.', type: 'error' });
        setTimeout(() => setUploadStatus(null), 5000);
    };
    reader.readAsText(file);
    
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleSaveNotification = () => {
      onSaveNotificationContent(currentNotificationContent);
      alert("Notification content saved!");
  };

  return (
    <div className="w-full animate-fade-in space-y-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Admin Panel</h1>
            <button
            onClick={onLogout}
            className="flex items-center justify-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors shadow-md text-sm"
            >
            <LogoutIcon />
            <span>Logout</span>
            </button>
        </div>
      
        <div className="w-full max-w-lg mx-auto p-1.5 border border-zinc-300 dark:border-zinc-800 rounded-full bg-zinc-200 dark:bg-zinc-900">
            <div className="flex items-center space-x-2">
                <AdminTabButton
                    label="Dashboard"
                    icon={<DashboardIcon />}
                    isActive={activeTab === 'Dashboard'}
                    onClick={() => setActiveTab('Dashboard')}
                />
                <AdminTabButton
                    label="Content"
                    icon={<ContentIcon />}
                    isActive={activeTab === 'Content'}
                    onClick={() => setActiveTab('Content')}
                />
                <AdminTabButton
                    label="Submissions"
                    icon={<SubmissionsIcon />}
                    isActive={activeTab === 'Submissions'}
                    onClick={() => setActiveTab('Submissions')}
                    notificationCount={contributions.length}
                />
            </div>
        </div>

        <div className="mt-8">
            {activeTab === 'Dashboard' && (
                <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
                    <AdminCard title="Service Integrations" description="Enable or disable third-party services used in the app.">
                        <div className="space-y-4">
                            <label htmlFor="google-signin-toggle" className="flex items-center justify-between cursor-pointer p-3 bg-white/50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                <div>
                                    <span className="font-semibold text-zinc-700 dark:text-zinc-200">Google Sign-In</span>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Allow users to sign in with Google accounts.</p>
                                </div>
                                <ToggleSwitch id="google-signin-toggle" checked={googleSignInEnabled} onChange={onToggleGoogleSignIn} />
                            </label>
                            <label htmlFor="ai-features-toggle" className="flex items-center justify-between cursor-pointer p-3 bg-white/50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                <div>
                                    <span className="font-semibold text-zinc-700 dark:text-zinc-200">AI Features (Gemini)</span>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Enables content translation and AI-powered news.</p>
                                </div>
                                <ToggleSwitch id="ai-features-toggle" checked={aiFeaturesEnabled} onChange={onToggleAiFeatures} />
                            </label>
                        </div>
                    </AdminCard>

                    <AdminCard title="Notification Content" description="Set the message for the daily user notification.">
                        <textarea
                            value={currentNotificationContent}
                            onChange={(e) => setCurrentNotificationContent(e.target.value)}
                            rows={4}
                            className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white dark:placeholder-zinc-500"
                            placeholder="Enter daily notification message..."
                        />
                        <button
                            onClick={handleSaveNotification}
                            className="mt-3 w-full flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                        >
                            Save Notification
                        </button>
                    </AdminCard>
                </div>
            )}
            
            {activeTab === 'Content' && (
                 <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
                    <AdminCard title="Content Management" description="Update the application's core content file.">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-md font-semibold text-zinc-700 dark:text-zinc-200">Step 1: Download Current Content</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-3">
                                    Download the master file, edit it locally, then upload it.
                                </p>
                                <button 
                                    onClick={handleDownloadChapters} 
                                    className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-semibold py-2 px-4 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-300 dark:border-zinc-700"
                                >
                                    <DownloadIcon />
                                    Download chapters.ts
                                </button>
                            </div>

                            <div>
                                <h3 className="text-md font-semibold text-zinc-700 dark:text-zinc-200">Step 2: Upload for Live Preview</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-3">
                                    This updates the content for your current session only.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept=".ts,.txt"
                                    className="hidden"
                                />
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    <UploadIcon />
                                    Upload chapters.ts
                                </button>
                                {uploadStatus && (
                                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${uploadStatus.type === 'success' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'}`}>
                                        {uploadStatus.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </AdminCard>
                </div>
            )}

            {activeTab === 'Submissions' && (
                <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
                    <AdminCard title={`Review Submissions (${contributions.length})`} description="Approve or reject content contributed by users.">
                    {contributions.length === 0 ? (
                        <div className="text-center py-10 px-6 bg-white/30 dark:bg-zinc-800/50 rounded-lg">
                        <p className="text-zinc-500 dark:text-zinc-400">No pending submissions.</p>
                        </div>
                    ) : (
                        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 force-scrollbar">
                        {contributions.map((c) => (
                            <div key={c.id} className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm bg-white/50 dark:bg-zinc-800/50">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                                    From: <span className="font-bold">{c.userName}</span>
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 sm:mt-0">
                                    For: <span className="font-semibold">{c.subject} / Chapter {c.chapterId}</span>
                                </p>
                            </div>
                            <div className="p-3 bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-600">
                                <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">{c.content}</p>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => onReject(c.id)} className="px-4 py-2 text-sm font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 rounded-lg hover:bg-red-200 dark:hover:bg-red-900">
                                Reject
                                </button>
                                <button onClick={() => onApprove(c.id)} className="px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                                Approve
                                </button>
                            </div>
                            </div>
                        ))}
                        </div>
                    )}
                    </AdminCard>
                </div>
            )}
        </div>
    </div>
  );
};

export default AdminPage;