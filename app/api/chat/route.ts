import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: openai('gpt-4o'),
            system: `You are ShopMate's AI Shopping Assistant. 
    You help customers find products, answer questions about specifications, and provide recommendations based on our live inventory.
    
    Rules:
    1. Use the search_products tool to find products.
    2. Use the get_product_details tool if you need more info about a specific product.
    3. Only recommend products found in the catalog.
    4. If no products are found, suggest searching for broader terms or categories.
    5. Be helpful, friendly, and concise.
    6. Always format product names in bold (e.g., **Product Name**).
    7. When recommending, mention the price and one key feature.
    8. You can search by name, category, or description.`,
            messages,
            tools: {
                search_products: tool({
                    description: 'Search for products in the store catalog by query string (name, category, or description).',
                    execute: async ({ query }) => {
                        const { data, error } = await supabase
                            .from('products')
                            .select('*')
                            .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
                            .limit(5);

                        if (error) {
                            console.error('Tool search_products error:', error);
                            throw error;
                        }
                        return data || [];
                    },
                    inputSchema: z.object({
                        query: z.string().describe('The search terms to look for'),
                    }),
                }),
                get_product_details: tool({
                    description: 'Get detailed information about a specific product by its ID.',
                    execute: async ({ id }) => {
                        const { data, error } = await supabase
                            .from('products')
                            .select('*')
                            .eq('id', id)
                            .single();

                        if (error) {
                            console.error('Tool get_product_details error:', error);
                            throw error;
                        }
                        return data;
                    },
                    inputSchema: z.object({
                        id: z.string().describe('The unique identifier of the product'),
                    }),
                }),
            },
        });

        return result.toUIMessageStreamResponse();
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: error.message || 'An error occurred during chat' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
