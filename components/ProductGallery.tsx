'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <img
                    src={images[selectedIndex]}
                    alt={productName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${selectedIndex === index
                                    ? 'border-black dark:border-white'
                                    : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-600'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${productName} - View ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
