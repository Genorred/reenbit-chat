import { Router } from 'express';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthService } from '../modules/auth/auth.service';

const authRouter = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post('/google/callback', (req, res) => authController.handleGoogleCallback(req, res));

export default authRouter;