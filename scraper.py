"""
TBPN Merch Site Scraper
Scrapes product information from https://www.tbpnmerch.com/
"""

import requests
from bs4 import BeautifulSoup
import json
from typing import List, Dict
import time

class TBPNScraper:
    def __init__(self):
        self.base_url = "https://www.tbpnmerch.com"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        self.products = []
    
    def scrape_homepage(self) -> Dict:
        """Scrape the homepage for product categories and overview"""
        try:
            response = self.session.get(self.base_url, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            
            data = {
                'url': self.base_url,
                'title': soup.title.string if soup.title else None,
                'categories': []
            }
            
            # Extract product categories from the page
            # Look for category sections (Apparel, Accessories)
            category_sections = soup.find_all(['section', 'div'], class_=lambda x: x and ('category' in x.lower() or 'product' in x.lower()))
            
            # Try to find product listings
            product_cards = soup.find_all(['div', 'article'], class_=lambda x: x and ('product' in x.lower() or 'card' in x.lower()))
            
            return {
                'html_content': str(soup),
                'raw_text': soup.get_text(),
                'data': data
            }
        except Exception as e:
            return {'error': str(e)}
    
    def scrape_category(self, category_path: str) -> Dict:
        """Scrape a specific category page"""
        try:
            url = f"{self.base_url}/{category_path}"
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            
            products = []
            # Look for product elements
            product_elements = soup.find_all(['div', 'article', 'a'], class_=lambda x: x and ('product' in x.lower() if x else False))
            
            for element in product_elements:
                product = {
                    'name': None,
                    'price': None,
                    'url': None,
                    'image': None
                }
                
                # Extract product name
                name_elem = element.find(['h1', 'h2', 'h3', 'h4', 'span'], class_=lambda x: x and ('name' in x.lower() or 'title' in x.lower() if x else False))
                if not name_elem:
                    name_elem = element.find(['h1', 'h2', 'h3', 'h4'])
                if name_elem:
                    product['name'] = name_elem.get_text(strip=True)
                
                # Extract price
                price_elem = element.find(['span', 'div'], class_=lambda x: x and 'price' in x.lower() if x else False)
                if price_elem:
                    product['price'] = price_elem.get_text(strip=True)
                
                # Extract URL
                link = element.find('a', href=True) if element.name != 'a' else element
                if link and link.get('href'):
                    href = link.get('href')
                    if href.startswith('/'):
                        product['url'] = f"{self.base_url}{href}"
                    elif href.startswith('http'):
                        product['url'] = href
                
                # Extract image
                img = element.find('img')
                if img and img.get('src'):
                    src = img.get('src')
                    if src.startswith('/'):
                        product['image'] = f"{self.base_url}{src}"
                    elif src.startswith('http'):
                        product['image'] = src
                
                if product['name']:
                    products.append(product)
            
            return {
                'category': category_path,
                'url': url,
                'products': products
            }
        except Exception as e:
            return {'error': str(e), 'category': category_path}
    
    def scrape_all_categories(self) -> Dict:
        """Scrape all known categories"""
        categories = [
            'apparel',
            'accessories',
            'apparel/polo-shirts',
            'apparel/hoodies',
            'apparel/sweatshirts',
            'apparel/jackets-vests',
            'apparel/pullovers',
            'apparel/t-shirts',
            'accessories/headwear',
            'accessories/neckwear',
            'accessories/bags',
            'accessories/cases',
            'accessories/drinkware',
            'accessories/can-coolers',
            'accessories/stickers',
            'accessories/stationery',
            'accessories/mouse-pads',
            'accessories/posters',
            'accessories/pins-buttons',
            'accessories/games',
            'accessories/magnets',
            'accessories/plates'
        ]
        
        all_data = {}
        for category in categories:
            print(f"Scraping {category}...")
            all_data[category] = self.scrape_category(category)
            time.sleep(1)  # Be respectful with requests
        
        return all_data
    
    def save_to_json(self, data: Dict, filename: str = 'tbpn_products.json'):
        """Save scraped data to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Data saved to {filename}")

def main():
    scraper = TBPNScraper()
    
    print("Scraping TBPN Merch homepage...")
    homepage_data = scraper.scrape_homepage()
    
    print("\nScraping all categories...")
    categories_data = scraper.scrape_all_categories()
    
    all_data = {
        'homepage': homepage_data,
        'categories': categories_data,
        'scraped_at': time.strftime('%Y-%m-%d %H:%M:%S')
    }
    
    scraper.save_to_json(all_data)
    print("\nScraping complete!")

if __name__ == "__main__":
    main()

