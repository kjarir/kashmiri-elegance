# Admin System Setup Guide

This guide will help you set up the complete admin system with authentication, product management, and image uploads.

## Prerequisites

- A Supabase project (already connected based on your code)
- Admin access to your Supabase dashboard

## Step 1: Run Database Migrations

Execute these SQL scripts in your Supabase SQL Editor in order:

### 1. Main Schema (if not already done)
```sql
-- Run: database/schema.sql
```

### 2. User Roles Table
```sql
-- Run: database/migrations/001_user_roles.sql
```
This creates:
- `app_role` enum (admin, moderator, user)
- `user_roles` table for role management
- Security definer functions to avoid RLS recursion
- Proper RLS policies

### 3. Storage Buckets for Images
```sql
-- Run: database/migrations/002_storage_buckets.sql
```
This creates:
- `product-images` storage bucket (public)
- RLS policies for image uploads (admin only)
- Public read access for all images

### 4. Categories Table
```sql
-- Run: database/migrations/003_categories.sql
```
This creates:
- `categories` table for product organization
- Default categories (Pashmina, Carpets, Kurtis, etc.)
- Proper RLS policies

## Step 2: Create Your Admin User

### Option A: Create Admin via Supabase Dashboard
1. Go to Authentication > Users in Supabase dashboard
2. Click "Add User" → "Create New User"
3. Enter email and password
4. Click "Create User"
5. Note the UUID of the created user

### Option B: Sign up via your app (requires email confirmation)
1. Create a temporary signup page
2. Register with your admin email
3. Confirm the email
4. Get your user UUID from Supabase Auth dashboard

### Add Admin Role
After creating the user, run this SQL (replace the UUID and email):

```sql
-- Insert into admin_users table
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'YOUR_USER_UUID_HERE',
  'admin@yourdomain.com',
  'Admin Name',
  'admin',
  true
);

-- Add admin role
INSERT INTO user_roles (user_id, role)
VALUES ('YOUR_USER_UUID_HERE', 'admin');
```

## Step 3: Test Admin Login

1. Go to your Products page (`/products`)
2. Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac)
3. Enter your admin credentials
4. You should be redirected to the admin dashboard

## Step 4: Verify Storage Bucket

Go to Storage in Supabase dashboard and verify:
- `product-images` bucket exists
- Bucket is set to **Public**
- RLS policies are enabled

If the bucket is not public, run:
```sql
UPDATE storage.buckets 
SET public = true 
WHERE id = 'product-images';
```

## Admin Features

Once logged in, you can access:

### Admin Dashboard (`/admin/dashboard`)
- View statistics (total products, categories, stock status)
- Quick access to product and category management
- Logout functionality

### Product Management (`/admin/products`)
- View all products in a table format
- Search products by name or category
- Edit, delete, or view products
- See stock status and pricing at a glance

### Create/Edit Product (`/admin/products/new` or `/admin/products/edit/:id`)
- **Basic Information**: Name, category, price, stock
- **Multiple Images**: Upload multiple product images (first is primary)
- **Features**: Add bullet-point features
- **Specifications**: Add key-value specifications (Material, Size, etc.)
- **Stock Management**: Set in-stock status and quantity
- **Featured Products**: Mark products to display on homepage

### Image Upload
- Drag and drop or click to upload
- Multiple images per product
- First image is set as primary (used in cards and listings)
- Images stored in Supabase Storage
- Automatic URL generation

### Categories
Pre-configured categories:
- Pashmina
- Carpets
- Kurtis
- Shawls
- Handicrafts

## Security Features

✅ **Row Level Security (RLS)**: All tables protected
✅ **Admin-Only Access**: Products CRUD requires admin role
✅ **Secure Image Upload**: Only admins can upload images
✅ **Public Read**: Anyone can view products and images
✅ **Role-Based Access**: Expandable to multiple roles (admin, moderator, user)
✅ **No Recursive RLS**: Uses security definer functions

## Troubleshooting

### "Access Denied" when logging in
- Verify user exists in `admin_users` table
- Check `is_active = true`
- Verify UUID matches between `auth.users` and `admin_users`

### "Database table not found"
- Run `database/schema.sql` in Supabase SQL Editor
- Check table name is `products` (lowercase)

### Images not uploading
- Verify `product-images` bucket exists
- Check bucket is set to public
- Verify RLS policies on `storage.objects`
- Check admin user has proper roles

### Images not displaying
- Verify bucket is public
- Check image URLs are correctly stored in database
- Verify RLS policy allows public SELECT on storage.objects

### "infinite recursion detected in policy"
- Make sure you ran `001_user_roles.sql` which includes security definer functions
- These functions bypass RLS to prevent recursion

## API Structure

### Product Service (`src/lib/db/products.ts`)
- `getAll()` - Get all products
- `getFeatured()` - Get featured products
- `getById(id)` - Get single product
- `getByCategory(category)` - Filter by category
- `search(query)` - Search products
- `create(product)` - Create product (admin)
- `update(id, updates)` - Update product (admin)
- `delete(id)` - Delete product (admin)

### Category Service (`src/lib/db/categories.ts`)
- `getAll()` - Get all categories
- `getById(id)` - Get single category
- `create(category)` - Create category (admin)
- `update(id, updates)` - Update category (admin)
- `delete(id)` - Delete category (admin)

### Storage Service (`src/lib/storage.ts`)
- `uploadProductImage(file)` - Upload single image
- `uploadMultipleImages(files)` - Upload multiple images
- `deleteProductImage(url)` - Delete single image
- `deleteMultipleImages(urls)` - Delete multiple images

### Admin Service (`src/lib/db/admin.ts`)
- `signIn(email, password)` - Admin login
- `signOut()` - Admin logout
- `getCurrentAdmin()` - Get current admin user
- `isAdmin()` - Check if current user is admin
- `onAuthStateChange(callback)` - Listen to auth changes

## Next Steps

1. Add products through the admin panel
2. Upload product images
3. Organize products into categories
4. Mark featured products for homepage
5. Test the public product pages

## Support

If you encounter issues:
1. Check Supabase logs for errors
2. Verify all migrations ran successfully
3. Check browser console for errors
4. Verify environment variables are set correctly

---

**Tip**: Keep your Supabase SQL Editor open while setting up. Most issues can be resolved by checking the database structure and RLS policies.
