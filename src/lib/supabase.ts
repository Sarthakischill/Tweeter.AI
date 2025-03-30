import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Basic authentication functions
export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string, name: string) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

// User profile functions
export async function getUserProfile(userId: string) {
  return await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
}

export async function updateUserProfile(userId: string, updates: Partial<Database['public']['Tables']['users']['Update']>) {
  return await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);
}

// Interaction functions
export async function saveInteraction(
  userId: string, 
  userPrompt: string, 
  aiResponse: string, 
  mood?: string, 
  action?: string
) {
  return await supabase
    .from('interactions')
    .insert({
      user_id: userId,
      user_prompt: userPrompt,
      ai_response: aiResponse,
      mood,
      action,
    });
}

export async function getInteractions(userId: string) {
  return await supabase
    .from('interactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function deleteInteraction(userId: string, interactionId: string) {
  return await supabase
    .from('interactions')
    .delete()
    .eq('id', interactionId)
    .eq('user_id', userId);
} 