#!/bin/bash

# Database Setup Script for Kashmiri Elegance
# This script helps set up the Supabase database

echo "🚀 Setting up Kashmiri Elegance Database..."
echo ""

# Database connection string
DB_URL="postgresql://postgres:Afsha@9987840201@db.qvkopnngmjddrldslboh.supabase.co:5432/postgres"

# Check if psql is available
if ! command -v psql &> /dev/null; then
    echo "❌ psql is not installed. Please install PostgreSQL client tools."
    echo ""
    echo "Alternatively, you can:"
    echo "1. Go to your Supabase dashboard"
    echo "2. Navigate to SQL Editor"
    echo "3. Copy and paste the contents of schema.sql"
    echo "4. Run the query"
    exit 1
fi

# Check if schema.sql exists
if [ ! -f "schema.sql" ]; then
    echo "❌ schema.sql file not found!"
    exit 1
fi

echo "📝 Running database schema..."
psql "$DB_URL" -f schema.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database schema created successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Get your Supabase anon key from: https://supabase.com/dashboard → Settings → API"
    echo "2. Create a .env file in the project root with:"
    echo "   VITE_SUPABASE_URL=https://qvkopnngmjddrldslboh.supabase.co"
    echo "   VITE_SUPABASE_ANON_KEY=your_anon_key_here"
    echo "3. Create an admin user in Supabase Auth, then add them to admin_users table"
    echo ""
    echo "See database/README.md for detailed instructions."
else
    echo ""
    echo "❌ Error running schema. Please check the error messages above."
    echo ""
    echo "You can also run the schema manually:"
    echo "1. Go to your Supabase dashboard"
    echo "2. Navigate to SQL Editor"
    echo "3. Copy and paste the contents of schema.sql"
    echo "4. Run the query"
fi

