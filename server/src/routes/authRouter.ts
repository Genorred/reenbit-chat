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
authRouter.post('/register', (req, res) => authController.register(req, res));
authRouter.post('/login', (req, res) => authController.login(req, res));
authRouter.get('/verify-email/:token', (req, res) => authController.verifyEmail(req, res));

// Обновление токена и выход (защищенные маршруты)
authRouter.post('/refresh', (req, res) => authController.refresh(req, res));
authRouter.post('/logout', authMiddleware, (req, res) => authController.logout(req, res));

export default authRouter;