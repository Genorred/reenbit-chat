import React, {useState} from 'react';
import {useSubscribeOnChat} from "~/features/chat/lib/useSubscribeOnChat";
import {useParams} from "react-router";
import {IoSendSharp} from "react-icons/io5";

const SendMessage = () => {
    const {chatId: id = ''} = useParams();
    const [value, setValue] = useState<string>('')
    const [prevValue, setPrevValue] = useState('')
    const {sendMessage} = useSubscribeOnChat(id, () => {
        setValue(prevValue)
    })
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(value)
        setPrevValue(value)
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