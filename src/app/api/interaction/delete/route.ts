import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Interaction ID is required" },
                { status: 400 }
            );
        }

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

        // Delete the interaction from Supabase
        const { error } = await supabase
            .from('interactions')
            .delete()
            .eq('id', id)
            .eq('user_id', session.user.id); // Ensure user can only delete their own interactions

        if (error) {
            if (error.code === '23503') { // Foreign key constraint error
                return NextResponse.json(
                    { success: false, message: "Cannot delete interaction with related data" },
                    { status: 400 }
                );
            } else if (error.code === 'PGRST116') { // Row not found
                return NextResponse.json(
                    { success: false, message: "Interaction not found" },
                    { status: 404 }
                );
            }
            
            return NextResponse.json(
                { success: false, message: "Database error", error: error },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Interaction deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}