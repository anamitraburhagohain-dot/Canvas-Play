/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';

interface CreatePostProps {
  profilePic: string | null;
  onCreatePost: (content: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ profilePic, onCreatePost }) => {
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-resize textarea
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content.trim());
      setContent('');
    }
  };

  const handleFocus = () => {
    // Scroll the component into view to ensure it's visible above mobile keyboards.
    setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const getProfilePicSrc = (picData: string | null) => {
    if (!picData) return '';
    if (picData.startsWith('<svg')) return `data:image/svg+xml;base64,${btoa(picData)}`;
    return picData;
  };

  return (
    <div ref={containerRef} className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800">
      <form onSubmit={handleSubmit} className="flex items-start space-x-4">
        <img 
          src={getProfilePicSrc(profilePic)} 
          alt="Your profile" 
          className="w-10 h-10 rounded-full flex-shrink-0 object-cover bg-zinc-200 dark:bg-zinc-700"
        />
        <div className="flex-grow">
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleFocus}
            placeholder="What's on your mind?"
            className="w-full bg-transparent focus:outline-none resize-none overflow-hidden text-zinc-600 dark:text-zinc-300 placeholder-zinc-500 dark:placeholder-zinc-400"
            rows={2}
          />
          <div className="flex justify-end items-center mt-2">
            <button
              type="submit"
              disabled={!content.trim()}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full text-sm hover:bg-blue-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:cursor-not-allowed transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;