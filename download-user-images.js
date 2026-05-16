import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const images = [
  { filename: 'anatolium_food.png', url: 'https://anatolium-marmara.com/uploads/kampanya_detay/1000x1000/at_yemek-sm-2022-02-01-16-17-06.png' },
  { filename: 'mcdonalds_portrait.png', url: 'https://digitalsynopsis.com/wp-content/uploads/2020/02/mcdonalds-im-lovin-it-3.jpg' },
  { filename: 'vakifbank_bayram.png', url: 'https://www.adjustbrand.com/wp-content/uploads/2022/04/VakifBankin-Ramazan-Bayrami-reklami-yayinda-1024x684.jpg' },
  { filename: 'mcdonalds_landscape.png', url: 'https://miro.medium.com/v2/resize:fit:1000/1*4690Xo_XmC2oT0jM4oY_rA.jpeg' }
];

async function downloadImages() {
  const dir = './public/assets/ads';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const { filename, url } of images) {
    console.log(`Downloading ${filename} from ${url}...`);
    try {
      const response = await fetch(url);
      const buffer = await response.buffer();
      fs.writeFileSync(path.join(dir, filename), buffer);
      console.log(`Saved ${filename}`);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
}

downloadImages();
