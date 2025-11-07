/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";

// Import all components for the educational app
import StoragePermissionPage from './components/StoragePermissionPage.tsx';
import GeolocationPermissionPage from './components/GeolocationPermissionPage.tsx';
import NotificationPermissionPage from './components/NotificationPermissionPage.tsx';
import AuthPage from './components/AuthPage.tsx';
import WelcomePage from './components/WelcomePage.tsx';
import Header from './components/Header.tsx';
import NewsFlash from './components/NewsFlash.tsx';
import Tabs from './components/Tabs.tsx';
import HistoryPage from './components/HistoryPage.tsx';
import GeographyPage from './components/GeographyPage.tsx';
import SciencePage from './components/SciencePage.tsx';
import CurrentAffairsPage from './components/CurrentAffairsPage.tsx';
import GkPage from './components/GkPage.tsx';
import AdminPage from './components/AdminPage.tsx';
import Footer from './components/Footer.tsx';
import SubscriptionModal from './components/SubscriptionModal.tsx';
import ContributionModal from './components/ContributionModal.tsx';
import AdminLoginModal from './components/AdminLoginModal.tsx';
import ProfilePicModal from './components/ProfilePicModal.tsx';
import { DataAnalyticsModal } from './components/DataAnalyticsModal.tsx';
import EditProfileModal from './components/EditProfileModal.tsx';
import CommunityFeed, { type SortOrder } from './components/CommunityFeed.tsx';
import AssistantModal from './components/DebugModal.tsx';
import SearchBar, { type SearchResult } from './components/SearchBar.tsx';

// Import data and types
import { initialChaptersData } from './data/chapters.ts';
import { animatedAvatars } from './data/avatars.ts';
import { animatedWallpapers } from './data/wallpapers.ts';
import { animatedAssistants } from './data/assistants.ts';
import type { Chapter, Contribution, UserAccount, Post, Comment, CommentReactionType, Liker } from './components/types.ts';
import { searchPlaces } from './services/geminiService.ts';

const TABS = ['History', 'Geography', 'Science', 'Current Affairs', 'G.K'];

type LocationSearchResult = { name: string; lat: number; lon: number };


// --- START: Inlined CommunityHubPage component ---
interface CommunityHubPageProps {
  tabs: string[];
  isSubscribed: boolean;
  postsBySubject: { [key: string]: Post[] };
  userProfile: UserAccount;
  profilePic: string | null;
  onCreatePost: (subject: string, content: string) => void;
  onToggleLike: (subject: string, postId: string) => void;
  onAddComment: (subject: string, postId: string, commentText: string) => void;
  onToggleBookmark: (subject: string, postId: string) => void;
  onEditPost: (subject: string, postId: string, newContent: string) => void;
  onDeletePost: (subject: string, postId: string) => void;
  onDeleteComment: (subject: string, postId: string, commentId: string) => void;
  onToggleCommentReaction: (subject: string, postId: string, commentId: string, reaction: CommentReactionType) => void;
  rewardAmount: number;
}

