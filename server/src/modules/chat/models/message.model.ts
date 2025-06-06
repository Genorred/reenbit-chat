import {Document, model, Schema} from 'mongoose';
import {Chat} from "./chat.model";
import {ChatService} from "../services/chat.service";

export type MessageTypes = 'user' | 'quote'

export interface IMessage extends Document {
    type: MessageTypes
    chatId: Schema.Types.ObjectId;
    content: string;
    senderId?: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            // required: true,
        },
    },
    {
        timestamps: true,
    }
);

messageSchema.pre('save', async function (next) {
    const content = this.content
    if (this.isNew)
        try {
            void ChatService.updateChat(this.chatId.toString(), {
                lastMessage: content,
                lastMessageDate: this.createdAt
            });
        } catch (error) {
            // next(error as Error);
        }
    next();
});
export const Message = model<IMessage>('Message', messageSchema);