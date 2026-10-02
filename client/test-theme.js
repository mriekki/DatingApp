// QA Red Phase — DATING-20260530170956
// Asserts pre-change (orange) state is NOT present.
// All tests MUST FAIL before implementation begins.

const fs = require('fs');
const path = require('path');

const root = __dirname;
let failures = 0;

function assert(testName, condition) {
  if (condition) {
    console.log(`PASS: ${testName}`);
  } else {
    console.log(`FAIL: ${testName}`);
    failures++;
  }
}

// Test 1 — angular.json must NOT contain "united"
const angularJsonPath = path.join(root, 'angular.json');
const angularJsonContent = fs.readFileSync(angularJsonPath, 'utf8');
assert(
  'angular.json does NOT contain "united"',
  !angularJsonContent.includes('united')
);

// Test 2 — src/styles.css must NOT contain "#E95420"
const stylesCssPath = path.join(root, 'src', 'styles.css');
const stylesCssContent = fs.readFileSync(stylesCssPath, 'utf8');
assert(
  'src/styles.css does NOT contain "#E95420"',
  !stylesCssContent.includes('#E95420')
);

// Test 3 — src/styles.css must NOT contain "#fbcdcf"
assert(
  'src/styles.css does NOT contain "#fbcdcf"',
  !stylesCssContent.includes('#fbcdcf')
);

console.log(`\n${failures} test(s) failed.`);
process.exit(failures > 0 ? 1 : 0);
