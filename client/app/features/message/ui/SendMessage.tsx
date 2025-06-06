import React, {useState} from 'react';
import {IoSendSharp} from "react-icons/io5";
import {CHAT_MESSAGE_TYPES} from "~/features/message/consts/ChatMessageTypes";
import {useChatMessageEvents} from "~/features/message/lib/useChatMessageEvents";

const SendMessage = () => {
    const {sendMessage, isOpen} = useChatMessageEvents();

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
        <form className='relative w-full' onSubmit={onSubmit}>
            <input value={value}
                   onChange={(e) => setValue(e.target.value)}
                   placeholder='Type your message' type='text'
                   className='flex gap-2 bg-background items-center rounded-3xl px-10 p-2 border w-full'>
            </input>
            <button className='absolute top-1/2 right-4 -translate-y-1/2'>
                <IoSendSharp/>
            </button>
        </form>
    );
};

export default SendMessage;