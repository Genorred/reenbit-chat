import {Router} from 'express';
import authRouter from "./authRouter";
import chatRouter from "./chatRouter";

const router = Router();

router.use('/auth', authRouter);
router.use('/chats', chatRouter);


export default router;