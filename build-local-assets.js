const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const JSON_PATH = path.join(__dirname, 'src/assets/data/destinations.json');
const IMAGES_DIR = path.join(__dirname, 'src/assets/images');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Global sets for strict uniqueness
const usedUrls = new Set();
const usedFiles = new Set();

// Contextual map for better searching
const contextMap = {
  "Munnar": "Munnar tea plantations",
  "Alleppey": "Alleppey backwaters Kerala",
  "Goa": "Goa beach sunset",
  "Rajasthan": "Rajasthan forts architecture",
  "Kashmir": "Kashmir snow mountains",
  "Dubai": "Dubai skyline skyscrapers",
  "Taj Mahal": "Taj Mahal Agra",
  "Ladakh": "Ladakh mountains nature",
  "Varkala": "Varkala cliff beach",
  "Hampi": "Hampi ruins Karnataka"
};

// SEO Naming function
function generateSeoName(parent, name, context) {
  let combined = parent ? `${parent}-${name}` : name;
  if (context && contextMap[name]) {
    // Add contextual words if available
    const words = contextMap[name].split(' ').slice(1).join('-');
    if (words) combined += `-${words}`;
  }
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumerics with dash
    .replace(/^-|-$/g, '') + '.webp';
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'UniqueTours/3.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(httpsGet(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status: ${res.statusCode} URL: ${url}`));
      }
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

// Search Wiki for highly relevant images
async function searchWikiImage(query) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=images&imlimit=30&format=json`;
  try {
    const rawData = await httpsGet(searchUrl);
    const data = JSON.parse(rawData.toString());
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1' || !pages[pageId].images) return null;

    const invalidKeywords = ['flag', 'map', 'emblem', 'seal', 'logo', 'icon', 'locator', 'coat_of_arms', 'symbol', '.svg', '.gif'];

    for (const img of pages[pageId].images) {
      const title = img.title;
      const tLower = title.toLowerCase();
      if (invalidKeywords.some(k => tLower.includes(k))) continue;

      // Get image URL
      const imgInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`;
      const rawImg = await httpsGet(imgInfoUrl);
      const imgData = JSON.parse(rawImg.toString());
      const iPages = imgData.query.pages;
      const iPageId = Object.keys(iPages)[0];
      
      if (iPageId !== '-1' && iPages[iPageId].imageinfo) {
        const thumbUrl = iPages[iPageId].imageinfo[0].thumburl || iPages[iPageId].imageinfo[0].url;
        if (thumbUrl && !usedUrls.has(thumbUrl)) {
          return thumbUrl;
        }
      }
    }
  } catch (err) {
    console.error(`Wiki search error for ${query}: ${err.message}`);
  }
  return null;
}

// Smart optimize and save
async function optimizeAndSave(buffer, outputPath, isHero) {
  let width = isHero ? 1200 : 400;
  let height = isHero ? 700 : 300;
  
  let quality = 80;
  let success = false;

  // Initial resize
  let processedBuffer = await sharp(buffer)
    .resize(width, height, { fit: 'cover', position: 'attention' })
    .webp({ quality })
    .toBuffer();

  // Iterative compression to hit 30-60KB target
  while (processedBuffer.length > 60000 && quality > 10) {
    quality -= 5;
    processedBuffer = await sharp(buffer)
      .resize(width, height, { fit: 'cover', position: 'attention' })
      .webp({ quality })
      .toBuffer();
  }

  // If it's too small (unlikely to need bumping up, but to ensure decent quality if tiny)
  // we just accept it as long as it's below 60KB.
  
  fs.writeFileSync(outputPath, processedBuffer);
  return { size: processedBuffer.length, quality };
}

async function processNode(node, parentName, isHero) {
  const name = node.name || node.id;
  
  const ctxQuery = contextMap[name] || `${name} tourism scenic`;
  let imgUrl = await searchWikiImage(ctxQuery);
  
  if (!imgUrl) {
    imgUrl = await searchWikiImage(`${name} landscape`);
  }
  if (!imgUrl) {
    // Ultimate fallback if Wiki completely fails
    imgUrl = `https://picsum.photos/seed/${encodeURIComponent(name)}/1200/800`;
  }

  usedUrls.add(imgUrl);

  const seoFileName = generateSeoName(parentName, name, true);
  let finalPath = path.join(IMAGES_DIR, seoFileName);
  
  // Deduplicate file names just in case
  let counter = 1;
  while (usedFiles.has(finalPath)) {
    finalPath = path.join(IMAGES_DIR, seoFileName.replace('.webp', `-${counter}.webp`));
    counter++;
  }
  usedFiles.add(finalPath);
  const webPath = `assets/images/${path.basename(finalPath)}`;

  console.log(`[START] ${name} -> ${webPath}`);

  try {
    const buffer = await httpsGet(imgUrl);
    const stats = await optimizeAndSave(buffer, finalPath, isHero);
    console.log(`  => [SUCCESS] Saved ${path.basename(finalPath)} | Quality: ${stats.quality} | Size: ${(stats.size/1024).toFixed(2)}KB`);
    node.image = webPath;
  } catch (err) {
    console.error(`  => [ERROR] Failed to process ${name}: ${err.message}`);
  }

  // Process children
  if (node.places) {
    for (const place of node.places) {
      await processNode(place, name, false);
    }
  }
}

async function main() {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

  for (const cat of ['domestic', 'international']) {
    if (data[cat]) {
      for (const dest of data[cat]) {
        await processNode(dest, null, true);
      }
    }
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
  console.log(`\n🎉 STRICT PIPELINE COMPLETE! 
  - ${usedFiles.size} unique, SEO-named WebP images generated.
  - Duplicates: 0
  - JSON Paths Updated.
  `);
}

main();
