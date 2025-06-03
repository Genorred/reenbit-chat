import {useCallback} from "react";
import {queryClient} from "~/shared/lib/queryClient";
import type {MessageI} from "~/features/chat/model/Message";
import type {ServerMessage} from "~/features/chat/model/ServerMessage";
import {getChatQueryKey} from "~/features/chat/lib/getChatQueryKey";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useToastStore} from "~/shared/lib/store/toastStore";


export const useSubscribeOnChat = (id: string, onError?: ()=>void) => {
    const url = new URL(import.meta.env.VITE_WS_API_URL + '/chat' as string);
    url.searchParams.set('id', id)
    const addToast = useToastStore(state => state.addToast)

    const queryKey = getChatQueryKey(id);
    const {
        sendMessage: sM,
        readyState,
    } = useWebSocket<ServerMessage>(url.href, {
        shouldReconnect: event => event.type === "CONNECT",
        onMessage: (message) => {
            console.log('message', message);
            const data: MessageI = JSON.parse(message.data);
            if (data.type === 'quote')
                addToast({
                    type: 'info',
                    message: 'You got a message!',
                })
            queryClient.setQueryData(queryKey, (oldData: [MessageI]) => {
                return [...oldData, data];
            });
            // switch (type) {
            //     // case CHAT_MESSAGE_TYPES.INITIAL_DATA:
            //     //     queryClient.setQueryData(queryKey, payload);
            //     //     break;
            //     case CHAT_MESSAGE_TYPES.NEW_MESSAGE:
            //         queryClient.setQueryData(queryKey, (oldData: [MessageI]) => {
            //             return [...oldData, payload];
            //         });
            //         break;
            //     default:
            //         break;
            // }
        },
        onError: (err) => {
            onError?.()
        }
    });

    const sendMessage = useCallback(
        (content: string) => {
            if (readyState === ReadyState.OPEN)
                sM(content);
        },
        [readyState, sM],
    );

    return ({
        sendMessage,
    });
};