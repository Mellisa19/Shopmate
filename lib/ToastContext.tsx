'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastContextType {
    toasts: Toast[];
    showToast: (message: string, type?: Toast['type']) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const value = useMemo(() => ({ toasts, showToast, removeToast }), [toasts, showToast, removeToast]);

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
