import {WS_NAMESPACES} from "../consts/WSNamespaces";
import WebSocket from "ws";
import {ChatController} from "../modules/chat/controllers/chatController";

export const handleWSNamespaces = (path: string, ws: WebSocket, wss: WebSocket.Server) => {
   switch (path) {
       case WS_NAMESPACES.CHAT:
           ChatController.getQuoteResponse(ws);
           break
   }
}