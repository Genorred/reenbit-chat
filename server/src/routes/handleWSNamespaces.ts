import {WS_NAMESPACES} from "./WSNamespaces";
import WebSocket from "ws";
import {WsChatController} from "../modules/chat/controllers/wsChatController";
import {JwtPayload} from "../middleware/auth.middleware";

export const handleWSNamespaces = (url: URL, ws: WebSocket, wss: WebSocket.Server, user: JwtPayload) => {
    const {pathname, searchParams} = url
    if (pathname.includes(WS_NAMESPACES.CHAT)) {
        const id =  searchParams.get('id')
        if (!id)
        return ws.close(1008, 'chat id required')
        WsChatController.getQuoteResponse(ws, id, user.userId);
    } else if (pathname.includes(WS_NAMESPACES.AUTO_CHAT)) {
        WsChatController.autoMessaging(ws, user.userId);
    }
}