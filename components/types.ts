/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface TabbedContent {
  title: string;
  content: string;
}

export interface Chapter {
  id: number;
  title: string;
  content: string;
  locked: boolean;
  progress: number;
  quizCompleted: boolean;
  quizUnlocked: boolean;
  quizScore: number | null;
  quiz: QuizQuestion[];
  tabbedContent?: TabbedContent[];
}

export interface Contribution {
  id:string;
  subject: string;
  chapterId: number;
  userName: string;
  content: string;
}

export interface UserAccount {
  email: string;
  name: string;
  password?: string; // Optional because Google users won't have one
  picture?: string | null;
  gender: string;
  phone: string;
  address: string;
  dob?: string; // Date of Birth in YYYY-MM-DD format
  hasCompletedOnboarding?: boolean;
}

export interface NewsFlashItem {
  headline: string;
  story: string;
}

export type WeatherCondition = 'Sunny' | 'Moon' | 'PartlyCloudyDay' | 'PartlyCloudyNight' | 'MostlyCloudyDay' | 'MostlyCloudyNight' | 'Cloudy' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Fog' | 'Windy';

export interface GroundingSource {
  web: {
    uri: string;
    title: string;
  };
}

export interface Comment {
  id: string;
  authorEmail: string;
  authorName: string;
  authorPic: string | null;
  content: string;
  timestamp: string; // ISO string
  reactions?: {
    love?: string[]; // array of user emails
    laugh?: string[]; // array of user emails
  };
}

export type CommentReactionType = 'love' | 'laugh';

export interface Liker {
  email: string;
  name: string;
  pic: string | null;
}

export interface Post {
  id: string;
  authorEmail: string;
  authorName: string;
  authorPic: string | null;
  content: string;
  createdAt: string; // ISO string
  editedAt: string | null; // ISO string or null
  likes: number;
  likedBy: Liker[]; // array of Liker objects
  comments: Comment[];
  isBookmarked: boolean;
}