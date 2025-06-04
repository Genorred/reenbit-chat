import {Chat, IChat} from '../models/chat.model';
import {Types} from 'mongoose';
import {Message} from '../models/message.model';

export class ChatService {
    static async createChat(data: { firstName: string; lastName: string; userId: string }): Promise<IChat> {
        const chat = new Chat({
            ...data,
            userId: new Types.ObjectId(data.userId),
        });
        return await chat.save();
    }

    static async searchChats(query: string): Promise<IChat[]> {
        return Chat.aggregate([
            {
                $search: {
                    index: "default",
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query,
                                    path: "firstName"
                                }
                            },
                            {
                                autocomplete: {
                                    query,
                                    path: "lastName"
                                }
                            }
                        ]
                    }
                }
            }

        ]);
    }

    static async getChatsByUserId(userId: string): Promise<IChat[]> {
        return Chat.find({userId: new Types.ObjectId(userId)});
    }

    static async updateChat(chatId: string, data: { firstName?: string; lastName?: string }): Promise<IChat | null> {
        return Chat.findByIdAndUpdate(
            chatId,
            {$set: data},
            {new: true}
        );
    }

    static async deleteChat(chatId: string): Promise<IChat | null> {
        return Chat.findByIdAndDelete(chatId);
    }

    static async getChatById(chatId: string): Promise<IChat | null> {
        return Chat.findById(chatId);
    }

    static async getChatMessages(chatId: string, userId: string) {
        const chat = await this.getChatById(chatId);

        if (!chat) {
            throw new Error('Chat not found');
        }

        if (chat.userId.toString() !== userId) {
            throw new Error('Access denied');
        }

        return Message.find({chatId}).sort({createdAt: 1});
    }
} 