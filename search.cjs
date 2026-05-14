const https = require('https');

function searchImages(query) {
  return new Promise((resolve, reject) => {
    const q = encodeURIComponent(query);
    https.get('https://images.search.yahoo.com/search/images?p=' + q, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Yahoo images stores image URLs in data-url attributes or imgurld parameters
        const regex = /imgurl=(https?[^&"']+)/g;
        const matches = [...data.matchAll(regex)];
        const urls = [...new Set(matches.map(m => decodeURIComponent(m[1])))];
        resolve(urls);
      });
    }).on('error', reject);
  });
}

async function main() {
  const turkcell = await searchImages('turkcell kampanya reklam afişi');
  console.log("Turkcell:", turkcell.slice(0, 3));
  
  const vodafone = await searchImages('vodafone kampanya reklam afişi');
  console.log("Vodafone:", vodafone.slice(0, 3));
  
  const yemeksepeti = await searchImages('yemeksepeti kampanya reklam afişi');
  console.log("Yemeksepeti:", yemeksepeti.slice(0, 3));
  
  const hepsiburada = await searchImages('hepsiburada reklam kampanya afişi');
  console.log("Hepsiburada:", hepsiburada.slice(0, 3));
  
  const thy = await searchImages('türk hava yolları thy reklam afişi');
  console.log("THY:", thy.slice(0, 3));
  
  const vatan = await searchImages('vatan bilgisayar reklam kampanya görseli');
  console.log("Vatan:", vatan.slice(0, 3));
}

main();
