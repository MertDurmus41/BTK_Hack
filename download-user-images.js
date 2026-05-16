import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const images = [
  { filename: 'garanti_tatil.png', url: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=247946406786231&get_thumbnail=1' },
  { filename: 'akbank_atm.png', url: 'https://media.licdn.com/dms/image/v2/C4D22AQG3MS2X50hBwg/feedshare-shrink_800/feedshare-shrink_800/0/1592619108508?e=2147483647&v=beta&t=oNLOyC8GY8nuJvJa92O-NkMPJR0Ah7W7WVDxm03-tpY' },
  { filename: 'hepsiburada_cem_yilmaz.png', url: 'https://epnext.com/wp-content/uploads/2022/05/Hepsiburada.jpg' },
  { filename: 'kfc_treat.png', url: 'https://advertgallery.com/wp-content/uploads/2018/01/kfc-big-treat-week-save-upto-42-ad-dainik-jagran-patna-13-01-2018.jpg' }
];

async function downloadImages() {
  const dir = './public/assets/ads';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const { filename, url } of images) {
    console.log(`Downloading ${filename} from ${url}...`);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const buffer = await response.buffer();
      fs.writeFileSync(path.join(dir, filename), buffer);
      console.log(`Saved ${filename}`);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
}

downloadImages();
