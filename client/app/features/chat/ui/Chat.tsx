import React, { useState } from 'react';
import { IoMdMore } from "react-icons/io";
import Avatar from "~/shared/ui/Avatar";

interface ChatProps {
    id: string;
    firstName: string;
    lastName: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const Chat: React.FC<ChatProps> = ({ id, firstName, lastName, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative flex items-center justify-between p-4 hover:bg-background-accent cursor-pointer">
            <div className="flex items-center space-x-3">
                <Avatar src={`https://via.placeholder.com/36?text=${firstName[0]}${lastName[0]}`} width={36} height={36} />
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
                    <IoMdMore className="w-5 h-5 text-foreground" />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg z-10">
                        <div className="py-1">
                            {onEdit && (
                                <button
                                    onClick={() => {
                                        onEdit(id);
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background-accent"
                                >
                                    Edit
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={() => {
                                        onDelete(id);
                                        setIsMenuOpen(false);
                                    }}
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
    );
};

export default Chat;