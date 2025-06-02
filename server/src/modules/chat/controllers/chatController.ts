import WebSocket from "ws";
import {QuoteService} from "../services/QuoteService";

// Create an item
export class ChatController {
    static getQuoteResponse(ws: WebSocket, chatId: string): any {
        try {
            ws.on('message', async (message) => {
                const quote = await QuoteService.getQuote(message.toString(), chatId)
                ws.send(JSON.stringify(quote));
            });
        } catch (error) {
            // next(error);
        }
    }
}