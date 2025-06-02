import React from 'react';
import Avatar from "~/shared/ui/Avatar";

const Chat = ({
    name,
    lastMessage,
    picture,
              }: {
    name: string;
    lastMessage: string;
    picture?: string;
}) => {
    return (
        <div className='flex'>
            <Avatar src={picture} width={36} height={36} />
            <div>
                <h4>
                    {name}
                </h4>
                <p>
                    {lastMessage}
                </p>
            </div>
        </div>
    );
};

export default Chat;