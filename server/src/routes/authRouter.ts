import { Router } from 'express';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthService } from '../modules/auth/auth.service';
import { authMiddleware } from '../middleware/auth.middleware';

const authRouter = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

// Google OAuth
authRouter.post('/google/callback', (req, res) => authController.handleGoogleCallback(req, res));

// Обычная аутентификация
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/verify-email/:token', authController.verifyEmail);

// Обновление токена и выход (защищенные маршруты)
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authMiddleware, authController.logout);

export default authRouter;