import config from './config';

export const cookieOptions = {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? 'strict' : 'lax' as 'strict' | 'lax',
    path: '/',
    maxAge: config.accessExpiration
} as const;

export const refreshCookieOptions = {
    ...cookieOptions,
    maxAge: config.refreshExpiration
} as const;

export const clearCookieOptions = {
    ...cookieOptions,
    maxAge: 0
} as const;

export const clearRefreshCookieOptions = {
    ...refreshCookieOptions,
    maxAge: 0
} as const; 