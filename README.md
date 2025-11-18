# TBPN Merch Site Scraper

This project contains a web scraper for the TBPN Merch website (https://www.tbpnmerch.com/).

## Overview

The TBPN Merch site is an e-commerce store for Technology Brothers Podcast Network merchandise, featuring:

### Apparel
- Polo Shirts (9 designs, $69.99-$74.99)
- Hoodies (5 designs, $79.99)
- Sweatshirts (4 designs, $69.99)
- Jackets & Vests (5 designs, $99.99)
- Pullovers (8 designs, $109.99)
- T-Shirts (20 designs, $49.99-$59.99)
- Puffer Jacket ($119.99)

### Accessories
- Headwear (29 designs, $39.99-$59.99)
- TBPN Gong ($49.99)
- Neckwear ($39.99)
- Bags ($39.99)
- Cases (9 designs, $39.99)
- Drinkware (13 designs, $29.99-$69.99)
- Can Coolers ($19.99)
- Stickers (10 designs, $19.99-$23.99)
- Stationery (3 designs, $19.99-$39.99)
- Mouse Pads (5 designs, $29.99)
- Posters (10 designs, $39.99)
- Pins & Buttons (5 designs, $12.99)
- Games ($39.99)
- Magnets (3 designs, $23.99)
- Plates ($39.99)

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the scraper:
```bash
python scraper.py
```

## Output

The scraper will generate a `tbpn_products.json` file containing:
- Homepage data
- Product information from all categories
- Timestamp of when the data was scraped

## Notes

- The scraper includes a 1-second delay between requests to be respectful to the server
- Product availability and prices are subject to change
- The scraper uses BeautifulSoup to parse HTML content

