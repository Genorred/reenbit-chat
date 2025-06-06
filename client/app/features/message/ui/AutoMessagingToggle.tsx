import React from 'react';
import {useAutoMessageStore} from "~/features/message/model/autoMessageStore";
import Toggle from "~/shared/ui/Toggle";
import {useToastStore} from "~/shared/lib/store/toastStore";
import useWebSocket from "react-use-websocket";
import type {ServerMessage} from "~/features/message/model/ServerMessage";
import {queryClient} from "~/shared/lib/queryClient";
import type {MessageI} from "~/features/message/model/Message";
import {getChatQueryKey} from "~/features/message/lib/getChatQueryKey";
import type {Chat} from "~/shared/types/chat.types";

const AutoMessagingToggle = () => {
        const {isEnabled, setAutoMessage} = useAutoMessageStore();
        const addToast = useToastStore((state) => state.addToast);
        const url = new URL(import.meta.env.VITE_WS_API_URL + '/auto-chat' as string);
        useWebSocket<ServerMessage>(url.href, {
                shouldReconnect: event => event.type === "CONNECT",
                onMessage: (event) => {
                    const data: {
                        firstName: string,
                        lastName: string,
                        _doc: MessageI
                    } = JSON.parse(event.data);
                    addToast({
                        type: "info",
                        message: `You got a message from ${data.firstName} ${data.lastName}`,
                    })

                    const queryKey = getChatQueryKey(data._doc.chatId);

                    console.log(data)
                    queryClient.setQueryData(queryKey, (oldData: MessageI[] = []) => {
                        return [...oldData, data._doc];
                    })
                    queryClient.invalidateQueries({queryKey: ['chats']});
                    // queryClient.setQueryData(['chats'], (oldData: Chat[] = []) => {
                    //     return oldData.map(msg =>
                    //         msg._id === data._doc._id
                    //             ? {...msg, lastMessage: data._doc.content, lastMessageDate: data._doc.createdAt}
                    //             : msg
                    //     );
                    // });
                }
            },
            isEnabled
        );
        return (
            <Toggle
                isEnabled={isEnabled}
                onChange={setAutoMessage}
                label="Auto messages"
            />
        )
    }
;

export default AutoMessagingToggle;