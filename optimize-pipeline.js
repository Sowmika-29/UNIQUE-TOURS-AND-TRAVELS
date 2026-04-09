const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const IMAGE_DIR = 'src/assets/images';
const JSON_PATH = 'src/assets/data/destinations.json';
const TARGET_EXT = '.webp';

const TARGETS = {
  HERO: { width: 1200, minSize: 60 * 1024, maxSize: 100 * 1024 },
  CARD: { width: 400, minSize: 30 * 1024, maxSize: 60 * 1024 }
};

// --- UTILITIES ---

/**
 * Normalizes strings for robust matching (lowercase, no symbols/spaces)
 */
const normalize = (str) => {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
};

/**
 * Recursively scans directory for images
 */
function scanImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanImages(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

/**
 * Iteratively adjusts WebP quality to hit size targets
 */
async function optimizeToTarget(inputPath, outputPath, config) {
  let quality = 80;
  let buffer;
  let fileSize = Infinity;

  // Initial resize
  const pipeline = sharp(inputPath).resize(config.width);

  // Iterative quality loop
  while (quality > 10) {
    buffer = await pipeline.clone().webp({ quality }).toBuffer();
    fileSize = buffer.length;

    if (fileSize <= config.maxSize) break;
    quality -= 10;
  }

  await fs.promises.writeFile(outputPath, buffer);
  return { quality, size: Math.round(fileSize / 1024) };
}

// --- MAIN PIPELINE ---

async function runPipeline() {
  console.log('🚀 INITIALIZING ROBUST IMAGE PIPELINE\n');

  const imagePaths = scanImages(IMAGE_DIR);
  const imageIndex = new Map();
  let convertedCount = 0;
  let skippedCount = 0;

  console.log(`📦 Found ${imagePaths.length} source images. Starting optimization...`);

  // 1. Process Images
  for (const imgPath of imagePaths) {
    const ext = path.extname(imgPath);
    const fileName = path.basename(imgPath, ext);
    const normalized = normalize(fileName);
    const outputPath = path.join(path.dirname(imgPath), fileName + TARGET_EXT);

    // Skip if exists and not forced (Safety item 9)
    if (fs.existsSync(outputPath)) {
      skippedCount++;
      imageIndex.set(normalized, outputPath);
      continue;
    }

    try {
      const metadata = await sharp(imgPath).metadata();
      const isHero = metadata.width >= 1000;
      const config = isHero ? TARGETS.HERO : TARGETS.CARD;

      const result = await optimizeToTarget(imgPath, outputPath, config);
      imageIndex.set(normalized, outputPath);
      
      console.log(`✅ [${isHero ? 'HERO' : 'CARD'}] ${fileName} -> ${result.size}KB (q=${result.quality})`);
      convertedCount++;
    } catch (err) {
      console.error(`❌ Error processing ${imgPath}:`, err.message);
    }
  }

  // 2. Map JSON
  console.log('\n🔗 SYNCING JSON MAPPING...');
  const destinations = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  const missing = [];

  const updateNode = (node, contextName) => {
    const searchKeys = [];
    if (node.id) searchKeys.push(normalize(node.id));
    if (node.name) searchKeys.push(normalize(node.name));

    let matchedPath = null;
    for (const key of searchKeys) {
      if (imageIndex.has(key)) {
        matchedPath = imageIndex.get(key);
        break;
      }
    }

    if (matchedPath) {
      // Convert absolute path to relative assets path
      const relPath = matchedPath.split(path.sep).join('/').split('assets/')[1];
      node.image = `assets/${relPath}`;
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

  // 3. Final Report
  console.log('\n📊 FINAL REPORT');
  console.log('-----------------------------------');
  console.log(`✨ Total Converted: ${convertedCount}`);
  console.log(`⏩ Total Skipped:   ${skippedCount}`);
  console.log(`🔗 JSON Mapped:     ${imageIndex.size} nodes mapped`);
  
  if (missing.length > 0) {
    console.log('\n⚠️ MISSING IMAGES:');
    missing.forEach(m => console.log(`  - ${m}`));
  }

  console.log('\n💡 Tip: Run "node optimize-pipeline.js" again if you add new files.');
}

runPipeline().catch(err => console.error('Aborting:', err));
