/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import type { UserAccount } from './types.ts';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Icons for input fields
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const GenderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-zinc-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.535 5.465L22 2m0 0h-3m3 0v3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v4m-2-2h4" />
  </svg>
);
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      {/* Flame */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.5c.345-.345.655-.8.655-1.25a.655.655 0 10-1.31 0c0 .45.31.905.655 1.25z" />
      {/* Candle */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V5.5" />
      
      {/* Top Tier */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 13v-2.5c0-1.5 2.239-2.5 5-2.5s5 1 5 2.5V13" />
      {/* Drips on Top */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11s1-1 2-1 1.5 1 2.5 1 1.5-1 2.5-1 1.5 1 2-1" />

      {/* Bottom Tier */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5v-6.5c0-1.5 3.582-3 8-3s8 1.5 8 3v6.5" />
      {/* Drips on Bottom */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 15.5s1.5-1.5 3.5-1.5 2.5 1.5 4.5 1.5 2-1.5 4.5-1.5 3.5 1.5 3.5 1.5" />

      {/* Plate */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 19.5c0 1 4.03 1.5 9 1.5s9-.5 9-1.5" />
    </svg>
);
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const AddressIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: UserAccount) => void;
  userProfile: UserAccount;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, onSave, userProfile }) => {
  const [formData, setFormData] = useState<UserAccount>(userProfile);

  useEffect(() => {
    if (isOpen) {
      setFormData(userProfile);
    }
  }, [isOpen, userProfile]);

  if (!isOpen) {
    return null;
  }

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const inputContainerClasses = "relative";
  const iconClasses = "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none";
  const inputClasses = "w-full pl-10 pr-3 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white dark:placeholder-zinc-400";
  const dateInputClasses = `${inputClasses} [color-scheme:light] dark:[color-scheme:dark]`;
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const maxDate = yesterday.toISOString().split('T')[0];
  
  const minDateObj = new Date(today);
  minDateObj.setFullYear(today.getFullYear() - 120);
  const minDate = minDateObj.toISOString().split('T')[0];

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl shadow-2xl w-full max-w-lg relative transform transition-all flex flex-col overflow-hidden"
        onClick={handleModalContentClick}
        role="document"
      >
        <div className="text-center p-6 bg-blue-600/90">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
          <h2 className="text-2xl font-extrabold text-white">Edit Profile</h2>
          <p className="mt-1 text-blue-100">Update your personal information.</p>
        </div>
        <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Full Name</label>
                    <div className={inputContainerClasses}>
                        <div className={iconClasses}><UserIcon /></div>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClasses} required />
                    </div>
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                    <div className={inputContainerClasses}>
                        <div className={iconClasses}><MailIcon /></div>
                        <input type="email" id="email" name="email" value={formData.email} className={`${inputClasses} bg-zinc-200/50 dark:bg-zinc-800/50 cursor-not-allowed`} disabled />
                    </div>
                </div>
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Gender</label>
                    <div className={inputContainerClasses}>
                        <div className={iconClasses}><GenderIcon /></div>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={inputClasses}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                            <option>Prefer not to say</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Date of Birth</label>
                    <div className={inputContainerClasses}>
                        <div className={iconClasses}><CalendarIcon /></div>
                        <input type="date" id="dob" name="dob" value={formData.dob || ''} onChange={handleChange} className={dateInputClasses} min={minDate} max={maxDate} />
                    </div>
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Phone</label>
                    <div className={inputContainerClasses}>
                        <div className={iconClasses}><PhoneIcon /></div>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} />
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Address</label>
                    <div className={inputContainerClasses}>
                        <div className={iconClasses}><AddressIcon /></div>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={inputClasses} />
                    </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-semibold py-2 px-4 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-600">
                        Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
