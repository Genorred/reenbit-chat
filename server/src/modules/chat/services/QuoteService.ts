import {Types} from "mongoose";
import {Message} from "../models/message.model";

export class QuoteService {
    static defaultMessage = "Not your day (( We couldn't find quote that fits your message"

    static async getQuote(message: string, chatId: string) {
        const url = new URL('https://zenquotes.io/api/quotes');
        // url.searchParams.set('query', message);
        // url.searchParams.set('limit', '1');
        // url.searchParams.set('page', '1');

        try {
            const response = await fetch(url.href)
            const data = await response.json()
            const quote = data[0].q || this.defaultMessage

            const message = new Message({
                type: 'quote',
                content: quote,
                chatId: new Types.ObjectId(chatId),
            });
            return await message.save();
        } catch (error) {
            const message = new Message({
                type: 'quote',
                content: this.defaultMessage,
                chatId: new Types.ObjectId(chatId),
            });
            return await message.save();
        }
    }
}