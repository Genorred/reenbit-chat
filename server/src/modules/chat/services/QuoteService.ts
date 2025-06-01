export class QuoteService {
    static defaultMessage = "Not your day (( We couldn't find quote that fits your message"

    static async getQuote(message: string) {
        const url = new URL('https://api.quotable.io/search/quotes/');
        url.searchParams.set('query', message);
        url.searchParams.set('limit', '1');
        url.searchParams.set('page', '1');

        try {
            const response = await fetch(url.href)
            const data = await response.json()
            const quote = data.results[0].content || this.defaultMessage

            return quote as string
        } catch (error) {
            console.log(`Failed to get quote: ${error}`)
            return this.defaultMessage
        }
    }
}