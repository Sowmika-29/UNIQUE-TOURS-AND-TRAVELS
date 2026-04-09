const fs = require('fs');
const path = require('path');

const JSON_PATH = 'src/assets/data/destinations.json';

const destinations = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const urlCounts = new Map();
let totalNodes = 0;
let duplicates = 0;

function checkNode(node) {
  totalNodes++;
  const url = node.image;
  const count = (urlCounts.get(url) || 0) + 1;
  urlCounts.set(url, count);

  if (count > 1) {
    console.log(`⚠️ DUPLICATE FOUND: ${node.name || node.id} -> ${url}`);
    duplicates++;
  }

  if (node.places) {
    node.places.forEach(p => checkNode(p));
  }
}

destinations.domestic.forEach(d => checkNode(d));
destinations.international.forEach(d => checkNode(d));

console.log('\n--- UNIQUENESS REPORT ---');
console.log(`📊 Total nodes checked: ${totalNodes}`);
console.log(`✨ Unique URLs:         ${urlCounts.size}`);
console.log(`❌ Duplicates found:    ${duplicates}`);

if (duplicates === 0) {
  console.log('\n💎 SUCCESS: Every single location has a unique image!');
  process.exit(0);
} else {
  console.log('\n🚨 FAILURE: Please fix the duplicates identified above.');
  process.exit(1);
}
