export interface Question {
  questionText: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Topic {
  topicId: string;
  name: string;
  paperId: string;
  moduleId: string;
  masterTopicId: string;
  order: number;
  duration: number;
  contentMarkdown: string;
  keyPoints: string[];
  questions: Question[];
  audiobookUrl: string | null;
  conceptVideoUrl: string | null;
  recordedClassUrl: string | null;
}

export interface Paper {
  paperId: string;
  name: string;
  modules: {
    moduleId: string;
    name: string;
    topics: Topic[];
  }[];
}

export interface Course {
  courseId: string;
  name: string;
  code: string;
  tier: 'Flagship' | 'Professional' | 'Certificate' | 'Diploma';
  tagline: string;
  durationMonths: number;
  papers: Paper[];
  description: string;
  eligibility: string[];
  contentReady: boolean;
}

export interface UserProfile {
  name: string;
  role: 'Junior Officer' | 'Experienced Banker' | 'Aspirant';
  dailyCommitment: number; // minutes
  enrolledCourse: string | null;
  examMonth: string | null;
  streak: number;
  todayStudyMinutes: number;
  completedTopics: string[];
}

export interface DiscussionDoubt {
  doubtId: string;
  userName: string;
  textMessage: string;
  audioSnippetUrl?: string;
  durationSeconds?: number;
  createdAt: string;
  upvoteCount: number;
  isVerified: boolean;
  verifiedAnswerText?: string;
}

export interface JobAlert {
  id: string;
  bankName: string;
  postTitle: string;
  deadline: string;
  minCertification: string;
}

export interface RbiCircular {
  id: string;
  title: string;
  date: string;
  summary: string;
  targetTopics: string[];
}
