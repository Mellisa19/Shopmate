'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, User, MapPin, ChevronDown, Menu, LogOut } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function Header() {
    const { itemCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        const userData = localStorage.getItem('user_data');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        setUser(null);
        router.push('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Top Bar */}
            <div className="bg-zinc-900 text-white">
                <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1 flex-shrink-0 hover:ring-1 hover:ring-white p-1 rounded">
                        <span className="text-xl font-bold tracking-tight">Shop</span>
                        <span className="text-xl font-bold text-amber-400">Mate</span>
                    </Link>

                    {/* Deliver To */}
                    <div className="hidden lg:flex items-center gap-1 text-sm hover:ring-1 hover:ring-white p-1 rounded cursor-pointer">
                        <MapPin className="h-5 w-5 text-white" />
                        <div className="flex flex-col">
                            <span className="text-xs text-zinc-400">Deliver to</span>
                            <span className="font-bold text-sm">Nigeria</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-3xl">
                        <form onSubmit={handleSearch} className="flex">
                            <button type="button" className="hidden sm:flex items-center gap-1 bg-zinc-200 text-zinc-800 px-3 py-2 text-sm font-medium rounded-l-md hover:bg-zinc-300">
                                All <ChevronDown className="h-4 w-4" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search ShopMate"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-amber-400 sm:rounded-none rounded-l-md"
                            />
                            <button type="submit" className="bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-r-md">
                                <Search className="h-5 w-5 text-zinc-900" />
                            </button>
                        </form>
                    </div>

                    {/* Account & Cart */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Account */}
                        {user ? (
                            <div className="hidden md:flex items-center gap-2">
                                <Link href="/dashboard" className="flex items-center gap-2 text-sm hover:ring-1 hover:ring-white p-1 rounded">
                                    <User className="h-5 w-5" />
                                    <span className="font-bold">{user.first_name}</span>
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 text-sm hover:ring-1 hover:ring-white p-1 rounded text-zinc-400 hover:text-white"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link href="/auth/signin" className="hidden md:flex flex-col text-sm hover:ring-1 hover:ring-white p-1 rounded">
                                <span className="text-xs text-zinc-400">Hello, sign in</span>
                                <span className="font-bold flex items-center">Account <ChevronDown className="h-3 w-3 ml-1" /></span>
                            </Link>
                        )}

                        {/* Orders */}
                        <Link href="#" className="hidden md:flex flex-col text-sm hover:ring-1 hover:ring-white p-1 rounded">
                            <span className="text-xs text-zinc-400">Returns</span>
                            <span className="font-bold">& Orders</span>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="flex items-center gap-1 hover:ring-1 hover:ring-white p-1 rounded relative">
                            <div className="relative">
                                <ShoppingCart className="h-7 w-7" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-zinc-900">
                                        {itemCount > 99 ? '99+' : itemCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:block font-bold text-sm">Cart</span>
                        </Link>

                        {/* Mobile Menu */}
                        <button className="md:hidden p-1 hover:ring-1 hover:ring-white rounded">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-zinc-800 text-white text-sm">
                <div className="container mx-auto flex items-center gap-1 px-4 md:px-6 py-1 overflow-x-auto">
                    <button className="flex items-center gap-1 font-bold hover:ring-1 hover:ring-white px-2 py-1.5 rounded whitespace-nowrap">
                        <Menu className="h-5 w-5" /> All
                    </button>
                    <Link href="/category/electronics" className="hover:ring-1 hover:ring-white px-2 py-1.5 rounded whitespace-nowrap">
                        Electronics
                    </Link>
                    <Link href="/category/fashion" className="hover:ring-1 hover:ring-white px-2 py-1.5 rounded whitespace-nowrap">
                        Fashion
                    </Link>
                    <Link href="/category/accessories" className="hover:ring-1 hover:ring-white px-2 py-1.5 rounded whitespace-nowrap">
                        Accessories
                    </Link>
                    <Link href="#" className="hover:ring-1 hover:ring-white px-2 py-1.5 rounded whitespace-nowrap">
                        Today&apos;s Deals
                    </Link>
                    <Link href="#" className="hover:ring-1 hover:ring-white px-2 py-1.5 rounded whitespace-nowrap">
                        Customer Service
                    </Link>
                    <Link href="#" className="hover:ring-1 hover:ring-white px-2 py-1.5 rounded whitespace-nowrap text-amber-400 font-medium">
                        Gift Cards
                    </Link>
                </div>
            </div>
        </header>
    );
}
