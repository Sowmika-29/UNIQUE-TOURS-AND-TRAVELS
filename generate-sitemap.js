const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://uniquetours.in';
const DESTINATIONS_PATH = path.join(__dirname, 'src/assets/data/destinations.json');
const SITEMAP_PATH = path.join(__dirname, 'public/sitemap.xml');
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

function generateSitemap() {
  console.log('Generating sitemap.xml...');

  try {
    const data = JSON.parse(fs.readFileSync(DESTINATIONS_PATH, 'utf8'));
    const destinations = [...data.domestic, ...data.international];
    let urlCount = 0;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/explore</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/explore/domestic</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/explore/international</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/services</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contact</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    urlCount = 8;

    // Destination-level URLs (with correct type prefix)
    destinations.forEach(dest => {
      const type = dest.type.toLowerCase();
      xml += `
  <url>
    <loc>${BASE_URL}/destination/${type}/${dest.id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
      urlCount++;

      // Place-level URLs
      if (dest.places && dest.places.length > 0) {
        dest.places.forEach(place => {
          const placeName = encodeURIComponent(place.name.toLowerCase());
          xml += `
  <url>
    <loc>${BASE_URL}/destination/${type}/${dest.id}/${placeName}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
          urlCount++;

          // Sub-place URLs
          if (place.subPlaces && place.subPlaces.length > 0) {
            place.subPlaces.forEach(sub => {
              const subName = encodeURIComponent(sub.name.toLowerCase());
              xml += `
  <url>
    <loc>${BASE_URL}/destination/${type}/${dest.id}/${placeName}/${subName}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
              urlCount++;
            });
          }
        });
      }
    });

    xml += '\n</urlset>';

    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log(`Successfully generated sitemap.xml with ${urlCount} URLs.`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
