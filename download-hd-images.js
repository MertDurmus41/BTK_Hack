import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const dir = './public/assets/ads';

async function downloadOne(filename, urls) {
  for (const url of urls) {
    try {
      console.log(`Trying ${filename}: ${url.substring(0,80)}...`);
      const response = await fetch(url, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/*'
        },
        redirect: 'follow'
      });
      
      if (!response.ok) { console.log(`  HTTP ${response.status}`); continue; }
      
      const buffer = Buffer.from(await response.arrayBuffer());
      const sizeKB = Math.round(buffer.length / 1024);
      
      if (sizeKB > 25) {
        fs.writeFileSync(path.join(dir, filename), buffer);
        console.log(`  ✓ ${sizeKB}KB - Saved!`);
        return true;
      }
      console.log(`  Too small: ${sizeKB}KB`);
    } catch (err) {
      console.log(`  Error: ${err.message}`);
    }
  }
  return false;
}

async function main() {
  // Akbank - try YouTube thumbnails from the actual commercial
  await downloadOne('akbank_telefon.jpg', [
    'https://i.ytimg.com/vi/4Pb3HfEfN6g/maxresdefault.jpg',
    'https://i.ytimg.com/vi/4Pb3HfEfN6g/sddefault.jpg',
    'https://i.ytimg.com/vi/e-ioXGb8Kqs/maxresdefault.jpg',
    'https://i.ytimg.com/vi/e-ioXGb8Kqs/sddefault.jpg',
    'https://i.ytimg.com/vi/JnfUhXCHD8s/maxresdefault.jpg',
    'https://i.ytimg.com/vi/TjZ41NiIjFU/maxresdefault.jpg',
    'https://i.ytimg.com/vi/TjZ41NiIjFU/sddefault.jpg'
  ]);

  // McDonald's I'm Lovin' It - get a proper food ad image  
  await downloadOne('mcdonalds_lovinit.jpg', [
    'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]);

  // Show final sizes
  console.log('\nFinal sizes of problematic files:');
  for (const f of ['garanti_bbva_tatil.jpg','akbank_telefon.jpg','vakifbank_bayram.jpg','mcdonalds_beefy.jpg','mcdonalds_lovinit.jpg','indirim_150tl.jpg']) {
    try {
      const stat = fs.statSync(path.join(dir, f));
      console.log(`  ${f}: ${Math.round(stat.size/1024)}KB ${stat.size > 30000 ? '✓' : '⚠️ STILL LOW'}`);
    } catch(e) {
      console.log(`  ${f}: MISSING`);
    }
  }
}

main();
