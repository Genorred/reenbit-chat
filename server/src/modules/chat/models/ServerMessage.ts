import {CHAT_MESSAGE_TYPES} from "../consts/ChatMessageTypes";


export interface UpdatePayload {
    messageId: string;
    content: string;
}

export interface ServerMessage {
    type: CHAT_MESSAGE_TYPES;
    payload: UpdatePayload | string;
}