import {CHAT_MESSAGE_TYPES} from "~/features/chat/consts/ChatMessageTypes";
import type {MessageI} from "~/features/chat/model/Message";

export interface ServerMessage {
    type: CHAT_MESSAGE_TYPES;
    payload: MessageI
}