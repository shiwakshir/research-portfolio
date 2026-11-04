import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = 'dist';
const pattern = /\bc space\b|cspace|escalent|automotive|nissan|\[TO CONFIRM|consultancy|technology client/i;

function getFiles(dir) {
  let results = [];
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      if (/\.(html|js|css|json|xml|txt|svg)$/i.test(fullPath)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

try {
  const files = getFiles(distDir);
  const violations = [];

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const match = content.match(pattern);
    if (match) {
      violations.push({ file, match: match[0] });
    }
  }

  if (violations.length > 0) {
    console.error('❌ check:public failed! Found prohibited words in build output:');
    for (const v of violations) {
      console.error(`  - ${v.file}: matched "${v.match}"`);
    }
    process.exit(1);
  }

  console.log(`✓ check:public passed (scanned ${files.length} files in dist/, 0 prohibited terms found).`);
  process.exit(0);
} catch (err) {
  console.error('Error running check:public:', err);
  process.exit(1);
}
