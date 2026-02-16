'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CreditCard, Truck, CheckCircle2, ShoppingBag } from 'lucide-react';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
    const { items, total, subtotal, tax, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState<Step>('shipping');

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'Nigeria',
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
    });

    if (items.length === 0 && step !== 'review') {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="h-10 w-10 text-zinc-400" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-zinc-500 mb-8">Add components to your cart to proceed to checkout.</p>
                <Link href="/" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-bold px-8 py-3 rounded-full transition-colors">
                    Browse Products
                </Link>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (step === 'shipping') setStep('payment');
        else if (step === 'payment') setStep('review');
    };

    const handleBack = () => {
        if (step === 'payment') setStep('shipping');
        else if (step === 'review') setStep('payment');
    };

    const handlePlaceOrder = () => {
        // In a real app, this would call an API
        clearCart();
        router.push('/checkout/success');
    };

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-8">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Stepper */}
                        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
                            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-amber-500' : 'text-zinc-400'}`}>
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step === 'shipping' ? 'border-amber-500 bg-amber-50' : 'border-zinc-300'}`}>1</div>
                                <span className="font-medium whitespace-nowrap">Shipping</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-zinc-200 mx-4 min-w-[20px]"></div>
                            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-amber-500' : 'text-zinc-400'}`}>
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step === 'payment' ? 'border-amber-500 bg-amber-50' : 'border-zinc-300'}`}>2</div>
                                <span className="font-medium whitespace-nowrap">Payment</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-zinc-200 mx-4 min-w-[20px]"></div>
                            <div className={`flex items-center gap-2 ${step === 'review' ? 'text-amber-500' : 'text-zinc-400'}`}>
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step === 'review' ? 'border-amber-500 bg-amber-50' : 'border-zinc-300'}`}>3</div>
                                <span className="font-medium whitespace-nowrap">Review</span>
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
                            {step === 'shipping' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold border-b pb-4 flex items-center gap-2">
                                        <Truck className="h-5 w-5" /> Shipping Address
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">First Name</label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Last Name</label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Street Address</label>
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="123 Shopping St." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">City</label>
                                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="Lagos" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Zip Code</label>
                                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="100001" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'payment' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold border-b pb-4 flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" /> Payment Method
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg flex items-center justify-between border-2 border-amber-400">
                                            <div className="flex items-center gap-3">
                                                <CreditCard className="h-6 w-6 text-amber-500" />
                                                <div>
                                                    <p className="font-bold">Credit/Debit Card</p>
                                                    <p className="text-xs text-zinc-500">Pay securely with your card</p>
                                                </div>
                                            </div>
                                            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
                                                <CheckCircle2 className="h-4 w-4 text-white" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Cardholder Name</label>
                                            <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="FULL NAME" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Card Number</label>
                                            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="0000 0000 0000 0000" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Expiry Date</label>
                                                <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="MM/YY" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">CVV</label>
                                                <input type="password" name="cvv" value={formData.cvv} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-400 outline-none dark:bg-zinc-900 dark:border-zinc-700" placeholder="123" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'review' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold border-b pb-4 flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5" /> Review Your Order
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="font-bold text-sm mb-2 uppercase text-zinc-500">Shipping To</h3>
                                                <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                                                <p className="text-zinc-600 dark:text-zinc-400">{formData.address}</p>
                                                <p className="text-zinc-600 dark:text-zinc-400">{formData.city}, {formData.zipCode}</p>
                                                <p className="text-zinc-600 dark:text-zinc-400">{formData.email}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm mb-2 uppercase text-zinc-500">Payment</h3>
                                                <p className="font-medium">Card ending in {formData.cardNumber.slice(-4) || 'XXXX'}</p>
                                                <p className="text-zinc-600 dark:text-zinc-400">Exp: {formData.expiry}</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 border-t pt-6">
                                            <h3 className="font-bold text-sm mb-4 uppercase text-zinc-500">Order Items</h3>
                                            <div className="space-y-4">
                                                {items.map((item) => (
                                                    <div key={item.product.id} className="flex gap-4">
                                                        <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0 bg-zinc-100">
                                                            <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-sm leading-tight">{item.product.name}</p>
                                                            <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                                                        </div>
                                                        <p className="font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="mt-10 flex items-center justify-between gap-4 border-t pt-6">
                                {step !== 'shipping' ? (
                                    <button onClick={handleBack} className="flex items-center gap-2 px-6 py-2 border border-zinc-200 dark:border-zinc-700 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                        <ChevronLeft className="h-4 w-4" /> Back
                                    </button>
                                ) : (
                                    <Link href="/cart" className="flex items-center gap-2 px-6 py-2 border border-zinc-200 dark:border-zinc-700 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm">
                                        Return to Cart
                                    </Link>
                                )}

                                {step === 'review' ? (
                                    <button onClick={handlePlaceOrder} className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-bold px-10 py-3 rounded-full shadow-lg transition-transform hover:scale-105">
                                        Place Order - ${total.toFixed(2)}
                                    </button>
                                ) : (
                                    <button onClick={handleNext} className="bg-zinc-900 text-white dark:bg-white dark:text-black font-bold px-10 py-3 rounded-full flex items-center gap-2 transition-transform hover:scale-105 ml-auto">
                                        Next Step <ChevronRight className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 sticky top-24">
                            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                            <div className="space-y-3 text-sm pb-4 border-b">
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Items ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Shipping</span>
                                    <span className="text-green-600 font-medium">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Tax (8%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between pt-4 pb-2 text-lg font-bold">
                                <span>Total</span>
                                <span className="text-red-600">${total.toFixed(2)}</span>
                            </div>
                            <p className="text-[10px] text-zinc-400 text-center mt-4">
                                By placing your order, you agree to ShopMate&apos;s conditions of use and privacy notice.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
