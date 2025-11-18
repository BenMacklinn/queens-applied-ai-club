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
    imageUrl: '/TBPNHorse.png',
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
// Image URLs from scraped data
export const subcategories = {
  'apparel': [
    {
      name: 'Polo Shirts',
      url: 'https://www.tbpnmerch.com/products/polo-shirts',
      slug: 'polo-shirts',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/f2f03377-8278-4c7d-817e-652e254c9c40_gallery.png?t=1763164609517'
    },
    {
      name: 'Puffer Jacket',
      url: 'https://www.tbpnmerch.com/product/turbo-puffer-001',
      slug: 'turbo-puffer-001',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/b2adec53-101a-474f-a6fc-e0fbcf743f6e-gallery-1.jpg?v=1763181804203'
    },
    {
      name: 'Hoodies',
      url: 'https://www.tbpnmerch.com/products/hoodies',
      slug: 'hoodies',
      imageUrl: 'https://images-api.printify.com/mockup/68f598f1ad1c8737e2062d81/69374/272/mens-nublend-hooded-sweatshirt.jpg?camera_label=front'
    },
    {
      name: 'Sweatshirts',
      url: 'https://www.tbpnmerch.com/products/sweatshirts',
      slug: 'sweatshirts',
      imageUrl: 'https://images-api.printify.com/mockup/68f599a46a6e52353709773d/62627/99286/unisex-crewneck-sweatshirt.jpg?camera_label=front'
    },
    {
      name: 'Jackets & Vests',
      url: 'https://www.tbpnmerch.com/products/jackets-vests',
      slug: 'jackets-vests',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/57cd9490-bb5b-4598-97ec-89962d3ed33c_primary.png'
    },
    {
      name: 'Pullovers',
      url: 'https://www.tbpnmerch.com/products/pullovers',
      slug: 'pullovers',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/38e0f6e7-a7d5-411c-9a6f-01c9b68fcf64_primary.jpg'
    },
    {
      name: 'T-Shirts',
      url: 'https://www.tbpnmerch.com/products/t-shirts',
      slug: 't-shirts',
      imageUrl: 'https://images-api.printify.com/mockup/68f56a7ca15428789a01cb50/17519/103295/unisex-cotton-crew-tee.jpg?camera_label=front'
    }
  ],
  'accessories': [
    {
      name: 'Headwear',
      url: 'https://www.tbpnmerch.com/products/headwear',
      slug: 'headwear',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/63355db1-13db-4b10-be06-1688167df5d5_primary.png'
    },
    {
      name: 'Neckwear',
      url: 'https://www.tbpnmerch.com/product/29196130275002455779',
      slug: 'neckwear',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/43e320f8-621d-49db-81aa-cee0af509756_primary.jpg'
    },
    {
      name: 'Bags',
      url: 'https://www.tbpnmerch.com/product/16004126881173931621',
      slug: 'bags',
      imageUrl: 'https://images-api.printify.com/mockup/68f59729a15428789a01d6ca/103599/100877/tote-bag-aop.jpg?camera_label=front'
    },
    {
      name: 'Cases',
      url: 'https://www.tbpnmerch.com/products/cases',
      slug: 'cases',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/ee9d788e-1fea-4af2-b2da-656399a81e22_primary.jpg'
    }
  ],
  'drinkware': [
    {
      name: 'Drinkware',
      url: 'https://www.tbpnmerch.com/products/drinkware',
      slug: 'drinkware',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/d78fa00b-2f99-4b96-9cb8-233df53419cf_primary.jpg'
    },
    {
      name: 'Can Coolers',
      url: 'https://www.tbpnmerch.com/product/14548396937520533890',
      slug: 'can-coolers',
      imageUrl: 'https://images-api.printify.com/mockup/68f5a4346a6e523537097a5a/78460/38485/stylish-can-cooler-for-parties-gifts-bbqs-tailgating-and-more.jpg?camera_label=flat-front'
    }
  ],
  'desk-tech': [
    {
      name: 'Stationery',
      url: 'https://www.tbpnmerch.com/products/stationery',
      slug: 'stationery',
      imageUrl: 'https://images-api.printify.com/mockup/68f595063d2cebe0040bec8b/65223/7338/hardcover-journal-matte.jpg?camera_label=front'
    },
    {
      name: 'Mouse Pads',
      url: 'https://www.tbpnmerch.com/products/mouse-pads',
      slug: 'mouse-pads',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/0d1f7126-5b8a-45ba-b850-ac3f3a30de7c_primary.jpg'
    },
    {
      name: 'Posters',
      url: 'https://www.tbpnmerch.com/products/posters',
      slug: 'posters',
      imageUrl: 'https://images-api.printify.com/mockup/68f57eb0eb46afb107046fd5/43175/94824/matte-horizontal-posters.jpg?camera_label=front'
    },
    {
      name: 'Games',
      url: 'https://www.tbpnmerch.com/product/18778028428235827118',
      slug: 'games',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/e87ade26-4dda-4b8d-8675-d0d2d47b29f9_primary.jpg'
    },
    {
      name: 'Magnets',
      url: 'https://www.tbpnmerch.com/products/magnets',
      slug: 'magnets',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/e6f5d3c3-2103-4b48-913e-ca7b1c9ad168_primary.jpg'
    }
  ],
  'collectibles': [
    {
      name: 'Stickers',
      url: 'https://www.tbpnmerch.com/products/stickers',
      slug: 'stickers',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/5f280155-457a-4769-871f-fce6997ae9ab_primary.jpg'
    },
    {
      name: 'Pins & Buttons',
      url: 'https://www.tbpnmerch.com/products/pins',
      slug: 'pins',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/a44d2880-0745-4c39-8a16-793b74f83067_primary.jpg'
    },
    {
      name: 'TBPN Gong',
      url: 'https://www.tbpnmerch.com/product/tbpn-gong',
      slug: 'tbpn-gong',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/f23f920e-a340-48b7-94ee-7826f22e1516_primary.jpg'
    },
    {
      name: 'Plates',
      url: 'https://www.tbpnmerch.com/product/27694673597855159398',
      slug: 'plates',
      imageUrl: 'https://czkaugolflipptdehcnb.supabase.co/storage/v1/object/public/product-images/27c6fc2e-31e5-43f0-ae8d-92f2d9808675_primary.jpg'
    }
  ]
};

