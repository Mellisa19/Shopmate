// Product Types
export interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    images: string[];
    rating: number;
    reviewCount: number;
    specs: Record<string, string>;
    reviews: Review[];
}

// Mock Data
export const products: Product[] = [
    // --- ELECTRONICS ---
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        description: 'Immerse yourself in crystal-clear sound with our noise-cancelling headphones. Features 40-hour battery life, premium memory foam ear cushions, and advanced Bluetooth 5.2 connectivity.',
        price: 299.99,
        category: 'Electronics',
        image: 'https://picsum.photos/400/400?random=39',
        images: [
            'https://picsum.photos/400/400?random=1',
            'https://picsum.photos/400/400?random=2',
        ],
        rating: 4.8,
        reviewCount: 234,
        specs: { 'Battery': '40h', 'ANC': 'Yes' },
        reviews: [],
    },
    {
        id: '3',
        name: 'Smart Fitness Tracker',
        description: 'Track your health metrics and workout progress with precision. Heart rate monitoring, GPS tracking, and 7-day battery life.',
        price: 89.99,
        category: 'Electronics',
        image: 'https://picsum.photos/400/400?random=40',
        images: [
            'https://picsum.photos/400/400?random=1',
            'https://picsum.photos/400/400?random=2',
        ],
        rating: 4.4,
        reviewCount: 312,
        specs: { 'Battery': '7 days', 'GPS': 'Yes' },
        reviews: [],
    },
    {
        id: '5',
        name: 'Mechanical Keyboard',
        description: 'Tactile typing experience with customizable RGB backlighting. Cherry MX switches, aluminum frame, and detachable USB-C cable.',
        price: 129.99,
        category: 'Electronics',
        image: 'https://picsum.photos/400/400?random=41',
        images: [
            'https://picsum.photos/400/400?random=3',
            'https://picsum.photos/400/400?random=4',
        ],
        rating: 4.9,
        reviewCount: 445,
        specs: { 'Switch': 'Cherry MX', 'Backlight': 'RGB' },
        reviews: [],
    },
    {
        id: 'e1',
        name: '4K Ultra HD Action Camera',
        description: 'Capture your adventures in stunning 4K resolution. Waterproof up to 10m without a case, voice control, and hypersmooth stabilization.',
        price: 249.99,
        category: 'Electronics',
        image: 'https://picsum.photos/400/400?random=42',
        images: [
            'https://picsum.photos/400/400?random=5',
            'https://picsum.photos/400/400?random=6',
        ],
        rating: 4.6,
        reviewCount: 128,
        specs: { 'Resolution': '4K60fps', 'Waterproof': '10m' },
        reviews: [],
    },
    {
        id: 'e2',
        name: 'Portable Bluetooth Speaker',
        description: 'Big sound in a small package. 360-degree sound, waterproof design, and 12-hour playtime make it perfect for parties.',
        price: 79.50,
        category: 'Electronics',
        image: 'https://picsum.photos/400/400?random=43',
        images: [
            'https://picsum.photos/400/400?random=7',
            'https://picsum.photos/400/400?random=8',
        ],
        rating: 4.7,
        reviewCount: 856,
        specs: { 'Battery': '12h', 'Waterproof': 'IPX7' },
        reviews: [],
    },
    {
        id: 'e3',
        name: 'Wireless Charging Pad',
        description: 'Fast charge your devices wirelessly. Sleek design with non-slip surface and LED indicator.',
        price: 29.99,
        category: 'Electronics',
        image: 'https://picsum.photos/400/400?random=44',
        images: [
            'https://picsum.photos/400/400?random=9',
            'https://picsum.photos/400/400?random=10',
        ],
        rating: 4.3,
        reviewCount: 92,
        specs: { 'Output': '15W', 'Standard': 'Qi' },
        reviews: [],
    },
    {
        id: 'e4',
        name: 'Smart Home Hub',
        description: 'Control your entire home with your voice. Built-in assistant, premium speaker, and display for visual information.',
        price: 99.00,
        category: 'Electronics',
        image: 'https://picsum.photos/400/400?random=45',
        images: [
            'https://picsum.photos/400/400?random=11',
            'https://picsum.photos/400/400?random=12',
        ],
        rating: 4.5,
        reviewCount: 410,
        specs: { 'Display': '7 inch', 'Voice': 'Enabled' },
        reviews: [],
    },
    {
        id: 'e5',
        name: 'Professional Drone',
        description: 'Take to the skies with this high-performance drone. 30-minute flight time, 4K camera with gimbal, and obstacle avoidance.',
        price: 799.00,
        category: 'Electronics',
        image: 'https://picsum.photos/400/400?random=46',
        images: [
            'https://picsum.photos/400/400?random=13',
            'https://picsum.photos/400/400?random=14',
        ],
        rating: 4.9,
        reviewCount: 56,
        specs: { 'Flight Time': '30m', 'Camera': '4K' },
        reviews: [],
    },

    // --- FASHION ---
    {
        id: '4',
        name: 'Leather Messenger Bag',
        description: 'Handcrafted durable leather bag for your laptop and documents. Features multiple compartments and adjustable shoulder strap.',
        price: 199.00,
        category: 'Fashion',
        image: 'https://picsum.photos/400/400?random=47',
        images: [
            'https://picsum.photos/400/400?random=15',
            'https://picsum.photos/400/400?random=16',
        ],
        rating: 4.7,
        reviewCount: 156,
        specs: { 'Material': 'Leather', 'Fit': '15" Laptop' },
        reviews: [],
    },
    {
        id: 'f1',
        name: 'Classic Denim Jacket',
        description: 'A timeless wardrobe staple. Made from durable denim with a comfortable fit and vintage wash.',
        price: 89.50,
        category: 'Fashion',
        image: 'https://picsum.photos/400/400?random=48',
        images: [
            'https://picsum.photos/400/400?random=17',
            'https://picsum.photos/400/400?random=18',
        ],
        rating: 4.6,
        reviewCount: 201,
        specs: { 'Material': 'Cotton', 'Style': 'Vintage' },
        reviews: [],
    },
    {
        id: 'f2',
        name: 'Running Sneakers',
        description: 'Lightweight and breathable sneakers designed for performance. Cushioned sole provides excellent energy return.',
        price: 120.00,
        category: 'Fashion',
        image: 'https://picsum.photos/400/400?random=49',
        images: [
            'https://picsum.photos/400/400?random=19',
            'https://picsum.photos/400/400?random=20',
        ],
        rating: 4.8,
        reviewCount: 543,
        specs: { 'Usage': 'Running', 'Weight': '200g' },
        reviews: [],
    },
    {
        id: 'f3',
        name: 'Silk Scarf',
        description: 'Luxurious 100% silk scarf with a vibrant floral print. Adds a touch of elegance to any outfit.',
        price: 65.00,
        category: 'Fashion',
        image: 'https://picsum.photos/400/400?random=50',
        images: [
            'https://picsum.photos/400/400?random=21',
            'https://picsum.photos/400/400?random=22',
        ],
        rating: 4.9,
        reviewCount: 45,
        specs: { 'Material': 'Silk', 'Size': '90x90cm' },
        reviews: [],
    },
    {
        id: 'f4',
        name: 'Aviator Sunglasses',
        description: 'Iconic aviator style sunglasses with polarized lenses. Provide 100% UV protection and a cool look.',
        price: 150.00,
        category: 'Fashion',
        image: 'https://picsum.photos/400/400?random=51',
        images: [
            'https://picsum.photos/400/400?random=23',
            'https://picsum.photos/400/400?random=24',
        ],
        rating: 4.7,
        reviewCount: 189,
        specs: { 'Lens': 'Polarized', 'Frame': 'Metal' },
        reviews: [],
    },

    // --- ACCESSORIES ---
    {
        id: '2',
        name: 'Minimalist Wristwatch',
        description: 'A sleek, modern timepiece for the everyday professional. Swiss movement, sapphire crystal glass, and genuine Italian leather strap.',
        price: 149.50,
        category: 'Accessories',
        image: 'https://picsum.photos/400/400?random=52',
        images: [
            'https://picsum.photos/400/400?random=25',
            'https://picsum.photos/400/400?random=26',
        ],
        rating: 4.6,
        reviewCount: 89,
        specs: { 'Movement': 'Quartz', 'Water Resistant': '50m' },
        reviews: [],
    },
    {
        id: 'a1',
        name: 'Leather Wallet',
        description: 'Slim bifold wallet made from premium full-grain leather. RFID blocking technology keeps your cards safe.',
        price: 55.00,
        category: 'Accessories',
        image: 'https://picsum.photos/400/400?random=53',
        images: [
            'https://picsum.photos/400/400?random=27',
            'https://picsum.photos/400/400?random=28',
        ],
        rating: 4.8,
        reviewCount: 320,
        specs: { 'Material': 'Leather', 'RFID': 'Yes' },
        reviews: [],
    },
    {
        id: 'a2',
        name: 'Travel Backpack',
        description: 'The ultimate travel companion. Water-resistant, anti-theft zipper, and USB charging port integrated.',
        price: 85.00,
        category: 'Accessories',
        image: 'https://picsum.photos/400/400?random=54',
        images: [
            'https://picsum.photos/400/400?random=29',
            'https://picsum.photos/400/400?random=30',
        ],
        rating: 4.5,
        reviewCount: 412,
        specs: { 'Capacity': '30L', 'Waterproof': 'Yes' },
        reviews: [],
    },
    {
        id: 'a3',
        name: 'Gold Plated Necklace',
        description: 'Delicate 18k gold plated chain with a minimalist pendant. Perfect for layering or wearing alone.',
        price: 45.00,
        category: 'Accessories',
        image: 'https://picsum.photos/400/400?random=55',
        images: [
            'https://picsum.photos/400/400?random=31',
            'https://picsum.photos/400/400?random=32',
        ],
        rating: 4.6,
        reviewCount: 78,
        specs: { 'Material': 'Gold Plated', 'Length': '18 inch' },
        reviews: [],
    },

    // --- HOME ---
    {
        id: '6',
        name: 'Ceramic Coffee Set',
        description: 'Beautifully crafted ceramic set for the perfect morning brew. Includes pour-over dripper, carafe, and two cups.',
        price: 45.00,
        category: 'Home',
        image: 'https://picsum.photos/400/400?random=56',
        images: [
            'https://picsum.photos/400/400?random=33',
            'https://picsum.photos/400/400?random=34',
        ],
        rating: 4.5,
        reviewCount: 78,
        specs: { 'Material': 'Ceramic', 'Safe': 'Dishwasher' },
        reviews: [],
    },
    {
        id: 'h1',
        name: 'Scented Soy Candle',
        description: 'Hand-poured soy wax candle with essential oils. Long-lasting burn time and soothing lavender scent.',
        price: 24.00,
        category: 'Home',
        image: 'https://picsum.photos/400/400?random=57',
        images: [
            'https://picsum.photos/400/400?random=35',
            'https://picsum.photos/400/400?random=36',
        ],
        rating: 4.8,
        reviewCount: 156,
        specs: { 'Wax': 'Soy', 'Scent': 'Lavender' },
        reviews: [],
    },
    {
        id: 'h2',
        name: 'Modern Table Lamp',
        description: 'Add warmth to your room with this minimalist table lamp. Touch dimmer control and energy-saving LED bulb.',
        price: 60.00,
        category: 'Home',
        image: 'https://picsum.photos/400/400?random=58',
        images: [
            'https://picsum.photos/400/400?random=37',
            'https://picsum.photos/400/400?random=38',
        ],
        rating: 4.5,
        reviewCount: 89,
        specs: { 'Bulb': 'LED', 'Control': 'Touch' },
        reviews: [],
    },
];


// Helper functions
export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getAllCategories(): string[] {
    return [...new Set(products.map((p) => p.category))];
}

export function getRelatedProducts(productId: string, category: string, limit = 4): Product[] {
    return products
        .filter((p) => p.category.toLowerCase() === category.toLowerCase() && p.id !== productId)
        .slice(0, limit);
}
