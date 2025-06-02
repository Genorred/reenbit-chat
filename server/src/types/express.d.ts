import {JwtPayload} from "../middleware/auth.middleware";

declare global {
    namespace Express {
        export interface Request {
            user?: JwtPayload;
        }
    }
}