import React, {useRef, useState} from 'react';
import {IoIosSearch} from "react-icons/io";
import {useSearchStore} from "~/features/chat/model/search";
import {useMutation} from "@tanstack/react-query";
import {chatApi} from "~/shared/api/chat";
import { queryClient } from '~/shared/lib/queryClient';
import {useToastStore} from "~/shared/lib/store/toastStore";

const Search = () => {
    const [value, setValue] = useState('')
    const addToast = useToastStore((state) => state.addToast);
    const searchChatsMutation = useMutation({
        mutationFn: chatApi.searchChats,
        onSuccess: (data) => {
            console.log('new chat', data.toString());
            queryClient.setQueryData(['chats'], (prev: any) => {
                return data
            });
        },
        onError: () => {
            addToast({
                type: 'error',
                message: 'Failed to search chats',
            });
        },
    });
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchChatsMutation.mutate(value)
    }
    return (
        <form className='relative m-4' onSubmit={onSubmit}>
            <input placeholder='Search or start new chat'
                   onChange={(e) => setValue(e.target.value)}
                   className='flex gap-2 items-center rounded-3xl px-10 p-2 border w-full'>
            </input>
            <IoIosSearch className='absolute top-1/2 left-4 -translate-y-1/2'/>
        </form>
    );
};

export default Search;