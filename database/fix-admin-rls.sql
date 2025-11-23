-- Fix RLS Policy for Admin Users
-- This allows users to check their own admin status during login
-- Run this in your Supabase SQL Editor

-- Step 1: Drop ALL existing policies on admin_users
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can view their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can view their own admin record" ON admin_users;
DROP POLICY IF EXISTS "Active admins can view all admin users" ON admin_users;

-- Create a policy that allows users to check their own admin status
-- This is needed during login to verify admin privileges
CREATE POLICY "Users can view their own admin status"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

-- Step 3: Allow admins to view all admin users (for management)
-- This policy will work AFTER a user is authenticated and confirmed as admin
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

-- Verify the policies
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'admin_users';
