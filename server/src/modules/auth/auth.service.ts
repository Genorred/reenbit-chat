import axios from 'axios';
import jwt from 'jsonwebtoken';
import {IUser, User} from './user.model';
import config from '../../config/config';
import {oauth2Client} from "./google";

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

export class AuthService {
    async handleGoogleAuth(token: string): Promise<AuthResult> {
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
                picture: googleUser.picture
            });
        }

        const payload = {
            sub: user._id,
            email: user.email,
            name: user.name,
            picture: user.picture
        }
        const refreshToken = jwt.sign(
            payload,
            config.jwtSecret,
            {expiresIn: config.refreshExpiration}
        );
        const accessToken = jwt.sign(
            payload,
            config.jwtSecret,
            {expiresIn: config.accessExpiration}
        );

        return {
            accessToken,
            refreshToken,
            user
        };
    }
} 