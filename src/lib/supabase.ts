import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qvkopnngmjddrldslboh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2a29wbm5nbWpkZHJsZHNsYm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MTQ1MzgsImV4cCI6MjA3OTM5MDUzOH0.7xz7nL78yRIFYJGx16phWeGLdre68PEdJACbEAvRyCc';

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

