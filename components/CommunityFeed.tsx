/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import type { Post, UserAccount, CommentReactionType } from './types.ts';
import CreatePost from './CreatePost.tsx';
import PostCard from './PostCard.tsx';
import Rewards from './Rewards.tsx';

export type SortOrder = 'recent' | 'liked' | 'commented' | 'bookmarked';

const SortIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
);

const ChevronDownIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

interface CommunityFeedProps {
  subject: string;
  posts: Post[];
  userProfile: UserAccount;
  profilePic: string | null;
  onCreatePost: (content: string) => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onToggleBookmark: (postId: string) => void;
  onEditPost: (postId: string, newContent: string) => void;
  onDeletePost: (postId: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
  onToggleCommentReaction: (postId: string, commentId: string, reaction: CommentReactionType) => void;
  rewardAmount: number;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

const CommunityFeed: React.FC<CommunityFeedProps> = (props) => {
  const { 
      subject, posts, userProfile, profilePic, onCreatePost, onToggleLike, onAddComment, 
      onToggleBookmark, onEditPost, onDeletePost, onDeleteComment, onToggleCommentReaction, 
      rewardAmount, sortOrder, onSortChange 
  } = props;

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions: { key: SortOrder; label: string }[] = [
    { key: 'recent', label: 'Most Recent' },
    { key: 'liked', label: 'Most Liked' },
    { key: 'commented', label: 'Most Commented' },
    { key: 'bookmarked', label: 'Bookmarked' },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.key === sortOrder)?.label;

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex flex-row items-center justify-between gap-4 border-b-2 border-blue-500 pb-2">
            <h2 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">
              {subject} Community
            </h2>
            <div>
                <Rewards rewardAmount={rewardAmount} />
            </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Discuss topics, ask questions, and share insights with fellow learners.
          </p>
        </div>
      </div>

      <CreatePost 
        profilePic={profilePic} 
        onCreatePost={onCreatePost} 
      />

      <div className="flex justify-end my-4">
        <div className="relative flex-shrink-0" ref={sortRef}>
            <button
                onClick={() => setIsSortOpen(p => !p)}
                className="flex w-48 items-center justify-between text-left text-sm font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
                <div className="flex items-center gap-2">
                    <SortIcon />
                    <span>{currentSortLabel}</span>
                </div>
                <ChevronDownIcon isOpen={isSortOpen} />
            </button>
            {isSortOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 z-10 animate-fade-in">
                    <ul className="py-1">
                        {sortOptions.map(option => (
                            <li key={option.key}>
                                <button
                                    onClick={() => { onSortChange(option.key); setIsSortOpen(false); }}
                                    className={`w-full text-left px-4 py-2 text-sm ${sortOrder === option.key ? 'font-semibold text-blue-600 dark:text-blue-400' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            userProfile={userProfile}
            profilePic={profilePic}
            onToggleLike={() => onToggleLike(post.id)}
            onAddComment={(commentText) => onAddComment(post.id, commentText)}
            onToggleBookmark={() => onToggleBookmark(post.id)}
            onEditPost={(newContent) => onEditPost(post.id, newContent)}
            onDeletePost={() => onDeletePost(post.id)}
            onDeleteComment={(commentId) => onDeleteComment(post.id, commentId)}
            onToggleCommentReaction={(commentId, reaction) => onToggleCommentReaction(post.id, commentId, reaction)}
          />
        ))}
        {posts.length === 0 && (
          <div className="text-center py-16 px-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
            <p className="text-zinc-500 dark:text-zinc-400">
                {sortOrder === 'bookmarked' ? 'You have no bookmarked posts in this section.' : 'No posts yet. Be the first to start a conversation!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;