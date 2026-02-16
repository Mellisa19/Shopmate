'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-zinc-900 text-white">
            {/* Back to top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-zinc-700 hover:bg-zinc-600 py-3 text-sm text-center transition-colors"
            >
                Back to top
            </button>

            {/* Main Footer */}
            <div className="container mx-auto px-4 py-10 md:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div>
                        <h3 className="font-bold mb-4">Get to Know Us</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="#" className="hover:text-white hover:underline">About ShopMate</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Careers</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Press Releases</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">ShopMate Science</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Make Money with Us</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="#" className="hover:text-white hover:underline">Sell products</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Become an Affiliate</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Advertise Products</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Self-Publish</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Payment Products</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="#" className="hover:text-white hover:underline">Business Card</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Shop with Points</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Reload Your Balance</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Currency Converter</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Let Us Help You</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="#" className="hover:text-white hover:underline">Your Account</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Your Orders</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Shipping Rates</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Returns & Replacements</Link></li>
                            <li><Link href="#" className="hover:text-white hover:underline">Help</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <h3 className="font-bold mb-4">Connect with Us</h3>
                        <div className="flex gap-4 mb-4">
                            <a href="#" className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="text-sm text-zinc-400">
                            Download our app for the best experience
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-zinc-800">
                <div className="container mx-auto px-4 py-6 md:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <Link href="/" className="flex items-center gap-1">
                            <span className="text-lg font-bold">Shop</span>
                            <span className="text-lg font-bold text-amber-400">Mate</span>
                        </Link>
                        <div className="flex flex-wrap justify-center gap-4 text-xs text-zinc-400">
                            <Link href="#" className="hover:text-white hover:underline">Conditions of Use</Link>
                            <Link href="#" className="hover:text-white hover:underline">Privacy Notice</Link>
                            <Link href="#" className="hover:text-white hover:underline">Interest-Based Ads</Link>
                        </div>
                        <p className="text-xs text-zinc-500">© 2026 ShopMate Inc. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
