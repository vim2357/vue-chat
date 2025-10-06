export interface Message {
    id: number;
    text?: string;
    author: string;
    timestamp: Date;
    isOwn: boolean;
}

export interface ChatState {
    messages: Message[];
    currentUser: string;
    isTyping: boolean;
}