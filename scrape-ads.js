import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

async function downloadImage(url, filename) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(path.join('./public/assets/ads', filename), buffer);
  console.log(`Saved ${filename}`);
}

async function scrapeInstagram() {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  const urls = [
    { brand: 'turktelekom', url: 'https://www.instagram.com/turktelekom/?hl=tr' },
    { brand: 'vodafone', url: 'https://www.instagram.com/vodafonetr/' },
    { brand: 'turkcell', url: 'https://www.instagram.com/turkcell/' }
  ];

  for (const { brand, url } of urls) {
    console.log(`Navigating to ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      await page.waitForSelector('article img', { timeout: 10000 }).catch(() => console.log('No article img found'));
      
      const imageUrls = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('article img'));
        return imgs.map(img => img.src).filter(src => src && !src.includes('s150x150'));
      });
      
      if (imageUrls.length > 0) {
        await downloadImage(imageUrls[0], `${brand}.png`); // Overwriting the existing placeholder images
      }
    } catch (err) {
      console.error(`Error scraping ${brand}:`, err.message);
    }
  }

  await browser.close();
}

scrapeInstagram();
