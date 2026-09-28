// TypeScript Interfaces for UPPRPB Master Platform

export type RecruitmentStatus = 
  | 'UPCOMING'
  | 'APPLICATION OPEN'
  | 'APPLICATION CLOSED'
  | 'WRITTEN EXAM'
  | 'ANSWER KEY'
  | 'OBJECTION'
  | 'RESULT'
  | 'DV/PST'
  | 'PET'
  | 'FINAL RESULT'
  | 'COMPLETED';

export type PostId = 
  | 'constable'
  | 'si'
  | 'computer-operator'
  | 'jail-warder'
  | 'radio-police'
  | 'fire-service'
  | 'ministerial'
  | 'motor-transport'
  | 'special';

export interface RecruitmentStage {
  id: string;
  name: string;
  nameHi: string;
  status: 'completed' | 'current' | 'upcoming';
  dateText?: string;
  noticeUrl?: string;
  description?: string;
}

export interface EligibilityCriteria {
  ageLimit: {
    min: number;
    max: number;
    relaxation: string;
    relaxationHi: string;
  };
  qualification: string;
  qualificationHi: string;
  nationality: string;
  maritalStatus?: string;
  specialRequirements?: string[];
  specialRequirementsHi?: string[];
}

export interface PhysicalRequirement {
  category: 'PST' | 'PET';
  title: string;
  titleHi: string;
  maleGenObcSc: string;
  maleSt: string;
  femaleGenObcSc: string;
  femaleSt: string;
  details?: string;
  detailsHi?: string;
}

export interface ExamPattern {
  mode: 'Offline (OMR)' | 'Online (CBT)' | 'Hybrid';
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  marksPerQuestion: number;
  negativeMarking: number; // e.g. 0.5 or 0
  qualifyingCriteria?: string;
  qualifyingCriteriaHi?: string;
  sections: {
    id: string;
    name: string;
    nameHi: string;
    questions: number;
    marks: number;
  }[];
}

export interface RecruitmentData {
  id: string;
  postKey: PostId;
  post: string;
  postHi: string;
  cycle: string;
  vacancies: number | string;
  status: RecruitmentStatus;
  currentStage: string;
  currentStageHi: string;
  officialSource: string;
  notificationDate: string;
  lastVerified: string;
  version: string;
  stages: RecruitmentStage[];
  eligibility: EligibilityCriteria;
  examPattern: ExamPattern;
  physical: PhysicalRequirement[];
  links: {
    officialNotification?: string;
    applyUrl?: string;
    syllabusPdf?: string;
    otrUrl?: string;
  };
}

export interface SyllabusTopic {
  id: string;
  name: string;
  nameHi: string;
  description?: string;
  descriptionHi?: string;
  importance: 'high' | 'medium' | 'low';
  ncertRef?: string;
  recommendedBookRef?: string;
  pyqCount?: number;
  keyPoints?: string[];
  keyPointsHi?: string[];
}

export interface SyllabusChapter {
  id: string;
  name: string;
  nameHi: string;
  topics: SyllabusTopic[];
}

export interface SyllabusSubject {
  id: string;
  name: string;
  nameHi: string;
  icon?: string;
  marksWeightage: number;
  questionCount: number;
  chapters: SyllabusChapter[];
}

export interface Question {
  id: string;
  exam: string;
  post: string;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq';
  question: string;
  questionHi: string;
  options: string[];
  optionsHi: string[];
  answer: number; // 0, 1, 2, 3
  explanation: string;
  explanationHi: string;
  sourceType: 'verified_pyq' | 'original';
  reference: string;
  tags: string[];
  year?: number;
  paper?: string;
}

export interface LawComparisonItem {
  id: string;
  topic: string;
  topicHi: string;
  category: 'bns_ipc' | 'bnss_crpc' | 'bsa_iea';
  oldLaw: string; // e.g. "IPC Section 302"
  newLaw: string; // e.g. "BNS Section 103"
  keyChange: string;
  keyChangeHi: string;
  punishmentOld?: string;
  punishmentNew?: string;
  examRelevance: string;
  examRelevanceHi: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  year: number;
  language: 'Hindi' | 'English' | 'Bilingual';
  post: PostId[];
  subject: string;
  level: 'Foundation' | 'Concept' | 'Practice' | 'PYQ' | 'Complete Guide' | 'Revision';
  pyqsIncluded: boolean;
  practiceQuestionsCount: string;
  purpose: string;
  purposeHi: string;
  officialOrStoreUrl: string;
  lastVerified: string;
  syllabusMapping: string[];
  ncertConnection?: string;
}

export interface CurrentAffairItem {
  id: string;
  date: string;
  category: 'Police & Security' | 'Uttar Pradesh' | 'National' | 'Economy' | 'Polity' | 'Science & Tech' | 'Sports & Awards';
  headline: string;
  headlineHi: string;
  summary: string;
  summaryHi: string;
  keyFacts: string[];
  keyFactsHi: string[];
  policeExamRelevance: string;
  policeExamRelevanceHi: string;
  mcqs: Question[];
  flashcard: {
    front: string;
    frontHi: string;
    back: string;
    backHi: string;
  };
  source: {
    name: string;
    url: string;
    verifiedDate: string;
  };
}

export interface Flashcard {
  id: string;
  subject: string;
  topic: string;
  front: string;
  frontHi: string;
  back: string;
  backHi: string;
  lastReviewed?: string;
  status: 'new' | 'known' | 'learning' | 'review_later';
}

export interface ErrorNote {
  questionId: string;
  question: Question;
  selectedAnswer: number;
  timestamp: number;
  userNotes?: string;
  status: 'unresolved' | 'resolved';
}

export interface RunningLogEntry {
  id: string;
  date: string;
  distanceKm: number;
  timeSeconds: number;
  paceMinPerKm: number;
  heartRate?: number;
  notes?: string;
  targetMet: boolean;
}

export interface NoticeItem {
  id: string;
  date: string;
  title: string;
  titleHi: string;
  postCategory: PostId;
  year: number;
  pdfUrl: string;
  summary: string;
  summaryHi: string;
  isLatest: boolean;
}
