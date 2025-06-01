import React from 'react';
import {useSubscribeOnChat} from "~/features/chat/lib/useSubscribeOnChat";
import {useParams} from "react-router";

const TypeMessage = () => {
    const params = useParams();
    const {chatId} = params
    const { sendMessage } = useSubscribeOnChat(Number(chatId))
    return (
        <form>

        </form>
    );
};

export default TypeMessage;