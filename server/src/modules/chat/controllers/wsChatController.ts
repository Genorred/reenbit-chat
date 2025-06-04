import WebSocket from "ws";
import {QuoteService} from "../services/QuoteService";
import {MessageService} from "../services/MessageService";
import {CHAT_MESSAGE_TYPES} from "../consts/ChatMessageTypes";
import {ServerMessage, UpdatePayload} from "../models/ServerMessage";
import {ChatService} from "../services/chat.service";

// Create an item
export class WsChatController {
    static getQuoteResponse(ws: WebSocket, chatId: string, userId: string): any {
        try {
            ws.on('message', async (message) => {
                const data: ServerMessage = JSON.parse(message.toString());
                switch (data.type) {

                    case CHAT_MESSAGE_TYPES.UPDATE_MESSAGE: {
                        const payload = data.payload as UpdatePayload;
                        try {
                            const updatedMessage = await MessageService.updateMessage(
                                payload.messageId,
                                payload.content,
                                userId
                            );
                            ws.send(JSON.stringify({
                                type: CHAT_MESSAGE_TYPES.UPDATE_MESSAGE,
                                payload: updatedMessage
                            }));
                            return;
                        } catch (error) {
                            ws.send(JSON.stringify({
                                type: 'error',
                                payload: error instanceof Error ? error.message : 'Failed to update message'
                            }));
                            return;
                        }
                    }

                    case CHAT_MESSAGE_TYPES.SEND_MESSAGE: {
                        const payload = data.payload as string;
                        const date = Date.now();
                        const dbMessage = await MessageService.sendMessage(payload, chatId, userId);
                        ws.send(JSON.stringify({
                            type: CHAT_MESSAGE_TYPES.NEW_MESSAGE,
                            payload: dbMessage
                        }));
                        const quote = await QuoteService.getQuote(payload, chatId);
                        setTimeout(() => {
                            ws.send(JSON.stringify({
                                type: CHAT_MESSAGE_TYPES.NEW_MESSAGE,
                                payload: quote
                            }));
                        }, Math.max(Date.now() - date - 3000, 0));
                    }

                }

            });
        } catch (error) {
            // next(error);
        }
    }

    static async autoMessaging(ws: WebSocket, userId: string) {
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const userChats = await ChatService.getChatsByUserId(userId);
        while (ws.readyState === WebSocket.OPEN) {
            await sleep(2000 + Math.random() * 2000);
            const chatIndex = Math.floor( userChats.length * Math.random());
            const quote = await QuoteService.getQuote('', userChats[chatIndex]._id);
            ws.send(JSON.stringify(
                {
                    ...quote,
                    firstName:userChats[chatIndex].firstName,
                    lastName:userChats[chatIndex].lastName
                }
            ));
        }
    }
}