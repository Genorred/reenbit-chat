import WebSocket from "ws";
import {QuoteService} from "../services/QuoteService";

// Create an item
export class ChatController {
    static getQuoteResponse(ws: WebSocket) {
        try {
            ws.on('message', async (message) => {
                const quote = await QuoteService.getQuote(message.toString())
                ws.send(JSON.stringify(quote));
            });
        } catch (error) {
            // next(error);
        }
    }
}