# TBPN Merch Landing Page

A clean, modern landing page for TBPN Merch featuring a hero section and category cards.

## Features

- **Hero Section**: Large bold text with product image
- **Category Cards**: 5 vertical category cards with horizontal scroll
- **Responsive Design**: Mobile-first approach
- **Clean Aesthetic**: Minimalist design with neutral colors and warm accents

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx          # Hero section component
│   ├── Hero.css
│   ├── CategoryCard.jsx  # Individual category card
│   ├── CategoryCard.css
│   ├── CategorySection.jsx # Category cards container
│   └── CategorySection.css
├── data/
│   └── categories.js     # Category data with image URLs
├── App.jsx               # Main app component
├── App.css
├── index.css             # Global styles
└── main.jsx              # Entry point
```

## Categories

The landing page features 5 apparel categories:
1. T-Shirts
2. Hoodies
3. Polo Shirts
4. Jackets & Vests
5. Pullovers

All images are sourced from the scraped TBPN Merch site data.
