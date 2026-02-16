'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/lib/ToastContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        showToast(`${product.name} added to cart`);
    };

    return (
        <Link href={`/products/${product.id}`} className="group block">
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-lg transition-all">
                {/* Image */}
                <div className="aspect-square relative bg-zinc-50 dark:bg-zinc-700 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-400 hover:bg-amber-500 text-zinc-900 p-2.5 rounded-full shadow-lg"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-medium text-sm leading-tight line-clamp-2 min-h-[40px] group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= Math.round(product.rating)
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'fill-zinc-200 text-zinc-200 dark:fill-zinc-600 dark:text-zinc-600'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-cyan-600 dark:text-cyan-400 ml-1">
                            {product.reviewCount.toLocaleString()}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            <span className="text-green-600 dark:text-green-400 font-medium">FREE delivery</span> on orders over $50
                        </p>
                    </div>

                    {/* Badge */}
                    <div className="mt-3">
                        <span className="inline-block text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded">
                            {product.category}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
