import {CHAT_MESSAGE_TYPES} from "../consts/ChatMessageTypes";
import {MessageI} from "./Message";

export interface ServerMessage {
    type: CHAT_MESSAGE_TYPES;
    payload: MessageI
}