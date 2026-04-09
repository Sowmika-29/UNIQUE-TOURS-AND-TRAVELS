const https = require('https');

function searchDDGImages(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent('site:unsplash.com ' + query)}`;
  https.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  }, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      // Find URLs matching images.unsplash.com/photo-
      const matches = data.match(/https?:\/\/(images|plus)\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/g);
      console.log("Matches:", matches ? [...new Set(matches)].slice(0, 5) : 'No matches');
    });
  });
}
searchDDGImages('kerala houseboat backwaters');
