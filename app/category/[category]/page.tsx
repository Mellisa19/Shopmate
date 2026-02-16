import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import CategoryHero from '@/components/CategoryHero';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Product } from '@/lib/data';

export const revalidate = 60;

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

async function getCategoryProducts(category: string) {
    const { data } = await supabase
        .from('products')
        .select('*')
        .ilike('category', category)
        .order('created_at', { ascending: false });

    return (data || []).map((p) => ({
        ...p,
        reviewCount: p.review_count,
        reviews: [],
    })) as Product[];
}

async function getCategories() {
    const { data } = await supabase
        .from('products')
        .select('category');

    // Get unique categories
    const categories = Array.from(new Set((data || []).map(p => p.category)));
    return categories;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    // Parallel fetch
    const [products, allCategories] = await Promise.all([
        getCategoryProducts(decodedCategory),
        getCategories()
    ]);

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black">
            <div className="container mx-auto px-4 py-8 md:px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-black dark:hover:text-white mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Shop
                </Link>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="md:w-48 flex-shrink-0 hidden md:block">
                        <h2 className="font-semibold mb-4 text-lg">Categories</h2>
                        <nav className="space-y-2">
                            {allCategories.map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/category/${cat.toLowerCase()}`}
                                    className={`block text-sm py-2 px-3 rounded-lg transition-colors ${cat.toLowerCase() === decodedCategory.toLowerCase()
                                        ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                                        }`}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Hero Banner */}
                        <CategoryHero category={decodedCategory} count={products.length} />

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-lg font-medium">No products found</h3>
                                <p className="text-zinc-500">Check back later for new arrivals in {decodedCategory}.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
