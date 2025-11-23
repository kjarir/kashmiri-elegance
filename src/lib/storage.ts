import { supabase } from './supabase';

export const storageService = {
  async uploadProductImage(file: File, path?: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    return publicUrl;
  },

  async uploadMultipleImages(files: File[], path?: string): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadProductImage(file, path));
    return Promise.all(uploadPromises);
  },

  async deleteProductImage(url: string): Promise<void> {
    // Extract path from URL
    const urlParts = url.split('/product-images/');
    if (urlParts.length < 2) {
      throw new Error('Invalid image URL');
    }
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },

  async deleteMultipleImages(urls: string[]): Promise<void> {
    const deletePromises = urls.map(url => this.deleteProductImage(url));
    await Promise.all(deletePromises);
  },
};
