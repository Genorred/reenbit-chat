import React, {useState} from 'react';
import {IoMdMore} from "react-icons/io";
import Avatar from "~/shared/ui/Avatar";
import {ConfirmDialog} from '~/shared/ui/dialog/ConfirmDialog';
import {UpdateChatDialog} from './UpdateChatDialog';
import {useNavigate} from "react-router";

interface ChatProps {
    id: string;
    firstName: string;
    lastName: string;
    onEdit?: (id: string, firstName: string, lastName: string) => void;
    onDelete?: (id: string) => void;
}

const Chat: React.FC<ChatProps> = ({id, firstName, lastName, onEdit, onDelete}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsMenuOpen(false);
        setIsDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = () => {
        onDelete?.(id);
    };

    const handleEditClick = () => {
        setIsMenuOpen(false);
        setIsUpdateDialogOpen(true);
    };

    const handleUpdateSubmit = (id: string, firstName: string, lastName: string) => {
        onEdit?.(id, firstName, lastName);
    };
    const navigate = useNavigate()
    const onSelect = () => {
        navigate(`/${id}`)
    }
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
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-background-accent rounded-full"
                    >
                        <IoMdMore className="w-5 h-5 text-foreground"/>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg z-10">
                            <div className="py-1">
                                {onEdit && (
                                    <button
                                        onClick={handleEditClick}
                                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background-accent"
                                    >
                                        Edit
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={handleDeleteClick}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-background-accent"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ConfirmDialog
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Chat"
                message={`Are you sure you want to delete chat with ${firstName} ${lastName}?`}
                confirmText="Delete"
            />
            <UpdateChatDialog
                isOpen={isUpdateDialogOpen}
                onClose={() => setIsUpdateDialogOpen(false)}
                onSubmit={handleUpdateSubmit}
                initialData={{id, firstName, lastName}}
            />
        </>
    );
};

export default Chat;