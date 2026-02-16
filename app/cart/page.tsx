'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, CartItem as CartItemType } from '@/lib/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

function CartItemRow({ item }: { item: CartItemType }) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="flex gap-4 py-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                    <div>
                        <Link
                            href={`/products/${item.product.id}`}
                            className="font-medium hover:underline"
                        >
                            {item.product.name}
                        </Link>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            {item.product.category}
                        </p>
                    </div>
                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CartPage() {
    const { items, subtotal, tax, total, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-white dark:bg-black">
                <div className="container mx-auto px-4 py-16 md:px-6 text-center">
                    <ShoppingBag className="h-16 w-16 mx-auto text-zinc-300 dark:text-zinc-600" />
                    <h1 className="text-2xl font-bold mt-6">Your cart is empty</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                        Looks like you haven&apos;t added anything to your cart yet.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 mt-8 h-12 px-8 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            <div className="container mx-auto px-4 py-8 md:px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-black dark:hover:text-white mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                </Link>

                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
                            <span className="text-sm text-zinc-500">{items.length} item(s)</span>
                            <button
                                onClick={clearCart}
                                className="text-sm text-zinc-500 hover:text-red-500 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                        {items.map((item) => (
                            <CartItemRow key={item.product.id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 sticky top-24">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-500 dark:text-zinc-400">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500 dark:text-zinc-400">Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500 dark:text-zinc-400">Tax (8%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 mt-3">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href="/checkout"
                                className="w-full mt-6 h-12 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200 flex items-center justify-center"
                            >
                                Proceed to Checkout
                            </Link>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-4">
                                Secure checkout powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
