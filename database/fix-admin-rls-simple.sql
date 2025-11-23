-- SIMPLE FIX: Allow users to check their own admin status
-- Run this in Supabase SQL Editor

-- Step 1: Drop all existing policies on admin_users
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can view their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;

-- Step 2: Create a simple policy that allows users to check their own record
-- This is essential for login verification
CREATE POLICY "Users can view their own admin record"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

-- Step 3: Allow admins to view all admin users (for management)
-- This uses a simple EXISTS check
CREATE POLICY "Active admins can view all admin users"
  ON admin_users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM admin_users 
      WHERE id = auth.uid() 
      AND is_active = true
    )
  );

-- Verify the policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'admin_users';

