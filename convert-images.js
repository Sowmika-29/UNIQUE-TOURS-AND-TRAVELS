const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = 'src/assets/images';
const targetExt = '.webp';
const quality = 50; // Targeted for ~40KB

async function convertImages() {
  console.log('🚀 Starting image optimization process...');
  
  const files = fs.readdirSync(directory);
  let count = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(directory, file);
      const outputFilename = path.basename(file, ext) + targetExt;
      const outputPath = path.join(directory, outputFilename);

      try {
        const metadata = await sharp(inputPath).metadata();
        const isHero = metadata.width > 1200;
        
        // Resize logic: Heroes ~1200, Cards ~400
        const resizeWidth = isHero ? 1200 : 600;

        await sharp(inputPath)
          .resize(resizeWidth)
          .webp({ quality })
          .toFile(outputPath);

        console.log(`✅ Converted: ${file} -> ${outputFilename} (${resizeWidth}px)`);
        count++;
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 Process complete! Optimized ${count} images.`);
  console.log('💡 Note: You can now safely delete the original .jpg/.png files if you want.');
}

convertImages();
