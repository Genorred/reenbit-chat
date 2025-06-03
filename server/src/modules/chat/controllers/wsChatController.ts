import WebSocket from "ws";
import {QuoteService} from "../services/QuoteService";
import {MessageService} from "../services/MessageService";

// Create an item
export class WsChatController {
    static getQuoteResponse(ws: WebSocket, chatId: string, userId: string): any {
        try {
            ws.on('message', async (message) => {
                const date = Date.now();
                const dbMessage = await MessageService.sendMessage(message.toString(), chatId, userId)
                ws.send(JSON.stringify(dbMessage));
                const quote = await QuoteService.getQuote(message.toString(), chatId)
                setTimeout(() => {
                    ws.send(JSON.stringify(quote));
                }, Math.max(Date.now() - date, 0))
            });
        } catch (error) {
            // next(error);
        }
    }
}