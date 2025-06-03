import {Request, Response} from 'express';
import {ChatService} from '../services/chat.service';

export class ChatController {
    private chatService: ChatService;

    constructor() {
        this.chatService = new ChatService();
    }

    searchChats = async (req: Request, res: Response) => {
        const {query} = req.params;
        console.log('query', query);
        try {
            const chats = await this.chatService.searchChats(query)
            res.status(201).json(chats)
            return
        } catch (e) {
            res.status(500).send({error: e});
        }
    }

    createChat = async (req: Request, res: Response) => {
        try {
            const {firstName, lastName} = req.body;
            const userId = req?.user!.userId;

            const chat = await this.chatService.createChat({
                firstName,
                lastName,
                userId,
            });

            res.status(201).json(chat);
        } catch (error) {
            res.status(500).json({message: 'Error creating chat', error});
        }
    };

    getChats = async (req: Request, res: Response) => {
        try {
            const userId = req?.user!.userId;
            const chats = await this.chatService.getChatsByUserId(userId);
            res.json(chats);
        } catch (error) {
            res.status(500).json({message: 'Error fetching chats', error});
        }
    };

    getChatMessages = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const userId = req.user!.userId;

            const messages = await this.chatService.getChatMessages(id, userId);
            res.json(messages);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Chat not found') {
                    res.status(404).json({message: error.message});
                    return
                }
                if (error.message === 'Access denied') {
                    res.status(403).json({message: error.message});
                    return
                }
            }
            res.status(500).json({message: 'Error fetching messages', error});
        }
    };

    updateChat = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const {firstName, lastName} = req.body;

            const newChat = await this.chatService.updateChat(id, {firstName, lastName});

            res.json(newChat);
        } catch (error) {
            res.status(500).json({message: 'Error updating chat', error});
        }
    };

    deleteChat = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;

            const chat = await this.chatService.deleteChat(id);
            res.json({message: 'Chat deleted successfully'});
        } catch (error) {
            res.status(500).json({message: 'Error deleting chat', error});
        }
    };
} 