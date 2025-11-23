import { supabase, AdminUser } from '../supabase';

export const adminService = {
  // Sign in admin
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in:', error);
      throw error;
    }

    // Check if user is an admin
    if (data.user) {
      console.log('Checking admin status for user:', data.user.id, 'email:', email);
      
      // Try using the SECURITY DEFINER function first (bypasses RLS)
      const { data: adminDataFromFunction, error: functionError } = await supabase
        .rpc('check_admin_status', { user_id: data.user.id });

      if (adminDataFromFunction && adminDataFromFunction.length > 0) {
        console.log('Admin check successful via function:', adminDataFromFunction[0]);
        return { user: data.user, admin: adminDataFromFunction[0] };
      }

      // Fallback: Try direct query (in case function doesn't exist yet)
      console.log('Function check failed, trying direct query. Error:', functionError);
      
      const { data: adminDataById, error: errorById } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)
        .eq('is_active', true)
        .single();

      if (adminDataById) {
        console.log('Admin check successful via direct query');
        return { user: data.user, admin: adminDataById };
      }

      // If both fail, check by email as last resort
      if (errorById && (errorById as any).status === 500) {
        console.log('Direct query blocked by RLS, trying email check');
        
        // Try to use a different approach - check if user exists at all
        const { data: allAdmins, error: allError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .eq('is_active', true);

        if (allAdmins && allAdmins.length > 0) {
          const adminByEmail = allAdmins[0];
          // If UUID doesn't match, that's the issue
          if (adminByEmail.id !== data.user.id) {
            console.error('UUID mismatch detected:', {
              admin_users_id: adminByEmail.id,
              auth_users_id: data.user.id
            });
            await supabase.auth.signOut();
            throw new Error('UUID mismatch. Please run fix-uuid-mismatch.sql in Supabase SQL Editor.');
          }
          console.log('Admin check successful via email fallback');
          return { user: data.user, admin: adminByEmail };
        }
      }

      // Final error handling
      if (errorById && (errorById as any).status === 500) {
        console.error('RLS Policy Error - 500 status. Please run fix-rls-with-function.sql');
        console.error('Full error:', errorById);
        await supabase.auth.signOut();
        throw new Error('Database RLS policy error. Please run fix-rls-with-function.sql in Supabase SQL Editor.');
      }

      console.error('Admin check failed:', {
        userId: data.user.id,
        email: email,
        functionError: functionError,
        directError: errorById
      });
      await supabase.auth.signOut();
      throw new Error(`Access denied. User ${email} not found in admin_users table.`);
    }

    throw new Error('Authentication failed');
  },

  // Sign out admin
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Get current admin user
  async getCurrentAdmin(): Promise<AdminUser | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  },

  // Check if current user is admin
  async isAdmin(): Promise<boolean> {
    const admin = await this.getCurrentAdmin();
    return admin !== null;
  },

  // Get current session
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },
};

