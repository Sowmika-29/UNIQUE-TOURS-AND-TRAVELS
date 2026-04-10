const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://uniquetours.in';
const DESTINATIONS_PATH = path.join(__dirname, 'src/assets/data/destinations.json');
const SITEMAP_PATH = path.join(__dirname, 'public/sitemap.xml');

function generateSitemap() {
  console.log('Generating sitemap.xml...');

  try {
    const data = JSON.parse(fs.readFileSync(DESTINATIONS_PATH, 'utf8'));
    const destinations = [...data.domestic, ...data.international];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/explore</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/explore/domestic</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/explore/international</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;

    destinations.forEach(dest => {
      xml += `
  <url>
    <loc>${BASE_URL}/destination/${dest.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    xml += '\n</urlset>';

    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log(`Successfully generated sitemap.xml with ${destinations.length + 7} URLs.`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
