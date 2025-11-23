import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price?: number;
  description?: string;
  image_url?: string;
  images?: string[];
  rating?: number;
  reviews_count?: number;
  in_stock?: boolean;
  stock_quantity?: number;
  features?: string[];
  specifications?: Record<string, string>;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

