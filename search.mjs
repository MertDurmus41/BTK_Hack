import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const getImageUrl = async (query) => {
  try {
    const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();
    // Duckduckgo HTML actually has images under class "th" or something, but let's just find any external image url
    const match = html.match(/https?:\/\/[^\s"'<>]+\.(jpg|jpeg|png)/i);
    return match ? match[0] : null;
  } catch(e) { return null; }
};

const searchBing = async (query) => {
  try {
    const response = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await response.text();
    // Bing images usually have m="{murl:'...'}"
    const match = html.match(/murl&quot;:&quot;(https?:\/\/[^&"]+?\.(jpg|jpeg|png))/i);
    if(match) return match[1];
    
    // fallback
    const match2 = html.match(/(https?:\/\/[^\s"'<>]+\.(jpg|jpeg|png))/i);
    return match2 ? match2[1] : null;
  } catch(e) { return null; }
}

async function main() {
  console.log('Turkcell:', await searchBing('turkcell reklam kampanyası afiş'));
  console.log('Vodafone:', await searchBing('vodafone reklam afiş görseli'));
  console.log('Yemeksepeti:', await searchBing('yemeksepeti reklam kampanya afişi'));
  console.log('Hepsiburada:', await searchBing('hepsiburada reklam kampanya afişi'));
  console.log('THY:', await searchBing('thy türk hava yolları reklam afişi'));
  console.log('Vatan:', await searchBing('vatan bilgisayar indirim reklam afişi'));
}

main();
