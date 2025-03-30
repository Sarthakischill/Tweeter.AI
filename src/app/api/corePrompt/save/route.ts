import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
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

    const { corePrompt } = await req.json();

    if (!corePrompt) {
        return NextResponse.json(
            { success: false, message: "Core prompt is required" },
            { status: 400 }
        );
    }

    try {
        // Update the core prompt in the Supabase database
        const { error } = await supabase
            .from('users')
            .update({ core_prompt: corePrompt })
            .eq('id', session.user.id);
            
        if (error) throw error;

        return NextResponse.json(
            { success: true, message: "Core prompt updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: `Failed to update core prompt: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        );
    }
}