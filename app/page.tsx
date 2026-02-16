import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';
import { ArrowRight, Truck, Shield, CreditCard, Headphones } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/lib/data';

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  // Fetch products from Supabase
  const { data: dbProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  // Map DB result to Product type
  const products: Product[] = (dbProducts || []).map((p) => ({
    ...p,
    reviewCount: p.review_count, // Map snake_case to camelCase
    reviews: [], // We don't need full reviews for the card
  }));

  // Derive categories from fetched products
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      {/* Hero Banner */}
      <section className="relative w-full bg-gradient-to-b from-cyan-700 via-cyan-600 to-zinc-100 dark:to-zinc-900 h-[300px] md:h-[400px]">
        <div className="container mx-auto px-4 md:px-6 pt-8 pb-24 md:pb-32">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
              New Year, New Deals
            </h1>
            <p className="text-white/90 mt-3 text-lg">
              Save big on electronics, fashion, and more. Limited time offers!
            </p>
            <Link
              href="#shop"
              className="inline-block mt-6 bg-amber-400 hover:bg-amber-500 text-zinc-900 font-bold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards - Overlapping */}
      <section className="container mx-auto px-4 md:px-6 -mt-20 md:-mt-28 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=400&auto=format&fit=crop' },
            { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400&auto=format&fit=crop' },
            { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop' },
            { name: 'Home', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop' },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow group"
            >
              <h3 className="font-bold text-lg mb-3">{category.name}</h3>
              <div className="aspect-square relative bg-zinc-100 dark:bg-zinc-700 rounded overflow-hidden mb-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-sm text-cyan-600 dark:text-cyan-400 font-medium group-hover:underline">
                Shop now
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="container mx-auto px-4 md:px-6 py-8 mt-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <Truck className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm">Free Delivery</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-bold text-sm">Secure Payment</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">100% protected</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-bold text-sm">Easy Returns</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">30-day policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Headphones className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-bold text-sm">24/7 Support</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Dedicated help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <section className="container mx-auto px-4 md:px-6 py-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Today&apos;s Deals</h2>
            <Link
              href="#"
              className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              See all deals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product, index) => {
              const discounts = [25, 15, 30, 20, 18, 22];
              const discount = discounts[index % discounts.length];
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group"
                >
                  <div className="aspect-square relative bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{discount}%
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{product.name}</p>
                  <p className="font-bold text-red-600">${product.price.toFixed(2)}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Product Grid */}
      <section id="shop" className="container mx-auto px-4 md:px-6 py-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Popular Products</h2>
            <Link
              href="/category/electronics"
              className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="container mx-auto px-4 md:px-6 py-8 mb-8">
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-lg shadow-lg p-8 md:p-12 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Join ShopMate Newsletter
          </h2>
          <p className="text-zinc-300 mb-6 max-w-lg">
            Get exclusive deals, new arrivals, and early access to sales delivered to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
