# Admin User Setup Guide

## How to Create Your First Admin User

### Step 1: Create User in Supabase Authentication

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/qvkopnngmjddrldslboh
2. Navigate to **Authentication** → **Users** (in the left sidebar)
3. Click **"Add User"** → **"Create New User"**
4. Fill in the form:
   - **Email**: Enter your admin email (e.g., `admin@kashmiri-elegance.com`)
   - **Password**: Enter a secure password (you'll use this to login)
   - **Auto Confirm User**: ✅ Check this box (so you don't need email verification)
5. Click **"Create User"**
6. **IMPORTANT**: Copy the **User UUID** that appears (it looks like: `123e4567-e89b-12d3-a456-426614174000`)

### Step 2: Add User to Admin Table

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New Query"**
3. Copy and paste this SQL, replacing the placeholders:

```sql
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'PASTE_USER_UUID_HERE',        -- Paste the UUID from Step 1
  'your-email@example.com',      -- The email you used in Step 1
  'Admin User',
  'admin',
  true
);
```

4. Replace:
   - `PASTE_USER_UUID_HERE` with the UUID you copied
   - `your-email@example.com` with the email you used
5. Click **"Run"** or press `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows)

### Step 3: Verify Admin User

Run this query to verify your admin was created:

```sql
SELECT * FROM admin_users;
```

You should see your admin user listed.

### Step 4: Login as Admin

1. In your application, go to the Products page
2. Press **`Ctrl+Shift+A`** (or **`Cmd+Shift+A`** on Mac) to open the admin panel
3. Enter:
   - **Email**: The email you used when creating the user
   - **Password**: The password you set
4. Click **"Login"**

## Example Admin Credentials

If you create an admin with:
- **Email**: `admin@kashmiri-elegance.com`
- **Password**: `Admin123!@#`

Then you would use these credentials to login in the admin panel.

## Troubleshooting

### "Access denied. Admin privileges required."
- Make sure you added the user to the `admin_users` table
- Verify `is_active` is set to `true`
- Check that the UUID matches the user in Authentication

### "Invalid email or password"
- Double-check the email and password
- Make sure the user exists in Authentication → Users
- Try resetting the password in Authentication → Users

### Can't find the User UUID
- Go to Authentication → Users
- Click on the user you created
- The UUID is displayed at the top of the user details page

## Security Notes

⚠️ **Important**: 
- Choose a strong password for your admin account
- Never commit your admin credentials to version control
- Consider creating multiple admin accounts for different team members
- Regularly review admin users in the `admin_users` table

