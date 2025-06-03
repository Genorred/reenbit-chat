import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../modules/auth/user.model';
import config from '../config/config';
import {cookieOptions} from '../config/cookie.config';

const JWT_SECRET = config.jwtSecret;

export interface JwtPayload {
    userId: string;
    email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
        res.status(401).json({ error: 'Требуется аутентификация' });
        return;
    }

    console.log(refreshToken);
    try {
        // Пробуем верифицировать access token
        (req as any).user = jwt.verify(accessToken, JWT_SECRET) as JwtPayload;
        next();
    } catch (error) {
        // Если access token истек, проверяем refresh token
        if (!refreshToken) {
            res.status(401).json({ error: 'Требуется аутентификация' });
            return;
        }

        try {
            console.log('decode')
            console.log('secret', JWT_SECRET)
            const decoded = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload;
            console.log('decoded', decoded);
            User.findById(decoded.userId).then(user => {
                console.log('refresh tokens are equal', user?.refreshToken !== refreshToken)
                if (!user || user.refreshToken !== refreshToken) {
                    res.status(401).json({ error: 'Недействительный refresh token' });
                    return;
                }

                // Генерируем новый access token
                const newAccessToken = jwt.sign(
                    { userId: user._id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: config.accessExpiration / 1000 } // конвертируем в секунды
                );

                // Устанавливаем новый access token в куки
                res.cookie('accessToken', newAccessToken, cookieOptions);

                (req as any).user = decoded;
                next();
            }).catch(() => {
                res.status(500).json({ error: 'Ошибка аутентификации' });
            });
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: 'Недействительный refresh token' });
        }
    }
}; 