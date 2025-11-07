/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import type { Chapter } from './types.ts';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: Chapter | null;
  onQuizComplete: (chapterId: number, score: number) => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const XIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, chapter, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [view, setView] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    // Reset state when the modal is opened for a new chapter.
    // Using chapter.id ensures this doesn't re-run when the chapter prop
    // updates after quiz completion, which was causing the bug.
    if (isOpen) {
        setView('intro');
        setCurrentQuestionIndex(0);
        setAnswers({});
        setScore(0);
    }
  }, [isOpen, chapter?.id]);

  if (!isOpen || !chapter) {
    return null;
  }

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleStartQuiz = () => {
    setView('quiz');
  }

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const handleTryAgain = () => {
    setView('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(0);
  };

  const handleNext = () => {
    if (currentQuestionIndex < chapter.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Submit
      let correctAnswers = 0;
      chapter.quiz.forEach(q => {
        if (answers[q.id] === q.answer) {
          correctAnswers++;
        }
      });
      const finalScore = Math.round((correctAnswers / chapter.quiz.length) * 100);
      setScore(finalScore);
      onQuizComplete(chapter.id, finalScore);
      setView('results');
    }
  };

  const currentQuestion = chapter.quiz[currentQuestionIndex];

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative transform transition-all flex flex-col"
        style={{ minHeight: '400px', maxHeight: '90vh' }}
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
        <div className="text-center mb-4 flex-shrink-0">
          <h2 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">Quiz: {chapter.title.split(':')[0]}</h2>
        </div>
        
        <div className="flex-grow flex flex-col justify-center min-h-0">
            {view === 'intro' && (
                <div className="text-center animate-fade-in">
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6">You are about to start a quiz with {chapter.quiz.length} questions. You need to score 85% or higher to unlock the next chapter.</p>
                    <button onClick={handleStartQuiz} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                        Start Quiz
                    </button>
                </div>
            )}

            {view === 'quiz' && currentQuestion && (
                <div className="animate-fade-in">
                    <div className="text-center mb-4">
                        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Question {currentQuestionIndex + 1} of {chapter.quiz.length}</p>
                    </div>
                    <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-6 text-center">{currentQuestion.question}</p>
                    <div className="space-y-3">
                        {currentQuestion.options.map(option => (
                            <label key={option} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${answers[currentQuestion.id] === option ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500' : 'bg-white/50 dark:bg-zinc-950/50 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50'}`}>
                                <input 
                                    type="radio" 
                                    name={`question-${currentQuestion.id}`}
                                    checked={answers[currentQuestion.id] === option}
                                    onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-3 text-zinc-700 dark:text-zinc-300">{option}</span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-8 text-right">
                        <button onClick={handleNext} disabled={!answers[currentQuestion.id]} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors duration-300 shadow-md">
                            {currentQuestionIndex < chapter.quiz.length - 1 ? 'Next' : 'Submit'}
                        </button>
                    </div>
                </div>
            )}

            {view === 'results' && (() => {
              const totalQuestions = chapter.quiz.length;
              const correctAnswersCount = chapter.quiz.filter(q => answers[q.id] === q.answer).length;
              const incorrectAnswersCount = totalQuestions - correctAnswersCount;

              return (
                <div className="text-center animate-fade-in flex flex-col h-full min-h-0">
                    <div className="flex-shrink-0">
                        <h3 className="text-3xl font-bold mb-2 dark:text-white">Quiz Complete!</h3>
                        <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-4">Your Score: <span className={`font-extrabold ${score >= 85 ? 'text-green-500' : 'text-red-500'}`}>{score}%</span></p>
                        
                        <div className="my-6 p-4 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
                          <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-100 mb-3 text-left">Performance Summary</h4>
                          <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                  <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{totalQuestions}</p>
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total Questions</p>
                              </div>
                              <div>
                                  <p className="text-2xl font-bold text-green-600 dark:text-green-500">{correctAnswersCount}</p>
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Correct</p>
                              </div>
                              <div>
                                  <p className="text-2xl font-bold text-red-600 dark:text-red-500">{incorrectAnswersCount}</p>
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Incorrect</p>
                              </div>
                          </div>
                        </div>

                        {score >= 85 ? (
                            <p className="text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-900/50 p-3 rounded-lg text-sm">Congratulations. You are eligible for the next chapter and it has been unlocked.</p>
                        ) : (
                            <p className="text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-900/50 p-3 rounded-lg text-sm">Sorry. Your clarification on the chapter is still half-way.</p>
                        )}
                    </div>

                    <div className="mt-6 flex-grow border-t border-zinc-200 dark:border-zinc-700 pt-4 overflow-y-auto pr-2">
                        <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-4 text-left">Review Answers</h4>
                        <div className="space-y-6 text-left">
                            {chapter.quiz.map((q, index) => {
                                const userAnswer = answers[q.id];
                                const isCorrect = userAnswer === q.answer;
                                return (
                                    <div key={q.id}>
                                        <p className="font-semibold text-zinc-700 dark:text-zinc-200">
                                            {index + 1}. {q.question}
                                        </p>
                                        <div className="mt-3 space-y-2">
                                            {q.options.map(option => {
                                                const isUserChoice = userAnswer === option;
                                                const isCorrectAnswer = q.answer === option;
                                                
                                                let optionClass = 'border-zinc-400 dark:border-zinc-700 bg-white/30 dark:bg-zinc-800/20'; // Default with subtle background and darker border
                                                if (isUserChoice && isCorrect) {
                                                    optionClass = 'border-green-500 bg-green-100/50 dark:bg-green-900/30';
                                                } else if (isUserChoice && !isCorrect) {
                                                    optionClass = 'border-red-500 bg-red-100/50 dark:bg-red-900/30';
                                                } else if (isCorrectAnswer) {
                                                    // This is the correct answer that the user did not pick
                                                    optionClass = 'border-green-500 bg-green-50/30 dark:bg-green-900/20';
                                                }

                                                return (
                                                    <div key={option} className={`flex items-center p-3 border rounded-md text-sm ${optionClass}`}>
                                                        {isUserChoice && isCorrect && <CheckIcon />}
                                                        {isUserChoice && !isCorrect && <XIcon />}
                                                        {!isUserChoice && isCorrectAnswer && <CheckIcon />}
                                                        <span className={`ml-2 ${isUserChoice || isCorrectAnswer ? 'font-medium' : ''} text-zinc-600 dark:text-zinc-300`}>{option}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {q.explanation && (
                                            <div className="mt-3 p-3 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-md">
                                                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">Explanation:</p>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{q.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                     <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                        {score >= 85 ? (
                             <button onClick={onClose} className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold py-2 px-6 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                                Close
                            </button>
                        ) : (
                            <div className="flex flex-col sm:flex-row justify-end gap-3">
                                <button onClick={onClose} className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold py-2 px-6 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                                    Close
                                </button>
                                <button onClick={handleTryAgain} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
              );
            })()}
        </div>

      </div>
    </div>
  );
};

export default QuizModal;