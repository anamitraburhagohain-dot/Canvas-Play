/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { animatedAvatars } from '../data/avatars.ts';

interface ProfilePicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (picDataUrl: string) => void;
  currentPic: string | null;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-zinc-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const ProfilePicModal: React.FC<ProfilePicModalProps> = ({ isOpen, onClose, onSave, currentPic }) => {
  const [activeTab, setActiveTab] = useState<'choose' | 'upload'>('choose');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
        // Reset state when modal opens
        setSelectedAvatar(currentPic);
        setUploadedImage(null);
        setActiveTab('choose');
    }
  }, [isOpen, currentPic]);

  if (!isOpen) {
    return null;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target?.result as string);
            setSelectedAvatar(null);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const finalPic = activeTab === 'upload' ? uploadedImage : selectedAvatar;
    if (finalPic) {
      onSave(finalPic);
    }
    onClose();
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const isSaveDisabled = !selectedAvatar && !uploadedImage;

  const getProfilePicSrc = (picData: string | null) => {
    if (!picData) return '';
    if (picData.startsWith('<svg')) {
      return `data:image/svg+xml;base64,${btoa(picData)}`;
    }
    return picData;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl shadow-2xl w-full max-w-md p-6 relative transform transition-all flex flex-col"
        onClick={handleModalContentClick}
        role="document"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">Change Profile Picture</h2>
        </div>

        <div className="flex bg-zinc-100/50 dark:bg-black/20 p-1 rounded-full mb-6">
            <button
                onClick={() => setActiveTab('choose')}
                className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'choose' ? 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow' : 'text-zinc-500 dark:text-zinc-300'}`}
            >
                Choose Avatar
            </button>
            <button
                onClick={() => setActiveTab('upload')}
                className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'upload' ? 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow' : 'text-zinc-500 dark:text-zinc-300'}`}
            >
                Upload Photo
            </button>
        </div>

        <div className="min-h-[200px] flex items-center justify-center">
        {activeTab === 'choose' ? (
            <div className="grid grid-cols-5 gap-3">
                {animatedAvatars.map((avatarSvg, index) => (
                    <button
                        key={index}
                        onClick={() => { setSelectedAvatar(avatarSvg); setUploadedImage(null); }}
                        className={`w-16 h-16 rounded-full p-1 transition-all ${selectedAvatar === avatarSvg ? 'bg-blue-500' : 'hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'}`}
                        aria-label={`Select avatar ${index + 1}`}
                    >
                        <img src={getProfilePicSrc(avatarSvg)} alt={`Avatar ${index + 1}`} className="w-full h-full rounded-full object-cover bg-zinc-100/50 dark:bg-zinc-700/50" />
                    </button>
                ))}
            </div>
        ) : (
            <div className="w-full text-center">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/gif"
                    className="hidden"
                />
                {uploadedImage ? (
                    <div className="flex flex-col items-center">
                        <img src={uploadedImage} alt="Preview" className="w-32 h-32 rounded-full object-cover border-4 border-zinc-200 dark:border-zinc-700 mb-4" />
                        <button onClick={() => fileInputRef.current?.click()} className="text-sm font-semibold text-blue-600 hover:underline">Choose a different photo</button>
                    </div>
                ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-full p-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                        <UploadIcon />
                        <p className="text-zinc-600 dark:text-zinc-300">Click to upload</p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">PNG, JPG, GIF</p>
                    </button>
                )}
            </div>
        )}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
            <button onClick={onClose} className="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-semibold py-2 px-4 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-600">
                Cancel
            </button>
            <button onClick={handleSave} disabled={isSaveDisabled} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:bg-zinc-400 dark:disabled:bg-zinc-500 disabled:cursor-not-allowed">
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicModal;
