import {queryClient} from "~/shared/lib/queryClient";
import type {MessageI} from "~/features/chat/model/Message";
import type {ServerMessage} from "~/features/chat/model/ServerMessage";
import {getChatQueryKey} from "~/features/chat/lib/getChatQueryKey";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useToastStore} from "~/shared/lib/store/toastStore";
import {CHAT_MESSAGE_TYPES} from "../consts/ChatMessageTypes";
import {useParams} from "react-router";

export const useOnMessage = () => {
    const addToast = useToastStore(state => state.addToast)
    const {chatId = ''} = useParams();
    const queryKey = getChatQueryKey(chatId);

    const onMessage = (message: MessageEvent) => {
        const data = JSON.parse(message.data);
        const {type, payload}: ServerMessage = data;

        switch (type) {
            case CHAT_MESSAGE_TYPES.UPDATE_MESSAGE: {
                queryClient.setQueryData(queryKey, (oldData: MessageI[] = []) => {
                    return oldData.map(msg =>
                        msg._id === payload._id
                            ? {...msg, content: payload.content}
                            : msg
                    );
                });
                break;
            }

            case CHAT_MESSAGE_TYPES.NEW_MESSAGE: {

                if (payload.type === 'quote') {
                    addToast({
                        type: 'info',
                        message: 'You got a message!',
                    });
                }
                queryClient.setQueryData(queryKey, (oldData: MessageI[] = []) => {
                    return [...oldData, payload];
                });
                break;
            }
        }
    }

    return useSubscribeOnChat(onMessage, chatId);
};
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