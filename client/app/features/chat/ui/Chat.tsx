import React, {useEffect, useRef, useState} from 'react';
import {IoMdMore} from "react-icons/io";
import Avatar from "~/shared/ui/Avatar";
import {UpdateChatDialog} from './UpdateChatDialog';
import {useNavigate} from "react-router";
import {DeleteChatDialog} from "~/features/chat/ui/DeleteChatDialog";

interface ChatProps {
    id: string;
    firstName: string;
    lastName: string;
}

const Chat: React.FC<ChatProps> = ({id, firstName, lastName}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsMenuOpen(false);
        setIsDeleteConfirmOpen(true);
    };

    const handleEditClick = () => {
        setIsMenuOpen(false);
        setIsUpdateDialogOpen(true);
    };

    const navigate = useNavigate()
    const onSelect = () => {
        navigate(`/${id}`)
    }
    const actionsRef = useRef<HTMLDivElement>(null);

    const toggleActions = () => setIsMenuOpen(prev => !prev)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, toggleActions]);


    return (
        <>
            <div onClick={onSelect}
                 className="relative flex items-center justify-between p-4 hover:bg-background-accent cursor-pointer">
                <div className="flex items-center space-x-3">
                    <Avatar alt={`${firstName || ''} ${lastName || ''}'s avatar`} width={72}
                            height={72}/>
                    <div>
                        <h3 className="text-foreground font-medium">
                            {firstName} {lastName}
                        </h3>
                    </div>
                </div>
                <div className="relative">
                    <button

                        onClick={toggleActions}
                        className="p-2 hover:bg-background-accent rounded-full cursor-pointer"
                    >
                        <IoMdMore className="w-5 h-5 text-foreground"/>
                    </button>
                    {isMenuOpen && (
                        <div ref={actionsRef}
                             className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg z-10">
                            <div className="py-1">
                                <button
                                    onClick={handleEditClick}
                                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background-accent"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDeleteClick}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-background-accent"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <DeleteChatDialog
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                initialData={{id, firstName, lastName}}
            />
            <UpdateChatDialog
                isOpen={isUpdateDialogOpen}
                onClose={() => setIsUpdateDialogOpen(false)}
                initialData={{id, firstName, lastName}}
            />
        </>
    );
};

export default Chat;