// Auto-generated question repository index
import allQuestionsRaw from './all-questions.json';
import upGkRaw from './questions-up-gk.json';
import hindiRaw from './questions-hindi.json';
import polityRaw from './questions-polity.json';
import lawRaw from './questions-law.json';
import mathsRaw from './questions-maths.json';
import reasoningRaw from './questions-reasoning.json';
import computerRaw from './questions-computer.json';
import scienceRaw from './questions-science.json';
import historyRaw from './questions-history.json';
import geographyRaw from './questions-geography.json';
import economyRaw from './questions-economy.json';
import currentAffairsRaw from './questions-current-affairs.json';
import { Question } from '../../types';

export const allQuestions: Question[] = allQuestionsRaw as Question[];
export const upGkQuestions: Question[] = upGkRaw as Question[];
export const hindiQuestions: Question[] = hindiRaw as Question[];
export const polityQuestions: Question[] = polityRaw as Question[];
export const lawQuestions: Question[] = lawRaw as Question[];
export const mathsQuestions: Question[] = mathsRaw as Question[];
export const reasoningQuestions: Question[] = reasoningRaw as Question[];
export const computerQuestions: Question[] = computerRaw as Question[];
export const scienceQuestions: Question[] = scienceRaw as Question[];
export const historyQuestions: Question[] = historyRaw as Question[];
export const geographyQuestions: Question[] = geographyRaw as Question[];
export const economyQuestions: Question[] = economyRaw as Question[];
export const currentAffairsQuestions: Question[] = currentAffairsRaw as Question[];

export const verifiedPyqQuestions: Question[] = allQuestions.filter(q => q.sourceType === 'verified_pyq');
export const originalPracticeQuestions: Question[] = allQuestions.filter(q => q.sourceType === 'original');

export const questionStats = {
  totalQuestions: allQuestions.length,
  verifiedPyqs: verifiedPyqQuestions.length,
  originalPractice: originalPracticeQuestions.length,
  bySubject: {
    upGk: upGkQuestions.length,
    hindi: hindiQuestions.length,
    polity: polityQuestions.length,
    law: lawQuestions.length,
    maths: mathsQuestions.length,
    reasoning: reasoningQuestions.length,
    computer: computerQuestions.length,
    science: scienceQuestions.length,
    history: historyQuestions.length,
    geography: geographyQuestions.length,
    economy: economyQuestions.length,
    currentAffairs: currentAffairsQuestions.length
  }
};
