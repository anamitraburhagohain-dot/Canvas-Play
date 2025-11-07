/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';

// Props interfaces
interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  onOpenContributionModal: () => void;
}

interface PlansViewProps {
    onClose: () => void;
    onGoToPayment: () => void;
}

interface PaymentViewProps {
    onUpgrade: () => void;
    onGoToPlans: () => void;
    onOpenContributionModal: () => void;
}

interface PaymentButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// Payment Method Icons
const UpiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12H6.5A2.5 2.5 0 0 1 4 9.5v-5A2.5 2.5 0 0 1 6.5 2H10m2 10h5.5A2.5 2.5 0 0 0 20 9.5v-5A2.5 2.5 0 0 0 17.5 2H14"/></svg>;
const NetBankingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M3 6h18M3 10v11M12 10v11M21 10v11"/></svg>;
const CardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const ContributeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M2.5 13.6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1Z"/><path d="M2.5 19.6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1Z"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>;

// Standalone sub-components
const PaymentButton: React.FC<PaymentButtonProps> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors">
        <div className="text-zinc-600 dark:text-zinc-300">{icon}</div>
        <span className="ml-4 font-semibold text-zinc-700 dark:text-zinc-200">{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
    </button>
);

const PlansView: React.FC<PlansViewProps> = ({ onClose, onGoToPayment }) => (
    <>
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Choose Your Plan</h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">Unlock premium features and enhance your learning experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Free</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 mb-6">For casual learners</p>
                <p className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-6">₹0<span className="text-lg font-medium text-zinc-500 dark:text-zinc-400">/month</span></p>
                <ul className="space-y-3 text-zinc-600 dark:text-zinc-300 text-left mb-auto">
                    <li className="flex items-start"><CheckIcon /><span>Access to History, Geography, and Science content</span></li>
                </ul>
                <button onClick={onClose} className="w-full mt-8 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-semibold py-3 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-600">
                    Continue with Free
                </button>
            </div>

            {/* PRO Plan */}
            <div className="border-2 border-blue-500 rounded-xl p-6 flex flex-col relative bg-blue-50/50 dark:bg-blue-900/20">
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">Most Popular</div>
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">PRO</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 mb-6">For dedicated scholars</p>
                <div className="mb-6">
                    <p className="text-4xl font-extrabold text-zinc-900 dark:text-white">₹30<span className="text-lg font-medium text-zinc-500 dark:text-zinc-400">/month</span></p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">(Just ₹1 per day)</p>
                </div>
                <ul className="space-y-3 text-zinc-600 dark:text-zinc-300 text-left mb-auto">
                    <li className="flex items-start"><CheckIcon /><span>Access to all content, including <strong>G.K & Current Affairs</strong></span></li>
                    <li className="flex items-start"><CheckIcon /><span>AI-powered <strong>Translator</strong> (up to 1,000,000 words/month)</span></li>
                    <li className="flex items-start"><CheckIcon /><span>Priority support</span></li>
                </ul>
                <button onClick={onGoToPayment} className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                    Upgrade to PRO
                </button>
            </div>
        </div>
    </>
);

const PaymentView: React.FC<PaymentViewProps> = ({ onUpgrade, onGoToPlans, onOpenContributionModal }) => (
    <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
            <button onClick={onGoToPlans} className="flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 mb-4 transition-colors">
                <ArrowLeftIcon />
                Back to Plans
            </button>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Complete Your Subscription</h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">Choose your preferred payment method.</p>
        </div>
        <div className="space-y-3">
            <PaymentButton icon={<UpiIcon/>} label="UPI" onClick={onUpgrade} />
            <PaymentButton icon={<NetBankingIcon/>} label="NetBanking" onClick={onUpgrade} />
            <PaymentButton icon={<CardIcon/>} label="Debit/Credit Card" onClick={onUpgrade} />
            <div className="flex items-center my-4">
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                <span className="flex-shrink mx-4 text-zinc-400 dark:text-zinc-500 text-xs">OR</span>
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <PaymentButton icon={<ContributeIcon/>} label="Contribute to the Content" onClick={onOpenContributionModal} />
        </div>
    </div>
);


const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onUpgrade, onOpenContributionModal }) => {
    const [view, setView] = useState<'plans' | 'payment'>('plans');

    useEffect(() => {
        if (isOpen) {
            // Reset to the initial view whenever the modal is opened
            setView('plans');
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
            <div 
              className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-8 relative transform transition-all"
              onClick={handleModalContentClick}
              role="document"
            >
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                    <CloseIcon />
                </button>
                
                {view === 'plans' 
                    ? <PlansView onClose={onClose} onGoToPayment={() => setView('payment')} /> 
                    : <PaymentView onUpgrade={onUpgrade} onGoToPlans={() => setView('plans')} onOpenContributionModal={onOpenContributionModal} />
                }
            </div>
        </div>
    );
};

export default SubscriptionModal;