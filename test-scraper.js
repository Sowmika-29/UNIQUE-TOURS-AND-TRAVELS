const https = require('https');
https.get('https://unsplash.com/s/photos/kerala-backwaters', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const match = data.match(/"id":"([a-zA-Z0-9\-_]{11})"/);
    console.log(match ? 'Found ID: ' + match[1] : 'No ID found');
  });
});
