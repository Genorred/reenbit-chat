import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    isProduction: boolean;
    mongoUri: string;
    jwtSecret: string;
    accessExpiration: number
    refreshExpiration: number
    googleCallback: string
}

const config: Config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/reenbit-chat',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    accessExpiration: Number(process.env.ACCESS_TOKEN_EXPIRATION) || 900000,
    refreshExpiration: Number(process.env.REFRESH_TOKEN_EXPIRATION) || 1209600000,
    googleCallback: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback'
};

export default config;