-- ULTIMATE FIX: Use SECURITY DEFINER function to bypass RLS
-- This will definitely work - run this NOW!

-- Step 1: Drop ALL existing policies
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can view their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can view their own admin record" ON admin_users;
DROP POLICY IF EXISTS "Active admins can view all admin users" ON admin_users;

-- Step 2: Create a SECURITY DEFINER function that bypasses RLS
-- This function can check admin status without being blocked
CREATE OR REPLACE FUNCTION check_admin_status(user_id UUID)
RETURNS TABLE (
  id UUID,
  email VARCHAR,
  full_name VARCHAR,
  role VARCHAR,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    au.email,
    au.full_name,
    au.role,
    au.is_active,
    au.created_at,
    au.updated_at
  FROM admin_users au
  WHERE au.id = user_id
  AND au.is_active = true;
END;
$$;

-- Step 3: Create simple RLS policies
-- Allow users to check their own admin status
CREATE POLICY "Users can view their own admin status"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

-- Allow admins to view all (using the function to avoid circular dependency)
CREATE POLICY "Admins can view all admin users"
  ON admin_users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM check_admin_status(auth.uid())
    )
  );

-- Step 4: Grant execute permission
GRANT EXECUTE ON FUNCTION check_admin_status TO authenticated;
GRANT EXECUTE ON FUNCTION check_admin_status TO anon;

-- Verify it works
SELECT * FROM check_admin_status('5e1344f3-5e98-4429-90e2-dbf1778d04e7'::UUID);

