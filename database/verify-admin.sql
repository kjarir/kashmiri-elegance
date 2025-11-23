-- Verify Admin User Setup
-- Run this to check if your admin user is set up correctly

-- Check if user exists in admin_users
SELECT 
  au.id as admin_users_id,
  au.email as admin_email,
  au.is_active,
  au.role,
  au.created_at,
  -- Check if UUID matches auth.users
  CASE 
    WHEN EXISTS (SELECT 1 FROM auth.users WHERE id = au.id) 
    THEN '✅ UUID matches auth.users'
    ELSE '❌ UUID does NOT match auth.users'
  END as uuid_match,
  -- Get the actual auth.users UUID
  (SELECT id FROM auth.users WHERE email = au.email LIMIT 1) as auth_users_id
FROM admin_users au
WHERE au.email = 'kjarir23@gmail.com';

-- If UUID doesn't match, run this to fix it:
-- (Replace AUTH_USERS_UUID with the UUID from auth.users)
/*
UPDATE admin_users 
SET id = 'AUTH_USERS_UUID'
WHERE email = 'kjarir23@gmail.com';
*/

-- Check all admin users
SELECT * FROM admin_users;

-- Check auth users
SELECT id, email, created_at FROM auth.users WHERE email = 'kjarir23@gmail.com';

