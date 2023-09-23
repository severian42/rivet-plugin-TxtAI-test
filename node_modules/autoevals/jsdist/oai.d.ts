import { ChatCompletionRequestMessage, CreateChatCompletionResponse } from "openai";
export interface CachedLLMParams {
    model: string;
    messages: ChatCompletionRequestMessage[];
    temperature?: number;
    max_tokens?: number;
}
export interface ChatCache {
    get(params: CachedLLMParams): Promise<CreateChatCompletionResponse | null>;
    set(params: CachedLLMParams, response: CreateChatCompletionResponse): Promise<void>;
}
export interface OpenAIAuth {
    openAiApiKey?: string;
    openAiOrganizationId?: string;
}
export declare function cachedChatCompletion(params: CachedLLMParams, options: {
    cache?: ChatCache;
} & OpenAIAuth): Promise<CreateChatCompletionResponse>;
