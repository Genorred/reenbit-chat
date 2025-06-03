import {Types} from "mongoose";
import {Message} from "../models/message.model";

export class MessageService {

    static async sendMessage(content: string, chatId: string, userId: string) {
        const message = new Message({
            type: 'user',
            content: content,
            chatId: new Types.ObjectId(chatId),
            userId: new Types.ObjectId(userId),
        });
        return await message.save();
    }
}