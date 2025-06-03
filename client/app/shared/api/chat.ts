import { $authHost } from '../lib/http';
import type {Chat} from '../types/chat.types';
import type {MessageI} from "~/features/chat/model/Message";

export const chatApi = {
    getMessages: async (id: string): Promise<MessageI[]> => {
        const { data } = await $authHost.get(`/chats/${id}/messages`);
        return data;
    },
    getChats: async (): Promise<Chat[]> => {
        const { data } = await $authHost.get('/chats');
        return data;
    },

    searchChats: async (query: string): Promise<Chat[]> => {
        const { data } = await $authHost.get('/chats/' + query);
        return data;
    },

    createChat: async (chatData: { firstName: string; lastName: string }): Promise<Chat> => {
        const { data } = await $authHost.post('/chats', chatData);
        return data;
    },

    updateChat: async ({ id, ...chatData }: { id: string; firstName: string; lastName: string }): Promise<Chat> => {
        const { data } = await $authHost.put(`/chats/${id}`, chatData);
        return data;
    },

    deleteChat: async (id: string): Promise<void> => {
        await $authHost.delete(`/chats/${id}`);
    }
}; 