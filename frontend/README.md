# Queen's Applied AI Club | QVibe Landing Page

A clean, modern landing page for Queen's Applied AI Club (QVibe) featuring a hero section with video, category cards, and custom content pages.

## Features

- **Hero Section**: Video background with animated title and CTA
- **Category Cards**: 5 category cards (About Us, Projects, Events, Our Team, Get Involved)
- **Custom Pages**: Dedicated pages for each category with unique layouts
- **Responsive Design**: Mobile-first approach
- **Modern Aesthetic**: Dark mode with gradient accents

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
│   ├── Hero.jsx          # Hero section with video
│   ├── Hero.css
│   ├── CategoryCard.jsx  # Individual category card
│   ├── CategoryCard.css
│   ├── CategorySection.jsx # Category cards container
│   ├── CategorySection.css
│   ├── Navbar.jsx        # Navigation bar
│   ├── Footer.jsx        # Footer component
│   ├── SectionTitle.jsx  # Animated section title
│   └── TargetCursor.jsx  # Custom cursor effect
├── pages/
│   ├── HomePage.jsx      # Landing page
│   └── CategoryPage.jsx  # Dynamic category pages
├── data/
│   └── categories.js    # Category data
├── App.jsx               # Main app component
├── App.css
├── index.css             # Global styles
└── main.jsx              # Entry point
```

## Categories

The landing page features 5 main categories:
1. About Us
2. Projects
3. Events
4. Our Team
5. Get Involved
