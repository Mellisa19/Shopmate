'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [gdprConsent, setGdprConsent] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setStatus('error');
            setMessage('Please enter your email address');
            return;
        }

        if (!gdprConsent) {
            setStatus('error');
            setMessage('Please accept the privacy policy');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, gdprConsent }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message);
                setEmail('');
                setGdprConsent(false);
            } else {
                setStatus('error');
                setMessage(data.error);
            }
        } catch {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
                    disabled={status === 'loading' || status === 'success'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="bg-amber-400 hover:bg-amber-500 disabled:bg-amber-300 text-zinc-900 font-bold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    {status === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
                    {status === 'success' ? 'Subscribed!' : 'Subscribe'}
                </button>
            </div>

            {/* GDPR Consent */}
            <label className="flex items-start gap-2 mt-4 text-sm text-zinc-400 cursor-pointer">
                <input
                    type="checkbox"
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    className="mt-1 rounded border-zinc-600 text-amber-400 focus:ring-amber-400"
                    disabled={status === 'loading' || status === 'success'}
                />
                <span>
                    I agree to receive marketing emails and accept the{' '}
                    <Link href="/privacy" className="text-amber-400 hover:underline">
                        Privacy Policy
                    </Link>
                    . You can unsubscribe at any time.
                </span>
            </label>

            {/* Status Messages */}
            {message && (
                <div
                    className={`mt-4 flex items-center gap-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'
                        }`}
                >
                    {status === 'success' ? (
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    {message}
                </div>
            )}
        </form>
    );
}
