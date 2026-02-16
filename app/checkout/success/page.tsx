'use client';

import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CheckoutSuccessPage() {
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // Generate a simulated order ID
        const id = 'SM' + Math.random().toString(36).substring(2, 10).toUpperCase();
        setOrderId(id);
    }, []);

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-20">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-10 border border-zinc-200 dark:border-zinc-700">
                    <div className="bg-green-100 dark:bg-green-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                        Thank you for your purchase. We&apos;ve sent a confirmation email to your address.
                    </p>

                    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4 border-b pb-4">
                            <span className="text-sm font-medium text-zinc-500">Order ID</span>
                            <span className="font-bold text-zinc-900 dark:text-white">#{orderId}</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-zinc-200 dark:bg-zinc-700 p-3 rounded-full">
                                <Truck className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div className="text-sm">
                                <p className="font-bold">Shipping Update</p>
                                <p className="text-zinc-500 italic">Estimated delivery in 3-5 business days</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-700 rounded-full font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <Home className="h-4 w-4" /> Go to Homepage
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-zinc-900 rounded-full font-bold shadow-md transition-transform hover:scale-105"
                        >
                            Manage Orders <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

// Re-using Truck icon from Lucide since I need it in this file too
function Truck({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
            <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
            <circle cx="7" cy="18" r="2" />
            <path d="M15 18H9" />
            <circle cx="17" cy="18" r="2" />
        </svg>
    );
}
