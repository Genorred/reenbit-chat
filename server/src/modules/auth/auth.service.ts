import axios from 'axios';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { IUser, User } from './user.model';
import config from '../../config/config';
import { oauth2Client } from "./google";
import { emailService } from "./email.service";
import bcrypt from 'bcryptjs';

interface GoogleUser {
    sub: string;
    email: string;
    name: string;
    picture?: string;
}

interface AuthResult {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

interface RegisterData {
    email: string;
    name: string;
    password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret';

export class AuthService {
    async handleGoogleAuth(token: string): Promise<AuthResult> {
        const userInfoResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${token}`
        );

        const googleUser = userInfoResponse.data;

        let user = await User.findOne({ googleId: googleUser.sub });
        if (!user) {
            user = await User.create({
                googleId: googleUser.sub,
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
                isEmailVerified: true // Google email уже подтвержден
            });
        }

        return this.generateTokens(user);
    }

    async register(data: RegisterData): Promise<AuthResult> {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new Error('Пользователь с таким email уже существует');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({
            ...data,
            password: hashedPassword
        });

        return this.generateTokens(user);
    }

    async verifyEmail(token: string): Promise<{ message: string }> {
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            throw new Error('Недействительная или истекшая ссылка подтверждения');
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        return { message: 'Email успешно подтвержден' };
    }

    async login(email: string, password: string): Promise<AuthResult> {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Пользователь не найден');
        }

        if (!user.password) {
            throw new Error('Этот аккаунт использует Google для входа');
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Неверный пароль');
        }

        if (!user.isEmailVerified) {
            throw new Error('Email не подтвержден');
        }

        return this.generateTokens(user);
    }

    async refresh(refreshToken: string): Promise<AuthResult> {
        try {
            const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { userId: string };
            const user = await User.findById(decoded.userId);

            if (!user || user.refreshToken !== refreshToken) {
                throw new Error('Недействительный refresh токен');
            }

            return this.generateTokens(user);
        } catch (error) {
            throw new Error('Недействительный refresh токен');
        }
    }

    async logout(userId: string): Promise<void> {
        await User.findByIdAndUpdate(userId, { refreshToken: null });
    }

    private async generateTokens(user: IUser): Promise<AuthResult> {
        const payload = {
            userId: user._id,
            email: user.email
        };

        const refreshToken = jwt.sign(
            payload,
            REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        const accessToken = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Сохраняем refresh токен в базе данных
        user.refreshToken = refreshToken;
        await user.save();

        return {
            accessToken,
            refreshToken,
            user
        };
    }
} 