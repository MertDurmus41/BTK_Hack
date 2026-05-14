import urllib.request
import json
import re

def search_images(query):
    req = urllib.request.Request(f'https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}', headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Extract images from vqd and then query duckduckgo image search?
        # html duckduckgo doesn't easily show full images. Let's just use regular search and extract URLs ending in .jpg
        urls = re.findall(r'https?://[^\s\"\'<>]+(?:\.jpg|\.png)', html)
        return list(set(urls))
    except Exception as e:
        return str(e)

print("Vodafone:", search_images('vodafone kampanya reklam görseli')[0:5])
print("Turkcell:", search_images('turkcell kampanya reklam görseli')[0:5])
print("Yemeksepeti:", search_images('yemeksepeti kampanya görseli')[0:5])
print("Trendyol:", search_images('trendyol indirim görseli')[0:5])
