import {WS_NAMESPACES} from "../consts/WSNamespaces";
import WebSocket from "ws";
import {WsChatController} from "../modules/chat/controllers/wsChatController";

export const handleWSNamespaces = (url: URL, ws: WebSocket, wss: WebSocket.Server) => {
    const {pathname, searchParams} = url
    if (pathname.includes(WS_NAMESPACES.CHAT)) {
        const id =  searchParams.get('id')
        if (!id)
        return ws.close(1008, 'chat id required')
        WsChatController.getQuoteResponse(ws, id);
    }
}