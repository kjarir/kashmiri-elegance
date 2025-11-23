# Database Setup Guide

This guide will help you set up the Supabase database for the Kashmiri Elegance e-commerce application.

## Prerequisites

1. Access to your Supabase project dashboard
2. PostgreSQL client (psql) or access to Supabase SQL Editor

## Step 1: Get Your Supabase Anon Key

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Settings** → **API**
3. Copy the **anon/public** key
4. Add it to your `.env` file (see Step 3)

## Step 2: Run the Database Schema

You have two options to run the schema:

### Option A: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of `schema.sql`
5. Paste it into the SQL Editor
6. Click **Run** or press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)

### Option B: Using psql Command Line

```bash
psql "postgresql://postgres:Afsha@9987840201@db.qvkopnngmjddrldslboh.supabase.co:5432/postgres" -f schema.sql
```

## Step 3: Configure Environment Variables

Create a `.env` file in the root of your project with the following:

```env
VITE_SUPABASE_URL=https://qvkopnngmjddrldslboh.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_anon_key_here` with the anon key you copied in Step 1.

## Step 4: Create Your First Admin User

After running the schema, you need to create an admin user:

1. Go to **Authentication** → **Users** in your Supabase dashboard
2. Click **Add User** → **Create New User**
3. Enter an email and password for your admin account
4. Copy the user's UUID (you'll need this for the next step)
5. Go to **SQL Editor** and run:

```sql
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'USER_UUID_HERE',  -- Replace with the UUID from step 4
  'admin@example.com',  -- Replace with the email you used
  'Admin User',
  'admin',
  true
);
```

## Step 5: Insert Sample Products (Optional)

You can insert sample products using the SQL Editor:

```sql
INSERT INTO products (name, category, price, original_price, description, image_url, images, rating, reviews_count, in_stock, stock_quantity, features, specifications, featured)
VALUES 
(
  'Premium Pashmina Shawl',
  'Pashmina',
  25000.00,
  32000.00,
  '100% pure pashmina wool, handwoven by master artisans',
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80'],
  4.8,
  127,
  true,
  10,
  '["100% Pure Pashmina Wool", "Hand-woven by Master Artisans", "Traditional Kashmiri Patterns"]'::jsonb,
  '{"Material": "100% Pure Pashmina Wool", "Dimensions": "200cm x 100cm", "Weight": "250 grams"}'::jsonb,
  true
),
(
  'Kashmiri Silk Carpet',
  'Carpets',
  150000.00,
  180000.00,
  'Hand-knotted silk carpet with intricate traditional patterns',
  'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80'],
  4.9,
  89,
  true,
  5,
  '["Hand-knotted", "Pure Silk", "Traditional Patterns"]'::jsonb,
  '{"Material": "Pure Silk", "Dimensions": "300cm x 200cm", "Origin": "Kashmir, India"}'::jsonb,
  true
);
```

## Database Tables

### `products`
Stores all product information including:
- Basic info (name, category, price, description)
- Images (single image_url or array of images)
- Ratings and reviews
- Stock information
- Features and specifications (stored as JSONB)
- Featured flag

### `admin_users`
Stores admin user metadata:
- Links to Supabase Auth users
- Role and permissions
- Active status

## Row Level Security (RLS)

The database uses Row Level Security (RLS) policies:
- **Products**: Public read access, admin-only write access
- **Admin Users**: Admin-only access

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure your `.env` file exists in the project root
- Verify that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart your development server after adding environment variables

### "Access denied" when trying to login as admin
- Verify the user exists in `admin_users` table
- Check that `is_active` is set to `true`
- Ensure the user ID matches the UUID in Supabase Auth

### Products not showing up
- Check that products exist in the database
- Verify RLS policies are enabled
- Check browser console for errors

