// Category data with image URLs from scraped data
// Main category sections for the landing page
export const categories = [
  {
    id: 1,
    name: 'Wearables',
    subtitle: 'Apparel',
    imageUrl: '/JordiTunnel.png',
    slug: 'apparel',
    description: 'Anything you wear on your body'
  },
  {
    id: 2,
    name: 'Essentials',
    subtitle: 'Accessories',
    imageUrl: '/John&Jordi.jpg',
    slug: 'accessories',
    description: 'Wearable add-ons and carryables'
  },
  {
    id: 3,
    name: 'Workstation',
    subtitle: 'Desk & Tech Gear',
    imageUrl: '/TBPNHorse.jpg',
    slug: 'desk-tech',
    description: 'Practical items for work setups'
  },
  {
    id: 4,
    name: 'Hydration',
    subtitle: 'Drinkware',
    imageUrl: '/DietTBPN.webp',
    slug: 'drinkware',
    description: 'Mugs, tumblers, bottles & coolers'
  },
  {
    id: 5,
    name: 'Collectibles',
    subtitle: 'Stickers & More',
    imageUrl: '/GongHit.jpeg',
    slug: 'collectibles',
    description: 'Low-price dopamine buys'
  }
];

// Hero section image
export const heroImage = 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/b2adec53-101a-474f-a6fc-e0fbcf743f6e-gallery-1.jpg?v=1763181804203';

// Subcategories mapped to their parent category slugs
export const subcategories = {
  'apparel': [
    {
      name: 'Polo Shirts',
      url: 'https://www.tbpnmerch.com/products/polo-shirts',
      slug: 'polo-shirts'
    },
    {
      name: 'Puffer Jacket',
      url: 'https://www.tbpnmerch.com/product/turbo-puffer-001',
      slug: 'turbo-puffer-001'
    },
    {
      name: 'Hoodies',
      url: 'https://www.tbpnmerch.com/products/hoodies',
      slug: 'hoodies'
    },
    {
      name: 'Sweatshirts',
      url: 'https://www.tbpnmerch.com/products/sweatshirts',
      slug: 'sweatshirts'
    },
    {
      name: 'Jackets & Vests',
      url: 'https://www.tbpnmerch.com/products/jackets-vests',
      slug: 'jackets-vests'
    },
    {
      name: 'Pullovers',
      url: 'https://www.tbpnmerch.com/products/pullovers',
      slug: 'pullovers'
    },
    {
      name: 'T-Shirts',
      url: 'https://www.tbpnmerch.com/products/t-shirts',
      slug: 't-shirts'
    }
  ],
  'accessories': [
    {
      name: 'Headwear',
      url: 'https://www.tbpnmerch.com/products/headwear',
      slug: 'headwear'
    },
    {
      name: 'TBPN Gong',
      url: 'https://www.tbpnmerch.com/product/tbpn-gong',
      slug: 'tbpn-gong'
    },
    {
      name: 'Neckwear',
      url: 'https://www.tbpnmerch.com/product/29196130275002455779',
      slug: 'neckwear'
    },
    {
      name: 'Bags',
      url: 'https://www.tbpnmerch.com/product/16004126881173931621',
      slug: 'bags'
    },
    {
      name: 'Cases',
      url: 'https://www.tbpnmerch.com/products/cases',
      slug: 'cases'
    }
  ],
  'drinkware': [
    {
      name: 'Drinkware',
      url: 'https://www.tbpnmerch.com/products/drinkware',
      slug: 'drinkware'
    },
    {
      name: 'Can Coolers',
      url: 'https://www.tbpnmerch.com/product/14548396937520533890',
      slug: 'can-coolers'
    }
  ],
  'desk-tech': [
    {
      name: 'Stationery',
      url: 'https://www.tbpnmerch.com/products/stationery',
      slug: 'stationery'
    },
    {
      name: 'Mouse Pads',
      url: 'https://www.tbpnmerch.com/products/mouse-pads',
      slug: 'mouse-pads'
    },
    {
      name: 'Posters',
      url: 'https://www.tbpnmerch.com/products/posters',
      slug: 'posters'
    },
    {
      name: 'Games',
      url: 'https://www.tbpnmerch.com/product/18778028428235827118',
      slug: 'games'
    },
    {
      name: 'Magnets',
      url: 'https://www.tbpnmerch.com/products/magnets',
      slug: 'magnets'
    }
  ],
  'collectibles': [
    {
      name: 'Stickers',
      url: 'https://www.tbpnmerch.com/products/stickers',
      slug: 'stickers'
    },
    {
      name: 'Pins & Buttons',
      url: 'https://www.tbpnmerch.com/products/pins',
      slug: 'pins'
    },
    {
      name: 'Plates',
      url: 'https://www.tbpnmerch.com/product/27694673597855159398',
      slug: 'plates'
    }
  ]
};

