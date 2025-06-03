import React, {useState} from 'react';
import { useOnMessage } from "~/features/chat/lib/useSubscribeOnChat";
import {IoSendSharp} from "react-icons/io5";
import {CHAT_MESSAGE_TYPES} from "~/features/chat/consts/ChatMessageTypes";

const SendMessage = () => {
    const {sendMessage, isOpen} = useOnMessage();

    const [value, setValue] = useState<string>('')
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isOpen) {
            sendMessage(JSON.stringify({
                type: CHAT_MESSAGE_TYPES.SEND_MESSAGE,
                payload: value
            }));
        }
        setValue('')
    }
    return (
        <form className='relative m-4 w-full' onSubmit={onSubmit}>
            <input value={value}
                   onChange={(e) => setValue(e.target.value)}
                   placeholder='Type your message' type='text'
                   className='flex gap-2 bg-background items-center rounded-3xl px-10 p-2 border w-full'>
            </input>
            <IoSendSharp className='absolute top-1/2 right-4 -translate-y-1/2'/>
        </form>
    );
};

export default SendMessage;