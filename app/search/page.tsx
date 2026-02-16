import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { Product } from '@/lib/data';
import { Suspense } from 'react';

export const revalidate = 60;

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

async function SearchResults({ query }: { query: string }) {
    let products: Product[] = [];

    if (query) {
        const { data } = await supabase
            .from('products')
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
            .order('created_at', { ascending: false });

        products = (data || []).map((p) => ({
            ...p,
            reviewCount: p.review_count,
            reviews: [],
        }));
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <SearchIcon className="h-6 w-6 text-zinc-400" />
                        {query ? (
                            <span>
                                Results for &quot;<span className="text-cyan-600">{query}</span>&quot;
                            </span>
                        ) : (
                            <span>Search Results</span>
                        )}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        Found {products.length} {products.length === 1 ? 'product' : 'products'}
                    </p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <Filter className="h-4 w-4" /> Filter & Sort
                </button>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-800 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700">
                    <div className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-full mb-4">
                        <SearchIcon className="h-8 w-8 text-zinc-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No results found</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-center">
                        Try checking your spelling or using more general terms.
                    </p>
                </div>
            )}
        </div>
    );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q || '';

    return (
        <main className="min-h-screen bg-zinc-100 dark:bg-zinc-900 py-4">
            <Suspense fallback={
                <div className="container mx-auto px-4 py-8 md:px-6 text-center">
                    <p>Loading results...</p>
                </div>
            }>
                <SearchResults query={query} />
            </Suspense>
        </main>
    );
}
