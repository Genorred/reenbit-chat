import {Request, Response} from 'express';
import {AuthService} from './auth.service';
import {
    clearCookieOptions,
    clearRefreshCookieOptions,
    cookieOptions,
    refreshCookieOptions
} from '../../config/cookie.config';
import {EmailService} from "./email.service";

export class AuthController {
    private readonly authService: AuthService
    private readonly emailService: EmailService

    constructor() {
        this.authService = new AuthService();
        this.emailService = new EmailService();
    }

    handleGoogleCallback = async (req: Request, res: Response) => {
        try {
            const {token} = req.body;
            const {accessToken, refreshToken, user} = await this.authService.handleGoogleAuth(token);

            res
                .cookie('accessToken', accessToken, cookieOptions)
                .cookie('refreshToken', refreshToken, refreshCookieOptions)
                .status(200)
                .json({message: 'Authentication successful', user: user});
        } catch (error) {
            if (error instanceof Error) {
                console.error('Authentication error:', error.message);
            }
            res.status(500).json({error: 'Authentication error'});
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            const {accessToken, refreshToken, user, emailVerificationToken} = await this.authService.register(req.body);
            await this.emailService.sendVerificationEmail(user.email, emailVerificationToken!);
            res
                .cookie('accessToken', accessToken, cookieOptions)
                .cookie('refreshToken', refreshToken, refreshCookieOptions)
                .json({user: user});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body;
            const {accessToken, refreshToken, user} = await this.authService.login(email, password);

            res
                .cookie('accessToken', accessToken, cookieOptions)
                .cookie('refreshToken', refreshToken, refreshCookieOptions)
                .json({user: user});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    refresh = async (req: Request, res: Response) => {
        try {
            const {refreshToken} = req.body;
            const result = await this.authService.refresh(refreshToken);
            res
                .cookie('accessToken', result.accessToken, cookieOptions)
                .cookie('refreshToken', result.refreshToken, refreshCookieOptions)
                .json({user: result.user});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    logout = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.userId;
            await (new AuthService()).logout(userId);

            // Очищаем куки с токенами
            res.clearCookie('accessToken', clearCookieOptions);
            res.clearCookie('refreshToken', clearRefreshCookieOptions);

            res.json({message: 'The exit was successful.'});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    verifyEmail = async (req: Request, res: Response) => {
        try {
            const {token} = req.params;
            const result = await this.authService.verifyEmail(token);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({error: error.message});
            } else {
                res.status(500).json({error: 'Error confirming email'});
            }
        }
    }
} 