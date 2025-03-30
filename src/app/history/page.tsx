import { createServerSupabaseClient } from '@/lib/supabase-server';
import { HistoryType } from '@/types/HistoryType';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Utility from './components/Utility';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function History() {
    // Get Supabase client with server component
    const supabase = await createServerSupabaseClient();
    
    // Get session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
        return redirect('/');
    }

    try {
        // Get interactions from Supabase
        const { data: interactions, error } = await supabase
            .from('interactions')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching interactions:", error);
            return <div>Error loading history</div>;
        }

        return (
            <section className="flex flex-col gap-5 items-center px-52 max-sm:px-4 mt-24 pb-12 max-sm:overflow-hidden">
                {
                    (!interactions || interactions.length < 1) && (
                        <div className='flex flex-col gap-2 justify-center w-[50vw] max-sm:w-[100vw] h-full items-center'>
                            <span className='text-lg'>No Interactions found!</span>
                            <Link href='/' className='dark:bg-white dark:text-black bg-black text-white py-1 px-2 rounded-lg text-sm'>Go Back</Link>
                        </div>
                    )
                }
                {
                    interactions && interactions.length > 0 && interactions.map((item: HistoryType, idx: number) => (
                        <div className="flex flex-col w-full space-y-5" key={idx}>
                            <div className="pl-40 max-sm:pl-12 flex justify-end">
                                <div className="pl-6 pr-6 py-4 max-sm:px-4 text-left bg-gray-400/10 rounded-xl">
                                    <div className="space-x-3 mb-2">
                                        <span className='text-xs bg-gray-300/10 px-2 py-1 rounded-md'>{item.mood}</span>
                                        <span className='text-xs bg-gray-300/10 px-2 py-1 rounded-md'>{item.action}</span>
                                    </div>
                                    <p className='max-sm:text-sm'>{item.user_prompt}</p>
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
                                    <p className='leading-7 max-sm:text-sm'>&quot;{item.ai_response}&quot;</p>
                                    <div className="flex items-center mt-1 gap-3">
                                        <span className='text-xs'>{new Date(item.created_at).toDateString()}</span>
                                        <Utility aiResponse={item.ai_response} id={item.id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </section>
        );
    } catch (error) {
        console.error("Error in history page:", error);
        return <div>Error loading history</div>;
    }
}