# Fix Login Issues

## Problem
You're getting a 500 error when trying to login because the RLS (Row Level Security) policy on `admin_users` is blocking the query during login.

## Quick Fix

### Step 1: Run the RLS Fix Script

1. Go to your Supabase SQL Editor: https://supabase.com/dashboard/project/qvkopnngmjddrldslboh/sql/new
2. Copy the entire contents of `database/fix-admin-rls.sql`
3. Paste it into the SQL Editor
4. Click **"Run"** or press `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows)

### Step 2: Verify Your Admin User

Make sure your admin user exists and the email matches:

1. Go to **Authentication** → **Users** in Supabase
2. Find the user with email: `kjarir23@gmail.com`
3. Note the User UUID
4. Go to **SQL Editor** and run:

```sql
SELECT * FROM admin_users WHERE email = 'kjarir23@gmail.com';
```

If the user doesn't exist in `admin_users`, add them:

```sql
-- Replace USER_UUID_HERE with the actual UUID from Authentication → Users
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'USER_UUID_HERE',
  'kjarir23@gmail.com',
  'Admin User',
  'admin',
  true
);
```

### Step 3: Test Login

1. In your app, go to Products page
2. Press `Ctrl+Shift+A` (or `Cmd+Shift+A` on Mac)
3. Enter:
   - **Email**: `kjarir23@gmail.com`
   - **Password**: (the password you set when creating the user in Authentication)

## What Was Fixed

1. ✅ **RLS Policy**: Updated to allow users to check their own admin status
2. ✅ **Dialog Warning**: Added description to fix accessibility warning
3. ✅ **Error Handling**: Improved error messages for better debugging

## If Login Still Fails

### Check Password
- The password is stored in Supabase Authentication, not in the database
- If you forgot the password, you can reset it in **Authentication** → **Users** → Click on the user → **Reset Password**

### Verify Admin User
Run this query to check:

```sql
SELECT 
  au.*,
  au.id = (SELECT id FROM auth.users WHERE email = 'kjarir23@gmail.com') as matches_auth_user
FROM admin_users au
WHERE au.email = 'kjarir23@gmail.com';
```

The `matches_auth_user` should be `true`.

