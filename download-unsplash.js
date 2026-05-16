import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const images = [
  { filename: 'turkcell.png', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
  { filename: 'thy.png', url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80' },
  { filename: 'vatan.png', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
  { filename: 'yemeksepeti.png', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { filename: 'vodafone.png', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' },
  { filename: 'hepsiburada.png', url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80' },
  { filename: 'trendyol_kasim.png', url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80' },
  { filename: 'trendyol_efsane.png', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80' },
  { filename: 'trendyol_super.png', url: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80' },
  { filename: 'trendyol_mega.png', url: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80' }
];

async function downloadUnsplashImages() {
  for (const { filename, url } of images) {
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
