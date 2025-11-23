import { supabase, Product } from '../supabase';

export const productService = {
  // Get all products
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      // Check if table doesn't exist (404 error from Supabase REST API)
      if (error.code === 'PGRST116' || 
          error.message?.includes('relation') || 
          error.message?.includes('does not exist') ||
          error.message?.includes('Could not find') ||
          (error as any).status === 404 ||
          (error as any).statusCode === 404) {
        const dbError = new Error('Database table not found. Please run the database schema first.');
        (dbError as any).code = 'TABLE_NOT_FOUND';
        (dbError as any).isTableNotFound = true;
        throw dbError;
      }
      throw error;
    }

    return data || [];
  },

  // Get featured products
  async getFeatured(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }

    return data || [];
  },

  // Get product by ID
  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data;
  },

  // Get products by category
  async getByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }

    return data || [];
  },

  // Search products
  async search(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching products:', error);
      throw error;
    }

    return data || [];
  },

  // Create product (admin only)
  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }

    return data;
  },

  // Update product (admin only)
  async update(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    return data;
  },

  // Delete product (admin only)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

