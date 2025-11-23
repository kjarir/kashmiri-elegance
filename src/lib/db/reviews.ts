import { supabase } from '../supabase';

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  comment?: string;
  is_approved?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const reviewService = {
  // Get reviews for a product
  async getByProduct(productId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }

    return data || [];
  },

  // Create a review
  async create(review: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert([review])
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }

    return data;
  },

  // Update review (admin only)
  async update(id: string, updates: Partial<Review>): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating review:', error);
      throw error;
    }

    return data;
  },

  // Delete review (admin only)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },
};

