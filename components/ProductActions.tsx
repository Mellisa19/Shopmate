'use client';

import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/lib/ToastContext';
import { Product } from '@/lib/data';

interface ProductActionsProps {
    product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
    const { addItem } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = () => {
        addItem(product);
        showToast(`${product.name} added to cart`);
    };

    return (
        <div className="flex gap-4 pt-4">
            <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
            </button>
            <button className="h-12 w-12 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <Heart className="h-5 w-5" />
            </button>
        </div>
    );
}
