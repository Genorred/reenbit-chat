import {Request, Response} from 'express';
import {AuthService} from './auth.service';
import config from "../../config/config";

export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    async handleGoogleCallback(req: Request, res: Response) {
        try {
            const {token} = req.body;
            const {refreshToken, accessToken, user} = await this.authService.handleGoogleAuth(token);

            const cookieOptions = (time: number) => ({
                expires: new Date(Date.now() + time),
                httpOnly: true,
                path: '/',
                sameSite: config.isProduction ? 'none' : undefined,
                secure: config.isProduction,
            }) as const;
            res.cookie('accessToken', accessToken, cookieOptions(config.accessExpiration))
                .cookie('refreshToken', refreshToken, cookieOptions(config.refreshExpiration))
                .json({message: 'Authenticated successfully', user: user});
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error while Authenticating:', error.message);
            }
            res.status(500).json({error: 'Error while Authenticating'});
        }
    }
} 