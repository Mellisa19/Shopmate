import { createClient } from '@supabase/supabase-js';
import { products } from '../lib/data';
import fs from 'fs';
import path from 'path';

// Simple .env.local loader
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf-8');
            envConfig.split('\n').forEach((line) => {
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key.trim()] = value.trim();
                }
            });
            console.log('Loaded .env.local');
        } else {
            console.warn('No .env.local file found');
        }
    } catch (e) {
        console.error('Error loading .env.local', e);
    }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env.local');
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY) are set.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log('Starting seed...');

    for (const product of products) {
        // 1. Insert Product
        const { reviews, ...productData } = product;

        // Rename 'reviewCount' to 'review_count' to match SQL snake_case if needed, 
        // or just rely on the table having 'review_count' and we map it.
        // Our SQL has 'review_count', data has 'reviewCount'.
        // We need to map camelCase to snake_case for the DB insert.

        const dbProduct = {
            id: productData.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            category: productData.category,
            image: productData.image,
            images: productData.images,
            rating: productData.rating,
            review_count: productData.reviewCount, // Map to snake_case
            specs: productData.specs,
        };

        const { error: productError } = await supabase
            .from('products')
            .upsert(dbProduct);

        if (productError) {
            console.error(`Error inserting product ${product.name}:`, productError.message);
            continue;
        }
        console.log(`Inserted product: ${product.name}`);

        // 2. Insert Reviews
        if (reviews && reviews.length > 0) {
            const dbReviews = reviews.map((r) => ({
                id: r.id,
                product_id: product.id,
                author: r.author,
                rating: r.rating,
                date: r.date,
                comment: r.comment,
            }));

            const { error: reviewError } = await supabase
                .from('reviews')
                .upsert(dbReviews);

            if (reviewError) {
                console.error(`Error inserting reviews for ${product.name}:`, reviewError.message);
            } else {
                console.log(`  Inserted ${reviews.length} reviews`);
            }
        }
    }

    console.log('Seeding complete!');
}

seed();
