import React, { useState } from 'react';
import type {MessageI} from "~/features/chat/model/Message";
import Avatar from "~/shared/ui/Avatar";
import { format } from 'date-fns';
import { CiEdit } from "react-icons/ci";
import { useSubscribeOnChat } from '../lib/useSubscribeOnChat';
import { CHAT_MESSAGE_TYPES } from '../consts/ChatMessageTypes';

const Message = ({message}: {message: MessageI }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(message.content);

    const formattedDate = format(message.createdAt, 'M/d/yyyy, h:mm a');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const {sendMessage, isOpen} = useSubscribeOnChat()

    const handleSave = () => {
        if (editedContent !== message.content && isOpen) {
            sendMessage(JSON.stringify({
                type: CHAT_MESSAGE_TYPES.UPDATE_MESSAGE,
                payload: {
                    messageId: message._id,
                    content: editedContent
                }
            }));
        }
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
    };

    return (
        <div className='flex flex-col gap-2 break-words'>
            {message.type === 'user' ? (
                <>
                    <div className='flex flex-row-reverse items-center gap-2'>
                        {isEditing ? (
                            <div className='flex items-center gap-2 max-w-[70%]'>
                                <input
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    onBlur={handleSave}
                                    className='bg-secondary-background-accent rounded-3xl px-4 py-2 text-black'
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <div className='flex items-center gap-2 max-w-[70%]'>
                                <span className='bg-secondary-background-accent rounded-3xl px-4 flex items-center text-black py-2 wrap-anywhere'>
                                    {message.content}
                                </span>
                                <button 
                                    onClick={handleEdit}
                                    className='p-1 hover:bg-background-accent rounded-full cursor-pointer'
                                >
                                    <CiEdit className='w-4 h-4 text-foreground' />
                                </button>
                            </div>
                        )}
                    </div>
                    <p className='ml-auto px-2 text-sm'>{formattedDate}</p>
                </>
            ) : (
                <div className='flex gap-2'>
                    <Avatar alt={`companion's avatar`} width={72} height={2}/>
                    <div>
                        <div className='bg-[#3b4051] my-auto rounded-3xl max-w-[70%] px-4 flex items-center text-white py-2 wrap-anywhere'>
                            {message.content}
                        </div>
                        <p className='px-2 text-sm mt-2'>{formattedDate}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Message;