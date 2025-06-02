import {NextFunction, Request, Response} from 'express';
import {ChatService} from "../services/chat.service";


const chatService = new ChatService();
export const canModifyChatMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const userId = req?.user?.userId;

        console.log('userId ', userId, id, req.body);
        const chat = await chatService.getChatById(id);
        if (!chat) {
            res.status(404).json({message: 'Chat not found'});
            return
        }
        if (chat.userId.toString() !== userId) {
            res.status(403).json({message: "You don't have access"});
            return
        }
        next();
    } catch (error) {
        res.status(404).json({message: "Couldn't find chat"});
        return
    }
}; 