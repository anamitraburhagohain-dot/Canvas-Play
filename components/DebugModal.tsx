/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';

// Icons
const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);
const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);


interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: { role: 'user' | 'model', content: string }[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  selectedAssistant: string;
  assistantName: string;
}

const AssistantAvatar: React.FC<{ assistantSvg: string }> = ({ assistantSvg }) => (
    <div className="w-8 h-8 rounded-full bg-zinc-700 flex-shrink-0 overflow-hidden">
        <img src={`data:image/svg+xml;base64,${btoa(assistantSvg)}`} alt="AI Assistant" className="w-full h-full object-cover" />
    </div>
);

const Message: React.FC<{ role: 'user' | 'model', content: string, assistantSvg: string }> = ({ role, content, assistantSvg }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && <AssistantAvatar assistantSvg={assistantSvg} />}
      <div className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-bl-none'}`}>
        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
      </div>
    </div>
  );
};

const AssistantModal: React.FC<AssistantModalProps> = ({ isOpen, onClose, history, onSendMessage, isLoading, selectedAssistant, assistantName }) => {
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [userInput]);

  if (!isOpen) {
    return null;
  }

  const handleSend = () => {
    if (userInput.trim()) {
      onSendMessage(userInput.trim());
      setUserInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-700/50 md:border w-full h-full md:w-full md:max-w-2xl md:h-[70vh] rounded-none md:rounded-2xl shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="assistant-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden">
              <img src={`data:image/svg+xml;base64,${btoa(selectedAssistant)}`} alt={`${assistantName} Assistant`} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 id="assistant-title" className="text-lg font-bold text-zinc-900 dark:text-white">{assistantName}, your AI Assistant</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Close Assistant">
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {history.map((msg, index) => (
            <Message key={index} role={msg.role} content={msg.content} assistantSvg={selectedAssistant} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
                <AssistantAvatar assistantSvg={selectedAssistant} />
                <div className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl bg-zinc-200 dark:bg-zinc-800 rounded-bl-none flex items-center">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex-shrink-0">
          <div className="relative flex items-center">
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              className="w-full bg-zinc-100 dark:bg-zinc-800 pl-4 pr-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none max-h-24 overflow-y-auto"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !userInput.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm disabled:bg-zinc-400 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantModal;