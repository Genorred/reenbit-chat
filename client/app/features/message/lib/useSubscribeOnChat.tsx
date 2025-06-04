import type {ServerMessage} from "~/features/message/model/ServerMessage";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useParams} from "react-router";

export const useSubscribeOnChat = (onMessage?: (m: MessageEvent) => void, id: string = '') => {
    const {chatId = id} = useParams();
    const url = new URL(import.meta.env.VITE_WS_API_URL + '/chat' as string);
    url.searchParams.set('id', chatId)

    const {
        sendMessage,
        readyState,
    } = useWebSocket<ServerMessage>(url.href, {
        share: true,
        shouldReconnect: event => event.type === "CONNECT",
        onMessage
    });

    return {
        sendMessage,
        isOpen: readyState === ReadyState.OPEN
    }
};