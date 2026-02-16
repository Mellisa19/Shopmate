import Image from 'next/image';

const CATEGORY_IMAGES: Record<string, string> = {
    electronics: 'https://picsum.photos/800/400?random=electronics',
    fashion: 'https://picsum.photos/800/400?random=fashion',
    accessories: 'https://picsum.photos/800/400?random=accessories',
    home: 'https://picsum.photos/800/400?random=home',
    default: 'https://picsum.photos/800/400?random=default',
};

interface CategoryHeroProps {
    category: string;
    count: number;
}

export default function CategoryHero({ category, count }: CategoryHeroProps) {
    const slug = category.toLowerCase();
    const image = CATEGORY_IMAGES[slug] || CATEGORY_IMAGES.default;

    return (
        <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden mb-8">
            <img
                src={image}
                alt={category}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white capitalize mb-2">
                    {category}
                </h1>
                <p className="text-zinc-200">
                    Explore our collection of {count} premium items
                </p>
            </div>
        </div>
    );
}