const CommunityHubPage: React.FC<CommunityHubPageProps> = (props) => {
  const {
    tabs, isSubscribed, postsBySubject,
    userProfile, profilePic, onCreatePost, onToggleLike, onAddComment,
    onToggleBookmark, onEditPost, onDeletePost, onDeleteComment, onToggleCommentReaction,
    rewardAmount
  } = props;

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent');

  const sortedPosts = useMemo(() => {
    const posts = postsBySubject[activeTab] || [];
    let processedPosts = [...posts];

    if (sortOrder === 'bookmarked') {
      processedPosts = processedPosts.filter(post => post.isBookmarked);
    }

    return processedPosts.sort((a, b) => {
      switch (sortOrder) {
        case 'liked':
          return b.likes - a.likes;
        case 'commented':
          return b.comments.length - a.comments.length;
        case 'recent':
        case 'bookmarked': // Also sort bookmarked by most recent
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [postsBySubject, activeTab, sortOrder]);


  return (
    <div className="animate-fade-in">
        <div className="mt-6">
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isSubscribed={isSubscribed}
                isAdmin={false} // Don't show admin tab in community hub
            />
        </div>
        <div className="mt-6">
            <CommunityFeed
                subject={activeTab}
                posts={sortedPosts}
                userProfile={userProfile}
                profilePic={profilePic}
                onCreatePost={(content) => onCreatePost(activeTab, content)}
                onToggleLike={(postId) => onToggleLike(activeTab, postId)}
                onAddComment={(postId, commentText) => onAddComment(activeTab, postId, commentText)}
                onToggleBookmark={(postId) => onToggleBookmark(activeTab, postId)}
                onEditPost={(postId, newContent) => onEditPost(activeTab, postId, newContent)}
                onDeletePost={(postId) => onDeletePost(activeTab, postId)}
                onDeleteComment={(postId, commentId) => onDeleteComment(activeTab, postId, commentId)}
                onToggleCommentReaction={(postId, commentId, reaction) => onToggleCommentReaction(activeTab, postId, commentId, reaction)}
                rewardAmount={rewardAmount}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
            />
        </div>
    </div>
  );
};
// --- END: Inlined CommunityHubPage component ---


// Helper functions for localStorage
const loadState = (key: string, defaultValue: any) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading state for key "${key}":`, error);
    return defaultValue;
  }
};

const saveState = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving state for key "${key}":`, error);
  }
};

const initialAnalyticsData = [
    { day: 'Sun', minutes: 0 }, { day: 'Mon', minutes: 0 }, { day: 'Tue', minutes: 0 },
    { day: 'Wed', minutes: 0 }, { day: 'Thu', minutes: 0 }, { day: 'Fri', minutes: 0 },
    { day: 'Sat', minutes: 0 }
];


export const App: React.FC = () => {
    // Permissions
    const [storagePermissionGranted, setStoragePermissionGranted] = useState<boolean>(true);
    const [geolocationPermissionGranted, setGeolocationPermissionGranted] = useState<boolean>(false);
    const [geolocationChecked, setGeolocationChecked] = useState<boolean>(true);
    const [hasCompletedNotificationPrompt, setHasCompletedNotificationPrompt] = useState<boolean>(true);

    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [homeLocation, setHomeLocation] = useState<{ lat: number; lon: number; name: string } | null>(() => loadState('homeLocation', null));
    
    // Authentication and Theming
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(true);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => loadState('isDarkMode', window.matchMedia('(prefers-color-scheme: dark)').matches));
    const [isNightMode, setIsNightMode] = useState<boolean>(() => loadState('isNightMode', false));
    const [userProfile, setUserProfile] = useState<UserAccount>(() => loadState('userProfile', {
        name: 'Alex Doe',
        email: 'alex.doe@example.com',
        gender: 'Prefer not to say',
        phone: '',
        address: '',
        hasCompletedOnboarding: false,
    }));
    const [profilePic, setProfilePic] = useState<string | null>(() => loadState('profilePic', animatedAvatars[0]));
    const [wallpaper, setWallpaper] = useState<string>(() => loadState('wallpaper', animatedWallpapers[0].svg));
    const [selectedAssistant, setSelectedAssistant] = useState<string>(() => loadState('selectedAssistant', animatedAssistants[0].svg));
    
    // Subscription and Admin states
    const [isSubscribed, setIsSubscribed] = useState<boolean>(() => loadState('isSubscribed', false));
    const [subscriptionDate, setSubscriptionDate] = useState<Date | null>(() => {
        const saved = loadState('subscriptionDate', null);
        return saved ? new Date(saved) : null;
    });
    const [isAdmin, setIsAdmin] = useState<boolean>(() => loadState('isAdmin', false));
    const [contributions, setContributions] = useState<Contribution[]>(() => {
        const loaded = loadState('contributions', []);
        return Array.isArray(loaded) ? loaded : [];
    });
    const [rewardAmount, setRewardAmount] = useState<number>(() => loadState('rewardAmount', 0));
    
    // App content states
    const [chaptersData, setChaptersData] = useState<{ [key: string]: Chapter[] }>(() => loadState('chaptersData', initialChaptersData));
    const [postsBySubject, setPostsBySubject] = useState<{ [key: string]: Post[] }>(() => {
        const defaultPosts = {
            'History': [],
            'Geography': [], 'Science': [], 'Current Affairs': [], 'G.K': []
        };
        
        const savedPosts = loadState('postsBySubject', defaultPosts);
        
        // One-time migration for old data structures
        const migratePosts = (posts: { [key: string]: any[] }) => {
            const picMap: { [key: string]: string } = {
                'jane.doe@example.com': animatedAvatars[5],
                'john.smith@example.com': animatedAvatars[6],
                'emily.jones@example.com': animatedAvatars[7],
                'alex.doe@example.com': animatedAvatars[0],
                'michael.brown@example.com': animatedAvatars[2],
                'susan.white@example.com': animatedAvatars[3],
                'kevin.green@example.com': animatedAvatars[4],
                'lisa.hall@example.com': animatedAvatars[8],
            };

            Object.keys(posts).forEach(subject => {
                if (Array.isArray(posts[subject])) {
                    posts[subject].forEach(post => {
                        if (post.likedBy && post.likedBy.length > 0) {
                            // Check if migration is needed (string array or object without 'pic')
                            if (typeof post.likedBy[0] === 'string' || !post.likedBy[0].hasOwnProperty('pic')) {
                                post.likedBy = post.likedBy.map((liker: any) => {
                                    const email = typeof liker === 'string' ? liker : liker.email;
                                    const name = typeof liker === 'string' 
                                        ? email.split('@')[0].replace('.', ' ').replace(/(?:^|\s)\S/g, (a:string) => a.toUpperCase()) || 'Community Member'
                                        : liker.name;
                                    return {
                                        email,
                                        name,
                                        pic: picMap[email] || animatedAvatars[9], // Assign pic from map or a default
                                    };
                                });
                            }
                        }
                    });
                }
            });
            return posts as { [key: string]: Post[] };
        };
        
        return migratePosts(savedPosts);
    });
    const [activeTab, setActiveTab] = useState<string>(TABS[0]);
    const [selectedChapterIds, setSelectedChapterIds] = useState<{ [key: string]: number | undefined }>(() => {
        const initialIds: { [key: string]: number | undefined } = {};
        TABS.forEach(tab => {
            const firstUnlocked = initialChaptersData[tab as keyof typeof initialChaptersData]?.find(c => !c.locked);
            initialIds[tab] = firstUnlocked ? firstUnlocked.id : undefined;
        });
        return initialIds;
    });
    const [cachedChapterKeys, setCachedChapterKeys] = useState<string[]>(() => {
        const loaded = loadState('cachedChapterKeys', []);
        return Array.isArray(loaded) ? loaded : [];
    });
    const [activeHub, setActiveHub] = useState<'learning' | 'community'>('learning');
    
    // Modal states
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
    const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
    const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false);
    const [isDataAnalyticsModalOpen, setIsDataAnalyticsModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
    
    // AI Assistant Chat State
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', content: string }[]>([]);
    const [chatIsLoading, setChatIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY! }), []);

    // Search states
    const [homeLocationResults, setHomeLocationResults] = useState<LocationSearchResult[]>([]);
    const [isSearchingHomeLocation, setIsSearchingHomeLocation] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [searchHighlightQuery, setSearchHighlightQuery] = useState<string | null>(null);
    
    // Feature flags & other states
    const [googleSignInEnabled, setGoogleSignInEnabled] = useState<boolean>(() => loadState('googleSignInEnabled', true));
    const [aiFeaturesEnabled, setAiFeaturesEnabled] = useState<boolean>(() => loadState('aiFeaturesEnabled', true));
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => loadState('notificationsEnabled', false));
    const [notificationContent, setNotificationContent] = useState<string>(() => loadState('notificationContent', ''));
    const [date] = useState(new Date());

    // Effects
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        document.documentElement.classList.toggle('night-mode', isNightMode);
    }, [isDarkMode, isNightMode]);

    const isAppModalOpen = useMemo(() =>
        isSubscriptionModalOpen ||
        isContributionModalOpen ||
        isAdminLoginModalOpen ||
        isProfilePicModalOpen ||
        isDataAnalyticsModalOpen ||
        isEditProfileModalOpen ||
        isAssistantModalOpen,
      [
        isSubscriptionModalOpen,
        isContributionModalOpen,
        isAdminLoginModalOpen,
        isProfilePicModalOpen,
        isDataAnalyticsModalOpen,
        isEditProfileModalOpen,
        isAssistantModalOpen
      ]);

    // Effect to block background scroll when a modal is open
    useEffect(() => {
        if (isAppModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isAppModalOpen]);

    const checkGeolocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
                    setGeolocationPermissionGranted(true);
                    setGeolocationChecked(true);
                },
                () => {
                    setGeolocationPermissionGranted(false);
                    setGeolocationChecked(true); // Mark as checked even on error
                }
            );
        } else {
            setGeolocationPermissionGranted(false);
            setGeolocationChecked(true); // Geolocation not available
        }
    }, []);

    useEffect(() => {
        checkGeolocation();
    }, [checkGeolocation]);


    // Handlers
    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        saveState('isAuthenticated', false);
        saveState('isAdmin', false);
    };

    const handleCompleteOnboarding = () => {
        setHasCompletedOnboarding(true);
        saveState('hasCompletedOnboarding', true);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setSearchHighlightQuery(null);
    };
    
    const handleMarkAsComplete = (subject: string, chapterId: number) => {
        setChaptersData(prevData => {
            const newSubjectChapters = prevData[subject].map(chapter => {
                if (chapter.id === chapterId) {
                    return { ...chapter, progress: 100, quizUnlocked: true };
                }
                return chapter;
            });
            const newData = { ...prevData, [subject]: newSubjectChapters };
            saveState('chaptersData', newData);
            return newData;
        });
    };

    const handleQuizComplete = (subject: string, chapterId: number, score: number) => {
        setChaptersData(prevData => {
            let nextChapterUnlocked = false;
            const newSubjectChapters = prevData[subject].map((chapter, index) => {
                let updatedChapter = chapter;
                if (chapter.id === chapterId) {
                    updatedChapter = { ...chapter, quizCompleted: true, quizScore: score };
                    if (score >= 80 && index + 1 < prevData[subject].length) {
                        nextChapterUnlocked = true;
                    }
                }
                if (nextChapterUnlocked && index === prevData[subject].findIndex(c => c.id === chapterId) + 1) {
                    updatedChapter = { ...updatedChapter, locked: false };
                }
                return updatedChapter;
            });
            const newData = { ...prevData, [subject]: newSubjectChapters };
            saveState('chaptersData', newData);
            return newData;
        });
    };
    
    const handleHomeLocationSearch = async (query: string) => {
        if (!query) {
            setHomeLocationResults([]);
            return;
        }
        setIsSearchingHomeLocation(true);
        const results = await searchPlaces(query);
        setHomeLocationResults(results);
        setIsSearchingHomeLocation(false);
    };
    
    const handleSetHomeLocation = (location: LocationSearchResult) => {
        setHomeLocation(location);
        saveState('homeLocation', location);
        setHomeLocationResults([]);
    };
    
    const handleClearHomeLocation = () => {
        setHomeLocation(null);
        saveState('homeLocation', null);
    };
    
    const handleCreatePost = (subject: string, content: string) => {
        const newPost: Post = {
            id: Date.now().toString(),
            authorEmail: userProfile.email,
            authorName: userProfile.name,
            authorPic: profilePic,
            content,
            createdAt: new Date().toISOString(),
            editedAt: null,
            likes: 0,
            likedBy: [],
            comments: [],
            isBookmarked: false,
        };
        setPostsBySubject(prev => {
            const updatedSubjectPosts = [newPost, ...(prev[subject] || [])];
            const newState = { ...prev, [subject]: updatedSubjectPosts };
            saveState('postsBySubject', newState);
            return newState;
        });
    };

    const handleEditPost = (subject: string, postId: string, newContent: string) => {
        setPostsBySubject(prev => {
            const subjectPosts = prev[subject] || [];
            const updatedSubjectPosts = subjectPosts.map(post => {
                if (post.id === postId && post.authorEmail === userProfile.email) {
                    return { 
                        ...post, 
                        content: newContent,
                        editedAt: new Date().toISOString()
                    };
                }
                return post;
            });
            const newState = { ...prev, [subject]: updatedSubjectPosts };
            saveState('postsBySubject', newState);
            return newState;
        });
    };

    const handleDeletePost = (subject: string, postId: string) => {
        setPostsBySubject(prev => {
            const subjectPosts = prev[subject] || [];
            const updatedSubjectPosts = subjectPosts.filter(post => post.id !== postId);
            const newState = { ...prev, [subject]: updatedSubjectPosts };
            saveState('postsBySubject', newState);
            return newState;
        });
    };

    const handleToggleLike = (subject: string, postId: string) => {
        setPostsBySubject(prev => {
            const subjectPosts = prev[subject] || [];
            const updatedSubjectPosts = subjectPosts.map(post => {
                if (post.id === postId) {
                    const userEmail = userProfile.email;
                    const alreadyLiked = post.likedBy.some(liker => liker.email === userEmail);
                    if (alreadyLiked) {
                        return {
                            ...post,
                            likes: post.likes - 1,
                            likedBy: post.likedBy.filter(liker => liker.email !== userEmail),
                        };
                    } else {
                        const newLiker: Liker = { email: userProfile.email, name: userProfile.name, pic: profilePic };
                        return {
                            ...post,
                            likes: post.likes + 1,
                            likedBy: [...post.likedBy, newLiker],
                        };
                    }
                }
                return post;
            });
            const newState = { ...prev, [subject]: updatedSubjectPosts };
            saveState('postsBySubject', newState);
            return newState;
        });
    };

    const handleAddComment = (subject: string, postId: string, commentText: string) => {
        setPostsBySubject(prev => {
            const subjectPosts = prev[subject] || [];
            const updatedSubjectPosts = subjectPosts.map(post => {
                if (post.id === postId) {
                    const newComment: Comment = {
                        id: Date.now().toString(),
                        authorEmail: userProfile.email,
                        authorName: userProfile.name,
                        authorPic: profilePic,
                        content: commentText,
                        timestamp: new Date().toISOString(),
                        reactions: {
                            love: [],
                            laugh: [],
                        },
                    };
                    return {
                        ...post,
                        comments: [...post.comments, newComment],
                    };
                }
                return post;
            });
            const newState = { ...prev, [subject]: updatedSubjectPosts };
            saveState('postsBySubject', newState);
            return newState;
        });
    };

    const handleToggleCommentReaction = (subject: string, postId: string, commentId: string, reaction: CommentReactionType) => {
        setPostsBySubject(prev => {
            const subjectPosts = prev[subject] || [];
            const updatedSubjectPosts = subjectPosts.map(post => {
                if (post.id === postId) {
                    const updatedComments = post.comments.map(comment => {
                        if (comment.id === commentId) {
                            const userEmail = userProfile.email;
                            const newReactions = { ...(comment.reactions || { love: [], laugh: [] }) };

                            const alreadyReacted = newReactions[reaction]?.includes(userEmail);

                            if (alreadyReacted) {
                                newReactions[reaction] = newReactions[reaction]?.filter(email => email !== userEmail);
                            } else {
                                if (!newReactions[reaction]) {
                                    newReactions[reaction] = [];
                                }
                                newReactions[reaction]?.push(userEmail);
                            }
                            return { ...comment, reactions: newReactions };
                        }
                        return comment;
                    });
                    return { ...post, comments: updatedComments };
                }
                return post;
            });
            const newState = { ...prev, [subject]: updatedSubjectPosts };
            saveState('postsBySubject', newState);
            return newState;
        });
    };

    const handleDeleteComment = (subject: string, postId: string, commentId: string) => {
        setPostsBySubject(prev => {
            const subjectPosts = prev[subject] || [];
            const updatedSubjectPosts = subjectPosts.map(post => {
                if (post.id === postId) {
                    const updatedComments = post.comments.filter(comment => {
                        if (comment.id === commentId && comment.authorEmail === userProfile.email) {
                            return false;
                        }
                        return true;
                    });
                    return { ...post, comments: updatedComments };
                }
                return post;
            });
            const newState = { ...prev, [subject]: updatedSubjectPosts };
            saveState('postsBySubject', newState);
            return newState;
        });
    };

    const handleToggleBookmark = (subject: string, postId: string) => {
        setPostsBySubject(prev => {
            const subjectPosts = prev[subject] || [];
            const updatedSubjectPosts = subjectPosts.map(post => {
                if (post.id === postId) {
                    return { ...post, isBookmarked: !post.isBookmarked };
                }
                return post;
            });
            const newState = { ...prev, [subject]: updatedSubjectPosts };
            saveState('postsBySubject', newState);
            return newState;
        });
    };

    const handleApproveContribution = (id: string) => {
        const contributionToApprove = contributions.find(c => c.id === id);
        if (!contributionToApprove) {
            console.error("Contribution not found for approval.");
            return;
        }

        setChaptersData(prevData => {
            const { subject, chapterId, content, userName } = contributionToApprove;
            const subjectChapters = prevData[subject];
            if (!subjectChapters) return prevData;

            const newSubjectChapters = subjectChapters.map(chapter => {
                if (chapter.id === chapterId) {
                    const contributionHtml = `
<br />
<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
    <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Community Contribution by ${userName}</h3>
    <p class="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-300">${content}</p>
</div>
`;
                    if (chapter.tabbedContent && chapter.tabbedContent.length > 0) {
                        const newTabbedContent = [...chapter.tabbedContent];
                        newTabbedContent[0] = {
                            ...newTabbedContent[0],
                            content: newTabbedContent[0].content + contributionHtml
                        };
                        return { ...chapter, tabbedContent: newTabbedContent };
                    } else {
                        return { ...chapter, content: chapter.content + contributionHtml };
                    }
                }
                return chapter;
            });

            const newData = { ...prevData, [subject]: newSubjectChapters };
            saveState('chaptersData', newData);
            return newData;
        });

        setContributions(prev => {
            const updatedContributions = prev.filter(c => c.id !== id);
            saveState('contributions', updatedContributions);
            return updatedContributions;
        });

        const newRewardAmount = rewardAmount + 10;
        setRewardAmount(newRewardAmount);
        saveState('rewardAmount', newRewardAmount);
    };


    const handleRejectContribution = (id: string) => {
         setContributions(prev => {
            const updatedContributions = prev.filter(c => c.id !== id);
            saveState('contributions', updatedContributions);
            return updatedContributions;
        });
    };

    const handleSearch = (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const lowerCaseQuery = query.trim().toLowerCase();
        const results: SearchResult[] = [];
        
        Object.entries(chaptersData).forEach(([subject, chapters]) => {
            if (!Array.isArray(chapters)) return;
            chapters.forEach(chapter => {
                if (chapter.locked) return;

                const contentToSearch = [
                    { text: chapter.title, isTitle: true },
                    { text: chapter.content, isTitle: false },
                    ...(chapter.tabbedContent ? chapter.tabbedContent.map(tab => ({ text: tab.content, isTitle: false })) : [])
                ];
                
                contentToSearch.forEach(item => {
                    const textWithoutHtml = item.text.replace(/<[^>]*>?/gm, ' '); // simple html strip for searching
                    const matchIndex = textWithoutHtml.toLowerCase().indexOf(lowerCaseQuery);

                    if (matchIndex !== -1) {
                        const textBeforeMatch = textWithoutHtml.substring(0, matchIndex);
                        const startPunc = Math.max(
                            textBeforeMatch.lastIndexOf('.'),
                            textBeforeMatch.lastIndexOf('!'),
                            textBeforeMatch.lastIndexOf('?')
                        );
                        const sentenceStart = startPunc === -1 ? 0 : startPunc + 1;
                    
                        let endPunc = textWithoutHtml.indexOf('.', matchIndex);
                        if (endPunc === -1) endPunc = textWithoutHtml.length;
                    
                        let tempEndPunc = textWithoutHtml.indexOf('!', matchIndex);
                        if (tempEndPunc !== -1) endPunc = Math.min(endPunc, tempEndPunc);
                    
                        tempEndPunc = textWithoutHtml.indexOf('?', matchIndex);
                        if (tempEndPunc !== -1) endPunc = Math.min(endPunc, tempEndPunc);
                    
                        const sentenceEnd = endPunc === textWithoutHtml.length ? endPunc : endPunc + 1;
                    
                        const sentence = textWithoutHtml.substring(sentenceStart, sentenceEnd).trim();

                        const escapedQuery = lowerCaseQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const regex = new RegExp(escapedQuery, 'gi');
                        const highlightedSnippet = sentence.replace(regex, (match) => `<mark class="bg-yellow-200 dark:bg-amber-400/30 rounded px-1 py-0.5">${match}</mark>`);
                        
                        if (!results.some(r => r.subject === subject && r.chapterId === chapter.id)) {
                            results.push({
                                subject: subject,
                                chapterId: chapter.id,
                                chapterTitle: chapter.title,
                                contentSnippet: highlightedSnippet,
                            });
                        }
                    }
                });
            });
        });

        setSearchResults(results.slice(0, 10)); // Limit to 10 results
    };

    const handleSearchResultClick = (subject: string, chapterId: number, query: string) => {
        setActiveHub('learning');
        setActiveTab(subject);
        setSelectedChapterIds(prev => ({ ...prev, [subject]: chapterId }));
        setSearchHighlightQuery(query);
        setSearchResults([]); // Hide results after click
    };


    const assistantInfo = useMemo(() => {
        return animatedAssistants.find(a => a.svg === selectedAssistant) || animatedAssistants[0];
    }, [selectedAssistant]);

    const openAssistantModal = () => {
        const currentSubject = activeTab;
        const currentChapterId = selectedChapterIds[currentSubject];
        const currentChapter = chaptersData[currentSubject]?.find(c => c.id === currentChapterId);

        let context = "The user is currently not viewing any specific topic.";
        if (activeHub === 'learning' && currentChapter) {
            const chapterContent = currentChapter.tabbedContent ? currentChapter.tabbedContent.map(t => t.content).join('\n') : currentChapter.content;
            context = `The user is currently viewing the chapter titled "${currentChapter.title}" in the "${currentSubject}" subject. Here is the content of the chapter: ${chapterContent}`;
        } else if (activeHub === 'community') {
            context = `The user is currently viewing the community hub for the "${currentSubject}" subject.`;
        }

        const systemInstruction = `You are "${assistantInfo.id}", a friendly, encouraging, and knowledgeable personal AI assistant for the "Canvas Play" educational app. Your goal is to help users with all their questions and doubts. Be proactive, concise, and use a conversational tone. Never break character. Current context: ${context}`;
        
        if (aiFeaturesEnabled) {
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction,
                },
            });

            setChatHistory([
                { role: 'model', content: `Hi! I'm ${assistantInfo.id}, your personal assistant for all your questions and doubts. How can I help you today?` }
            ]);
            setIsAssistantModalOpen(true);
        } else {
            alert("AI features are currently disabled by the administrator.");
        }
    };

    const closeAssistantModal = () => {
        setIsAssistantModalOpen(false);
        setChatHistory([]);
        chatRef.current = null;
    };

    const handleSendMessage = async (message: string) => {
        if (!chatRef.current || chatIsLoading) return;

        setChatIsLoading(true);
        const updatedHistory = [...chatHistory, { role: 'user' as const, content: message }];
        setChatHistory(updatedHistory);

        try {
            const responseStream = await chatRef.current.sendMessageStream({ message });
            
            let currentResponse = '';
            setChatHistory(prev => [...prev, { role: 'model' as const, content: '' }]);

            for await (const chunk of responseStream) {
                currentResponse += chunk.text;
                setChatHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] = { role: 'model', content: currentResponse };
                    return newHistory;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setChatHistory(prev => [...prev, { role: 'model' as const, content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setChatIsLoading(false);
        }
    };

    const hubBgColor = useMemo(() => {
        if (isNightMode) {
            return 'bg-zinc-100 dark:bg-zinc-950';
        }
        switch (activeHub) {
            case 'learning':
                return 'bg-green-50 dark:bg-green-950/30';
            case 'community':
                return 'bg-red-50 dark:bg-red-950/30';
            default:
                return 'bg-zinc-100 dark:bg-zinc-950';
        }
    }, [activeHub, isNightMode]);

    // Render logic
    if (!storagePermissionGranted) {
        return <StoragePermissionPage onAllow={() => { setStoragePermissionGranted(true); saveState('storagePermissionGranted', true); }} />;
    }

    if (!geolocationChecked) {
        return <GeolocationPermissionPage onAllow={checkGeolocation} />;
    }

    if (!hasCompletedNotificationPrompt) {
        return <NotificationPermissionPage onComplete={(granted) => {
            setNotificationsEnabled(granted);
            saveState('notificationsEnabled', granted);
            setHasCompletedNotificationPrompt(true);
            saveState('hasCompletedNotificationPrompt', true);
        }} />;
    }

    if (!isAuthenticated) {
        return <AuthPage
            onGoogleLogin={(profile) => {
                setUserProfile({ ...userProfile, name: profile.name, email: profile.email, picture: profile.picture });
                setIsAuthenticated(true);
                saveState('isAuthenticated', true);
            }}
            onCredentialsLogin={async () => { setIsAuthenticated(true); saveState('isAuthenticated', true); return true; }}
            onCreateAccount={async () => { setIsAuthenticated(true); saveState('isAuthenticated', true); return true; }}
            googleSignInEnabled={googleSignInEnabled}
        />;
    }

    if (!hasCompletedOnboarding) {
        return <WelcomePage onComplete={handleCompleteOnboarding} />;
    }

    const renderActiveTabPage = () => {
        const subject = activeTab;
        const props = {
            chapters: Array.isArray(chaptersData[subject]) ? chaptersData[subject] : [],
            cachedChapterKeys,
            selectedChapterId: selectedChapterIds[subject],
            onSelectChapter: (chapterId: number) => {
                setSelectedChapterIds(prev => ({ ...prev, [subject]: chapterId }));
                setSearchHighlightQuery(null);
            },
            toggleChapterCache: (subject: string, chapterId: number) => {
                const key = `cached-chapter-${subject}-${chapterId}`;
                setCachedChapterKeys(prev => {
                    const newKeys = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key];
                    saveState('cachedChapterKeys', newKeys);
                    return newKeys;
                });
            },
            isSubscribed,
            onMarkAsComplete: handleMarkAsComplete,
            onQuizComplete: handleQuizComplete,
            isAdmin,
            onNavigateToAdmin: () => {
                setActiveHub('learning');
                setActiveTab('Admin');
            },
            aiFeaturesEnabled,
            searchHighlightQuery,
        };
        switch (activeTab) {
            case 'History': return <HistoryPage subject="History" {...props} />;
            case 'Geography': return <GeographyPage subject="Geography" {...props} />;
            case 'Science': return <SciencePage subject="Science" {...props} />;
            case 'Current Affairs': return <CurrentAffairsPage subject="Current Affairs" {...props} />;
            case 'G.K': return <GkPage subject="G.K" {...props} />;
            case 'Admin': return <AdminPage 
                contributions={contributions} 
                onApprove={handleApproveContribution} 
                onReject={handleRejectContribution}
                allChaptersData={chaptersData}
                onChapterDataUpload={async () => {}}
                googleSignInEnabled={googleSignInEnabled}
                onToggleGoogleSignIn={() => setGoogleSignInEnabled(p => !p)}
                aiFeaturesEnabled={aiFeaturesEnabled}
                onToggleAiFeatures={() => setAiFeaturesEnabled(p => !p)}
                onLogout={handleLogout}
                notificationContent={notificationContent}
                onSaveNotificationContent={(content) => { setNotificationContent(content); saveState('notificationContent', content); }}
             />;
            default: return null;
        }
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} ${isNightMode ? 'night-mode' : ''}`}>
            <div className={`${hubBgColor} text-zinc-800 dark:text-zinc-200 min-h-screen transition-colors duration-300 flex flex-col`}>
                <header className="sticky top-0 z-40 bg-zinc-100/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors duration-300">
                    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8 pb-4">
                        <Header
                            isSubscribed={isSubscribed}
                            onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
                            onOpenContributionModal={() => setIsContributionModalOpen(true)}
                            onOpenProfilePicModal={() => setIsProfilePicModalOpen(true)}
                            isDarkMode={isDarkMode}
                            onToggleDarkMode={() => { setIsDarkMode(p => !p); saveState('isDarkMode', !isDarkMode); }}
                            isNightMode={isNightMode}
                            onToggleNightMode={() => { setIsNightMode(p => !p); saveState('isNightMode', !isNightMode); }}
                            onLogout={handleLogout}
                            subscriptionDate={subscriptionDate}
                            profilePic={profilePic}
                            wallpaper={wallpaper}
                            onSetWallpaper={(svg) => { setWallpaper(svg); saveState('wallpaper', svg); }}
                            isAdmin={isAdmin}
                            onAdminLoginRequest={() => setIsAdminLoginModalOpen(true)}
                            onNavigateToAdmin={() => { setActiveHub('learning'); setActiveTab('Admin'); }}
                            userProfile={userProfile}
                            onOpenDataAnalyticsModal={() => setIsDataAnalyticsModalOpen(true)}
                            onOpenEditProfileModal={() => setIsEditProfileModalOpen(true)}
                            date={date}
                            location={location}
                            notificationsEnabled={notificationsEnabled}
                            onToggleNotificationsEnabled={() => { setNotificationsEnabled(p => !p); saveState('notificationsEnabled', !notificationsEnabled); }}
                            homeLocation={homeLocation}
                            onHomeLocationSearch={handleHomeLocationSearch}
                            homeLocationResults={homeLocationResults}
                            isSearchingHomeLocation={isSearchingHomeLocation}
                            onSetHomeLocation={handleSetHomeLocation}
                            onClearHomeLocation={handleClearHomeLocation}
                            selectedAssistant={selectedAssistant}
                            onSetAssistant={(svg) => { setSelectedAssistant(svg); saveState('selectedAssistant', svg); }}
                            onOpenAssistantModal={openAssistantModal}
                            activeHub={activeHub}
                            onHubChange={setActiveHub}
                        />
                    </div>
                </header>

                <main className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 flex-1">
                     <NewsFlash date={date} userProfile={userProfile} aiFeaturesEnabled={aiFeaturesEnabled} />
                     
                    {activeHub === 'learning' ? (
                        <div className="animate-fade-in">
                            <div className="mt-6">
                                <Tabs
                                    tabs={TABS}
                                    activeTab={activeTab}
                                    onTabChange={handleTabChange}
                                    isSubscribed={isSubscribed}
                                    isAdmin={isAdmin}
                                />
                            </div>
                            <div className="mt-6">
                                {renderActiveTabPage()}
                            </div>
                        </div>
                    ) : (
                        <CommunityHubPage
                            tabs={TABS}
                            isSubscribed={isSubscribed}
                            postsBySubject={postsBySubject}
                            userProfile={userProfile}
                            profilePic={profilePic}
                            onCreatePost={handleCreatePost}
                            onToggleLike={handleToggleLike}
                            onAddComment={handleAddComment}
                            onToggleBookmark={handleToggleBookmark}
                            onEditPost={handleEditPost}
                            onDeletePost={handleDeletePost}
                            onDeleteComment={handleDeleteComment}
                            onToggleCommentReaction={handleToggleCommentReaction}
                            rewardAmount={rewardAmount}
                        />
                    )}
                </main>
                <Footer />
                
                {activeHub === 'learning' && (
                    <SearchBar 
                        onSearch={handleSearch} 
                        results={searchResults} 
                        onResultClick={handleSearchResultClick} 
                    />
                )}

                {/* Modals */}
                <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setIsSubscriptionModalOpen(false)} onUpgrade={() => { setIsSubscribed(true); setSubscriptionDate(new Date()); saveState('isSubscribed', true); saveState('subscriptionDate', new Date().toISOString()); setIsSubscriptionModalOpen(false); }} onOpenContributionModal={() => { setIsSubscriptionModalOpen(false); setIsContributionModalOpen(true); }} />
                <ContributionModal isOpen={isContributionModalOpen} onClose={() => setIsContributionModalOpen(false)} onSubmit={(c) => { const newContribution = { ...c, id: Date.now().toString(), userName: userProfile.name }; setContributions(p => [...p, newContribution]); saveState('contributions', [...contributions, newContribution]); }} allChapters={chaptersData} />
                <AdminLoginModal isOpen={isAdminLoginModalOpen} onClose={() => setIsAdminLoginModalOpen(false)} onSuccess={() => { setIsAdmin(true); saveState('isAdmin', true); setIsAdminLoginModalOpen(false); setActiveHub('learning'); setActiveTab('Admin'); }} />
                <ProfilePicModal isOpen={isProfilePicModalOpen} onClose={() => setIsProfilePicModalOpen(false)} onSave={(pic) => { setProfilePic(pic); saveState('profilePic', pic); }} currentPic={profilePic} />
                <DataAnalyticsModal isOpen={isDataAnalyticsModalOpen} onClose={() => setIsDataAnalyticsModalOpen(false)} data={initialAnalyticsData} />
                <EditProfileModal isOpen={isEditProfileModalOpen} onClose={() => setIsEditProfileModalOpen(false)} onSave={(p) => { setUserProfile(p); saveState('userProfile', p); setIsEditProfileModalOpen(false); }} userProfile={userProfile} />
                <AssistantModal 
                    isOpen={isAssistantModalOpen}
                    onClose={closeAssistantModal}
                    history={chatHistory}
                    onSendMessage={handleSendMessage}
                    isLoading={chatIsLoading}
                    selectedAssistant={selectedAssistant}
                    assistantName={assistantInfo.id}
                />
            </div>
        </div>
    );
}