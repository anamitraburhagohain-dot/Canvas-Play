/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { Post, Comment, UserAccount, CommentReactionType, Liker } from './types.ts';

// --- Confirmation Modal Component ---
// Defined locally to encapsulate the logic within this file.
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const CloseIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
  );

  const WarningIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl shadow-2xl w-full max-w-md p-6 relative transform transition-all"
        onClick={handleModalContentClick}
        role="document"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors z-20"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        <div className="text-center">
            <WarningIcon />
            <h2 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100 mt-4">{title}</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                {message}
            </p>
        </div>
        
        <div className="mt-6 pt-4 flex justify-center gap-4">
            <button 
                onClick={onClose} 
                className="w-full sm:w-auto bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-semibold py-2 px-6 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-600"
            >
                Cancel
            </button>
            <button 
                onClick={handleConfirm} 
                className="w-full sm:w-auto bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md"
            >
                Confirm
            </button>
        </div>
      </div>
    </div>
  );
};


// Icons
const LikeIcon: React.FC<{ isReacted: boolean; className?: string }> = ({ isReacted, className = '' }) => {
    const commonClasses = `h-5 w-5 ${className} transition-colors duration-200`;
    const reactedClasses = 'text-blue-600 dark:text-blue-500';
    const defaultClasses = 'text-zinc-500 dark:text-zinc-400 group-hover:text-blue-500';

    return isReacted ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} ${reactedClasses}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} ${defaultClasses}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1V9z"/>
        </svg>
    );
};

const LoveIcon: React.FC<{ isReacted: boolean }> = ({ isReacted }) => {
    const commonClasses = 'h-5 w-5';
    const reactedClasses = 'text-red-500';
    const defaultClasses = 'text-zinc-500 dark:text-zinc-400 group-hover:text-red-500';
    // Fresh path from Heroicons v2 with explicit closing 'Z'
    const path = "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z";
    
    if (isReacted) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} ${reactedClasses}`} viewBox="0 0 24 24" fill="currentColor">
                <path d={path} />
            </svg>
        );
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} ${defaultClasses}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d={path} />
        </svg>
    );
};

const LaughIcon: React.FC<{ isReacted: boolean }> = ({ isReacted }) => {
    const commonClasses = 'h-5 w-5';
    const reactedClasses = 'text-yellow-500';
    const defaultClasses = 'text-zinc-500 dark:text-zinc-400 group-hover:text-yellow-500';
    
    if (isReacted) {
        // Correct solid path from Heroicons v2 (face-smile/24/solid)
        const solidPath = "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.975.435-.975.975v.008c0 .54.435.975.975.975h.008c.54 0 .975-.435.975-.975v-.008c0-.54-.435-.975-.975-.975H9.375Zm5.25 0c-.54 0-.975.435-.975.975v.008c0 .54.435.975.975.975h.008c.54 0 .975-.435.975-.975v-.008c0-.54-.435-.975-.975-.975h-.008ZM12 15a3.75 3.75 0 0 0 3.125-1.554.75.75 0 0 1 1.292.746 5.25 5.25 0 0 1-8.834 0 .75.75 0 0 1 1.292-.746A3.75 3.75 0 0 0 12 15Z";
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} ${reactedClasses}`} viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d={solidPath} clipRule="evenodd" />
            </svg>
        );
    }

    // Correct outline paths from Heroicons v2 (face-smile/24/outline)
    const outlinePath1 = "M14.828 14.828a4.5 4.5 0 0 1-6.364 0M9 10.5h.008v.008H9v-.008Zm6 0h.008v.008h-.008v-.008Z";
    const outlinePath2 = "M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z";
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} ${defaultClasses}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d={outlinePath1} />
            <path strokeLinecap="round" strokeLinejoin="round" d={outlinePath2} />
        </svg>
    );
};


const CommentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
    </svg>
);
const BookmarkIcon: React.FC<{ isBookmarked: boolean }> = ({ isBookmarked }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" 
        className={isBookmarked ? 'text-blue-600 dark:text-blue-500' : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200'} />
    </svg>
);
const OptionsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
);

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-0.5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

interface PostCardProps {
  post: Post;
  userProfile: UserAccount;
  profilePic: string | null;
  onToggleLike: () => void;
  onAddComment: (commentText: string) => void;
  onToggleBookmark: () => void;
  onEditPost: (newContent: string) => void;
  onDeletePost: () => void;
  onDeleteComment: (commentId: string) => void;
  onToggleCommentReaction: (commentId: string, reaction: CommentReactionType) => void;
}

const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
};

