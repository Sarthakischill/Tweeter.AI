import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse } from "next/server";

export async function GET() {
    // Get Supabase client
    const supabase = await createServerSupabaseClient();
    
    // Get session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        // Get interactions from Supabase
        const { data, error } = await supabase
            .from('interactions')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(
            { success: true, data },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: `Failed to fetch interactions: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        );
    }
}