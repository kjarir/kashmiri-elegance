-- Fix UUID Mismatch Between auth.users and admin_users
-- Run this if the UUID in admin_users doesn't match the UUID in auth.users

-- Step 1: Find the correct UUID from auth.users
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'kjarir23@gmail.com';

-- Step 2: Update admin_users with the correct UUID
-- Replace 'CORRECT_UUID_HERE' with the UUID from Step 1
UPDATE admin_users 
SET id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'kjarir23@gmail.com' 
  LIMIT 1
)
WHERE email = 'kjarir23@gmail.com';

-- Step 3: Verify the fix
SELECT 
  au.id as admin_users_id,
  au.email,
  au.is_active,
  (SELECT id FROM auth.users WHERE email = au.email LIMIT 1) as auth_users_id,
  CASE 
    WHEN au.id = (SELECT id FROM auth.users WHERE email = au.email LIMIT 1)
    THEN '✅ UUIDs match!'
    ELSE '❌ UUIDs still don''t match'
  END as status
FROM admin_users au
WHERE au.email = 'kjarir23@gmail.com';

