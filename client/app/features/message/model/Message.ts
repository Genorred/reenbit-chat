type MessageTypes = 'user' | 'quote'
export interface MessageI {
    type: MessageTypes
    chatId: string;
    content: string;
    senderId?: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;

}