const PostCard: React.FC<PostCardProps> = ({ post, userProfile, profilePic, onToggleLike, onAddComment, onToggleBookmark, onEditPost, onDeletePost, onDeleteComment, onToggleCommentReaction }) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [openCommentOptions, setOpenCommentOptions] = useState<string | null>(null);
    const [isDeletePostConfirmOpen, setIsDeletePostConfirmOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
    const [areAllCommentsVisible, setAreAllCommentsVisible] = useState(false);
    const [isLikesPopupOpen, setIsLikesPopupOpen] = useState(false);
    const [animateLike, setAnimateLike] = useState(false);
    const INITIAL_COMMENTS_TO_SHOW = 2;

    const [optimisticPost, setOptimisticPost] = useState<Post>(post);
    
    useEffect(() => {
        setOptimisticPost(post);
    }, [post]);

    const isConfirmationModalOpen = useMemo(() => isDeletePostConfirmOpen || !!commentToDelete, [isDeletePostConfirmOpen, commentToDelete]);

    useEffect(() => {
        if (isConfirmationModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isConfirmationModalOpen]);

    const commentInputRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const commentOptionsRef = useRef<HTMLDivElement>(null);
    const likesPopupRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const commentsEndRef = useRef<HTMLDivElement>(null);
    const postCardRef = useRef<HTMLDivElement>(null);

    const sortedComments = useMemo(() => {
        return [...optimisticPost.comments].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }, [optimisticPost.comments]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                setIsOptionsOpen(false);
            }
            if (commentOptionsRef.current && !commentOptionsRef.current.contains(event.target as Node)) {
                setOpenCommentOptions(null);
            }
            if (likesPopupRef.current && !likesPopupRef.current.contains(event.target as Node)) {
                setIsLikesPopupOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            textareaRef.current.focus();
        }
    }, [isEditing, editedContent]);
    
    useEffect(() => {
        if (showComments && commentsEndRef.current) {
            setTimeout(() => {
                commentsEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [optimisticPost.comments.length, showComments]);

    const getProfilePicSrc = (picData: string | null) => {
        if (!picData) return '';
        if (picData.startsWith('<svg')) return `data:image/svg+xml;base64,${btoa(picData)}`;
        return picData;
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };
    
    const handleToggleLikeClick = () => {
        setOptimisticPost(currentPost => {
            const alreadyLiked = currentPost.likedBy.some(liker => liker.email === userProfile.email);
            if (alreadyLiked) {
                return {
                    ...currentPost,
                    likes: currentPost.likes - 1,
                    likedBy: currentPost.likedBy.filter(liker => liker.email !== userProfile.email),
                };
            } else {
                const newLiker: Liker = { email: userProfile.email, name: userProfile.name, pic: profilePic };
                return {
                    ...currentPost,
                    likes: currentPost.likes + 1,
                    likedBy: [...currentPost.likedBy, newLiker],
                };
            }
        });
        onToggleLike();
        setAnimateLike(true);
        setTimeout(() => setAnimateLike(false), 300);
    };

    const handleToggleCommentReaction = (commentId: string, reaction: CommentReactionType) => {
        setOptimisticPost(currentPost => {
            const updatedComments = currentPost.comments.map(comment => {
                if (comment.id === commentId) {
                    const userEmail = userProfile.email;
                    const currentReactions = comment.reactions || { love: [], laugh: [] };
                    const users = currentReactions[reaction] || [];
                    const alreadyReacted = users.includes(userEmail);

                    const newUsers = alreadyReacted
                        ? users.filter(email => email !== userEmail)
                        : [...users, userEmail];
                    
                    const newReactions = {
                        ...currentReactions,
                        [reaction]: newUsers,
                    };

                    return { ...comment, reactions: newReactions };
                }
                return comment;
            });
            return { ...currentPost, comments: updatedComments };
        });
        onToggleCommentReaction(commentId, reaction);
    };

    const handleToggleComments = () => {
        const newShowState = !showComments;
        if (!newShowState) {
            setAreAllCommentsVisible(false);
        }
        setShowComments(newShowState);
        if (newShowState) {
            setTimeout(() => commentInputRef.current?.focus(), 100);
        }
    };

    const handleEdit = () => {
        setIsOptionsOpen(false);
        setIsEditing(true);
        setEditedContent(optimisticPost.content);
    };

    const handleDeletePostRequest = () => {
        setIsOptionsOpen(false);
        setIsDeletePostConfirmOpen(true);
    };

    const confirmPostDelete = () => {
        onDeletePost();
    };

    const handleDeleteCommentRequest = (commentId: string) => {
        setOpenCommentOptions(null);
        setCommentToDelete(commentId);
    };

    const confirmCommentDelete = () => {
        if (commentToDelete) {
            onDeleteComment(commentToDelete);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(optimisticPost.content);
    };

    const handleSaveEdit = () => {
        if (editedContent.trim() && editedContent.trim() !== optimisticPost.content) {
            onEditPost(editedContent.trim());
        }
        setIsEditing(false);
    };

    const handleCommentFocus = () => {
        setTimeout(() => {
            commentInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    };

    const isAuthor = userProfile.email === optimisticPost.authorEmail;
    const userHasLiked = optimisticPost.likedBy.some(liker => liker.email === userProfile.email);
    const commentsToShow = areAllCommentsVisible ? sortedComments : sortedComments.slice(-INITIAL_COMMENTS_TO_SHOW);

    return (
        <div ref={postCardRef} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800">
            <div className="p-4">
                {/* Post Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-3 min-w-0">
                        <img src={getProfilePicSrc(optimisticPost.authorPic)} alt={optimisticPost.authorName} className="w-10 h-10 rounded-full object-cover bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
                        <div className="min-w-0">
                            <p className="font-bold text-sm text-zinc-800 dark:text-zinc-100 truncate">{optimisticPost.authorName}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {timeAgo(optimisticPost.createdAt)} ago {optimisticPost.editedAt && <span className="italic">(edited)</span>}
                            </p>
                        </div>
                    </div>
                    <div className="relative flex-shrink-0" ref={optionsRef}>
                        <button onClick={() => setIsOptionsOpen(p => !p)} className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                            <OptionsIcon />
                        </button>
                        {isOptionsOpen && (
                            <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 z-10 animate-fade-in">
                                <button
                                    onClick={handleEdit}
                                    disabled={!isAuthor}
                                    className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 enabled:hover:bg-zinc-100 dark:enabled:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title={!isAuthor ? "You can only edit your own posts." : ""}
                                >
                                    Edit Post
                                </button>
                                <button
                                    onClick={handleDeletePostRequest}
                                    disabled={!isAuthor}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 enabled:hover:bg-red-50 dark:enabled:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title={!isAuthor ? "You can only delete your own posts." : ""}
                                >
                                    Delete Post
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Post Body */}
                <div className="mt-4">
                    {isEditing ? (
                        <textarea
                            ref={textareaRef}
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden text-zinc-600 dark:text-zinc-300"
                        />
                    ) : (
                        <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">{optimisticPost.content}</p>
                    )}
                </div>

                {!isEditing && (
                    <div className="mt-4 flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                        {optimisticPost.likes > 0 && (
                            <div className="relative" ref={likesPopupRef}>
                                <button
                                    onClick={() => setIsLikesPopupOpen(p => !p)}
                                    className="hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm"
                                >
                                    {optimisticPost.likes} {optimisticPost.likes === 1 ? 'Like' : 'Likes'}
                                </button>
                                {isLikesPopupOpen && (
                                    <div className="absolute bottom-full mb-2 w-60 bg-white dark:bg-zinc-800 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-700 z-10 animate-fade-in">
                                        <div className="p-2 border-b border-zinc-200 dark:border-zinc-700">
                                            <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-100">Liked by</h4>
                                        </div>
                                        <ul className="max-h-40 overflow-y-auto force-scrollbar p-2">
                                            {optimisticPost.likedBy.map(liker => (
                                                <li key={liker.email} className="py-1.5 px-2 text-zinc-700 dark:text-zinc-200 text-sm flex items-center gap-2">
                                                    <img src={getProfilePicSrc(liker.pic)} alt={liker.name} className="w-6 h-6 rounded-full object-cover bg-zinc-200 dark:bg-zinc-700"/>
                                                    <span>{liker.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                        {optimisticPost.likes > 0 && optimisticPost.comments.length > 0 && (
                            <span className="mx-2 font-bold">&middot;</span>
                        )}
                        {optimisticPost.comments.length > 0 && (
                            <button onClick={handleToggleComments} className="hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm">
                                {optimisticPost.comments.length} {optimisticPost.comments.length === 1 ? 'Comment' : 'Comments'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {isEditing ? (
                 <div className="border-t border-zinc-200 dark:border-zinc-800 p-2 flex justify-end gap-2">
                    <button onClick={handleCancelEdit} className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold py-2 px-4 rounded-full text-sm hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSaveEdit} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors">
                        Save Changes
                    </button>
                 </div>
            ) : (
                <>
                    {/* Actions */}
                    <div className="border-t border-zinc-200 dark:border-zinc-800 flex justify-around">
                        <button onClick={handleToggleLikeClick} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold group transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95">
                            <LikeIcon isReacted={userHasLiked} className={animateLike ? 'animate-like' : ''} />
                            <span className={`transition-colors duration-200 ${userHasLiked ? 'text-blue-600 dark:text-blue-500' : 'text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-100'}`}>Like</span>
                        </button>
                         <button onClick={handleToggleComments} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold group transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95">
                            <CommentIcon />
                            <span className="text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-100">Comment</span>
                        </button>
                        <button onClick={onToggleBookmark} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold group transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95">
                            <BookmarkIcon isBookmarked={optimisticPost.isBookmarked} />
                            <span className={optimisticPost.isBookmarked ? 'text-blue-600 dark:text-blue-500' : 'text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-100'}>Bookmark</span>
                        </button>
                    </div>

                    {/* Comment Section */}
                    {showComments && (
                        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
                            {sortedComments.length > INITIAL_COMMENTS_TO_SHOW && !areAllCommentsVisible && (
                                <button 
                                    onClick={() => setAreAllCommentsVisible(true)}
                                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-4"
                                >
                                    View all {sortedComments.length} comments
                                </button>
                            )}

                            <div className={`space-y-4 ${areAllCommentsVisible ? 'max-h-80 overflow-y-auto pr-2 force-scrollbar' : ''}`}>
                                {commentsToShow.map(comment => {
                                    const isCommentAuthor = comment.authorEmail === userProfile.email;
                                    const reactions = comment.reactions || { love: [], laugh: [] };
                                    const hasUserLoved = reactions.love?.includes(userProfile.email);
                                    const hasUserLaughed = reactions.laugh?.includes(userProfile.email);
                                    const loveCount = reactions.love?.length ?? 0;
                                    const laughCount = reactions.laugh?.length ?? 0;

                                    return (
                                    <div key={comment.id} className="flex items-start space-x-3">
                                        <img src={getProfilePicSrc(comment.authorPic)} alt={comment.authorName} className="w-8 h-8 rounded-full object-cover bg-zinc-200 dark:bg-zinc-700" />
                                        <div className="flex-grow bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg flex items-start justify-between gap-2">
                                            <div className="flex-grow">
                                                <p className="font-bold text-xs text-zinc-800 dark:text-zinc-100">{comment.authorName}</p>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-300">{comment.content}</p>
                                            </div>
                                            <div className="flex-shrink-0 flex items-center gap-2 pt-1 text-zinc-500 dark:text-zinc-400">
                                                <button onClick={() => handleToggleCommentReaction(comment.id, 'love')} className="flex items-center gap-1 group p-1 -m-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                                    <LoveIcon isReacted={!!hasUserLoved} />
                                                    {loveCount > 0 && <span className="text-xs">{loveCount}</span>}
                                                </button>
                                                <button onClick={() => handleToggleCommentReaction(comment.id, 'laugh')} className="flex items-center gap-1 group p-1 -m-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                                    <LaughIcon isReacted={!!hasUserLaughed} />
                                                    {laughCount > 0 && <span className="text-xs">{laughCount}</span>}
                                                </button>
                                                {isCommentAuthor && (
                                                    <div className="relative">
                                                        <button onClick={() => setOpenCommentOptions(openCommentOptions === comment.id ? null : comment.id)} className="p-1 -m-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                                            <OptionsIcon />
                                                        </button>
                                                        {openCommentOptions === comment.id && (
                                                            <div ref={commentOptionsRef} className="absolute top-full right-0 mt-2 w-28 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 z-10 animate-fade-in">
                                                                <button
                                                                    onClick={() => handleDeleteCommentRequest(comment.id)}
                                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )})}
                            </div>
                            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-3 pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-700">
                                <img src={getProfilePicSrc(profilePic)} alt="Your profile" className="w-8 h-8 rounded-full object-cover bg-zinc-200 dark:bg-zinc-700" />
                                <div className="relative flex-grow">
                                    <input
                                        ref={commentInputRef}
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onFocus={handleCommentFocus}
                                        placeholder="Write a comment..."
                                        className="w-full bg-zinc-100 dark:bg-zinc-800 px-4 pr-12 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400"
                                    />
                                    {newComment.trim() && (
                                        <button
                                            type="submit"
                                            className="absolute inset-y-0 right-1.5 my-auto flex items-center justify-center h-7 w-7 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-sm disabled:bg-zinc-400 dark:disabled:bg-zinc-600"
                                            aria-label="Send comment"
                                        >
                                            <SendIcon />
                                        </button>
                                    )}
                                </div>
                            </form>
                            <div ref={commentsEndRef} />
                        </div>
                    )}
                </>
            )}
            <ConfirmationModal
                isOpen={isDeletePostConfirmOpen}
                onClose={() => setIsDeletePostConfirmOpen(false)}
                onConfirm={confirmPostDelete}
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
            />
            <ConfirmationModal
                isOpen={!!commentToDelete}
                onClose={() => setCommentToDelete(null)}
                onConfirm={confirmCommentDelete}
                title="Delete Comment"
                message="Are you sure you want to delete this comment? This action is permanent."
            />
        </div>
    );
};

export default PostCard;
