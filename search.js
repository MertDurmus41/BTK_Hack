import puppeteer from 'puppeteer';

async function getImages(query) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`);
  
  // Wait for some images to load
  await page.waitForSelector('img');
  
  const urls = await page.evaluate(() => {
    // Get all image sources, prefer src but fallback to data-src, filter out base64 and small icons
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(i => i.src || i.dataset.src)
               .filter(src => src && src.startsWith('http') && !src.includes('favicon'));
  });
  
  await browser.close();
  return urls.slice(1, 4); // skip first usually google logo
}

async function main() {
  console.log("Turkcell:", await getImages('turkcell öğretmenlere özel anında mobil imza reklam'));
  console.log("Vodafone:", await getImages('vodafone red ayrıcalıkları reklam görseli'));
  console.log("Hepsiburada:", await getImages('hepsiburada okul dönemi hazırlık reklamı'));
  console.log("Yemeksepeti:", await getImages('yemeksepeti aramıza katılın reklam görseli'));
  console.log("THY:", await getImages('türk hava yolları kariyerine zirvede başla reklam'));
  console.log("Trendyol:", await getImages('trendyol efsane günler reklam görseli'));
}

main();
