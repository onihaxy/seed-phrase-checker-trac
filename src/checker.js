// Seed Phrase Checker Core Logic
// Built on IntercomSwap - Trac Network

const OBVIOUS_WORDS = [
  'password', 'crypto', 'bitcoin', 'wallet',
  'trac', 'secret', 'hello', 'test', 'admin',
  'user', 'login', 'access', 'key', 'pass'
];

function checkWordCount(words) {
  if (words.length === 12 || words.length === 18 || words.length === 24) {
    return { pass: true, message: `Valid word count: ${words.length} words` };
  }
  return { pass: false, message: `Invalid word count: ${words.length}. Use 12, 18, or 24` };
}

function checkDuplicates(words) {
  const unique = new Set(words);
  if (unique.size === words.length) {
    return { pass: true, message: 'No duplicate words found' };
  }
  return { pass: false, message: 'Duplicate words detected' };
}

function checkNumbers(words) {
  const hasNumbers = words.some(w => /\d/.test(w));
  if (!hasNumbers) {
    return { pass: true, message: 'No numbers found - correct format' };
  }
  return { pass: false, message: 'Numbers found - seed phrases use words only' };
}

function checkObviousWords(words) {
  const found = words.filter(w => OBVIOUS_WORDS.includes(w));
  if (found.length === 0) {
    return { pass: true, message: 'No obvious weak words detected' };
  }
  return { pass: false, message: `Weak words found: ${found.join(', ')}` };
}

function checkLowercase(words) {
  const allLower = words.every(w => w === w.toLowerCase());
  if (allLower) {
    return { pass: true, message: 'All words are lowercase - correct' };
  }
  return { pass: false, message: 'Some words have capitals - should be lowercase' };
}

function calculateScore(results) {
  let score = 0;
  if (results.wordCount.pass) score += 30;
  if (results.duplicates.pass) score += 25;
  if (results.numbers.pass) score += 20;
  if (results.obvious.pass) score += 15;
  if (results.lowercase.pass) score += 10;
  return score;
}

function getStrength(score) {
  if (score >= 80) return 'STRONG';
  if (score >= 50) return 'MEDIUM';
  return 'WEAK';
}

module.exports = {
  checkWordCount,
  checkDuplicates,
  checkNumbers,
  checkObviousWords,
  checkLowercase,
  calculateScore,
  getStrength
};
