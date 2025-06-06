import React from 'react';
import {useAutoMessageStore} from "~/features/message/model/autoMessageStore";
import Toggle from "~/shared/ui/Toggle";
import {useToastStore} from "~/shared/lib/store/toastStore";
import useWebSocket from "react-use-websocket";
import type {ServerMessage} from "~/features/message/model/ServerMessage";
import {queryClient} from "~/shared/lib/queryClient";
import type {MessageI} from "~/features/message/model/Message";
import {getChatQueryKey} from "~/features/message/lib/getChatQueryKey";
import {useParams} from "react-router";

const AutoMessagingToggle = () => {
        const {chatId = ''} = useParams();
        const {isEnabled, setAutoMessage} = useAutoMessageStore();
        const addToast = useToastStore((state) => state.addToast);
        const url = new URL(import.meta.env.VITE_WS_API_URL + '/auto-chat' as string);
        useWebSocket<ServerMessage>(url.href, {
                shouldReconnect: event => event.type === "CONNECT",
                onMessage: (event) => {
                    const data: MessageI & {
                        firstName: string,
                        lastName: string,
                    } = JSON.parse(event.data);
                    addToast({
                        type: "info",
                        message: `You got a message from ${data.firstName} ${data.lastName}`,
                    })

                    const queryKey = getChatQueryKey(chatId);

                    queryClient.setQueryData(queryKey, (oldData: MessageI[] = []) => {
                        return oldData.map(msg =>
                            msg._id === data._id
                                ? {...msg, content: data.content}
                                : msg
                        )
                    })
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