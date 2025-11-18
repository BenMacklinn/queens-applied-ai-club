"""
Extract all image URLs from the scraped TBPN data
"""

import json
import re
from urllib.parse import urlparse

def extract_image_urls_from_json(json_file='tbpn_products.json'):
    """Extract all unique image URLs from the scraped JSON data"""
    
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    image_urls = set()
    
    # Extract from HTML content
    if 'homepage' in data and 'html_content' in data['homepage']:
        html = data['homepage']['html_content']
        
        # Find all image URLs in the HTML
        # Look for src attributes
        src_pattern = r'src=["\']([^"\']+\.(?:jpg|jpeg|png|gif|webp|svg))["\']'
        src_matches = re.findall(src_pattern, html, re.IGNORECASE)
        image_urls.update(src_matches)
        
        # Look for href attributes with image extensions
        href_pattern = r'href=["\']([^"\']+\.(?:jpg|jpeg|png|gif|webp|svg))["\']'
        href_matches = re.findall(href_pattern, html, re.IGNORECASE)
        image_urls.update(href_matches)
        
        # Look for image URLs in data attributes or JSON-like structures
        # Pattern for URLs that might be in JSON strings
        url_pattern = r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|gif|webp|svg)(?:\?[^\s"\'<>]*)?'
        url_matches = re.findall(url_pattern, html, re.IGNORECASE)
        image_urls.update(url_matches)
    
    # Also check for image URLs in the raw text
    if 'homepage' in data and 'raw_text' in data['homepage']:
        text = data['homepage']['raw_text']
        url_matches = re.findall(url_pattern, text, re.IGNORECASE)
        image_urls.update(url_matches)
    
    # Filter and clean URLs
    cleaned_urls = []
    for url in image_urls:
        # Skip data URLs and relative paths that aren't full URLs
        if url.startswith('http://') or url.startswith('https://'):
            # Remove any trailing characters that might be part of HTML attributes
            url = url.split('"')[0].split("'")[0].split('>')[0].split('<')[0].split(' ')[0]
            # Remove trailing backslashes
            url = url.rstrip('\\')
            cleaned_urls.append(url)
    
    # Remove duplicates and sort
    unique_urls = sorted(list(set(cleaned_urls)))
    
    return unique_urls

def main():
    print("Extracting image URLs from scraped data...\n")
    
    image_urls = extract_image_urls_from_json()
    
    print(f"Found {len(image_urls)} unique image URLs:\n")
    print("=" * 80)
    
    for i, url in enumerate(image_urls, 1):
        print(f"{i}. {url}")
    
    print("\n" + "=" * 80)
    print(f"\nTotal: {len(image_urls)} image URLs")
    
    # Save to a text file
    with open('image_urls.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(image_urls))
    
    print("\nImage URLs saved to: image_urls.txt")
    
    # Also save as JSON for easier programmatic access
    with open('image_urls.json', 'w', encoding='utf-8') as f:
        json.dump(image_urls, f, indent=2)
    
    print("Image URLs saved to: image_urls.json")

if __name__ == "__main__":
    main()

