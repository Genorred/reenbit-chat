import jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../modules/auth/user.model';
import { parse } from 'cookie';
import {JwtPayload} from "../middleware/auth.middleware";
import {IncomingMessage} from "node:http";
import {WebSocket} from 'ws';

const JWT_SECRET = config.jwtSecret;


export const authenticateWS = async (req: IncomingMessage, ws: WebSocket): Promise<JwtPayload | null> => {
    try {
        const cookiesHeader = req.headers.cookie;
        if (!cookiesHeader) {
            ws.close(4401, 'Authentication required');
            return null;
        }

        const cookies = parse(cookiesHeader);
        const accessToken = cookies.accessToken;
        const refreshToken = cookies.refreshToken;

        if (!accessToken && !refreshToken) {
            ws.close(4401, 'Authentication required');
            return null;
        }

        try {
            const decoded = jwt.verify(accessToken!, JWT_SECRET) as JwtPayload;
            return decoded;
        } catch (err) {
            if (!refreshToken) {
                ws.close(4401, 'Authentication failed');
                return null;
            }

            try {
                const decoded = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload;
                const user = await User.findById(decoded.userId);

                if (!user || user.refreshToken !== refreshToken) {
                    ws.close(4401, 'Invalid refresh token');
                    return null;
                }

                // Optionally issue a new access token (if needed, return it to the client in a message)
                // const newAccessToken = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: config.accessExpiration / 1000 });

                return decoded;
            } catch (err) {
                ws.close(4401, 'Invalid refresh token');
                return null;
            }
        }
    } catch (err) {
        ws.close(1011, 'Internal error');
        return null;
    }
};
