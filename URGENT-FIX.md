# ⚠️ URGENT: Fix 500 Error on Login

You're getting a 500 error because the RLS (Row Level Security) policy is blocking the admin check during login.

## 🔧 Quick Fix (Copy & Paste)

1. **Open Supabase SQL Editor:**
   - Go to: https://supabase.com/dashboard/project/qvkopnngmjddrldslboh/sql/new

2. **Copy this ENTIRE script and paste it:**

```sql
-- Drop ALL existing policies
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can view their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can view their own admin record" ON admin_users;
DROP POLICY IF EXISTS "Active admins can view all admin users" ON admin_users;

-- Allow users to check their own admin status (needed for login)
CREATE POLICY "Users can view their own admin record"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

-- Allow admins to view all admin users (for management)
CREATE POLICY "Active admins can view all admin users"
  ON admin_users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM admin_users au
      WHERE au.id = auth.uid() 
      AND au.is_active = true
    )
  );
```

3. **Click "Run"** (or press `Cmd+Enter` / `Ctrl+Enter`)

4. **Refresh your app and try logging in again**

## ✅ What This Does

- Removes the broken circular dependency in RLS policies
- Allows users to check their own admin status (needed for login)
- Allows admins to view all admin users (for management)

## 🧪 Test After Running

1. Go to Products page
2. Press `Ctrl+Shift+A` (or `Cmd+Shift+A` on Mac)
3. Login with:
   - Email: `kjarir23@gmail.com`
   - Password: (the password you set in Authentication)

If you still get errors, check:
- The user exists in `admin_users` table
- The UUID in `admin_users` matches the UUID in `auth.users`
- The password is correct in Authentication → Users

