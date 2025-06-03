import React from 'react';
import type {MessageI} from "~/features/chat/model/Message";
import Avatar from "~/shared/ui/Avatar";
import { format } from 'date-fns';

const Message = ({message}: {message:  MessageI }) => {
    const formattedDate = format(message.createdAt, 'M/d/yyyy, h:mm a')
    return (
        <div className='flex flex-col gap-2 break-words'>
            {message.type === 'user'
            ?
                <>
                    <div className='flex flex-row-reverse'>
                        <span className='bg-secondary-background-accent rounded-3xl max-w-[70%] px-4 flex items-center
                text-black py-2 wrap-anywhere'>
                            {message.content}
                        </span>
                    </div>
                    <p className='ml-auto px-2 text-sm'>{formattedDate}</p>
                </>
            :

                    <div className='flex gap-2'>
                        <Avatar alt={`companion's avatar`} width={72} height={2}/>
                        <div>
                            <div className='bg-[#3b4051] my-auto rounded-3xl max-w-[70%] px-4 flex items-center
                text-white py-2 wrap-anywhere'>
                                {message.content}
                            </div>
                            <p className='px-2 text-sm mt-2'>{formattedDate}</p>
                        </div>

                    </div>

            }


        </div>
    );
};

export default Message;