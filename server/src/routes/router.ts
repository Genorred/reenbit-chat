import { Router } from 'express';
import authRouter from "./authRouter";

const router = Router();

// router.get('/', getItems);
// router.get('/:id', getItemById);
router.use('/auth', authRouter);
// router.put('/:id', updateItem);
// router.delete('/:id', deleteItem);

export default router;