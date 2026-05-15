import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const images = [
  { filename: 'turkcell.png', query: 'businesswoman+smartphone' },
  { filename: 'thy.png', query: 'pilot+airplane' },
  { filename: 'vatan.png', query: 'gaming+laptop+neon' },
  { filename: 'yemeksepeti.png', query: 'chef+restaurant' },
  { filename: 'vodafone.png', query: 'modern+smartphone+red' },
  { filename: 'hepsiburada.png', query: 'excited+woman+gift' }
];

async function downloadUnsplashImages() {
  for (const { filename, query } of images) {
    const url = `https://source.unsplash.com/800x800/?${query}`;
    console.log(`Downloading ${filename} from ${url}...`);
    try {
      const response = await fetch(url);
      const buffer = await response.buffer();
      fs.writeFileSync(path.join('./public/assets/ads', filename), buffer);
      console.log(`Saved ${filename}`);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
}

downloadUnsplashImages();
