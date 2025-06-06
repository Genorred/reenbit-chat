import axios from 'axios';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {IUser, User} from './user.model';
import config from '../../config/config';
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
    emailVerificationToken?: string;
}

interface RegisterData {
    email: string;
    name: string;
    password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
    async handleGoogleAuth(token: string) {
        const userInfoResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${token}`
        );

        const googleUser = userInfoResponse.data;

        let user = await User.findOne({googleId: googleUser.sub});
        if (!user) {
            user = await User.create({
                googleId: googleUser.sub,
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
                isEmailVerified: true
            });
        }

        return this.generateTokens(user);
    }

    async register(data: RegisterData) {
        const existingUser = await User.findOne({email: data.email});
        if (existingUser) {
            throw new Error('User with such email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const emailVerificationToken = crypto.randomBytes(32).toString('hex');
        const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 часа

        const user = await User.create({
            email: data.email,
            name: data.name,
            password: hashedPassword,
            emailVerificationToken,
            emailVerificationExpires
        });

        return this.generateTokens(user, emailVerificationToken);
    }

    async verifyEmail(token: string): Promise<{ message: string }> {
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: {$gt: Date.now()}
        });

        if (!user) {
            throw new Error('Invalid or expired confirmation link');
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        return {message: 'Email successfully confirmed'};
    }

    async login(email: string, password: string) {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.password) {
            throw new Error('This account uses Google to log in.');
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        if (!user.isEmailVerified) {
            throw new Error('Email not confirmed');
        }

        return this.generateTokens(user);
    }

    async refresh(refreshToken: string) {
        try {
            const decoded = jwt.verify(refreshToken, JWT_SECRET) as { userId: string };
            const user = await User.findById(decoded.userId);

            if (!user || user.refreshToken !== refreshToken) {
                throw new Error('Invalid refresh token');
            }

            return this.generateTokens(user);
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    async logout(userId: string): Promise<void> {
        await User.findByIdAndUpdate(userId, {refreshToken: null});
    }

    private async generateTokens(user: IUser, emailVerificationToken?: string) {
        const payload = {
            userId: user._id,
            email: user.email
        };

        const refreshToken = jwt.sign(
            payload,
            config.jwtSecret,
            {expiresIn: '7d'}
        );

        const accessToken = jwt.sign(
            payload,
            config.jwtSecret,
            {expiresIn: '15m'}
        );

        user.refreshToken = refreshToken;
        await user.save();

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
            },
            emailVerificationToken
        };
    }
} 