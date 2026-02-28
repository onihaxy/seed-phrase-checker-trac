// Seed Phrase Checker - Tests
// Built on IntercomSwap - Trac Network

const {
  checkWordCount,
  checkDuplicates,
  checkNumbers,
  checkObviousWords,
  checkLowercase,
  calculateScore,
  getStrength
} = require('../src/checker');

let passed = 0;
let failed = 0;

function test(name, condition) {
  if (condition) {
    console.log(`✅ PASS: ${name}`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${name}`);
    failed++;
  }
}

console.log('');
console.log('================================');
console.log('  Seed Phrase Checker Tests');
console.log('  Built on IntercomSwap - Trac');
console.log('================================');
console.log('');

// Test word count
test('12 words is valid', checkWordCount('a b c d e f g h i j k l'.split(' ')).pass === true);
test('18 words is valid', checkWordCount('a b c d e f g h i j k l m n o p q r'.split(' ')).pass === true);
test('24 words is valid', checkWordCount('a b c d e f g h i j k l m n o p q r s t u v w x'.split(' ')).pass === true);
test('5 words is invalid', checkWordCount('a b c d e'.split(' ')).pass === false);

// Test duplicates
test('No duplicates passes', checkDuplicates(['apple', 'banana', 'cherry']).pass === true);
test('Duplicates detected', checkDuplicates(['apple', 'apple', 'cherry']).pass === false);

// Test numbers
test('No numbers passes', checkNumbers(['apple', 'banana']).pass === true);
test('Numbers detected', checkNumbers(['apple', '123']).pass === false);

// Test obvious words
test('No obvious words passes', checkObviousWords(['abandon', 'ability']).pass === true);
test('Obvious word detected', checkObviousWords(['password', 'ability']).pass === false);

// Test lowercase
test('All lowercase passes', checkLowercase(['apple', 'banana']).pass === true);
test('Capitals detected', checkLowercase(['Apple', 'banana']).pass === false);

// Test score
const goodResults = {
  wordCount: { pass: true },
  duplicates: { pass: true },
  numbers: { pass: true },
  obvious: { pass: true },
  lowercase: { pass: true }
};
test('Perfect score is 100', calculateScore(goodResults) === 100);
test('Strong strength at 100', getStrength(100) === 'STRONG');
test('Weak strength at 30', getStrength(30) === 'WEAK');
test('Medium strength at 60', getStrength(60) === 'MEDIUM');

console.log('');
console.log('================================');
console.log(`  Results: ${passed} passed, ${failed} failed`);
console.log('================================');
console.log('');
