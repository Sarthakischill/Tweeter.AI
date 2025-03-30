import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Get Supabase client
    const supabase = await createServerSupabaseClient();
    
    // Get session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const { tweet, mood, action, result } = await request.json();

        if (!tweet || !result) {
            return NextResponse.json({ message: 'Tweet and result are required' }, { status: 400 });
        }

        // Save the interaction in Supabase
        const { error } = await supabase
            .from('interactions')
            .insert({
                user_id: session.user.id,
                user_prompt: tweet,
                ai_response: result,
                mood: mood || null,
                action: action || null
            });

        if (error) throw error;

        return NextResponse.json({ message: 'Interaction saved successfully' });
    } catch (error) {
        console.error('Error saving interaction:', error);
        return NextResponse.json({ message: 'Failed to save interaction' }, { status: 500 });
    }
}