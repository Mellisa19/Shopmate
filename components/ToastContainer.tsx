'use client';

import { useToast } from '@/lib/ToastContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-right-5 ${toast.type === 'success'
                            ? 'bg-green-600 text-white'
                            : toast.type === 'error'
                                ? 'bg-red-600 text-white'
                                : 'bg-zinc-800 text-white'
                        }`}
                >
                    {toast.type === 'success' && <CheckCircle className="h-5 w-5" />}
                    {toast.type === 'error' && <AlertCircle className="h-5 w-5" />}
                    {toast.type === 'info' && <Info className="h-5 w-5" />}
                    <span className="text-sm font-medium">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="ml-2 hover:opacity-70"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
