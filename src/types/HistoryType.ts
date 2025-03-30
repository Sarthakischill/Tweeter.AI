export interface HistoryType {
    id: string,
    user_prompt: string,
    ai_response: string,
    mood: string | null,
    action: string | null,
    created_at: string,
    user_id: string,
    // Keep the old naming for backward compatibility
    userPrompt?: string,
    aiResponse?: string,
    createdAt?: Date | string,
    userId?: number | string
}