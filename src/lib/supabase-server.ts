import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '../types/supabase';

export function createServerSupabaseClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          // @ts-expect-error - Next.js cookies() typing issue
          return cookies().get(name)?.value;
        },
        set(name, value, options) {
          // @ts-expect-error - Next.js cookies() typing issue
          cookies().set(name, value, options);
        },
        remove(name, options) {
          // @ts-expect-error - Next.js cookies() typing issue
          cookies().set(name, '', { ...options, maxAge: 0 });
        },
      },
    }
  );
} 