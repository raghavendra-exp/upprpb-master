// scripts/validate-content.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const questionsPath = path.join(__dirname, '..', 'src', 'data', 'questions', 'all-questions.json');
const currentPath = path.join(__dirname, '..', 'src', 'data', 'recruitments', 'current.json');
const lawPath = path.join(__dirname, '..', 'src', 'data', 'law', 'lawComparison.json');
const booksPath = path.join(__dirname, '..', 'src', 'data', 'books', 'books.json');

console.log('--- UPPRPB CONTENT INTEGRITY & QUALITY CONTROL VALIDATION ---');

// 1. Validate Questions
if (!fs.existsSync(questionsPath)) {
  console.error('FAIL: all-questions.json does not exist!');
  process.exit(1);
}

const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
console.log(`Loaded ${questions.length} total questions.`);

if (questions.length < 1000) {
  console.error(`FAIL: Minimum 1,000 questions requirement not satisfied. Current: ${questions.length}`);
  process.exit(1);
}

const seenIds = new Set();
let errorCount = 0;

questions.forEach((q, idx) => {
  // Check Unique ID
  if (!q.id) {
    console.error(`Error at index ${idx}: Question missing ID!`);
    errorCount++;
  } else if (seenIds.has(q.id)) {
    console.error(`Duplicate Question ID found: ${q.id}`);
    errorCount++;
  } else {
    seenIds.add(q.id);
  }

  // Check Text
  if (!q.question || !q.questionHi) {
    console.error(`Question ${q.id} missing bilingual question text!`);
    errorCount++;
  }

  // Check Options
  if (!Array.isArray(q.options) || q.options.length < 4 || !Array.isArray(q.optionsHi) || q.optionsHi.length < 4) {
    console.error(`Question ${q.id} has invalid options array!`);
    errorCount++;
  }

  // Check Answer index
  if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
    console.error(`Question ${q.id} has invalid answer index: ${q.answer}`);
    errorCount++;
  }

  // Check Explanation
  if (!q.explanation || !q.explanationHi) {
    console.error(`Question ${q.id} missing explanation!`);
    errorCount++;
  }

  // Check Source Type
  if (!['verified_pyq', 'original'].includes(q.sourceType)) {
    console.error(`Question ${q.id} has invalid sourceType: ${q.sourceType}`);
    errorCount++;
  }

  // PYQ verification check
  if (q.sourceType === 'verified_pyq' && (!q.reference || !q.tags)) {
    console.error(`Verified PYQ ${q.id} missing official reference or tags!`);
    errorCount++;
  }
});

if (errorCount > 0) {
  console.error(`FAIL: Found ${errorCount} question quality violations!`);
  process.exit(1);
}
console.log(`✓ 100% of ${questions.length} questions passed strict quality validation (Unique IDs, valid options, complete explanations, valid answer indexes).`);

// 2. Validate Law Comparison Database
const lawItems = JSON.parse(fs.readFileSync(lawPath, 'utf8'));
console.log(`Loaded ${lawItems.length} BNS/BNSS law comparison items.`);
lawItems.forEach(item => {
  if (!item.id || !item.oldLaw || !item.newLaw || !item.keyChange) {
    console.error(`Invalid Law comparison item: ${item.id}`);
    process.exit(1);
  }
});
console.log(`✓ Law Comparison database verified.`);

// 3. Validate Books & Legal URLs
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
console.log(`Loaded ${books.length} verified books.`);
books.forEach(b => {
  if (!b.id || !b.title || !b.publisher || !b.officialOrStoreUrl) {
    console.error(`Invalid book entry: ${b.id}`);
    process.exit(1);
  }
});
console.log(`✓ Book Library & legal attribution verified.`);

console.log('--- ALL CONTENT VALIDATION CHECKS PASSED SUCCESSFULLY ---');
