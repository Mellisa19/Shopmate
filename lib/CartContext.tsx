'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { Product } from './data';

// Types
export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
    tax: number;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.08; // 8% tax

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback((product: Product, quantity: number = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((item) => item.product.id !== productId));
        } else {
            setItems((prev) =>
                prev.map((item) =>
                    item.product.id === productId ? { ...item, quantity } : item
                )
            );
        }
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        [items]
    );

    const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);

    const total = useMemo(() => subtotal + tax, [subtotal, tax]);

    const value = useMemo(
        () => ({
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            itemCount,
            subtotal,
            tax,
            total,
        }),
        [items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, tax, total]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
