import React from 'react';
import {IoSendSharp} from "react-icons/io5";
import {IoIosSearch} from "react-icons/io";

const Search = () => {
    return (
        <div className='relative m-4'>
            <input placeholder='Search or start new chat'
                   className='flex gap-2 items-center rounded-3xl px-10 p-2 border w-full'>
            </input>
            <IoIosSearch className='absolute top-1/2 left-4 -translate-y-1/2' />
        </div>
    );
};

export default Search;