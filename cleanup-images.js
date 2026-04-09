const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, 'src/assets/data/destinations.json');
const IMAGES_DIR = path.join(__dirname, 'src/assets/images');

const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

// Safelist for images that MUST be kept
const usedImages = new Set([
  'logo.webp',
  'logo.png',
  'favicon.ico'
]);

function extractImages(node) {
  if (node.image) {
    usedImages.add(path.basename(node.image));
  }
  if (node.places) {
    node.places.forEach(extractImages);
  }
}

// Extract all valid image paths from the JSON map
['domestic', 'international'].forEach(cat => {
  if (data[cat]) {
    data[cat].forEach(extractImages);
  }
});

let deletedCount = 0;
let deletedSize = 0;

if (fs.existsSync(IMAGES_DIR)) {
  const files = fs.readdirSync(IMAGES_DIR);

  files.forEach(file => {
    // Only delete files (ignore folders)
    const filePath = path.join(IMAGES_DIR, file);
    if (fs.statSync(filePath).isFile()) {
      if (!usedImages.has(file)) {
        const size = fs.statSync(filePath).size;
        console.log(`🗑️ Deleting unused image: ${file} (${(size / 1024).toFixed(2)} KB)`);
        fs.unlinkSync(filePath);
        deletedCount++;
        deletedSize += size;
      }
    }
  });
}

console.log(`\n✅ CLEANUP COMPLETE!`);
console.log(`Removed ${deletedCount} unused/duplicate images.`);
console.log(`Freed up ${(deletedSize / 1024 / 1024).toFixed(2)} MB of disk space.`);
