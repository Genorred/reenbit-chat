import {Types} from "mongoose";
import {Message} from "../models/message.model";
import {CHAT_MESSAGE_TYPES} from "../consts/ChatMessageTypes";

export class MessageService {

    static async sendMessage(content: string, chatId: string, userId: string) {
        const message = new Message({
            type: 'user',
            content: content,
            chatId: new Types.ObjectId(chatId),
            senderId: new Types.ObjectId(userId),
        });
        return await message.save();
    }

    static async updateMessage(messageId: string, content: string, userId: string) {
        const message = await Message.findById(messageId);
        
        if (!message) {
            throw new Error('Message not found');
        }

        if (message.senderId?.toString() !== userId) {
            throw new Error('Access denied');
        }

        message.content = content;
        return await message.save();
    }
}