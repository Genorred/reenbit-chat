import React, {useRef} from 'react';
import {IoIosSearch} from "react-icons/io";
import {useSearchStore} from "~/features/chat/model/search";

const Search = () => {
    const set = useSearchStore(state => state.set)
    const ref = useRef<HTMLInputElement>(null);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (ref.current) {
            set(ref?.current.value);
            console.log(ref?.current.value)
        }
    }
    return (
        <form className='relative m-4' onSubmit={onSubmit}>
            <input ref={ref} placeholder='Search or start new chat'
                   className='flex gap-2 items-center rounded-3xl px-10 p-2 border w-full'>
            </input>
            <IoIosSearch className='absolute top-1/2 left-4 -translate-y-1/2'/>
        </form>
    );
};

export default Search;