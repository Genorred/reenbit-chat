import {Router} from 'express';
import {ChatController} from '../modules/chat/controllers/chatController';
import {authMiddleware} from '../middleware/auth.middleware';
import {canModifyChatMiddleware} from "../modules/chat/middleware/canModifyChat.middleware";

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.use(authMiddleware);

chatRouter.post('/', chatController.createChat);
chatRouter.get('/', chatController.getChats);
chatRouter.get('/:query', chatController.searchChats);
chatRouter.get('/:id/messages', chatController.getChatMessages);
chatRouter.put('/:id', canModifyChatMiddleware, chatController.updateChat);
chatRouter.delete('/:id', canModifyChatMiddleware, chatController.deleteChat);

export default chatRouter;