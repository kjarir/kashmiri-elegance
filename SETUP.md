# Supabase Setup Instructions

## Quick Start

1. **Create `.env` file** in the project root:
   ```env
   VITE_SUPABASE_URL=https://qvkopnngmjddrldslboh.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

2. **Get your Supabase Anon Key**:
   - Go to https://supabase.com/dashboard
   - Select your project
   - Navigate to **Settings** → **API**
   - Copy the **anon/public** key
   - Paste it in your `.env` file

3. **Run the database schema**:
   - Option A: Use the SQL Editor in Supabase dashboard (recommended)
     - Go to **SQL Editor** → **New Query**
     - Copy contents of `database/schema.sql`
     - Paste and run
   - Option B: Use the setup script
     ```bash
     cd database
     ./setup.sh
     ```

4. **Create your first admin user**:
   - Go to **Authentication** → **Users** in Supabase dashboard
   - Click **Add User** → **Create New User**
   - Note the user's UUID
   - Run this SQL in SQL Editor:
     ```sql
     INSERT INTO admin_users (id, email, full_name, role, is_active)
     VALUES ('USER_UUID_HERE', 'admin@example.com', 'Admin User', 'admin', true);
     ```

5. **Restart your development server**:
   ```bash
   npm run dev
   ```

## Database Connection

Your database connection string:
```
postgresql://postgres:Afsha@9987840201@db.qvkopnngmjddrldslboh.supabase.co:5432/postgres
```

## Features Implemented

✅ Supabase client setup
✅ Products table with full schema
✅ Admin authentication table
✅ Row Level Security (RLS) policies
✅ Product service (CRUD operations)
✅ Admin service (authentication)
✅ Products page integration
✅ Product detail page integration
✅ Search and filtering
✅ Admin login (Ctrl+Shift+A)

## Next Steps

- Add sample products to the database
- Test admin login functionality
- Customize product categories as needed

For detailed instructions, see `database/README.md`.

