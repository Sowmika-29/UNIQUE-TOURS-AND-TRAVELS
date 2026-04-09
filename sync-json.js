const fs = require('fs');
const path = require('path');

const IMAGE_DIR = 'src/assets/images';
const JSON_PATH = 'src/assets/data/destinations.json';

const normalize = (str) => {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
};

function scanImages(dir, fileMap = new Map()) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanImages(filePath, fileMap);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const normalized = normalize(path.basename(file, ext));
        // Prefer webp if both exist
        if (!fileMap.has(normalized) || ext === '.webp') {
          fileMap.set(normalized, filePath);
        }
      }
    }
  });
  return fileMap;
}

const fileMap = scanImages(IMAGE_DIR);
const destinations = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const missing = [];
let matchedCount = 0;

const updateNode = (node, contextName) => {
  const searchKeys = [];
  if (node.id) searchKeys.push(normalize(node.id));
  if (node.name) searchKeys.push(normalize(node.name));

  let matchedPath = null;
  for (const key of searchKeys) {
    if (fileMap.has(key)) {
      matchedPath = fileMap.get(key);
      break;
    }
  }

  if (matchedPath) {
    const fileName = path.basename(matchedPath, path.extname(matchedPath));
    node.image = `assets/images/${fileName}.webp`;
    matchedCount++;
  } else if (!node.image || node.image.startsWith('http')) {
    missing.push(`${contextName} -> ${node.name || node.id}`);
  }

  if (node.places) {
    node.places.forEach(place => updateNode(place, node.name || node.id));
  }
};

destinations.domestic.forEach(dest => updateNode(dest, 'Domestic'));
destinations.international.forEach(dest => updateNode(dest, 'International'));

fs.writeFileSync(JSON_PATH, JSON.stringify(destinations, null, 2));

console.log(`✅ SYNC COMPLETE: ${matchedCount} nodes mapped.`);
if (missing.length > 0) {
  console.log('\n⚠️ MISSING IMAGES:');
  missing.forEach(m => console.log(`  - ${m}`));
}
