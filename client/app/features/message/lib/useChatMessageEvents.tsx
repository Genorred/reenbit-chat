import {useToastStore} from "~/shared/lib/store/toastStore";
import {useParams} from "react-router";
import {getChatQueryKey} from "~/features/message/lib/getChatQueryKey";
import type {ServerMessage} from "~/features/message/model/ServerMessage";
import {CHAT_MESSAGE_TYPES} from "~/features/message/consts/ChatMessageTypes";
import {queryClient} from "~/shared/lib/queryClient";
import type {MessageI} from "~/features/message/model/Message";
import {useSubscribeOnChat} from "~/features/message/lib/useSubscribeOnChat";
import type {Chat} from "~/shared/types/chat.types";

export const useChatMessageEvents = () => {
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
                queryClient.invalidateQueries({queryKey: ['chats']});
                // queryClient.setQueryData(['chats'], (oldData: Chat[] = []) => {
                //     return oldData.map(msg =>
                //         msg._id === payload._id
                //             ? {...msg, lastMessage: payload.content, lastMessageDate: new Date().toISOString()}
                //             : msg
                //     );
                // });
                break;
            }
        }
    }

    return useSubscribeOnChat(onMessage, chatId);
};