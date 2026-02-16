'use client';

import { useChat } from '@ai-sdk/react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const { messages, sendMessage, status, setMessages, error } = useChat({
        onError: (error) => {
            setApiError(error.message);
        },
    });

    const isLoading = status === 'submitted' || status === 'streaming';

    useEffect(() => {
        console.log('Chat Status:', status);
        if (error) console.error('Chat Error:', error);
    }, [status, error]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const currentInput = input;
        setInput('');

        try {
            console.log('Sending message:', currentInput);
            await sendMessage({
                text: currentInput,
            });
        } catch (err) {
            console.error('Manual sendMessage catch:', err);
            setInput(currentInput); // Restore input on error
        }
    };
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const clearChat = () => {
        setMessages([]);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 h-14 w-14 bg-amber-400 hover:bg-amber-500 text-zinc-900 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-[99999]"
                    aria-label="Open AI Assistant"
                >
                    <MessageCircle className="h-7 w-7" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col z-[99999] overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-zinc-900 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-amber-400 p-1.5 rounded-lg text-zinc-900">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">ShopMate Assistant</h3>
                                <p className="text-xs text-zinc-400">Powered by AI</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={clearChat}
                                className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
                                title="Clear chat"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
                            >
                                <Minimize2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950/50">
                        {apiError && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-sm">
                                <p className="text-red-800 dark:text-red-200 font-medium">⚠️ Connection Error</p>
                                <p className="text-red-600 dark:text-red-400 text-xs mt-1">{apiError}</p>
                                <p className="text-red-600 dark:text-red-400 text-xs mt-2">Please check your API key configuration.</p>
                            </div>
                        )}

                        {messages.length === 0 && !apiError && (
                            <div className="text-center text-zinc-500 mt-10">
                                <p className="mb-2">👋 Hi there!</p>
                                <p className="text-sm">I can help you find products or answer questions about our store.</p>
                            </div>
                        )}

                        {messages.map((m) => (
                            <div key={m.id} className="space-y-4">
                                {m.parts.map((part, i) => {
                                    if (part.type === 'text') {
                                        return (
                                            <div key={`${m.id}-part-${i}`} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div
                                                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user'
                                                        ? 'bg-amber-400 text-zinc-900 rounded-tr-none'
                                                        : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 rounded-tl-none shadow-sm'
                                                        }`}
                                                >
                                                    <p className="whitespace-pre-wrap">{part.text}</p>
                                                </div>
                                            </div>
                                        );
                                    }

                                    if (part.type.startsWith('tool-')) {
                                        const toolName = part.type.split('-')[1];
                                        const toolInvocation = part as any; // Cast for easier access to properties like state and input
                                        const isCompleted = toolInvocation.state === 'output-available';

                                        return (
                                            <div key={toolInvocation.toolCallId} className="flex justify-start">
                                                <div className="bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl px-3 py-2 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                                                    {toolName === 'search_products' ? (
                                                        <span>{isCompleted ? 'Search completed' : `Searching for "${(toolInvocation.input as any)?.query || '...'}"...`}</span>
                                                    ) : (
                                                        <span>{isCompleted ? 'Details retrieved' : 'Fetching details...'}</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        ))}

                        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="relative">
                            <input
                                className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-sm transition-all"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Ask about products..."
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-400 hover:bg-amber-500 disabled:bg-zinc-200 disabled:cursor-not-allowed text-zinc-900 p-1.5 rounded-lg transition-colors"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
