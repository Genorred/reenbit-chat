// Import necessary hooks and libraries
import {useCallback} from "react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {queryClient} from "~/shared/lib/queryClient";
import {CHAT_MESSAGE_TYPES} from "~/features/chat/consts/ChatMessageTypes";
import type {MessageI} from "~/features/chat/model/Message";
import type {ServerMessage} from "~/features/chat/model/ServerMessage";
import {getChatQueryKey} from "~/features/chat/lib/getChatQueryKey";

const SOCKET_URL = import.meta.env.VITE_WS_API_URL as string;

export const useSubscribeOnChat = (id: number) => {
    const queryKey = getChatQueryKey(id);
    const {
        sendMessage: sM,
        readyState,
    } = useWebSocket<ServerMessage>(SOCKET_URL, {
        shouldReconnect: event => event.type === "CONNECT",
        onMessage: (message) => {
            const {type, payload} = JSON.parse(message.data);

            switch (type) {
                case CHAT_MESSAGE_TYPES.INITIAL_DATA:
                    queryClient.setQueryData(queryKey, payload);
                    break;
                case CHAT_MESSAGE_TYPES.NEW_MESSAGE:
                    queryClient.setQueryData(queryKey, (oldData: [MessageI]) => {
                        return [...oldData, payload];
                    });
                    break;
                default:
                    break;
            }
        },
    });

    const sendMessage = useCallback(
        (content: string) => {
            if (readyState === ReadyState.OPEN)
                sM(
                    JSON.stringify({
                        type: CHAT_MESSAGE_TYPES.SEND_MESSAGE,
                        content,
                    }),
                );
        },
        [readyState, sM],
    );

    return ({
        sendMessage,
    });
};