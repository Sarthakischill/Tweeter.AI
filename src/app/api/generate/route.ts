import { genAI } from '@/lib/genAI';
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
    const { tweet, mood, action } = await req.json();
    let corePrompt = process.env.SYSTEM_PROMPT; // Default prompt
    
    try {
        // Get Supabase client with correct cookie handling
        const supabase = await createServerSupabaseClient();
        
        // Get session
        const { data: { session } } = await supabase.auth.getSession();
        
        // Get user's custom core prompt if authenticated
        if (session?.user) {
            const { data: userData } = await supabase
                .from('users')
                .select('core_prompt')
                .eq('id', session.user.id)
                .single();
            
            if (userData?.core_prompt) {
                corePrompt = userData.core_prompt;
            }
        }

        const prompt = `You are an expert tweet refinement engine. Strictly follow these rules:

        [CRITICAL RULES]
        1. NEVER use emojis, hashtags, or markdown - strictly prohibited
        2. NO NEW CONTENT: Never add motivational phrases, opinions, advise or commentary. It's strict rule
        3. NEVER add new content - only refine what's provided
        4. ALWAYS maintain original intent while enhancing clarity
        5. STRICT length limit: Max 280 characters (hard stop)
        6. NEVER mention your actions or process - output only the refined tweet no other bullshit
        7. If the user provides you with a tweet, your task is to refine it, not comment on it or make it longer than the original tweet.

        [PROCESS]
        1. PRIMARY FOCUS: ${corePrompt} - make this drive all changes
        2. TONE: Convert to ${mood} tone while preserving message
        3. ACTION: Execute "${action}" with:
        - Formatting: Logical line breaks, remove fluff
        - Improving: Boost impact using mindset, tighten phrasing no commentary and opinions
        - Correcting: Fix errors, improve readability

        [OUTPUT REQUIREMENTS]
        - Multi-line format unless user specifies single-line
        - Preserve original formatting style when possible
        - Remove redundant phrases while keeping core message
        - Use active voice and concise language

        [BAD EXAMPLE TO AVOID]
        Input: "I'm a software engineer looking for job"
        BAD Output: "You are software engineer seeking job"
        GOOD Output: "Experienced SWE passionate about [specific tech] seeking roles in [domain]"

        [INPUT TO REFINE]
        "${tweet}"

        [FINAL INSTRUCTIONS]
        1. Analyze input against core prompt (${corePrompt})
        2. Apply ${mood} tone and ${action} action
        3. Generate ONLY the refined tweet meeting all rules
        4. Validate against all constraints before outputting`;

        const model = genAI.getGenerativeModel({
            model: process.env.AI_MODEL ?? ""
        });

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Save interaction if user is authenticated
        if (session?.user) {
            await supabase.from('interactions').insert({
                user_id: session.user.id,
                user_prompt: tweet,
                ai_response: text,
                mood,
                action
            });
        }

        return NextResponse.json(
            { success: true, message: text },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ?
                    `Tweet refinement failed: ${error.message}` :
                    'Our tweet refinement service is currently unavailable. Please try again later.'
            },
            {
                status: 500,
            }
        );
    }
}
