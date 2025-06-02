import { Router } from 'express';
import authRouter from "./authRouter";
import chatRouter from "./chatRouter";

const router = Router();

// router.get('/', getItems);
// router.get('/:id', getItemById);
router.use('/auth', authRouter);
router.use('/chats', chatRouter);
// router.put('/:id', updateItem);
// router.delete('/:id', deleteItem);

export default router;