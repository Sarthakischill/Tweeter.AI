# Supabase Setup Instructions

1. Go to your Supabase dashboard and create a new project or use an existing one
2. Run the SQL in `supabase/schema.sql` in the SQL Editor of your Supabase dashboard
3. Make sure your .env.local file has the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Restart your development server

## Schema Overview

The schema includes:
- **Users table** with Row Level Security (RLS) policies
- **Interactions table** with RLS policies
- A **database trigger** that automatically creates a user profile when a user signs up

## Authentication Flow

1. When a user signs up:
   - Supabase Auth creates an entry in the `auth.users` table
   - Our database trigger automatically creates a profile in the `public.users` table
   - The email confirmation flow is handled by Supabase

2. When a user signs in:
   - Supabase Auth validates credentials and creates a session
   - The app uses the session to access user data according to RLS policies

## Troubleshooting

If you encounter authentication issues:
1. Check that your environment variables are correctly set
2. Verify that the SQL schema was properly executed
3. Check browser console for specific error messages
4. Ensure you're using the latest version of Supabase libraries 