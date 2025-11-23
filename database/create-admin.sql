-- Script to create an admin user
-- 
-- STEP 1: First, create a user in Supabase Authentication:
--   1. Go to Authentication → Users in your Supabase dashboard
--   2. Click "Add User" → "Create New User"
--   3. Enter:
--      - Email: admin@kashmiri-elegance.com (or your preferred email)
--      - Password: (choose a secure password)
--   4. Click "Create User"
--   5. Copy the User UUID that appears
--
-- STEP 2: Replace 'USER_UUID_HERE' below with the UUID from step 1
-- STEP 3: Replace 'admin@kashmiri-elegance.com' with the email you used
-- STEP 4: Run this SQL script

-- Example (replace with your actual values):
-- INSERT INTO admin_users (id, email, full_name, role, is_active)
-- VALUES (
--   '123e4567-e89b-12d3-a456-426614174000',  -- Replace with actual UUID
--   'admin@kashmiri-elegance.com',            -- Replace with actual email
--   'Admin User',
--   'admin',
--   true
-- );

-- TEMPLATE (uncomment and fill in):
/*
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'USER_UUID_HERE',           -- Paste the UUID from Authentication → Users
  'your-email@example.com',   -- The email you used to create the user
  'Admin User',
  'admin',
  true
);
*/

-- To verify the admin was created:
-- SELECT * FROM admin_users;

