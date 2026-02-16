https://oqojqqgibweomuflmpyz.supabase.co# Supabase Database Setup

Run this SQL in your Supabase SQL Editor to create the newsletter subscribers table.

## Go to: Supabase Dashboard > SQL Editor > New Query

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_sessions table for authentication
CREATE TABLE user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  gdpr_consent BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'website',
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY, -- Using TEXT to keep our mock IDs for now, or use UUID DEFAULT gen_random_uuid()
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  images TEXT[],       -- Array of image URLs
  rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  specs JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  author TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  date TIMESTAMPTZ DEFAULT NOW(),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name TEXT,
  customer_email TEXT,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered
  items JSONB NOT NULL,          -- Store the array of cart items
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- POLICIES

-- newsletter_subscribers: Public insert, no public read
CREATE POLICY "Allow anonymous inserts" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Deny anonymous reads" ON newsletter_subscribers FOR SELECT USING (false);

-- products: Public read, admin write (we'll allow anon write for seeding logic briefly, or you use service key)
-- For simplicity in this demo, we allow anon read.
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);

-- reviews: Public read, authenticated/anon insert
CREATE POLICY "Allow public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert reviews" ON reviews FOR INSERT WITH CHECK (true);

-- orders: Anon insert (placing order), No anon read (or only read own if auth implemented)
CREATE POLICY "Allow anonymous create orders" ON orders FOR INSERT WITH CHECK (true);

```

## Environment Variables

After creating your Supabase project, add these to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
RESEND_API_KEY=re_your_resend_api_key
```

## Resend Setup

1. Go to https://resend.com and sign up
2. Verify your domain (or use their test domain for development)
3. Get your API key from the dashboard
4. Update the "from" email in the API route to use your verified domain
