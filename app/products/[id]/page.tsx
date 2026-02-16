import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Product, Review } from '@/lib/data';
import ProductGallery from '@/components/ProductGallery';
import ProductSpecs from '@/components/ProductSpecs';
import ProductReviews, { StarRating } from '@/components/ProductReviews';
import ProductCard from '@/components/ProductCard';
import ProductActions from '@/components/ProductActions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;

    // 1. Fetch Product and Reviews
    const { data: productData, error } = await supabase
        .from('products')
        .select(`
            *,
            reviews (*)
        `)
        .eq('id', id)
        .single();

    if (error || !productData) {
        notFound();
    }

    // Map to Product Type
    const product: Product = {
        ...productData,
        reviewCount: productData.review_count,
        reviews: productData.reviews || [], // Supabase returns the relation as 'reviews' array
    };

    // 2. Fetch Related Products
    const { data: relatedData } = await supabase
        .from('products')
        .select('*')
        .eq('category', product.category)
        .neq('id', product.id)
        .limit(4);

    const relatedProducts: Product[] = (relatedData || []).map((p) => ({
        ...p,
        reviewCount: p.review_count,
        reviews: [],
    }));

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            <div className="container mx-auto px-4 py-8 md:px-6">
                {/* Breadcrumb */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-black dark:hover:text-white mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Shop
                </Link>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Gallery */}
                    <ProductGallery images={product.images} productName={product.name} />

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <Link
                                href={`/category/${product.category.toLowerCase()}`}
                                className="text-sm text-zinc-500 hover:text-black dark:hover:text-white"
                            >
                                {product.category}
                            </Link>
                            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
                            <div className="flex items-center gap-3 mt-3">
                                <StarRating rating={product.rating} size={18} />
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Actions (Add to Cart) */}
                        <ProductActions product={product} />

                        {/* Specs */}
                        <ProductSpecs specs={product.specs} />
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                    <ProductReviews
                        reviews={product.reviews}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />
                </div>

                {/* Related Products */}
                <div className="mt-16 pb-12">
                    <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

