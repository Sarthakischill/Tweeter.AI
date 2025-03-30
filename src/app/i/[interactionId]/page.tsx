import Utility from "@/app/history/components/Utility";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InteractionPageProps } from "@/types/InteractionPageProps";
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function InteractionPage({ params }: InteractionPageProps) {
    const { interactionId } = await params;
    
    // Get Supabase client
    const supabase = await createServerSupabaseClient();
    
    // Get session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
        return redirect('/');
    }

    try {
        // Get interaction from Supabase
        const { data: interaction, error } = await supabase
            .from('interactions')
            .select('*')
            .eq('id', interactionId)
            .single();

        if (error || !interaction) {
            console.error("Error fetching interaction:", error);
            return redirect('/');
        }

        return (
            <section className="w-full flex px-20 max-sm:px-4 interactions-center mt-24 pb-12 max-sm:overflow-hidden">
                <div className="flex flex-col w-full space-y-5">
                    <div className="pl-40 max-sm:pl-10 flex justify-end">
                        <div className="pl-6 pr-6 max-sm:px-4 py-4 text-left bg-gray-400/10 rounded-xl">
                            <div className="space-x-3 mb-2">
                                <span className='text-xs bg-gray-300/10 px-2 py-1 rounded-md'>{interaction.mood}</span>
                                <span className='text-xs bg-gray-300/10 px-2 py-1 rounded-md'>{interaction.action}</span>
                            </div>
                            <p className="max-sm:text-sm">{interaction.user_prompt}</p>
                        </div>
                    </div>
                    <div className="flex justify-start gap-3">
                        <span>
                            <Avatar>
                                <AvatarImage src="/p8.png" alt="profile" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        </span>
                        <div>
                            <p className='leading-7 max-sm:text-sm'>&quot;{interaction.ai_response}&quot;</p>
                            <div className="flex interactions-center mt-1 gap-3">
                                <span className='text-xs'>{new Date(interaction.created_at).toDateString()}</span>
                                <Utility aiResponse={interaction.ai_response} id={interaction.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error("Error in interaction page:", error);
        return redirect('/');
    }
}